import { TrendingUp, Percent, PiggyBank, DollarSign, Activity } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const stats = [
  {
    title: "Total Portfolio Value",
    value: "$142,568",
    subValue: "47.89 ETH",
    change: "+12.4%",
    changeType: "positive" as const,
    icon: DollarSign,
  },
  {
    title: "Yield Generated",
    value: "$3,428",
    subValue: "+$324 (24h)",
    icon: TrendingUp,
    changeType: "positive" as const,
  },
  {
    title: "Average APY",
    value: "8.72%",
    subValue: "+0.4%",
    icon: Percent,
    changeType: "positive" as const,
  },
  {
    title: "Gas Saved",
    value: "$429",
    subValue: "1.43 ETH",
    icon: PiggyBank,
  },
  {
    title: "Total dApp TVL",
    value: "$48.2M",
    subValue: "+2.3% (24h)",
    icon: Activity,
    changeType: "positive" as const,
  },
];

export const PortfolioStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card 
            key={index}
            className="bg-card border-border hover:border-primary/50 transition-all duration-300 shadow-sm group"
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-muted-foreground text-xs font-medium uppercase tracking-wide">{stat.title}</h3>
                {Icon && (
                  <Icon className="h-4 w-4 text-primary group-hover:text-secondary transition-colors" />
                )}
              </div>
              <div className="space-y-1">
                <p className="text-xl font-bold group-hover:text-primary transition-colors">
                  {stat.value}
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-xs text-muted-foreground">
                    {stat.subValue}
                  </p>
                  {stat.change && stat.changeType === "positive" && (
                    <span className="text-xs bg-success/20 text-success px-1.5 py-0.5 rounded">
                      {stat.change}
                    </span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
