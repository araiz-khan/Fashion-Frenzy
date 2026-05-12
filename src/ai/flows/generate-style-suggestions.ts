
'use server';

/**
 * Dress-only style assistant flow.
 *
 * Uses deterministic product ranking and Gemini text generation when
 * `GOOGLE_API_KEY` or `GEMINI_API_KEY` is available.
 */

import { z } from 'zod';
import { getAllProductsFromDB } from '@/actions/productActions';
import type { Product } from '@/types';

const GenerateStyleSuggestionsInputSchema = z.object({
  prompt: z
    .string()
    .describe('A text prompt describing a dress wear request or occasion.'),
});
export type GenerateStyleSuggestionsInput = z.infer<
  typeof GenerateStyleSuggestionsInputSchema
>;

const GenerateStyleSuggestionsOutputSchema = z.object({
  suggestions: z
    .string()
    .describe('Personalized dress wear suggestions based on the input prompt.'),
  recommendedProducts: z.array(z.any()).optional().describe('A list of up to 4 recommended dress products from the store.'),
});
export type GenerateStyleSuggestionsOutput = {
  suggestions: string;
  recommendedProducts?: Product[];
};

const DRESS_CATEGORY: Product['category'] = 'Dresses';
const DRESS_KEYWORDS = [
  'dress',
  'dresses',
  'gown',
  'gowns',
  'maxi dress',
  'mini dress',
  'midi dress',
  'cocktail dress',
  'evening dress',
  'party dress',
  'wedding dress',
  'formal dress',
  'casual dress',
  'summer dress',
  'sundress',
  'frock',
];

const STOPWORDS = new Set([
  'the',
  'and',
  'for',
  'with',
  'that',
  'this',
  'from',
  'into',
  'look',
  'need',
  'want',
  'wear',
  'outfit',
  'style',
  'help',
]);

function normalizeText(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
}

function containsDressKeyword(prompt: string, keyword: string): boolean {
  if (keyword.includes(' ')) {
    return prompt.includes(keyword);
  }

  return new RegExp(`\\b${keyword}\\b`, 'i').test(prompt);
}

function isDressWearPrompt(prompt: string): boolean {
  const normalizedPrompt = normalizeText(prompt);
  return DRESS_KEYWORDS.some((keyword) => containsDressKeyword(normalizedPrompt, keyword));
}

function assertDressWearPrompt(prompt: string): void {
  if (!isDressWearPrompt(prompt)) {
    throw new Error(
      'This assistant only provides dress wear advice. Please ask about dresses, gowns, or dress outfits.'
    );
  }
}

function extractKeywords(prompt: string): string[] {
  return normalizeText(prompt)
    .split(/\s+/)
    .filter((token) => token.length > 2 && !STOPWORDS.has(token));
}

function scoreProductAgainstKeywords(
  product: Product,
  keywords: string[]
): number {
  if (product.category !== DRESS_CATEGORY) {
    return 0;
  }

  const bag = `${product.name} ${product.description} ${product.category}`.toLowerCase();
  let score = 0;
  for (const keyword of keywords) {
    if (bag.includes(keyword)) {
      score += 1;
    }
  }
  return score;
}

function buildFallbackSuggestions(prompt: string): string {
  return [
    `Based on your dress wear request: "${prompt}"`,
    '',
    '1. Choose a dress silhouette that matches the occasion and your comfort level.',
    '2. Keep accessories aligned with the dress length, neckline, and fabric weight.',
    '3. Use one accent color or metallic detail to keep the look polished.',
    '4. Finish with shoes and a bag that support the dress rather than compete with it.',
  ].join('\n');
}

async function generateGeminiText(prompt: string, recommendedProducts: Product[]): Promise<string | null> {
  const apiKey = process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }

  const catalogSnippet = recommendedProducts
    .map((p, index) => `${index + 1}. ${p.name} (${p.category}) - ${p.description}`)
    .join('\n');

  const body = {
    contents: [
      {
        role: 'user',
        parts: [
          {
            text: [
              'You are an expert dress wear stylist for Fashion Frenzy. Your job is to provide COMPLETE, COMPREHENSIVE styling advice.',
              'CRITICAL: Write a FULL, UNINTERRUPTED response. Do NOT cut short. Continue writing until you have covered all points thoroughly.',
              'Only suggest dress wear advice, dress silhouettes, fabrics, colors, and complete dress outfit styling.',
              'Do not recommend tops, pants, accessories by themselves, or any non-dress category.',
              `User request: ${prompt}`,
              'Recommended dress products from the store:',
              catalogSnippet || 'No matching products found.',
              'Provide exhaustive, thorough recommendations covering: silhouette choices for the occasion, specific fabric suggestions with explanations, color palettes and why they work, detailed styling tips, multiple accessorizing ideas, shoe and bag recommendations, layering options, practical outfit assembly tips, and care instructions. Write multiple detailed paragraphs. Write the COMPLETE response with no truncation.',
            ].join('\n'),
          },
        ],
      },
    ],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 4000,
    },
  };

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      const text = await response.text();
      console.error(`Gemini API error: ${response.status} ${text}`);
      return null;
    }

    const json = (await response.json()) as {
      candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
    };

    const text = json.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    console.log('Gemini response length:', text?.length);
    console.log('Gemini response (first 500 chars):', text?.substring(0, 500));
    return text || null;
  } catch (error) {
    console.warn('Gemini request failed:', error);
    return null;
  }
}


export async function generateStyleSuggestions(
  input: GenerateStyleSuggestionsInput
): Promise<GenerateStyleSuggestionsOutput> {
  const parsed = GenerateStyleSuggestionsInputSchema.parse(input);
  assertDressWearPrompt(parsed.prompt);
  const keywords = extractKeywords(parsed.prompt);

  const allProductsResult = await getAllProductsFromDB();
  const products = 'error' in allProductsResult ? [] : allProductsResult;

  const recommendedProducts = products
    .map((product) => ({
      product,
      score: scoreProductAgainstKeywords(product, keywords),
    }))
    .sort((a, b) => b.score - a.score)
    .filter((entry) => entry.score > 0)
    .slice(0, 4)
    .map((entry) => entry.product);

  let suggestions = buildFallbackSuggestions(parsed.prompt);
  try {
    const geminiText = await generateGeminiText(parsed.prompt, recommendedProducts);
    if (geminiText) {
      suggestions = geminiText;
    }
  } catch (error) {
    console.warn('Gemini style assistant failed, using fallback suggestions:', error);
  }

  GenerateStyleSuggestionsOutputSchema.parse({
    suggestions,
    recommendedProducts,
  });

  return {
    suggestions,
    recommendedProducts,
  };
}
