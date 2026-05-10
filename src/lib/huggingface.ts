/**
 * Hugging Face API Integration for Virtual Try-On
 * Uses the fashn-ai/fashn-vton-1.5 model via Gradio API
 */

import { callGradioTryOn } from "./gradioClient";

type BinaryImage = Blob | Buffer;

function parseDataUri(dataURI: string): { mimeType: string; buffer: Buffer } {
  const match = dataURI.match(/^data:(.*?);base64,(.*)$/);
  if (!match) {
    throw new Error("Invalid data URI format");
  }

  const mimeType = match[1] || "image/png";
  const base64 = match[2] || "";
  const buffer = Buffer.from(base64, "base64");
  return { mimeType, buffer };
}

export async function imageSourceToBuffer(source: string): Promise<{ mimeType: string; buffer: Buffer }> {
  if (source.startsWith("data:")) {
    return parseDataUri(source);
  }

  if (!/^https?:\/\//i.test(source)) {
    throw new Error("Image source must be a data URI or a valid http(s) URL");
  }

  const response = await fetch(source);
  if (!response.ok) {
    throw new Error(`Failed to fetch image source: ${response.status} ${response.statusText}`);
  }

  const mimeType = response.headers.get("content-type") || "image/png";
  const arrayBuffer = await response.arrayBuffer();
  return { mimeType, buffer: Buffer.from(arrayBuffer) };
}

export async function callHuggingFaceVTON(
  personImage: BinaryImage,
  garmentImage: BinaryImage,
  garmentDescription: string,
  garmentCategory: string = "tops"
): Promise<Buffer> {
  try {
    const resultUrl = await callGradioTryOn(
      personImage,
      garmentImage,
      garmentCategory,
      "model",
      50,
      1.5,
      42,
      true
    );

    const response = await fetch(resultUrl);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch try-on result: ${response.status} ${response.statusText}`
      );
    }

    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  } catch (error) {
    console.error("Error calling Gradio VTON:", error);
    throw error;
  }
}

/**
 * Convert a data URI to a Blob
 */
export function dataURItoBlob(dataURI: string): Blob {
  const { mimeType, buffer } = parseDataUri(dataURI);

  if (typeof window === "undefined") {
    return buffer as unknown as Blob;
  }

  const bstr = atob(buffer.toString("base64"));
  const n = bstr.length;
  const u8arr = new Uint8Array(n);
  for (let i = 0; i < n; i++) {
    u8arr[i] = bstr.charCodeAt(i);
  }
  return new Blob([u8arr], { type: mimeType });
}

/**
 * Convert a Blob to a data URI
 */
export async function blobToDataURI(blob: Blob): Promise<string> {
  if (typeof window === "undefined") {
    const maybeBuffer = blob as unknown as Buffer;
    const base64 = Buffer.from(maybeBuffer).toString("base64");
    return `data:image/png;base64,${base64}`;
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
