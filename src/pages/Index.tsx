import { cn } from "@/lib/utils";
import { AppLayout } from "@/components/AppLayout";
import { Header } from "@/components/Dashboard/Header";
import { PortfolioStats } from "@/components/Dashboard/PortfolioStats";
import { PerformanceChart } from "@/components/Dashboard/PerformanceChart";
import { AllocationChart } from "@/components/Dashboard/AllocationChart";
import { VaultsExplorer } from "@/components/Dashboard/VaultsExplorer";
import { DexAggregator } from "@/components/Dashboard/DexAggregator";
import { ActivityLog } from "@/components/Dashboard/ActivityLog";

const Index = () => {
  return (
    <AppLayout>
      <div>
        <div className={cn(
        "mx-auto max-w-7xl transition-all duration-300",
        "px-4 md:px-6 lg:px-8"
      )}>
          <Header />
          <PortfolioStats />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <PerformanceChart />
            <AllocationChart />
          </div>

          <VaultsExplorer />

          {/* DexAggregator and ActivityLog removed as requested */}
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
