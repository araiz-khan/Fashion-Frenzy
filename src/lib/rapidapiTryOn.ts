const RAPIDAPI_URL = "https://try-on-diffusion.p.rapidapi.com/try-on-file";

export type RapidApiTryOnResult = {
  imageUrl: string;
  raw: unknown;
};

function getRapidApiHeaders() {
  const key = process.env.RAPIDAPI_KEY;
  const host = process.env.RAPIDAPI_HOST || "try-on-diffusion.p.rapidapi.com";

  if (!key) {
    throw new Error("Missing RAPIDAPI_KEY in environment.");
  }

  return {
    "x-rapidapi-key": key,
    "x-rapidapi-host": host,
  };
}

async function toBlob(
  value: FormDataEntryValue | string | Blob | null,
  fieldName: string
): Promise<Blob> {
  if (!value) {
    throw new Error(`Missing required file: ${fieldName}`);
  }

  if (value instanceof Blob) {
    return value;
  }

  const source = value.trim();
  if (!source) {
    throw new Error(`Missing required file: ${fieldName}`);
  }

  if (source.startsWith("data:")) {
    const response = await fetch(source);
    if (!response.ok) {
      throw new Error(`Failed to read ${fieldName} data URI.`);
    }
    return response.blob();
  }

  if (/^https?:\/\//i.test(source)) {
    const response = await fetch(source);
    if (!response.ok) {
      throw new Error(`Failed to download ${fieldName} image.`);
    }
    return response.blob();
  }

  throw new Error(`Unsupported ${fieldName} value. Expected File, Blob, data URI, or URL.`);
}

function readStringField(formData: FormData, keys: string[], fallback = ""): string {
  for (const key of keys) {
    const value = formData.get(key);
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }
  return fallback;
}

function extractImageUrl(payload: unknown): string | null {
  if (!payload) return null;

  if (typeof payload === "string") {
    const trimmed = payload.trim();
    return trimmed ? trimmed : null;
  }

  if (Array.isArray(payload)) {
    for (const item of payload) {
      const extracted = extractImageUrl(item);
      if (extracted) return extracted;
    }
    return null;
  }

  if (typeof payload === "object") {
    const record = payload as Record<string, unknown>;
    const candidateKeys = [
      "imageUrl",
      "image_url",
      "generatedImage",
      "generated_image",
      "result",
      "output",
      "url",
      "path",
    ];

    for (const key of candidateKeys) {
      const value = record[key];
      if (typeof value === "string" && value.trim()) {
        return value.trim();
      }
      if (value && typeof value === "object") {
        const nested = extractImageUrl(value);
        if (nested) return nested;
      }
    }

    const data = record.data;
    if (Array.isArray(data)) {
      for (const item of data) {
        const extracted = extractImageUrl(item);
        if (extracted) return extracted;
      }
    }
  }

  return null;
}

function extractErrorMessage(payload: unknown): string {
  if (!payload) return "Failed to process images";

  if (typeof payload === "string") {
    return payload;
  }

  if (typeof payload === "object") {
    const record = payload as Record<string, unknown>;
    const keys = ["error", "message", "details", "detail", "title"];
    for (const key of keys) {
      const value = record[key];
      if (typeof value === "string" && value.trim()) {
        const message = value.trim();
        if (/subject_detection_failed|Failed to detect subject/i.test(message)) {
          return "Could not detect the person in the uploaded photo. Use a clear, front-facing image with the full upper body visible.";
        }
        if (/garment_detection_failed|Failed to detect garment/i.test(message)) {
          return "Could not detect the clothing image. Please upload a clear product photo with the garment centered.";
        }
        return message;
      }
    }
  }

  try {
    return JSON.stringify(payload);
  } catch {
    return String(payload);
  }
}

export async function callRapidApiTryOn(formData: FormData): Promise<RapidApiTryOnResult> {
  const clothingSource =
    formData.get("clothing_file") ??
    formData.get("clothing_image") ??
    formData.get("clothing_image_url");
  const avatarSource =
    formData.get("person_file") ??
    formData.get("person_image") ??
    formData.get("avatar_image");

  const avatarSex = readStringField(formData, ["avatar_sex"], "male");
  const seed = readStringField(formData, ["seed"], "42");

  const rapidApiData = new FormData();
  const clothingBlob = await toBlob(clothingSource as FormDataEntryValue | string | Blob | null, "clothing_file");
  const avatarBlob = await toBlob(avatarSource as FormDataEntryValue | string | Blob | null, "person_file");

  rapidApiData.append("clothing_image", clothingBlob, "clothing.png");
  rapidApiData.append("avatar_image", avatarBlob, "avatar.png");
  rapidApiData.append("avatar_sex", avatarSex);
  rapidApiData.append("seed", seed);

  const response = await fetch(RAPIDAPI_URL, {
    method: "POST",
    headers: getRapidApiHeaders(),
    body: rapidApiData,
  });

  const contentType = response.headers.get("content-type") || "";

  // RapidAPI try-on-diffusion returns the result image as raw binary (image/jpeg or image/png)
  if (contentType.startsWith("image/")) {
    if (!response.ok) {
      throw new Error("RapidAPI returned an unexpected image error response.");
    }
    const arrayBuffer = await response.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");
    const mimeType = contentType.split(";")[0].trim() || "image/jpeg";
    const imageUrl = `data:${mimeType};base64,${base64}`;
    return { imageUrl, raw: { contentType } };
  }

  const payload = contentType.includes("application/json")
    ? await response.json().catch(() => ({}))
    : await response.text().catch(() => "");

  if (!response.ok) {
    throw new Error(extractErrorMessage(payload));
  }

  const imageUrl = extractImageUrl(payload);
  if (!imageUrl) {
    throw new Error("RapidAPI returned no generated image URL.");
  }

  return {
    imageUrl,
    raw: payload,
  };
}
