import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardList } from "lucide-react";

export default function QuickCheckPage() {
  return (
    <div className="container mx-auto max-w-2xl py-8 px-4">
      <Card>
        <CardHeader className="text-center">
          <div className="flex justify-center items-center mb-4">
            <ClipboardList className="w-12 h-12 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold">Quick Check</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground">
            This feature is coming soon! Get ready for a brief questionnaire to get a glimpse of your Enneagram type.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
