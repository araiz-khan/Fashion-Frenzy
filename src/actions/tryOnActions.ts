
"use server";

import { virtualTryOn } from "@/ai/flows/virtual-try-on-flow";
import type { VirtualTryOnInput, VirtualTryOnOutput } from "@/types";

export async function performVirtualTryOn(input: VirtualTryOnInput): Promise<VirtualTryOnOutput | { error: string }> {
  try {
    const result = await virtualTryOn(input);
    return result;
  } catch (error) {
    console.error("Error performing virtual try-on:", error);
    return { error: "Failed to generate your virtual try-on image. The AI model might be busy or unavailable. Please try again later." };
  }
}
