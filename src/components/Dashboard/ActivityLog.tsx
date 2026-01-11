import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock } from "lucide-react";

const activities = [
  {
    id: 1,
    type: "Deposit",
    amount: "2.5 ETH",
    vault: "stETH EigenLayer Vault",
    date: "2025-10-13 14:32",
    status: "completed",
  },
  {
    id: 2,
    type: "Swap",
    amount: "500 USDC → 0.18 ETH",
    vault: "DEX Aggregator",
    date: "2025-10-13 12:15",
    status: "completed",
  },
  {
    id: 3,
    type: "Withdraw",
    amount: "1.2 ETH",
    vault: "DAI-ETH LP Vault",
    date: "2025-10-13 09:47",
    status: "pending",
  },
  {
    id: 4,
    type: "Deposit",
    amount: "10,000 USDC",
    vault: "USDC Lending Vault",
    date: "2025-10-12 18:22",
    status: "completed",
  },
];

export const ActivityLog = () => {
  return (
    <Card className="bg-card border-border hover:border-primary/50 transition-all duration-300 shadow-lg">
      <CardHeader>
        <h2 className="text-xl font-bold">Recent Activity</h2>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between p-4 bg-background rounded-xl hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20">
                  {activity.status === "completed" ? (
                    <CheckCircle2 className="h-5 w-5 text-success" />
                  ) : (
                    <Clock className="h-5 w-5 text-warning" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">{activity.type}</p>
                    <Badge
                      variant="outline"
                      className={
                        activity.status === "completed"
                          ? "bg-success/20 text-success border-0"
                          : "bg-warning/20 text-warning border-0"
                      }
                    >
                      {activity.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{activity.vault}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">{activity.amount}</p>
                <p className="text-xs text-muted-foreground">{activity.date}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
