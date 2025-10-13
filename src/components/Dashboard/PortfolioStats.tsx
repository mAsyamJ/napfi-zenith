import { TrendingUp, Percent, PiggyBank } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const stats = [
  {
    title: "Total Portfolio Value",
    value: "$142,568.32",
    subValue: "47.89 ETH",
    change: "+12.4%",
    changeType: "positive" as const,
  },
  {
    title: "Yield Generated",
    value: "$3,427.51",
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
    value: "$429.12",
    subValue: "1.43 ETH",
    icon: PiggyBank,
  },
];

export const PortfolioStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card 
            key={index}
            className="bg-card border-border hover:border-primary/50 transition-all duration-300 shadow-lg group"
          >
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-muted-foreground font-medium">{stat.title}</h3>
                {stat.changeType === "positive" && (
                  <span className="text-xs bg-success/20 text-success px-2 py-0.5 rounded-full">
                    {stat.change}
                  </span>
                )}
                {Icon && (
                  <Icon className="h-5 w-5 text-primary group-hover:text-secondary transition-colors" />
                )}
              </div>
              <div className="flex items-end gap-2">
                <p className="text-3xl font-bold group-hover:text-primary transition-colors">
                  {stat.value}
                </p>
                <p className={`mb-1 ${stat.changeType === 'positive' ? 'text-success' : 'text-muted-foreground'}`}>
                  {stat.subValue}
                </p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
