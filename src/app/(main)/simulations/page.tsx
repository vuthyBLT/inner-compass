import { InteractionSimulator } from "@/components/simulations/InteractionSimulator";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot } from "lucide-react";

export default function SimulationsPage() {
  return (
    <div className="container mx-auto max-w-3xl py-8 px-4">
      <Card className="mb-8">
        <CardHeader className="text-center">
          <div className="flex justify-center items-center mb-4">
            <Bot className="w-12 h-12 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold">Interaction Simulator</CardTitle>
          <CardDescription className="max-w-xl mx-auto">
            Choose two Enneagram types and a situation to see how they might interact. Our AI will generate a likely scenario, highlighting communication styles, potential harmonies, and conflicts.
          </CardDescription>
        </CardHeader>
      </Card>

      <InteractionSimulator />
    </div>
  );
}
