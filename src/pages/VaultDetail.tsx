import { useParams, Navigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { 
  Heart, Share2, Info, TrendingUp, ArrowUpRight, 
  RefreshCw, Settings, ChevronDown, Wallet, Bell
} from "lucide-react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useState } from "react";
import mockVaults from "@/data/mockVaults.json";
import { StrategiesTable } from "@/components/Dashboard/StrategiesTable";
import { AppLayout } from "@/components/AppLayout";

const VaultDetail = () => {
  const { id } = useParams();
  const vault = mockVaults.find(v => v.id === id);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [depositTab, setDepositTab] = useState<"deposit" | "withdraw">("deposit");
  const [timeframe, setTimeframe] = useState<"1D" | "1W" | "1M" | "ALL">("1D");
  const [strategyTimeframe, setStrategyTimeframe] = useState<"7D" | "30D" | "90D">("7D");

  if (!vault) {
    return <Navigate to="/" replace />;
  }

  const performanceData = [
    { name: "APY", data: [12, 14, 16, 19, 17, 18.5, 18.2, vault.apy] },
    { name: "TVL", data: [1.8, 1.9, 2.1, 2.3, 2.4, 2.45, 2.48, vault.tvl / 1000000] }
  ];

  const chartOptions: ApexOptions = {
    chart: {
      toolbar: { show: false },
      zoom: { enabled: false },
      background: 'transparent',
      foreColor: '#999',
    },
    colors: ['hsl(217, 91%, 60%)', 'hsl(271, 81%, 66%)'],
    stroke: { curve: 'smooth', width: 2 },
    grid: { 
      borderColor: 'hsl(240, 10%, 15%)',
      strokeDashArray: 4,
    },
    xaxis: {
      categories: ['Mar 1', 'Mar 8', 'Mar 15', 'Mar 22', 'Mar 29', 'Apr 5', 'Apr 12', 'Apr 19'],
      labels: { style: { colors: '#666', fontSize: '11px' } },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: [
      {
        title: { text: 'APY (%)', style: { color: '#666' } },
        labels: { style: { colors: '#666' } }
      },
      {
        opposite: true,
        title: { text: 'TVL (M$)', style: { color: '#666' } },
        labels: { style: { colors: '#666' } }
      }
    ],
    tooltip: { theme: 'dark' },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.5,
        opacityTo: 0.1,
        stops: [0, 100]
      }
    },
    dataLabels: { enabled: false }
  };

  const strategyChartOptions: ApexOptions = {
    chart: {
      toolbar: { show: false },
      zoom: { enabled: false },
      background: 'transparent',
    },
    colors: ['hsl(217, 91%, 60%)'],
    stroke: { curve: 'smooth', width: 2 },
    grid: { borderColor: 'hsl(240, 10%, 15%)', strokeDashArray: 4 },
    xaxis: {
      categories: ['Apr 13', 'Apr 14', 'Apr 15', 'Apr 16', 'Apr 17', 'Apr 18', 'Apr 19'],
      labels: { show: false },
    },
    yaxis: {
      labels: { style: { colors: '#666', fontSize: '10px' } }
    },
    tooltip: { theme: 'dark' },
    dataLabels: { enabled: false }
  };
  return (
    <AppLayout className="px-12 md:px-16 lg:px-24">
      <div>
        <div>
          {/* Breadcrumb */}
          <div className="text-sm text-muted-foreground mb-4">
            <a href="/" className="hover:text-primary transition-colors">Dashboard</a>
            <span className="mx-2">›</span>
            <a href="/#vaults" className="hover:text-primary transition-colors">Vaults</a>
            <span className="mx-2">›</span>
            <span className="text-foreground">{vault.name} Vault</span>
          </div>

          {/* Vault Overview */}
          <Card className="bg-card border-border mb-6 shadow-sm">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Section - Details & Chart */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-2xl font-bold">{vault.name} Vault</h1>
                        <Badge variant="secondary" className="bg-primary/20 text-primary">
                          {vault.platform}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground text-sm">{vault.description}</p>
                    </div>
                    <div className="flex gap-2 mt-4 md:mt-0">
                      <Button variant="ghost" size="icon" className="hover:text-primary">
                        <Heart className="h-5 w-5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="hover:text-primary">
                        <Share2 className="h-5 w-5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="hover:text-primary">
                        <Info className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-muted/50 p-4 rounded-lg border border-border">
                      <p className="text-muted-foreground text-xs mb-1">TVL</p>
                      <p className="text-xl font-bold">${(vault.tvl / 1000000).toFixed(2)}M</p>
                      <p className="text-success text-xs flex items-center mt-1">
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                        +2.4% (24h)
                      </p>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg border border-border">
                      <p className="text-muted-foreground text-xs mb-1">APY</p>
                      <p className="text-xl font-bold">{vault.apy}%</p>
                      <p className="text-primary text-xs flex items-center mt-1">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        Compound daily
                      </p>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg border border-border">
                      <p className="text-muted-foreground text-xs mb-1">Your Position</p>
                      <p className="text-xl font-bold">${vault.deposited.toFixed(2)}</p>
                      <p className="text-muted-foreground text-xs mt-1">{vault.wallet} LP Tokens</p>
                    </div>
                  </div>

                  {/* Performance Chart */}
                  <div className="bg-muted/30 rounded-lg p-4 border border-border">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium">Performance</h3>
                      <div className="flex gap-2">
                        {(["1D", "1W", "1M", "ALL"] as const).map((tf) => (
                          <Button
                            key={tf}
                            variant="ghost"
                            size="sm"
                            onClick={() => setTimeframe(tf)}
                            className={`h-7 px-2 text-xs ${
                              timeframe === tf 
                                ? "bg-primary/20 text-primary" 
                                : "text-muted-foreground"
                            }`}
                          >
                            {tf}
                          </Button>
                        ))}
                      </div>
                    </div>
                    <div className="h-[300px]">
                      <Chart
                        type="area"
                        height="100%"
                        width="100%"
                        series={performanceData}
                        options={chartOptions}
                      />
                    </div>
                  </div>
                </div>

                {/* Right Section - Deposit/Withdraw */}
                <div className="lg:col-span-1">
                  <div className="bg-muted/50 rounded-lg p-4 border border-border sticky top-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium">Deposit / Withdraw</h3>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {/* Tab Buttons */}
                      <div className="flex gap-2">
                        <Button
                          onClick={() => setDepositTab("deposit")}
                          className={`flex-1 h-9 ${
                            depositTab === "deposit"
                              ? "bg-primary hover:bg-primary/90"
                              : "bg-muted hover:bg-muted/80"
                          }`}
                        >
                          Deposit
                        </Button>
                        <Button
                          onClick={() => setDepositTab("withdraw")}
                          className={`flex-1 h-9 ${
                            depositTab === "withdraw"
                              ? "bg-primary hover:bg-primary/90"
                              : "bg-muted hover:bg-muted/80"
                          }`}
                        >
                          Withdraw
                        </Button>
                      </div>

                      {/* Input Section */}
                      <div className="bg-card rounded-lg p-3 border border-border">
                        <div className="flex justify-between text-xs text-muted-foreground mb-2">
                          <span>Input</span>
                          <span>Balance: {vault.wallet}</span>
                        </div>
                        <div className="flex gap-2">
                          <Input
                            type="text"
                            placeholder="0.0"
                            className="flex-1 bg-muted border-border"
                          />
                          <Button size="sm" variant="secondary">MAX</Button>
                        </div>
                      </div>

                      {/* Token Selector */}
                      <div className="bg-card rounded-lg p-3 border border-border">
                        <p className="text-xs text-muted-foreground mb-2">Token</p>
                        <Button variant="outline" className="w-full justify-between">
                          <span className="flex items-center gap-2">
                            <span className="font-medium">{vault.name} LP</span>
                          </span>
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Connect Button */}
                      <Button className="w-full bg-muted text-muted-foreground hover:bg-muted/80">
                        Connect wallet to deposit
                      </Button>

                      <Separator />

                      {/* Transaction Settings */}
                      <div>
                        <h4 className="text-sm font-medium mb-3">Transaction Settings</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">Slippage Tolerance</span>
                            <span>0.5%</span>
                          </div>
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">Gas Price</span>
                            <span>Auto</span>
                          </div>
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">Zap Mode</span>
                            <Switch />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Active Strategies */}
          <StrategiesTable />

          {/* Bottom Grid - Activity & Notifications */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-12">
            {/* Your Activity */}
            <Card className="bg-card border-border shadow-sm">
              <CardHeader>
                <h2 className="text-xl font-bold">Your Activity</h2>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Wallet className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-4">
                    Connect your wallet to see your transaction history
                  </p>
                  <Button className="bg-primary hover:bg-primary/90">
                    <Wallet className="h-4 w-4 mr-2" />
                    Connect Wallet
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card className="bg-card border-border shadow-sm">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold">Notifications</h2>
                  <Button variant="ghost" size="icon">
                    <Settings className="h-5 w-5" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3 p-3 bg-muted/50 rounded-lg border border-border">
                  <div className="bg-primary/20 p-2 rounded-full h-fit">
                    <RefreshCw className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">Strategy Update</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      {vault.platform} {vault.name} strategy has been optimized.
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">2 hours ago</p>
                  </div>
                </div>

                <div className="flex gap-3 p-3 bg-muted/50 rounded-lg border border-border">
                  <div className="bg-success/20 p-2 rounded-full h-fit">
                    <TrendingUp className="h-4 w-4 text-success" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">APY Increase</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Vault APY increased to {vault.apy}% (+{(vault.apy * 0.05).toFixed(1)}%)
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">5 hours ago</p>
                  </div>
                </div>

                <div className="flex gap-3 p-3 bg-muted/50 rounded-lg border border-border">
                  <div className="bg-warning/20 p-2 rounded-full h-fit">
                    <Bell className="h-4 w-4 text-warning" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">Maintenance Notice</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Scheduled maintenance in 24 hours
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">1 day ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};
export default VaultDetail;
