"use server";

import { generateStyleSuggestions, type GenerateStyleSuggestionsInput, type GenerateStyleSuggestionsOutput } from "@/ai/flows/generate-style-suggestions";

export async function getStyleAdvice(input: GenerateStyleSuggestionsInput): Promise<GenerateStyleSuggestionsOutput | { error: string }> {
  try {
    const result = await generateStyleSuggestions(input);
    return result;
  } catch (error) {
    console.error("Error generating style suggestions:", error);
    return { error: "Failed to generate style suggestions. Please try again." };
  }
}
