import React, { useState } from 'react';
import {
  Wallet,
  Layers,
  RefreshCcw,
  Gauge,
  AlertTriangle,
  PieChart,
  BarChart3,
  Settings,
  DollarSign,
  Percent,
  Eye,
  EyeOff,
  Target,
  TrendingUp,
  TrendingDown,
  Activity,
  Clock,
  Zap,
  Sparkles,
  Users,
  Home,
  Command,
  LogOut,
  Filter,
  Search,
  ListChecks,
  Star,
  Info,
  Check,
  Minus,
  ExternalLink,
  FileText,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Components
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

/* -------------------------
   Mock data & helpers
   ------------------------- */
const topStats = [
  {
    title: 'Total Value',
    value: '$124,567.89',
    sub: '+2.34% today',
    icon: Wallet,
    trend: 'up' as const,
    color: 'bg-gradient-to-br from-primary to-primary/80',
  },
  {
    title: 'Concentrated Liquidity',
    value: '$89,123.45',
    sub: 'Active in 5 pools',
    icon: Layers,
    trend: 'neutral' as const,
    color: 'bg-gradient-to-br from-accent to-accent/80',
  },
  {
    title: 'Auto-Rebalance',
    value: 'ACTIVE',
    sub: '47 rebalances',
    icon: RefreshCcw,
    trend: 'up' as const,
    color: 'bg-gradient-to-br from-chart-3 to-chart-3/80',
  },
  {
    title: 'Efficiency Score',
    value: '92%',
    sub: 'High performance',
    icon: Gauge,
    trend: 'up' as const,
    color: 'bg-gradient-to-br from-chart-4 to-chart-4/80',
  },
  {
    title: 'Out of Range',
    value: '2 positions',
    sub: 'Needs attention',
    icon: AlertTriangle,
    trend: 'down' as const,
    color: 'bg-gradient-to-br from-warning to-warning/80',
  },
];

const vaultsData = [
  {
    id: 1,
    name: 'ETH-USDC Vault',
    user: 'Ethereum Mainnet',
    status: 'Active',
    priority: 'High',
    apy: '15.8%',
    tvl: '$2.1M',
    efficiency: '94%',
    bgColor: 'bg-primary/20 text-primary-foreground border border-primary/30',
  },
  {
    id: 2,
    name: 'BTC-ETH Concentrated',
    user: 'Arbitrum',
    status: 'Out of Range',
    priority: 'High',
    apy: '22.3%',
    tvl: '$1.4M',
    efficiency: '76%',
    bgColor:
      'bg-destructive/20 text-destructive-foreground border border-destructive/30',
  },
  {
    id: 3,
    name: 'Stablecoin Pool',
    user: 'Polygon',
    status: 'Optimizing',
    priority: 'Mid',
    apy: '8.5%',
    tvl: '$3.2M',
    efficiency: '89%',
    bgColor: 'bg-accent/20 text-accent-foreground border border-accent/30',
  },
];

const activeStrategies = [
  {
    id: 1,
    name: 'Uniswap V3 DAI/ETH LP',
    type: 'Core Strategy',
    riskScore: 'Medium',
    managementFee: '0%',
    performanceFee: '10%',
    lastReport: '2 days ago',
    rewards: 'DAI',
    contract: '0x1234...5678',
    performance: {
      daily: { apy: '8.3%', change: '+0.3%' },
      weekly: { apy: '7.9%', change: '-0.5%' },
      monthly: { apy: '8.5%', change: '+1.2%' },
    },
  },
];

const overview = {
  totalDeposits: '$124,567.89',
  totalBorrows: '$45,678.90',
  netWorth: '$78,888.99',
  healthFactor: '1.85',
};

const perf = {
  dailyReturn: '+0.25%',
  totalReturn: '+15.60%',
  currentAPR: '12.50%',
  volatility: '8.2%',
  maxDrawdown: '-5.1%',
};

const liquidityData = {
  totalValue: '$89,123.45',
  utilization: 78,
  apr: '12.50%',
  feesEarned: '$1,234.56',
};

const concentratedData = {
  totalValue: '$45,678.90',
  apr: '18.75%',
  efficiency: '94%',
  rangeStatus: 'OUT_OF_RANGE',
  livePrice: '$2,345.67',
  change24h: '+3.2%',
  volume24h: '$12.3M',
  feesEarned: '$567.89',
};

const rebalanceData = {
  status: true,
  totalRebalances: 47,
  recentLogs: [
    { id: 47, action: 'Optimized concentrated position', time: '2h ago' },
    { id: 46, action: 'Widened range', time: '1d ago' },
    { id: 45, action: 'Rebalanced to target ratio', time: '2d ago' },
  ],
};

const analyticsData = {
  riskScore: 75,
  sharpeRatio: 1.8,
  notes:
    'Risk is evaluated on aggregated strategy volatility and concentration.',
};

/* -------------------------
   Small Presentational Components
   ------------------------- */

const StatCard: React.FC<{
  title: string;
  value: string;
  sub?: string;
  icon?: any;
  trend?: 'up' | 'down' | 'neutral';
  color?: string;
}> = ({ title, value, sub, icon: Icon, trend, color = 'bg-card' }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    transition={{ type: 'spring', stiffness: 300 }}
  >
    <Card
      className={`${color} text-card-foreground border-border rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden`}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-muted-foreground font-medium">
            {title}
          </span>
          {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
        </div>
        <div className="text-2xl font-semibold mb-1">{value}</div>
        {sub && (
          <div className="flex items-center text-xs text-muted-foreground mt-1">
            {trend === 'up' && (
              <TrendingUp className="w-3 h-3 text-success mr-1" />
            )}
            {trend === 'down' && (
              <TrendingDown className="w-3 h-3 text-destructive mr-1" />
            )}
            {trend === 'neutral' && (
              <Activity className="w-3 h-3 text-muted-foreground mr-1" />
            )}
            {sub}
          </div>
        )}
      </CardContent>
    </Card>
  </motion.div>
);

const VaultCard: React.FC<{
  name: string;
  user: string;
  status: string;
  priority: string;
  apy: string;
  tvl: string;
  efficiency: string;
  bgColor: string;
}> = ({ name, user, status, priority, apy, tvl, efficiency, bgColor }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className={`rounded-2xl p-3 ${bgColor} transition-all duration-300 cursor-pointer border`}
  >
    <div className="flex items-center gap-3">
      <div className="h-9 w-9 rounded-full bg-primary/20 flex items-center justify-center">
        <Layers className="h-4 w-4 text-primary" />
      </div>
      <div className="flex-1">
        <div className="text-sm font-medium tracking-tight">{name}</div>
        <div className="text-xs text-muted-foreground">{user}</div>
      </div>
      <span
        className={`px-2 py-0.5 rounded-full text-xs ${
          priority === 'High'
            ? 'bg-destructive text-destructive-foreground'
            : priority === 'Mid'
              ? 'bg-warning text-warning-foreground'
              : 'bg-muted text-muted-foreground'
        }`}
      >
        {priority}
      </span>
    </div>
    <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
      <div>
        <div className="text-muted-foreground">APY</div>
        <div className="font-semibold">{apy}</div>
      </div>
      <div>
        <div className="text-muted-foreground">TVL</div>
        <div className="font-semibold">{tvl}</div>
      </div>
      <div>
        <div className="text-muted-foreground">Eff.</div>
        <div className="font-semibold">{efficiency}</div>
      </div>
    </div>
  </motion.div>
);

const MetricCard: React.FC<{
  title: string;
  value: string;
  icon?: any;
  color?: string;
  tooltip?: string;
}> = ({ title, value, icon: Icon, color = 'text-foreground', tooltip }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Card className="bg-card border-border rounded-xl hover:border-primary/50 transition-all duration-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-muted-foreground">{title}</div>
              {Icon && <Icon className="w-4 h-4 text-muted-foreground" />}
            </div>
            <div className={`text-xl font-bold ${color}`}>{value}</div>
          </CardContent>
        </Card>
      </TooltipTrigger>
      {tooltip && <TooltipContent>{tooltip}</TooltipContent>}
    </Tooltip>
  </TooltipProvider>
);

// TopNav Component with red theme
const TopNav: React.FC = () => (
  <nav className="bg-card border-b border-border py-4 px-6">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
          <Sparkles className="h-5 w-5 text-primary-foreground" />
        </div>
        <span className="text-xl font-bold gradient-text">NapaFi</span>
      </div>
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
        >
          Connect Wallet
        </Button>
      </div>
    </div>
  </nav>
);

/* -------------------------
   Main Page Component
   ------------------------- */
const PortfolioDashboard: React.FC = () => {
  const [tab, setTab] = useState<string>('overview');
  const [showSensitiveData, setShowSensitiveData] = useState<boolean>(true);
  const [autoRebalanceActive, setAutoRebalanceActive] = useState<boolean>(true);

  return (
    <div className="w-full min-h-screen bg-background text-foreground font-sans">
      <TopNav />

      {/* Main Dashboard Container */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <aside className="lg:col-span-3 flex flex-col gap-6">
            {/* User Profile Card */}
            <Card className="bg-card border-border rounded-2xl shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <Sparkles className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">0x1a2b...3c4d</div>
                    <div className="text-sm text-muted-foreground">
                      Yield Farmer
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>

                {/* Quick Stats */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Net Worth
                    </span>
                    <span className="font-semibold">
                      {showSensitiveData ? '$78,888.99' : '••••••'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Active Vaults
                    </span>
                    <span className="font-semibold">8</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Avg APY
                    </span>
                    <span className="font-semibold text-success">18.2%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Navigation */}
            <Card className="bg-card border-border rounded-2xl shadow-xl">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Command className="h-4 w-4" />
                  Navigation
                </h3>
                <div className="space-y-2">
                  {[
                    { id: 'overview', label: 'Overview', icon: Home },
                    { id: 'strategies', label: 'Strategies', icon: Target },
                    { id: 'liquidity', label: 'Liquidity', icon: Layers },
                    {
                      id: 'concentrated',
                      label: 'Concentrated',
                      icon: Activity,
                    },
                    {
                      id: 'rebalance',
                      label: 'Auto-Rebalance',
                      icon: RefreshCcw,
                    },
                    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
                    { id: 'settings', label: 'Settings', icon: Settings },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setTab(item.id)}
                      className={`flex items-center gap-3 w-full px-3 py-2 rounded-xl transition-all ${
                        tab === item.id
                          ? 'bg-primary/20 text-primary border border-primary/30'
                          : 'text-muted-foreground hover:text-foreground hover:bg-accent/20'
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                      <span className="text-sm">{item.label}</span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Active Vaults */}
            <Card className="bg-card border-border rounded-2xl shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <ListChecks className="h-4 w-4" />
                    Active Vaults
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-foreground text-xs"
                  >
                    View all
                  </Button>
                </div>
                <div className="space-y-3">
                  {vaultsData.map((vault) => (
                    <VaultCard key={vault.id} {...vault} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-6 flex flex-col gap-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold">Portfolio Dashboard</h1>
                <p className="text-muted-foreground mt-1">
                  Multi-chain Yield Strategy • 8 Active Vaults
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowSensitiveData((s) => !s)}
                  className="flex items-center gap-2 border-border"
                >
                  {showSensitiveData ? (
                    <Eye className="h-4 w-4" />
                  ) : (
                    <EyeOff className="h-4 w-4" />
                  )}
                  {showSensitiveData ? 'Hide Values' : 'Show Values'}
                </Button>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Compound All
                </Button>
              </div>
            </div>

            {/* Top Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {topStats.map((stat, index) => (
                <StatCard
                  key={stat.title}
                  title={stat.title}
                  value={showSensitiveData ? stat.value : '••••••'}
                  sub={stat.sub}
                  icon={stat.icon}
                  trend={stat.trend}
                  color={stat.color}
                />
              ))}
            </div>

            {/* Tab Content */}
            <Card className="border-border rounded-2xl shadow-lg">
              <CardContent className="p-0">
                <Tabs value={tab} onValueChange={setTab} className="w-full">
                  <TabsList className="w-full bg-card border-b border-border rounded-t-2xl p-2 grid grid-cols-2 lg:grid-cols-7 gap-1">
                    <TabsTrigger
                      value="overview"
                      className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:border-primary"
                    >
                      <PieChart className="w-4 h-4 mr-2" />
                      Overview
                    </TabsTrigger>
                    <TabsTrigger
                      value="strategies"
                      className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:border-primary"
                    >
                      <Target className="w-4 h-4 mr-2" />
                      Strategies
                    </TabsTrigger>
                    <TabsTrigger
                      value="liquidity"
                      className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:border-primary"
                    >
                      <Layers className="w-4 h-4 mr-2" />
                      Liquidity
                    </TabsTrigger>
                    <TabsTrigger
                      value="concentrated"
                      className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:border-primary"
                    >
                      <Activity className="w-4 h-4 mr-2" />
                      Concentrated
                    </TabsTrigger>
                    <TabsTrigger
                      value="rebalance"
                      className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:border-primary"
                    >
                      <RefreshCcw className="w-4 h-4 mr-2" />
                      Rebalance
                    </TabsTrigger>
                    <TabsTrigger
                      value="analytics"
                      className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:border-primary"
                    >
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Analytics
                    </TabsTrigger>
                    <TabsTrigger
                      value="settings"
                      className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:border-primary"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </TabsTrigger>
                  </TabsList>

                  <AnimatePresence mode="wait">
                    {/* Overview Tab */}
                    <TabsContent value="overview" className="p-6">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                          <Card>
                            <CardHeader>
                              <CardTitle className="flex items-center gap-2">
                                <Activity className="w-5 h-5" />
                                Portfolio Summary
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <MetricCard
                                title="Total Deposits"
                                value={
                                  showSensitiveData
                                    ? overview.totalDeposits
                                    : '••••••'
                                }
                                icon={Wallet}
                              />
                              <MetricCard
                                title="Total Borrows"
                                value={
                                  showSensitiveData
                                    ? overview.totalBorrows
                                    : '••••••'
                                }
                                icon={TrendingDown}
                                color="text-destructive"
                              />
                              <MetricCard
                                title="Net Worth"
                                value={
                                  showSensitiveData
                                    ? overview.netWorth
                                    : '••••••'
                                }
                                icon={DollarSign}
                                color="text-success"
                              />
                              <MetricCard
                                title="Health Factor"
                                value={overview.healthFactor}
                                icon={Gauge}
                                color={
                                  parseFloat(overview.healthFactor) > 1.5
                                    ? 'text-success'
                                    : 'text-warning'
                                }
                              />
                            </CardContent>
                          </Card>

                          <Card>
                            <CardHeader>
                              <CardTitle className="flex items-center gap-2">
                                <TrendingUp className="w-5 h-5" />
                                Performance
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <MetricCard
                                title="Daily Return"
                                value={perf.dailyReturn}
                                icon={TrendingUp}
                                color="text-success"
                              />
                              <MetricCard
                                title="Total Return"
                                value={perf.totalReturn}
                                icon={Percent}
                                color="text-chart-3"
                              />
                              <MetricCard
                                title="Current APR"
                                value={perf.currentAPR}
                                icon={DollarSign}
                                color="text-primary"
                              />
                              <MetricCard
                                title="Volatility"
                                value={perf.volatility}
                                icon={Activity}
                                color="text-warning"
                              />
                            </CardContent>
                          </Card>
                        </div>

                        {/* Protocol Description */}
                        <Card className="bg-gradient-to-br from-card to-primary/5 border-primary/20">
                          <CardContent className="p-6">
                            <div className="text-center mb-6">
                              <h2 className="text-2xl font-bold mb-2">
                                One protocol. Unlimited yield sources.
                              </h2>
                              <p className="text-muted-foreground">
                                NapaFi as a programmable capital layer
                              </p>
                            </div>

                            <p className="text-center text-muted-foreground mb-6">
                              NapaFi unifies DeFi strategies, real-world asset
                              income, strategy licensing royalties, and
                              community engagement into a single creator-aligned
                              system. Everything flows into one unified vault.
                              Everything boosts your yield. Everything is
                              automated.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                              <Card className="bg-primary/10 border-primary/20">
                                <CardContent className="p-4">
                                  <h3 className="font-semibold mb-2">
                                    Smart Vault Routing
                                  </h3>
                                  <p className="text-sm text-muted-foreground">
                                    Intelligent capital allocation across
                                    multiple yield sources
                                  </p>
                                </CardContent>
                              </Card>
                              <Card className="bg-accent/10 border-accent/20">
                                <CardContent className="p-4">
                                  <h3 className="font-semibold mb-2">
                                    Community-Enhanced Yield
                                  </h3>
                                  <p className="text-sm text-muted-foreground">
                                    Leverage collective intelligence for optimal
                                    returns
                                  </p>
                                </CardContent>
                              </Card>
                              <Card className="bg-chart-3/10 border-chart-3/20">
                                <CardContent className="p-4">
                                  <h3 className="font-semibold mb-2">
                                    Plug-and-Play Integrations
                                  </h3>
                                  <p className="text-sm text-muted-foreground">
                                    Seamlessly connect with the entire DeFi
                                    ecosystem
                                  </p>
                                </CardContent>
                              </Card>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </TabsContent>

                    {/* Strategies Tab */}
                    <TabsContent value="strategies" className="p-6">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                      >
                        <div className="flex items-center justify-between mb-6">
                          <div>
                            <h2 className="text-2xl font-bold">
                              Active Strategies
                            </h2>
                            <p className="text-muted-foreground">
                              Updated 13 min ago
                            </p>
                          </div>
                        </div>

                        {activeStrategies.map((strategy) => (
                          <Card
                            key={strategy.id}
                            className="mb-6 border-border"
                          >
                            <CardHeader>
                              <CardTitle className="flex items-center justify-between">
                                <div>
                                  <h3 className="text-xl font-bold">
                                    {strategy.name}
                                  </h3>
                                  <p className="text-muted-foreground text-sm">
                                    {strategy.type}
                                  </p>
                                </div>
                                <Badge
                                  variant="secondary"
                                  className="bg-primary/20 text-primary"
                                >
                                  {strategy.riskScore} Risk
                                </Badge>
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                              {/* Strategy Details */}
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                <div>
                                  <div className="text-sm text-muted-foreground">
                                    Management Fee
                                  </div>
                                  <div className="font-semibold">
                                    {strategy.managementFee}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-sm text-muted-foreground">
                                    Performance Fee
                                  </div>
                                  <div className="font-semibold">
                                    {strategy.performanceFee}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-sm text-muted-foreground">
                                    Last Report
                                  </div>
                                  <div className="font-semibold">
                                    {strategy.lastReport}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-sm text-muted-foreground">
                                    Rewards
                                  </div>
                                  <div className="font-semibold">
                                    {strategy.rewards}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-sm text-muted-foreground">
                                    Contract
                                  </div>
                                  <div className="font-semibold">
                                    {strategy.contract}
                                  </div>
                                </div>
                              </div>

                              {/* Contract Links */}
                              <div className="flex gap-3">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="flex items-center gap-2"
                                >
                                  <ExternalLink className="h-4 w-4" />
                                  View on Etherscan
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="flex items-center gap-2"
                                >
                                  <FileText className="h-4 w-4" />
                                  Strategy Contract
                                </Button>
                              </div>

                              {/* Performance Metrics */}
                              <div>
                                <h4 className="font-semibold mb-4">
                                  Performance Metrics
                                </h4>
                                <div className="grid grid-cols-3 gap-4">
                                  <Card className="bg-primary/10 border-primary/20">
                                    <CardContent className="p-4 text-center">
                                      <div className="text-2xl font-bold text-primary">
                                        {strategy.performance.daily.apy}
                                      </div>
                                      <div className="text-sm text-muted-foreground">
                                        Daily APY
                                      </div>
                                      <div className="text-xs text-success mt-1">
                                        {strategy.performance.daily.change}{' '}
                                        (24h)
                                      </div>
                                    </CardContent>
                                  </Card>
                                  <Card className="bg-accent/10 border-accent/20">
                                    <CardContent className="p-4 text-center">
                                      <div className="text-2xl font-bold text-accent">
                                        {strategy.performance.weekly.apy}
                                      </div>
                                      <div className="text-sm text-muted-foreground">
                                        Weekly APY
                                      </div>
                                      <div className="text-xs text-destructive mt-1">
                                        {strategy.performance.weekly.change}{' '}
                                        (7d)
                                      </div>
                                    </CardContent>
                                  </Card>
                                  <Card className="bg-chart-3/10 border-chart-3/20">
                                    <CardContent className="p-4 text-center">
                                      <div className="text-2xl font-bold text-chart-3">
                                        {strategy.performance.monthly.apy}
                                      </div>
                                      <div className="text-sm text-muted-foreground">
                                        Monthly APY
                                      </div>
                                      <div className="text-xs text-success mt-1">
                                        {strategy.performance.monthly.change}{' '}
                                        (30d)
                                      </div>
                                    </CardContent>
                                  </Card>
                                </div>
                              </div>

                              {/* Historical Performance */}
                              <div>
                                <h4 className="font-semibold mb-4">
                                  Historical Performance (7D)
                                </h4>
                                <div className="flex justify-between text-sm text-muted-foreground">
                                  <span>Apr 13</span>
                                  <span>Apr 14</span>
                                  <span>Apr 15</span>
                                  <span>Apr 16</span>
                                  <span>Apr 17</span>
                                  <span>Apr 18</span>
                                  <span>Apr 19</span>
                                </div>
                                <div className="mt-2 bg-primary/10 rounded-lg h-4"></div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </motion.div>
                    </TabsContent>

                    {/* Liquidity Tab */}
                    <TabsContent value="liquidity" className="p-6">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                      >
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <Layers className="w-5 h-5" />
                              Unified Liquidity Pool
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <MetricCard
                                title="Total Value"
                                value={
                                  showSensitiveData
                                    ? liquidityData.totalValue
                                    : '••••••'
                                }
                                icon={DollarSign}
                              />
                              <Card>
                                <CardContent className="p-4">
                                  <div className="flex justify-between items-center mb-2">
                                    <div className="text-sm text-muted-foreground">
                                      Pool Utilization
                                    </div>
                                    <Badge variant="secondary">
                                      {liquidityData.utilization}%
                                    </Badge>
                                  </div>
                                  <Progress
                                    value={liquidityData.utilization}
                                    className="h-2"
                                  />
                                </CardContent>
                              </Card>
                              <MetricCard
                                title="Current APR"
                                value={liquidityData.apr}
                                icon={Percent}
                                color="text-chart-3"
                              />
                            </div>
                            <MetricCard
                              title="Fees Earned (24h)"
                              value={
                                showSensitiveData
                                  ? liquidityData.feesEarned
                                  : '••••••'
                              }
                              icon={DollarSign}
                              color="text-success"
                            />
                          </CardContent>
                        </Card>
                      </motion.div>
                    </TabsContent>

                    {/* Concentrated Tab */}
                    <TabsContent value="concentrated" className="p-6">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                      >
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <Activity className="w-5 h-5" />
                              Concentrated Positions
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <MetricCard
                                title="Total Value"
                                value={
                                  showSensitiveData
                                    ? concentratedData.totalValue
                                    : '••••••'
                                }
                                icon={DollarSign}
                              />
                              <MetricCard
                                title="Current APR"
                                value={concentratedData.apr}
                                icon={Percent}
                                color="text-chart-3"
                              />
                              <MetricCard
                                title="Efficiency"
                                value={concentratedData.efficiency}
                                icon={Gauge}
                                color="text-success"
                              />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <Card className="border-destructive/20 bg-destructive/10">
                                <CardContent className="p-4">
                                  <div className="flex items-center justify-between mb-3">
                                    <div>
                                      <div className="text-sm text-muted-foreground">
                                        Range Status
                                      </div>
                                      <Badge
                                        variant="destructive"
                                        className="mt-1"
                                      >
                                        {concentratedData.rangeStatus}
                                      </Badge>
                                    </div>
                                    <Button size="sm">Update Position</Button>
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    Recommended actions to improve position
                                    efficiency and capture more fees.
                                  </div>
                                </CardContent>
                              </Card>

                              <Card>
                                <CardContent className="p-4">
                                  <div className="flex items-center justify-between mb-3">
                                    <div>
                                      <div className="text-sm text-muted-foreground">
                                        Real-Time Monitoring
                                      </div>
                                      <Badge className="bg-success/20 text-success mt-1">
                                        CONNECTED
                                      </Badge>
                                    </div>
                                    <Clock className="w-5 h-5 text-muted-foreground" />
                                  </div>
                                  <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">
                                        Live Price:
                                      </span>
                                      <span className="font-mono">
                                        {concentratedData.livePrice}
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">
                                        24h Change:
                                      </span>
                                      <span className="text-success">
                                        {concentratedData.change24h}
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">
                                        Volume 24h:
                                      </span>
                                      <span>{concentratedData.volume24h}</span>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </TabsContent>

                    {/* Rebalance Tab */}
                    <TabsContent value="rebalance" className="p-6">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                      >
                        <Card>
                          <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="flex items-center gap-2">
                              <RefreshCcw className="w-5 h-5" />
                              Auto-Rebalancing
                            </CardTitle>
                            <Badge
                              className={
                                autoRebalanceActive
                                  ? 'bg-success/20 text-success'
                                  : 'bg-destructive/20 text-destructive'
                              }
                            >
                              {autoRebalanceActive ? 'ACTIVE' : 'PAUSED'}
                            </Badge>
                          </CardHeader>
                          <CardContent className="space-y-6">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                              <div>
                                <div className="text-2xl font-bold">
                                  {rebalanceData.totalRebalances}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  Total Rebalances
                                </div>
                                <div className="text-xs text-muted-foreground mt-1">
                                  Last: {rebalanceData.recentLogs[0].action} •{' '}
                                  {rebalanceData.recentLogs[0].time}
                                </div>
                              </div>
                              <div className="flex gap-3">
                                <Button
                                  onClick={() =>
                                    setAutoRebalanceActive(!autoRebalanceActive)
                                  }
                                  className={
                                    autoRebalanceActive
                                      ? 'bg-destructive hover:bg-destructive/90'
                                      : 'bg-success hover:bg-success/90'
                                  }
                                >
                                  {autoRebalanceActive
                                    ? 'Pause Auto-Rebalance'
                                    : 'Activate Auto-Rebalance'}
                                </Button>
                                <Button variant="outline">View Logs</Button>
                              </div>
                            </div>

                            <div>
                              <h4 className="font-semibold mb-3">
                                Recent Actions
                              </h4>
                              <div className="space-y-2">
                                {rebalanceData.recentLogs.map((log) => (
                                  <div
                                    key={log.id}
                                    className="flex items-center justify-between p-3 bg-card rounded-lg border"
                                  >
                                    <div>
                                      <div className="font-medium text-sm">
                                        {log.action}
                                      </div>
                                      <div className="text-xs text-muted-foreground">
                                        {log.time}
                                      </div>
                                    </div>
                                    <RefreshCcw className="w-4 h-4 text-muted-foreground" />
                                  </div>
                                ))}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </TabsContent>

                    {/* Analytics Tab */}
                    <TabsContent value="analytics" className="p-6">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                      >
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <BarChart3 className="w-5 h-5" />
                              Analytics Overview
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <Card>
                                <CardContent className="p-4">
                                  <div className="text-sm text-muted-foreground">
                                    Risk Score
                                  </div>
                                  <div className="text-2xl font-bold mt-1">
                                    {analyticsData.riskScore}/100
                                  </div>
                                </CardContent>
                              </Card>
                              <Card>
                                <CardContent className="p-4">
                                  <div className="text-sm text-muted-foreground">
                                    Sharpe Ratio
                                  </div>
                                  <div className="text-2xl font-bold mt-1">
                                    {analyticsData.sharpeRatio}
                                  </div>
                                </CardContent>
                              </Card>
                              <Card>
                                <CardContent className="p-4">
                                  <div className="text-sm text-muted-foreground">
                                    Notes
                                  </div>
                                  <div className="text-sm text-muted-foreground mt-1">
                                    {analyticsData.notes}
                                  </div>
                                </CardContent>
                              </Card>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </TabsContent>

                    {/* Settings Tab */}
                    <TabsContent value="settings" className="p-6">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-base">
                                Manual Rebalance
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm text-muted-foreground mb-4">
                                Trigger an on-demand rebalance across your
                                positions.
                              </p>
                              <div className="flex gap-2">
                                <Button size="sm">Trigger Rebalance</Button>
                                <Button size="sm" variant="outline">
                                  Preview
                                </Button>
                              </div>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardHeader>
                              <CardTitle className="text-base">
                                Manual Compound
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm text-muted-foreground mb-4">
                                Compound fees into holdings manually.
                              </p>
                              <Button size="sm">Compound Now</Button>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardHeader>
                              <CardTitle className="text-base">
                                Emergency Stop
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm text-muted-foreground mb-4">
                                Pause all automated routing & rebalances for
                                safety.
                              </p>
                              <Button size="sm" variant="destructive">
                                Emergency Stop
                              </Button>
                            </CardContent>
                          </Card>
                        </div>
                      </motion.div>
                    </TabsContent>
                  </AnimatePresence>
                </Tabs>
              </CardContent>
            </Card>
          </main>

          {/* Right Sidebar */}
          <aside className="lg:col-span-3 flex flex-col gap-6">
            {/* High Yield Opportunity */}
            <Card className="bg-gradient-to-br from-primary to-accent text-primary-foreground border-0 rounded-2xl shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">
                      High Yield Opportunity
                    </h3>
                    <p className="text-primary-foreground/80 text-sm mt-1">
                      ETH-USDC • Arbitrum
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary-foreground hover:bg-primary-foreground/20"
                  >
                    <Star className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex gap-1 bg-primary-foreground/20 rounded-full p-1 mb-4">
                  <Button
                    size="sm"
                    className="flex-1 bg-primary-foreground text-primary text-xs"
                  >
                    Concentrated
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="flex-1 text-primary-foreground text-xs"
                  >
                    Stable
                  </Button>
                </div>

                <div className="mb-4">
                  <div className="text-sm text-primary-foreground/80">
                    Potential APY
                  </div>
                  <div className="text-3xl font-bold">18.75%</div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-primary-foreground" />
                    <span className="text-sm">Low impermanent loss risk</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-primary-foreground" />
                    <span className="text-sm">High volume pair</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Minus className="h-5 w-5 text-primary-foreground" />
                    <span className="text-sm">Medium gas costs</span>
                  </div>
                </div>

                <Button className="w-full mt-4 bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                  Deploy Capital
                </Button>
              </CardContent>
            </Card>

            {/* Network Status */}
            <Card className="border-border rounded-2xl shadow-lg">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Network Status</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Ethereum</span>
                    <Badge className="bg-success/20 text-success">
                      Optimal
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Arbitrum</span>
                    <Badge className="bg-success/20 text-success">
                      Optimal
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Polygon</span>
                    <Badge className="bg-warning/20 text-warning">Busy</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Optimism</span>
                    <Badge className="bg-success/20 text-success">
                      Optimal
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-border rounded-2xl shadow-lg">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-border"
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Add Liquidity
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-border"
                  >
                    <Target className="w-4 h-4 mr-2" />
                    New Position
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-border"
                  >
                    <RefreshCcw className="w-4 h-4 mr-2" />
                    Rebalance Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default PortfolioDashboard;
