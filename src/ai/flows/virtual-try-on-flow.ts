
'use server';
import type { VirtualTryOnInput, VirtualTryOnOutput } from '@/types';
import { VirtualTryOnInputSchema, VirtualTryOnOutputSchema } from '@/types';
import {
  blobToDataURI,
  callHuggingFaceVTON,
  imageSourceToBuffer,
} from '@/lib/huggingface';


export async function virtualTryOn(
  input: VirtualTryOnInput
): Promise<VirtualTryOnOutput> {
  const parsedInput = VirtualTryOnInputSchema.parse(input);

  try {
    console.log('[VirtualTryOn] Starting VTON flow');

    const personImage = await imageSourceToBuffer(parsedInput.userImage);
    const garmentImage = await imageSourceToBuffer(parsedInput.productImage);

    const resultBuffer = await callHuggingFaceVTON(
      personImage.buffer,
      garmentImage.buffer,
      `${parsedInput.productName} (${parsedInput.productCategory})`,
      parsedInput.productCategory
    );

    const generatedImage = await blobToDataURI(resultBuffer as unknown as Blob);
    const output = { generatedImage };
    return VirtualTryOnOutputSchema.parse(output);
  } catch (error) {
    const details = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Virtual try-on failed: ${details}`);
  }
}
