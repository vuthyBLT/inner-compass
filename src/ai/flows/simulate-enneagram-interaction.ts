// src/ai/flows/simulate-enneagram-interaction.ts
'use server';

/**
 * @fileOverview Simulates interactions between different Enneagram types.
 *
 * - simulateEnneagramInteraction - A function that simulates interactions based on Enneagram types.
 * - SimulateEnneagramInteractionInput - The input type for the simulateEnneagramInteraction function.
 * - SimulateEnneagramInteractionOutput - The return type for the simulateEnneagramInteraction function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SimulateEnneagramInteractionInputSchema = z.object({
  type1: z.string().describe('The Enneagram type of the first person.'),
  type2: z.string().describe('The Enneagram type of the second person.'),
  situation: z.string().describe('The situation in which the interaction takes place.'),
});

export type SimulateEnneagramInteractionInput = z.infer<typeof SimulateEnneagramInteractionInputSchema>;

const SimulateEnneagramInteractionOutputSchema = z.object({
  interactionDescription: z.string().describe('A description of how the interaction would play out between the two Enneagram types in the given situation.'),
});

export type SimulateEnneagramInteractionOutput = z.infer<typeof SimulateEnneagramInteractionOutputSchema>;

export async function simulateEnneagramInteraction(
  input: SimulateEnneagramInteractionInput
): Promise<SimulateEnneagramInteractionOutput> {
  return simulateEnneagramInteractionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'simulateEnneagramInteractionPrompt',
  input: {schema: SimulateEnneagramInteractionInputSchema},
  output: {schema: SimulateEnneagramInteractionOutputSchema},
  prompt: `You are an expert in the Enneagram personality typing system. You understand the nuances of each type, and how they interact in different situations.

You are going to simulate an interaction between two people, each of which have a different Enneagram type.

Enneagram Type 1: {{{type1}}}
Enneagram Type 2: {{{type2}}}
Situation: {{{situation}}}

Describe how this interaction would play out, including potential communication styles, points of agreement, and potential conflicts. Use your expert knowledge of the Enneagram system to make inferences, but avoid making assumptions about the people themselves. Try to describe the interaction in a creative way.
`,
});

const simulateEnneagramInteractionFlow = ai.defineFlow(
  {
    name: 'simulateEnneagramInteractionFlow',
    inputSchema: SimulateEnneagramInteractionInputSchema,
    outputSchema: SimulateEnneagramInteractionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
