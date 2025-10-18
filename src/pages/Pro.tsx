import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Pro = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <AppSidebar />
      
      <main className="flex-1 transition-all duration-300 flex justify-center">
        <div className="w-full max-w-[1600px]">
        {/* Upper Navbar */}
        <div className="sticky top-4 z-40 px-4 md:px-6 mb-6">
          <div className="max-w-md mx-auto bg-card/95 backdrop-blur-md rounded-2xl border border-border shadow-lg">
            <div className="p-2 flex gap-2">
              <button 
                onClick={() => navigate("/swap")}
                className="px-6 py-2.5 font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-xl transition-all"
              >
                Swap
              </button>
              <button className="px-6 py-2.5 font-medium bg-primary text-primary-foreground rounded-xl transition-all">
                Pro
              </button>
              <button 
                onClick={() => navigate("/portfolio")}
                className="px-6 py-2.5 font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-xl transition-all"
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
        </div>
      </main>
    </div>
  );
};

export default Pro;
