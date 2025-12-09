import { TopNav } from "@/components/TopNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity } from "lucide-react";

const Events = () => {
  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      <main className="pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Event Explorer</h1>
          <Card className="bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                Recent Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center py-8">
                Connect to a network with deployed contracts to see events
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Events;
