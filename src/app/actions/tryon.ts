"use server";

import { callRapidApiTryOn } from "@/lib/rapidapiTryOn";
import type { RapidApiTryOnResult } from "@/lib/rapidapiTryOn";

export async function uploadAndTryOn(formData: FormData): Promise<RapidApiTryOnResult | { error: string }> {
  try {
    return await callRapidApiTryOn(formData);
  } catch (error) {
    const details = error instanceof Error ? error.message : "Failed to process images";
    console.error("RapidAPI try-on error:", error);
    return { error: details };
  }
}
