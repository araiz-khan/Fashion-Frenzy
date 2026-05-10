
'use server';

/**
 * Rebuilt style assistant flow.
 *
 * Uses deterministic product ranking and optional Gemini text generation if
 * `GOOGLE_API_KEY` or `GEMINI_API_KEY` is available.
 *
 * This avoids runtime dependence on Genkit during normal web requests.
 */

import { z } from 'zod';
import { getAllProductsFromDB } from '@/actions/productActions';
import type { Product } from '@/types';

const GenerateStyleSuggestionsInputSchema = z.object({
  prompt: z
    .string()
    .describe(
      'A text prompt describing the desired style or occasion for the fashion suggestions.'
    ),
});
export type GenerateStyleSuggestionsInput = z.infer<
  typeof GenerateStyleSuggestionsInputSchema
>;

const GenerateStyleSuggestionsOutputSchema = z.object({
  suggestions: z
    .string()
    .describe('Personalized fashion suggestions based on the input prompt.'),
  recommendedProducts: z.array(z.any()).optional().describe('A list of up to 4 recommended products from the store that match the style advice.'),
});
export type GenerateStyleSuggestionsOutput = {
  suggestions: string;
  recommendedProducts?: Product[];
};

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

function extractKeywords(prompt: string): string[] {
  return prompt
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((token) => token.length > 2 && !STOPWORDS.has(token));
}

function scoreProductAgainstKeywords(
  product: Product,
  keywords: string[]
): number {
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
    `Based on your request: "${prompt}"`,
    '',
    '1. Start with one statement piece and keep the rest balanced.',
    '2. Match textures and silhouette before focusing on color details.',
    '3. Use one accent color and repeat it in a second item for cohesion.',
    '4. Prioritize comfort for the occasion so confidence reads naturally.',
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
              'You are a concise fashion stylist for Fashion Frenzy.',
              `User request: ${prompt}`,
              'Recommended store products:',
              catalogSnippet || 'No matching products found.',
              'Respond in under 160 words and keep it practical.',
            ].join('\n'),
          },
        ],
      },
    ],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 300,
    },
  };

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }
  );

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Gemini request failed: ${response.status} ${text}`);
  }

  const json = (await response.json()) as {
    candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
  };

  const text = json.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
  return text || null;
}


export async function generateStyleSuggestions(
  input: GenerateStyleSuggestionsInput
): Promise<GenerateStyleSuggestionsOutput> {
  const parsed = GenerateStyleSuggestionsInputSchema.parse(input);
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
