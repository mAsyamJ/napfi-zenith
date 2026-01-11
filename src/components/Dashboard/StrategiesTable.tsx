import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, ExternalLink, Code, ArrowUpRight, ArrowDownRight,
  TrendingUp, Sparkles, Wallet, Pause, ChevronDown
} from "lucide-react";
import { Strategy, mockStrategies } from "@/data/mockStrategies";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

type FilterType = "all" | "active" | "inactive";
type SortField = "allocation" | "apy" | "risk";

const COLORS = ['hsl(217, 91%, 60%)', 'hsl(271, 81%, 66%)', 'hsl(142, 71%, 45%)', 'hsl(0, 84%, 60%)'];

const getIcon = (iconName: string) => {
  switch (iconName) {
    case "sparkles": return <Sparkles className="h-5 w-5" />;
    case "trending-up": return <TrendingUp className="h-5 w-5" />;
    case "wallet": return <Wallet className="h-5 w-5" />;
    case "pause": return <Pause className="h-5 w-5" />;
    default: return <Sparkles className="h-5 w-5" />;
  }
};

export const StrategiesTable = () => {
  const [expandedStrategy, setExpandedStrategy] = useState<string | null>("1");
  const [filter, setFilter] = useState<FilterType>("active");
  const [sortField] = useState<SortField>("allocation");
  const [lastUpdated] = useState("13 min ago");

  const filteredStrategies = mockStrategies
    .filter(strategy => {
      if (filter === "all") return true;
      return strategy.status === filter;
    })
    .sort((a, b) => {
      if (sortField === "allocation") return b.allocation - a.allocation;
      if (sortField === "apy") return b.apy - a.apy;
      return 0;
    });

  const activeStrategies = mockStrategies.filter(s => s.status === "active");
  const totalTVL = 87200000; // Mock total TVL $87.2M

  const pieData = activeStrategies.map(strategy => ({
    name: strategy.name.split(" ")[0],
    value: strategy.allocation,
    amount: (totalTVL * strategy.allocation / 100).toFixed(1)
  }));

  const toggleStrategy = (id: string) => {
    setExpandedStrategy(expandedStrategy === id ? null : id);
  };

  const strategyChartOptions: ApexOptions = {
    chart: {
      toolbar: { show: false },
      zoom: { enabled: false },
      background: 'transparent',
      sparkline: { enabled: false }
    },
    colors: ['hsl(217, 91%, 60%)'],
    stroke: { curve: 'smooth', width: 2 },
    grid: { 
      borderColor: 'hsl(240, 10%, 15%)',
      strokeDashArray: 4,
      padding: { left: 10, right: 10 }
    },
    xaxis: {
      categories: ['Apr 13', 'Apr 14', 'Apr 15', 'Apr 16', 'Apr 17', 'Apr 18', 'Apr 19'],
      labels: { style: { colors: '#666', fontSize: '10px' } },
      axisBorder: { show: false },
      axisTicks: { show: false }
    },
    yaxis: {
      labels: { style: { colors: '#666', fontSize: '10px' } }
    },
    tooltip: { 
      theme: 'dark',
      y: { formatter: (val) => `${val.toFixed(2)}%` }
    },
    dataLabels: { enabled: false }
  };

  return (
    <Card className="bg-card border-border shadow-sm">
      <CardHeader>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-xl font-bold mb-1">Active Strategies</h2>
            <p className="text-xs text-muted-foreground">Updated {lastUpdated}</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <div className="flex gap-1 bg-muted rounded-lg p-1">
              {(["active", "inactive", "all"] as FilterType[]).map((f) => (
                <Button
                  key={f}
                  variant="ghost"
                  size="sm"
                  onClick={() => setFilter(f)}
                  className={`h-7 px-3 text-xs capitalize ${
                    filter === f ? "bg-primary/20 text-primary" : "text-muted-foreground"
                  }`}
                >
                  {f}
                </Button>
              ))}
            </div>
            <Button variant="outline" size="sm">
              <Clock className="h-4 w-4 mr-1" />
              History
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Table Section */}
          <div className="lg:col-span-3 space-y-3">
            {/* Table Header */}
            <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-2 text-xs font-medium text-muted-foreground border-b border-border">
              <div className="col-span-5">Strategy</div>
              <div className="col-span-2 text-right">Allocation %</div>
              <div className="col-span-2 text-right">Allocation $</div>
              <div className="col-span-2 text-right">APY</div>
              <div className="col-span-1 text-center">Status</div>
            </div>

            {/* Strategy Rows */}
            {filteredStrategies.map((strategy, index) => (
              <div
                key={strategy.id}
                className={`rounded-xl border transition-all duration-300 ${
                  strategy.status === "active"
                    ? "border-primary/30 bg-gradient-to-r from-primary/5 to-transparent hover:border-primary/50"
                    : "border-border bg-muted/30 opacity-60"
                } ${expandedStrategy === strategy.id ? "shadow-lg shadow-primary/20" : ""}`}
              >
                {/* Collapsed Row */}
                <div
                  onClick={() => toggleStrategy(strategy.id)}
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 cursor-pointer hover:bg-muted/20 transition-colors rounded-t-xl"
                >
                  <div className="md:col-span-5 flex items-center gap-3">
                    <div className={`p-2 rounded-full ${
                      strategy.status === "active" 
                        ? "bg-primary/20" 
                        : "bg-muted"
                    }`}>
                      <div className={strategy.status === "active" ? "text-primary" : "text-muted-foreground"}>
                        {getIcon(strategy.icon)}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate">{strategy.name}</h3>
                      <p className="text-xs text-muted-foreground truncate">{strategy.description}</p>
                    </div>
                  </div>
                  <div className="md:col-span-2 flex md:justify-end items-center">
                    <div>
                      <p className="font-bold text-lg">{strategy.allocation}%</p>
                      <p className="text-xs text-muted-foreground md:hidden">Allocation</p>
                    </div>
                  </div>
                  <div className="md:col-span-2 flex md:justify-end items-center">
                    <div>
                      <p className="font-medium">${(totalTVL * strategy.allocation / 100 / 1000000).toFixed(1)}M</p>
                      <p className="text-xs text-muted-foreground md:hidden">Amount</p>
                    </div>
                  </div>
                  <div className="md:col-span-2 flex md:justify-end items-center">
                    <div>
                      <p className="font-medium">{strategy.apy.toFixed(1)}%</p>
                      <p className="text-xs text-muted-foreground md:hidden">APY</p>
                    </div>
                  </div>
                  <div className="md:col-span-1 flex items-center md:justify-center">
                    <Badge 
                      className={strategy.status === "active" 
                        ? "bg-success/20 text-success border-success/50" 
                        : "bg-muted text-muted-foreground border-border"
                      }
                    >
                      <span className="mr-1">{strategy.status === "active" ? "🟢" : "⚪"}</span>
                      {strategy.status}
                    </Badge>
                  </div>
                  <ChevronDown 
                    className={`h-5 w-5 text-muted-foreground absolute right-4 top-5 transition-transform duration-300 ${
                      expandedStrategy === strategy.id ? "rotate-180" : ""
                    }`}
                  />
                </div>

                {/* Expanded Details */}
                {expandedStrategy === strategy.id && (
                  <div className="border-t border-border p-4 bg-card/50 rounded-b-xl animate-fade-in">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                      {/* Strategy Details */}
                      <div className="bg-muted/50 p-4 rounded-lg border border-border">
                        <h4 className="text-sm font-semibold mb-3 flex items-center">
                          <Code className="h-4 w-4 mr-2 text-primary" />
                          Strategy Details
                        </h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Risk Score</span>
                            <div className="flex items-center gap-2">
                              <span className="capitalize font-medium">{strategy.riskScore}</span>
                              <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                                <div 
                                  className={`h-full rounded-full transition-all ${
                                    strategy.riskScore === "low" ? "bg-success w-1/3" :
                                    strategy.riskScore === "medium" ? "bg-warning w-2/3" :
                                    "bg-destructive w-full"
                                  }`}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Management Fee</span>
                            <span className="font-medium">{strategy.managementFee}%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Performance Fee</span>
                            <span className="font-medium">{strategy.performanceFee}%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Last Report</span>
                            <span className="font-medium">{strategy.lastReport}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Rewards</span>
                            <div className="flex gap-1">
                              {strategy.rewards.map((reward, i) => (
                                <Badge key={i} variant="secondary" className="text-xs">
                                  {reward}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Contract</span>
                            <code className="text-xs bg-muted px-2 py-1 rounded">
                              {strategy.contractAddress}
                            </code>
                          </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-border space-y-2">
                          <a 
                            href={strategy.etherscanUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary text-xs flex items-center hover:underline"
                          >
                            <ExternalLink className="h-3 w-3 mr-1" />
                            View on Etherscan
                          </a>
                          <a 
                            href="#" 
                            className="text-primary text-xs flex items-center hover:underline"
                          >
                            <Code className="h-3 w-3 mr-1" />
                            Strategy Contract
                          </a>
                        </div>
                      </div>

                      {/* Performance Metrics */}
                      <div className="lg:col-span-2 bg-muted/50 p-4 rounded-lg border border-border">
                        <h4 className="text-sm font-semibold mb-3 flex items-center">
                          <TrendingUp className="h-4 w-4 mr-2 text-primary" />
                          Performance Metrics
                        </h4>
                        <div className="grid grid-cols-3 gap-3 mb-4">
                          <div className="bg-card p-3 rounded-lg border border-border">
                            <p className="text-xs text-muted-foreground mb-1">Daily APY</p>
                            <p className="text-base font-bold">{strategy.dailyApy.toFixed(1)}%</p>
                            <p className={`text-xs flex items-center mt-1 ${
                              strategy.dailyChange >= 0 ? "text-success" : "text-destructive"
                            }`}>
                              {strategy.dailyChange >= 0 ? (
                                <ArrowUpRight className="h-3 w-3 mr-0.5" />
                              ) : (
                                <ArrowDownRight className="h-3 w-3 mr-0.5" />
                              )}
                              {strategy.dailyChange >= 0 ? "+" : ""}{strategy.dailyChange}% (24h)
                            </p>
                          </div>
                          <div className="bg-card p-3 rounded-lg border border-border">
                            <p className="text-xs text-muted-foreground mb-1">Weekly APY</p>
                            <p className="text-base font-bold">{strategy.weeklyApy.toFixed(1)}%</p>
                            <p className={`text-xs flex items-center mt-1 ${
                              strategy.weeklyChange >= 0 ? "text-success" : "text-destructive"
                            }`}>
                              {strategy.weeklyChange >= 0 ? (
                                <ArrowUpRight className="h-3 w-3 mr-0.5" />
                              ) : (
                                <ArrowDownRight className="h-3 w-3 mr-0.5" />
                              )}
                              {strategy.weeklyChange >= 0 ? "+" : ""}{strategy.weeklyChange}% (7d)
                            </p>
                          </div>
                          <div className="bg-card p-3 rounded-lg border border-border">
                            <p className="text-xs text-muted-foreground mb-1">Monthly APY</p>
                            <p className="text-base font-bold">{strategy.monthlyApy.toFixed(1)}%</p>
                            <p className={`text-xs flex items-center mt-1 ${
                              strategy.monthlyChange >= 0 ? "text-success" : "text-destructive"
                            }`}>
                              {strategy.monthlyChange >= 0 ? (
                                <ArrowUpRight className="h-3 w-3 mr-0.5" />
                              ) : (
                                <ArrowDownRight className="h-3 w-3 mr-0.5" />
                              )}
                              {strategy.monthlyChange >= 0 ? "+" : ""}{strategy.monthlyChange}% (30d)
                            </p>
                          </div>
                        </div>

                        <div className="bg-card rounded-lg p-3 border border-border">
                          <div className="flex justify-between items-center mb-2">
                            <h5 className="text-xs font-medium">Historical Performance (7D)</h5>
                          </div>
                          <div className="h-[160px]">
                            <Chart
                              type="line"
                              height="100%"
                              width="100%"
                              series={[
                                {
                                  name: "APY",
                                  data: strategy.performanceData
                                }
                              ]}
                              options={strategyChartOptions}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Donut Chart Section */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-primary/10 to-purple-500/10 p-4 rounded-xl border border-primary/20 sticky top-4">
              <h3 className="text-sm font-semibold mb-3">Allocation Distribution</h3>
              <div className="h-[200px] flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-card border border-border rounded-lg p-2 shadow-lg">
                              <p className="text-xs font-medium">{payload[0].name}</p>
                              <p className="text-xs text-muted-foreground">
                                {payload[0].value}% (${payload[0].payload.amount}M)
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 mt-4">
                {pieData.map((entry, index) => (
                  <div key={entry.name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-sm" 
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span className="text-muted-foreground">{entry.name}</span>
                    </div>
                    <span className="font-medium">{entry.value}%</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-border/50">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Total Allocated</span>
                  <span className="font-bold">100%</span>
                </div>
                <div className="flex justify-between text-xs mt-1">
                  <span className="text-muted-foreground">Total Value</span>
                  <span className="font-bold">${(totalTVL / 1000000).toFixed(1)}M</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
