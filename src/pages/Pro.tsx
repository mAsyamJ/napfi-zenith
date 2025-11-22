import { TopNav } from "@/components/TopNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Pro = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopNav />
      
      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Pro Trading</h1>
          <p className="text-muted-foreground">Advanced trading features coming soon</p>
        </div>

        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Pro Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-bold mb-2">Advanced Order Types</h3>
                <p className="text-sm text-muted-foreground">Limit orders, stop-loss, and more</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-bold mb-2">Market Analysis</h3>
                <p className="text-sm text-muted-foreground">Real-time charts and indicators</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-bold mb-2">Trading Bots</h3>
                <p className="text-sm text-muted-foreground">Automated trading strategies</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Pro;
