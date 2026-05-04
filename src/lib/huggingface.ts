/**
 * Hugging Face API Integration for Virtual Try-On
 * Uses the fashn-ai/fashn-vton-1.5 model via Hugging Face Inference API
 */

export async function callHuggingFaceVTON(
  personImage: Blob | Buffer,
  garmentImage: Blob | Buffer,
  garmentDescription: string
): Promise<Blob> {
  const apiKey = process.env.HUGGINGFACE_API_KEY;
  
  if (!apiKey) {
    throw new Error("HUGGINGFACE_API_KEY environment variable is not set");
  }

  const formData = new FormData();
  formData.append("human_img", personImage);
  formData.append("clothing_img", garmentImage);
  formData.append("garment_description", garmentDescription);

  const response = await fetch(
    "https://api-inference.huggingface.co/models/fashn-ai/fashn-vton",
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Hugging Face API error: ${response.status} ${response.statusText} - ${errorText}`
    );
  }

  const blob = await response.blob();
  
  if (!blob.type.startsWith("image/")) {
    throw new Error("Hugging Face API did not return an image");
  }

  return blob;
}

/**
 * Convert a data URI to a Blob
 */
export function dataURItoBlob(dataURI: string): Blob {
  const arr = dataURI.split(",");
  const mimeMatch = arr[0].match(/:(.*?);/);
  const mime = mimeMatch ? mimeMatch[1] : "image/jpeg";
  const bstr = atob(arr[1]);
  const n = bstr.length;
  const u8arr = new Uint8Array(n);
  
  for (let i = 0; i < n; i++) {
    u8arr[i] = bstr.charCodeAt(i);
  }
  
  return new Blob([u8arr], { type: mime });
}

/**
 * Convert a Blob to a data URI
 */
export async function blobToDataURI(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
