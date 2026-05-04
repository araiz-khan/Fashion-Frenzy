
'use server';
/**
 * @fileOverview AI agent that generates a virtual try-on image.
 *
 * - virtualTryOn - A function that generates an image of a person wearing a specified garment.
 * Uses the Hugging Face VTON model: fashn-ai/fashn-vton-1.5
 */

import {ai} from '@/ai/genkit';
import type { VirtualTryOnInput, VirtualTryOnOutput } from '@/types';
import { VirtualTryOnInputSchema, VirtualTryOnOutputSchema } from '@/types';
import { callHuggingFaceVTON, dataURItoBlob, blobToDataURI } from '@/lib/huggingface';


export async function virtualTryOn(
  input: VirtualTryOnInput
): Promise<VirtualTryOnOutput> {
  return virtualTryOnFlow(input);
}

const virtualTryOnFlow = ai.defineFlow(
  {
    name: 'virtualTryOnFlow',
    inputSchema: VirtualTryOnInputSchema,
    outputSchema: VirtualTryOnOutputSchema,
  },
  async (input) => {
    
    try {
      // Convert data URIs to Blobs
      const personBlob = dataURItoBlob(input.userImage);
      const garmentBlob = dataURItoBlob(input.productImage);
      
      const garmentDescription = `${input.productName} (${input.productCategory})`;
      
      // Call Hugging Face VTON model
      const resultBlob = await callHuggingFaceVTON(
        personBlob,
        garmentBlob,
        garmentDescription
      );
      
      // Convert result blob back to data URI
      const generatedImage = await blobToDataURI(resultBlob);
      
      return {
        generatedImage,
      };
    } catch (error) {
      // Fallback to Gemini if Hugging Face fails
      console.warn("Hugging Face VTON failed, falling back to Gemini:", error);
      
      const { media } = await ai.generate({
          model: 'googleai/gemini-2.5-flash-image-preview',
          prompt: [
              { media: { url: input.userImage, contentType: 'image/jpeg' } },
              { media: { url: input.productImage, contentType: 'image/png' } },
              { text: `Create a realistic image of the person in the first photo wearing the clothing item from the second photo, which is a ${input.productName} (${input.productCategory}). The final image should show the person clearly wearing the garment. Maintain the original person's pose and background as much as possible.` },
          ],
          config: {
              responseModalities: ['IMAGE'],
          },
      });

      if (!media?.url) {
        throw new Error("The AI model did not return an image. Please try again.");
      }

      return {
        generatedImage: media.url,
      };
    }
  }
);
