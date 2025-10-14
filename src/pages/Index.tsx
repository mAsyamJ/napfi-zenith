import { AppSidebar } from "@/components/AppSidebar";
import { Header } from "@/components/Dashboard/Header";
import { PortfolioStats } from "@/components/Dashboard/PortfolioStats";
import { PerformanceChart } from "@/components/Dashboard/PerformanceChart";
import { AllocationChart } from "@/components/Dashboard/AllocationChart";
import { VaultsExplorer } from "@/components/Dashboard/VaultsExplorer";
import { DexAggregator } from "@/components/Dashboard/DexAggregator";
import { ActivityLog } from "@/components/Dashboard/ActivityLog";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <AppSidebar />
      
      <main className="flex-1 lg:ml-64 transition-all duration-300">
        <div className="p-4 md:p-6 lg:p-8">
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
      </main>
    </div>
  );
};

export default Index;
