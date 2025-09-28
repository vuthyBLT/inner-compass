import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Library } from "lucide-react";

export default function DeepDivePage() {
  return (
    <div className="container mx-auto max-w-2xl py-8 px-4">
      <Card>
        <CardHeader className="text-center">
           <div className="flex justify-center items-center mb-4">
            <Library className="w-12 h-12 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold">Deep Dive</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground">
            This feature is coming soon! Prepare for an extensive questionnaire to receive a detailed personality report.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
