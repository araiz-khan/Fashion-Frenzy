
"use server";

import { virtualTryOn } from "@/ai/flows/virtual-try-on-flow";
import type { VirtualTryOnInput, VirtualTryOnOutput } from "@/types";

export async function performVirtualTryOn(input: VirtualTryOnInput): Promise<VirtualTryOnOutput | { error: string }> {
  try {
    const result = await virtualTryOn(input);
    return result;
  } catch (error) {
    console.error("Error performing virtual try-on:", error);
    const details = error instanceof Error ? error.message : "Unknown error";

    if (/GPU quota exceeded|ZeroGPU|quota exceeded/i.test(details)) {
      const etaMatch = details.match(/retry after\s+([0-9:]+)/i);
      const eta = etaMatch?.[1];
      return {
        error: eta
          ? `AI service is busy (GPU quota reached). Please retry after ${eta}.`
          : "AI service is busy (GPU quota reached). Please try again later.",
      };
    }

    return { error: `Failed to generate your virtual try-on image. ${details}` };
  }
}
