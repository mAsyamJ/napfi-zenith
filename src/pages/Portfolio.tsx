import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Portfolio = () => {
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
              <button 
                onClick={() => navigate("/pro")}
                className="px-4 py-2 font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Pro
              </button>
              <button className="px-4 py-2 font-medium text-foreground border-b-2 border-primary">
                Portfolio
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 md:p-6 lg:p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Portfolio</h1>
            <p className="text-muted-foreground">Track your assets and performance</p>
          </div>

          <div className="grid gap-6 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Total Portfolio Value</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">$0.00</div>
                <p className="text-sm text-muted-foreground mt-2">Connect wallet to view your portfolio</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your Assets</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  No assets found. Connect your wallet to get started.
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
    </AppLayout>
  );
};

export default Portfolio;
