import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const timeframes = ["1M", "6M", "1Y", "All"];

export const PerformanceChart = () => {
  return (
    <Card className="lg:col-span-2 bg-card border-border hover:border-primary/50 transition-all duration-300 shadow-lg">
      <CardHeader>
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Portfolio Performance</h2>
          <div className="flex bg-background rounded-lg p-1">
            {timeframes.map((tf, idx) => (
              <Button
                key={tf}
                variant={idx === 0 ? "default" : "ghost"}
                size="sm"
                className={idx === 0 ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground"}
              >
                {tf}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full bg-background/50 rounded-xl flex items-center justify-center">
          <div className="w-full h-full relative overflow-hidden rounded-xl">
            <div className="absolute bottom-0 left-0 w-full h-[60%] bg-gradient-to-t from-primary/10 to-transparent"></div>
            <svg viewBox="0 0 500 200" className="w-full h-full">
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(217 91% 60%)" />
                  <stop offset="100%" stopColor="hsl(271 81% 66%)" />
                </linearGradient>
              </defs>
              <path 
                d="M0,150 C100,100 150,50 200,80 C250,110 300,150 350,120 C400,90 450,40 500,60" 
                fill="none" 
                stroke="url(#lineGradient)" 
                strokeWidth="3"
                className="drop-shadow-lg"
              />
              <circle cx="200" cy="80" r="5" fill="hsl(217 91% 60%)" className="glow-blue" />
              <circle cx="350" cy="120" r="5" fill="hsl(217 91% 60%)" className="glow-blue" />
              <circle cx="500" cy="60" r="5" fill="hsl(271 81% 66%)" className="glow-purple" />
            </svg>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-background rounded-xl p-4">
            <p className="text-muted-foreground text-sm mb-1">Current</p>
            <p className="text-xl font-bold">$142,568.32</p>
          </div>
          <div className="bg-background rounded-xl p-4">
            <p className="text-muted-foreground text-sm mb-1">Profit/Loss</p>
            <p className="text-xl font-bold text-success">+$24,317.80</p>
          </div>
          <div className="bg-background rounded-xl p-4">
            <p className="text-muted-foreground text-sm mb-1">ROI</p>
            <p className="text-xl font-bold text-success">+21.4%</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
