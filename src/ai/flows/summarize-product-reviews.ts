// Summarizes product reviews to help users quickly assess product quality.

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeProductReviewsInputSchema = z.object({
  productName: z.string().describe('The name of the product.'),
  reviews: z.array(z.string()).describe('An array of product reviews.'),
});
export type SummarizeProductReviewsInput = z.infer<typeof SummarizeProductReviewsInputSchema>;

const SummarizeProductReviewsOutputSchema = z.object({
  summary: z.string().describe('A summary of the product reviews.'),
});
export type SummarizeProductReviewsOutput = z.infer<typeof SummarizeProductReviewsOutputSchema>;

export async function summarizeProductReviews(
  input: SummarizeProductReviewsInput
): Promise<SummarizeProductReviewsOutput> {
  return summarizeProductReviewsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeProductReviewsPrompt',
  input: {schema: SummarizeProductReviewsInputSchema},
  output: {schema: SummarizeProductReviewsOutputSchema},
  prompt: `Summarize the following product reviews for the product "{{{productName}}}":\n\nReviews:\n{{#each reviews}}- {{{this}}}\n{{/each}}\n\nSummary: `,
});

const summarizeProductReviewsFlow = ai.defineFlow(
  {
    name: 'summarizeProductReviewsFlow',
    inputSchema: SummarizeProductReviewsInputSchema,
    outputSchema: SummarizeProductReviewsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
