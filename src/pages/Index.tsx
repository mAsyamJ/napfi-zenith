import { Header } from "@/components/Dashboard/Header";
import { PortfolioStats } from "@/components/Dashboard/PortfolioStats";
import { PerformanceChart } from "@/components/Dashboard/PerformanceChart";
import { AllocationChart } from "@/components/Dashboard/AllocationChart";
import { VaultsExplorer } from "@/components/Dashboard/VaultsExplorer";
import { DexAggregator } from "@/components/Dashboard/DexAggregator";
import { ActivityLog } from "@/components/Dashboard/ActivityLog";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-6 lg:p-8">
      <Header />
      <PortfolioStats />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <PerformanceChart />
        <AllocationChart />
      </div>

      <VaultsExplorer />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DexAggregator />
        <ActivityLog />
      </div>
    </div>
  );
};

export default Index;
