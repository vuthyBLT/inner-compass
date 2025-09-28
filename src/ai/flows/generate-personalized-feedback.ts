// This file is machine-generated - edit at your own risk!

'use server';

/**
 * @fileOverview Generates tailored feedback and recommendations based on the user's Enneagram type and simulation outcomes.
 *
 * - generatePersonalizedFeedback - A function that handles the generation of personalized feedback.
 * - GeneratePersonalizedFeedbackInput - The input type for the generatePersonalizedFeedback function.
 * - GeneratePersonalizedFeedbackOutput - The return type for the generatePersonalizedFeedback function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePersonalizedFeedbackInputSchema = z.object({
  enneagramType: z
    .string()
    .describe("The user's Enneagram type (e.g., 'Type 1', 'Type 2')."),
  simulationOutcome: z
    .string()
    .describe("A description of the outcome of the interaction simulation."),
  userGoals: z
    .string()
    .describe("A brief description of the user's goals or areas of interest."),
});
export type GeneratePersonalizedFeedbackInput = z.infer<
  typeof GeneratePersonalizedFeedbackInputSchema
>;

const GeneratePersonalizedFeedbackOutputSchema = z.object({
  feedback: z.string().describe('The generated personalized feedback.'),
  recommendations: z.string().describe('Personalized recommendations.'),
});
export type GeneratePersonalizedFeedbackOutput = z.infer<
  typeof GeneratePersonalizedFeedbackOutputSchema
>;

export async function generatePersonalizedFeedback(
  input: GeneratePersonalizedFeedbackInput
): Promise<GeneratePersonalizedFeedbackOutput> {
  return generatePersonalizedFeedbackFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePersonalizedFeedbackPrompt',
  input: {schema: GeneratePersonalizedFeedbackInputSchema},
  output: {schema: GeneratePersonalizedFeedbackOutputSchema},
  prompt: `You are an AI assistant specializing in providing personalized feedback based on Enneagram types and interaction simulation outcomes.

You will use the provided Enneagram type, simulation outcome, and user goals to generate feedback and recommendations that are tailored to the user's specific situation.

Enneagram Type: {{{enneagramType}}}
Simulation Outcome: {{{simulationOutcome}}}
User Goals: {{{userGoals}}}

Generate the feedback to improve self-awareness and interpersonal skills, and provide tailored recommendations. Focus on actionable insights and practical advice.
`,
});

const generatePersonalizedFeedbackFlow = ai.defineFlow(
  {
    name: 'generatePersonalizedFeedbackFlow',
    inputSchema: GeneratePersonalizedFeedbackInputSchema,
    outputSchema: GeneratePersonalizedFeedbackOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
