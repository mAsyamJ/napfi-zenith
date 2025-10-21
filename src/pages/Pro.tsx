import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Pro = () => {
  const navigate = useNavigate();

  return (
    <AppLayout>
      {/* Upper Navbar */}
      <div className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur-sm">
        <div className="p-4 md:p-6">
          <div className="flex gap-6">
            <button 
              onClick={() => navigate("/swap")}
              className="px-4 py-2 font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Swap
            </button>
            <button className="px-4 py-2 font-medium text-foreground border-b-2 border-primary">
              Pro
            </button>
            <button 
              onClick={() => navigate("/portfolio")}
              className="px-4 py-2 font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Portfolio
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 md:p-6 lg:p-8">
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
        </div>
    </AppLayout>
  );
};

export default Pro;
