// Summarizes product reviews to help users quickly assess product quality.

'use server';

import { z } from 'zod';

const SummarizeProductReviewsInputSchema = z.object({
  productName: z.string().describe('The name of the product.'),
  reviews: z.array(z.string()).describe('An array of product reviews.'),
});
export type SummarizeProductReviewsInput = z.infer<typeof SummarizeProductReviewsInputSchema>;

const SummarizeProductReviewsOutputSchema = z.object({
  summary: z.string().describe('A summary of the product reviews.'),
});
export type SummarizeProductReviewsOutput = z.infer<typeof SummarizeProductReviewsOutputSchema>;

const POSITIVE_WORDS = ['great', 'good', 'love', 'amazing', 'perfect', 'comfortable', 'quality', 'excellent'];
const NEGATIVE_WORDS = ['bad', 'poor', 'hate', 'terrible', 'small', 'large', 'late', 'disappointing'];

async function summarizeWithGemini(productName: string, reviews: string[]): Promise<string | null> {
  const apiKey = process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }

  const body = {
    contents: [
      {
        role: 'user',
        parts: [
          {
            text: [
              `Summarize customer reviews for product: ${productName}`,
              'Keep it short (3-4 sentences). Mention common positives and negatives.',
              ...reviews.map((review, idx) => `${idx + 1}. ${review}`),
            ].join('\n'),
          },
        ],
      },
    ],
    generationConfig: {
      temperature: 0.4,
      maxOutputTokens: 220,
    },
  };

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }
  );

  if (!response.ok) {
    return null;
  }

  const json = (await response.json()) as {
    candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
  };

  return json.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || null;
}

function summarizeFallback(productName: string, reviews: string[]): string {
  if (reviews.length === 0) {
    return `There are no reviews yet for ${productName}.`;
  }

  let positive = 0;
  let negative = 0;

  for (const review of reviews) {
    const lower = review.toLowerCase();
    if (POSITIVE_WORDS.some((word) => lower.includes(word))) {
      positive += 1;
    }
    if (NEGATIVE_WORDS.some((word) => lower.includes(word))) {
      negative += 1;
    }
  }

  const sentiment =
    positive > negative
      ? 'Overall sentiment is mostly positive.'
      : negative > positive
      ? 'Overall sentiment is mixed to negative.'
      : 'Overall sentiment is balanced.';

  return [
    `Customers shared ${reviews.length} review(s) for ${productName}.`,
    sentiment,
    `Positive signal count: ${positive}. Negative signal count: ${negative}.`,
  ].join(' ');
}

export async function summarizeProductReviews(
  input: SummarizeProductReviewsInput
): Promise<SummarizeProductReviewsOutput> {
  const parsed = SummarizeProductReviewsInputSchema.parse(input);
  const geminiSummary = await summarizeWithGemini(parsed.productName, parsed.reviews);
  const summary = geminiSummary || summarizeFallback(parsed.productName, parsed.reviews);
  return SummarizeProductReviewsOutputSchema.parse({ summary });
}
