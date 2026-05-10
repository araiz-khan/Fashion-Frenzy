/**
 * Gradio Client for fashn-ai/fashn-vton-1.5
 * Handles virtual try-on inference via Gradio API
 */

import { Client } from "@gradio/client";

const GRADIO_API_URL = "fashn-ai/fashn-vton-1.5";

let cachedClient: Client | null = null;

type VtonCategory = "tops" | "bottoms" | "one-pieces";

function mapCategoryToVton(category: string): VtonCategory {
  const normalized = String(category || "").trim().toLowerCase();

  if (["dress", "dresses"].includes(normalized)) {
    return "one-pieces";
  }

  if (["pants", "trousers", "bottoms", "shoes"].includes(normalized)) {
    return "bottoms";
  }

  return "tops";
}

function extractResultUrl(result: unknown): string | null {
  if (!result || typeof result !== "object") {
    return null;
  }

  const data = (result as { data?: unknown }).data;
  if (!Array.isArray(data) || data.length === 0) {
    return null;
  }

  const first = data[0];
  if (typeof first === "string" && first.length > 0) {
    return first;
  }

  if (first && typeof first === "object") {
    const url = (first as { url?: unknown }).url;
    if (typeof url === "string" && url.length > 0) {
      return url;
    }

    const path = (first as { path?: unknown }).path;
    if (typeof path === "string" && path.length > 0) {
      return path;
    }
  }

  return null;
}

/**
 * Get or create a Gradio client instance
 */
async function getGradioClient(): Promise<Client> {
  if (!cachedClient) {
    try {
      console.log(`Connecting to Gradio Space: ${GRADIO_API_URL}`);
      cachedClient = await Client.connect(GRADIO_API_URL);
      console.log("Successfully connected to Gradio Space");
    } catch (error) {
      console.error("Failed to connect to Gradio client:", error);
      throw error;
    }
  }
  return cachedClient;
}

/**
 * Call the /try_on endpoint
 */
export async function callGradioTryOn(
  personImage: Blob | Buffer,
  garmentImage: Blob | Buffer,
  category: string = "tops",
  garmentPhotoType: string = "model",
  numTimesteps: number = 50,
  guidanceScale: number = 1.5,
  seed: number = 42,
  segmentationFree: boolean = true
): Promise<string> {
  try {
    const vtonCategory = mapCategoryToVton(category);

    console.log("[Gradio] Calling /try_on endpoint");
    console.log("[Gradio] Params:", {
      category: vtonCategory,
      garment_photo_type: garmentPhotoType,
      num_timesteps: numTimesteps,
      guidance_scale: guidanceScale,
      seed,
      segmentation_free: segmentationFree,
    });
    const client = await getGradioClient();

    const result = await client.predict("/try_on", {
      person_image: personImage,
      garment_image: garmentImage,
      category: vtonCategory,
      garment_photo_type: garmentPhotoType,
      num_timesteps: numTimesteps,
      guidance_scale: guidanceScale,
      seed,
      segmentation_free: segmentationFree,
    });

    const resultUrl = extractResultUrl(result);
    if (resultUrl) {
      console.log("[Gradio] /try_on result URL:", resultUrl);
      return resultUrl;
    }

    throw new Error(
      `Invalid response from Gradio try_on endpoint: ${JSON.stringify(result)}`
    );
  } catch (error) {
    console.error("[Gradio] Error calling /try_on:", error);

    const message =
      error instanceof Error
        ? error.message
        : (() => {
            try {
              return JSON.stringify(error);
            } catch {
              return String(error);
            }
          })();

    // Detect common HF Space quota/GPU errors and throw a structured QuotaError
    const quotaRegex = /(?:ZeroGPU|GPU quota exceeded|quota exceeded|exceeded your GPU quota)/i;
    const etaRegex1 = /Try again in\s+([0-9:]+)/i; // e.g. "Try again in 23:57:27"
    const etaRegex2 = /(\d+\s?h(?:ours?)?|\d+\s?m(?:in(?:utes)?)?|\d+\s?s(?:ec(?:onds)?)?)/i;

    if (quotaRegex.test(message)) {
      let eta: string | undefined = undefined;
      const m1 = message.match(etaRegex1);
      if (m1 && m1[1]) eta = m1[1];
      else {
        const m2 = message.match(etaRegex2);
        if (m2 && m2[1]) eta = m2[1];
      }
      const err = new QuotaError(`GPU quota exceeded${eta ? `, retry after ${eta}` : ''}`);
      err.eta = eta;
      throw err;
    }

    // Non-quota errors: rethrow as-is but stringified when necessary
    if (error instanceof Error) throw error;

    throw new Error(`Unknown Gradio error: ${message}`);
  }
}

// Custom error type to allow callers to detect quota issues
export class QuotaError extends Error {
  eta?: string | undefined;
  constructor(message: string) {
    super(message);
    this.name = 'QuotaError';
  }
}

/**
 * Call the /on_garment_gallery_select endpoint
 */
export async function callGradioGarmentSelect(): Promise<{
  garmentImage: string;
  category: string;
  photoType: string;
}> {
  try {
    console.log("Calling Gradio /on_garment_gallery_select endpoint...");
    const client = await getGradioClient();

    const result = await client.predict("/on_garment_gallery_select", {});

    console.log("Gradio /on_garment_gallery_select response:", result);

    // The result should be an array with [garmentImage, category, photoType]
    const resultData = result?.data as Array<string | null> | undefined;
    if (resultData && resultData.length >= 3) {
      return {
        garmentImage: resultData[0] || "",
        category: resultData[1] || "",
        photoType: resultData[2] || "",
      };
    }

    throw new Error(
      `Invalid response from Gradio on_garment_gallery_select endpoint: ${JSON.stringify(result)}`
    );
  } catch (error) {
    console.error("Error calling Gradio garment select:", error);
    throw error;
  }
}
