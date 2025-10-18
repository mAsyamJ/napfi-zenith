import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Portfolio = () => {
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
              <button 
                onClick={() => navigate("/pro")}
                className="px-6 py-2.5 font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-xl transition-all"
              >
                Pro
              </button>
              <button className="px-6 py-2.5 font-medium bg-primary text-primary-foreground rounded-xl transition-all">
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
        </div>
      </main>
    </div>
  );
};

export default Portfolio;
