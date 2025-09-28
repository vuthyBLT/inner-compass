"use client";

import { useState } from "react";
import { useFormState } from "react-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ENNEAGRAM_TYPES } from "@/lib/constants";
import { handleFeedback, handleSimulation } from "@/lib/actions";
import { Loader2, Sparkles } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Separator } from "../ui/separator";

type SimulationState = {
  interactionDescription?: string;
  error?: string;
};

type FeedbackState = {
  feedback?: string;
  recommendations?: string;
  error?: string;
};

const initialSimulationState: SimulationState = {};
const initialFeedbackState: FeedbackState = {};

export function InteractionSimulator() {
  const { user } = useAuth();
  const [simulationState, formAction] = useFormState(handleSimulation, initialSimulationState);
  const [feedbackState, feedbackFormAction] = useFormState(handleFeedback, initialFeedbackState);
  const [isSimulationLoading, setSimulationLoading] = useState(false);
  const [isFeedbackLoading, setFeedbackLoading] = useState(false);

  const handleSimulationSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSimulationLoading(true);
    const formData = new FormData(event.currentTarget);
    await formAction(formData);
    setSimulationLoading(false);
  };
  
  const handleFeedbackSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFeedbackLoading(true);
    const formData = new FormData(event.currentTarget);
    await feedbackFormAction(formData);
    setFeedbackLoading(false);
  };

  if (!user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Access Denied</CardTitle>
        </CardHeader>
        <CardContent>
          <p>You must be logged in to use the simulator.</p>
        </CardContent>
        <CardFooter>
          <Button asChild>
            <Link href="/login">Log In</Link>
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      <Card>
        <form onSubmit={handleSimulationSubmit}>
          <CardHeader>
            <CardTitle>Create a Scenario</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type1">Person 1: Enneagram Type</Label>
                <Select name="type1" required>
                  <SelectTrigger id="type1">
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent>
                    {ENNEAGRAM_TYPES.map((type) => (
                      <SelectItem key={type.id} value={type.name}>{type.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="type2">Person 2: Enneagram Type</Label>
                <Select name="type2" required>
                  <SelectTrigger id="type2">
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent>
                    {ENNEAGRAM_TYPES.map((type) => (
                      <SelectItem key={type.id} value={type.name}>{type.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="situation">Situation</Label>
              <Textarea
                id="situation"
                name="situation"
                placeholder="e.g., Planning a vacation together, resolving a work conflict, giving feedback..."
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isSimulationLoading}>
              {isSimulationLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Run Simulation
            </Button>
          </CardFooter>
        </form>
      </Card>
      
      {simulationState?.error && (
        <Alert variant="destructive">
          <AlertTitle>Simulation Error</AlertTitle>
          <AlertDescription>{simulationState.error}</AlertDescription>
        </Alert>
      )}

      {simulationState?.interactionDescription && (
        <Card>
            <CardHeader>
              <CardTitle>Simulation Outcome</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="whitespace-pre-wrap">{simulationState.interactionDescription}</p>
            </CardContent>
            <Separator className="my-4" />
            <form onSubmit={handleFeedbackSubmit}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Sparkles className="w-5 h-5 text-accent"/> Get Personalized Feedback</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                  <input type="hidden" name="simulationOutcome" value={simulationState.interactionDescription} />
                  <div className="space-y-2">
                    <Label htmlFor="userEnneagramType">Your Enneagram Type</Label>
                     <Select name="enneagramType" required>
                        <SelectTrigger id="userEnneagramType">
                            <SelectValue placeholder="Select your type" />
                        </SelectTrigger>
                        <SelectContent>
                            {ENNEAGRAM_TYPES.map((type) => (
                            <SelectItem key={type.id} value={type.name}>{type.name}</SelectItem>
                            ))}
                        </SelectContent>
                     </Select>
                  </div>
                   <div className="space-y-2">
                        <Label htmlFor="userGoals">Your Goals</Label>
                        <Textarea id="userGoals" name="userGoals" placeholder="e.g., I want to be a better communicator, I want to understand my partner better..."/>
                   </div>
              </CardContent>
              <CardFooter>
                 <Button type="submit" variant="secondary" disabled={isFeedbackLoading}>
                     {isFeedbackLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                     Generate Feedback
                 </Button>
              </CardFooter>
            </form>
            {feedbackState?.error && (
                <CardContent>
                    <Alert variant="destructive">
                        <AlertTitle>Feedback Error</AlertTitle>
                        <AlertDescription>{feedbackState.error}</AlertDescription>
                    </Alert>
                </CardContent>
            )}
            {feedbackState?.feedback && (
                <CardContent className="space-y-4">
                    <div>
                        <h3 className="font-bold text-lg">Feedback</h3>
                        <p className="whitespace-pre-wrap">{feedbackState.feedback}</p>
                    </div>
                     <div>
                        <h3 className="font-bold text-lg">Recommendations</h3>
                        <p className="whitespace-pre-wrap">{feedbackState.recommendations}</p>
                    </div>
                </CardContent>
            )}
        </Card>
      )}
    </div>
  );
}
