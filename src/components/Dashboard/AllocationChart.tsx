import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MoreHorizontal } from "lucide-react";

const allocations = [
  { name: "Yield Vaults", value: "$84,320", percentage: "59%", color: "bg-secondary" },
  { name: "DEX Liquidity", value: "$42,770", percentage: "30%", color: "bg-primary" },
  { name: "Token Holdings", value: "$15,478", percentage: "11%", color: "bg-[#ec4899]" },
];

export const AllocationChart = () => {
  return (
    <Card className="bg-card border-border hover:border-primary/50 transition-all duration-300 shadow-lg">
      <CardHeader>
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Allocation</h2>
          <MoreHorizontal className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full bg-background/50 rounded-xl flex items-center justify-center relative mb-6">
          <div className="w-40 h-40 rounded-full border-8 border-secondary relative">
            <div className="absolute inset-0 border-t-8 border-r-8 border-primary rounded-full rotate-45"></div>
            <div className="absolute inset-0 border-t-8 border-[#ec4899] rounded-full rotate-[160deg]"></div>
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <p className="text-2xl font-bold">$142.5k</p>
            <p className="text-sm text-muted-foreground">Total</p>
          </div>
        </div>

        <div className="space-y-3">
          {allocations.map((item) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`h-3 w-3 rounded-full ${item.color}`}></span>
                <span>{item.name}</span>
              </div>
              <div className="text-right">
                <span className="font-bold">{item.value}</span>
                <span className="text-muted-foreground text-sm ml-1">{item.percentage}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
