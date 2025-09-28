"use server";

import { generatePersonalizedFeedback } from "@/ai/flows/generate-personalized-feedback";
import { simulateEnneagramInteraction } from "@/ai/flows/simulate-enneagram-interaction";

type SimulationState = {
  interactionDescription?: string;
  error?: string;
};

export async function handleSimulation(
  prevState: SimulationState,
  formData: FormData
): Promise<SimulationState> {
  try {
    const type1 = formData.get("type1") as string;
    const type2 = formData.get("type2") as string;
    const situation = formData.get("situation") as string;

    if (!type1 || !type2 || !situation) {
      return { error: "All fields are required for the simulation." };
    }

    const result = await simulateEnneagramInteraction({ type1, type2, situation });
    return { interactionDescription: result.interactionDescription };
  } catch (error) {
    console.error(error);
    return { error: "Failed to run simulation. Please try again." };
  }
}

type FeedbackState = {
  feedback?: string;
  recommendations?: string;
  error?: string;
};

export async function handleFeedback(
  prevState: FeedbackState,
  formData: FormData
): Promise<FeedbackState> {
    try {
        const simulationOutcome = formData.get("simulationOutcome") as string;
        const enneagramType = formData.get("enneagramType") as string;
        const userGoals = formData.get("userGoals") as string;

        if (!simulationOutcome || !enneagramType) {
            return { error: "Missing required information for feedback." };
        }

        const result = await generatePersonalizedFeedback({
            simulationOutcome,
            enneagramType,
            userGoals,
        });

        return { feedback: result.feedback, recommendations: result.recommendations };

    } catch (error) {
        console.error(error);
        return { error: "Failed to generate feedback. Please try again." };
    }
}
