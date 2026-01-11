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
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { TopNav } from '@/components/TopNav';
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

/**
 * PortfolioDashboard.tsx
 * Full page: TopNav + Portfolio Dashboard with tabs and mock data
 *
 * - Overview
 * - Liquidity (Unified Liquidity Pool)
 * - Concentrated (positions)
 * - Auto-Rebalance
 * - Analytics
 * - Settings
 *
 * Designed as a daily-usable dashboard: quick stats on top, clear tabs, concise metrics, animated transitions.
 */

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
  },
  {
    title: 'Concentrated Liquidity',
    value: '$89,123.45',
    sub: 'Active in 5 pools',
    icon: Layers,
    trend: 'neutral' as const,
  },
  {
    title: 'Auto-Rebalance',
    value: 'ACTIVE',
    sub: '47 rebalances',
    icon: RefreshCcw,
    trend: 'up' as const,
  },
  {
    title: 'Efficiency Score',
    value: '92%',
    sub: 'High performance',
    icon: Gauge,
    trend: 'up' as const,
  },
  {
    title: 'Out of Range',
    value: '2 positions',
    sub: 'Needs attention',
    icon: AlertTriangle,
    trend: 'down' as const,
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
}> = ({ title, value, sub, icon: Icon, trend }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    transition={{ type: 'spring', stiffness: 300 }}
  >
    <Card className="bg-gradient-to-br from-neutral-900/80 to-neutral-800/60 border border-neutral-700/50 rounded-xl hover:border-primary/40 transition-all duration-300 shadow-sm hover:shadow-lg">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="text-xs text-neutral-400 uppercase tracking-wider font-medium">
            {title}
          </div>
          {Icon && (
            <div className="p-1 bg-neutral-800/40 rounded-full">
              <Icon className="w-4 h-4 text-neutral-300" />
            </div>
          )}
        </div>
        <div className="text-xl md:text-2xl font-semibold text-white mb-1">
          {value}
        </div>
        {sub && (
          <div className="flex items-center text-xs text-neutral-400 mt-1">
            {trend === 'up' && (
              <TrendingUp className="w-3 h-3 text-green-400 mr-1" />
            )}
            {trend === 'down' && (
              <TrendingDown className="w-3 h-3 text-red-400 mr-1" />
            )}
            {trend === 'neutral' && (
              <Activity className="w-3 h-3 text-neutral-400 mr-1" />
            )}
            {sub}
          </div>
        )}
      </CardContent>
    </Card>
  </motion.div>
);

const MetricCard: React.FC<{
  title: string;
  value: string;
  icon?: any;
  color?: string;
  tooltip?: string;
}> = ({ title, value, icon: Icon, color = 'text-white', tooltip }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Card className="bg-neutral-900/60 border border-neutral-700/50 rounded-xl hover:border-primary/40 transition-all duration-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-neutral-400">{title}</div>
              {Icon && <Icon className="w-4 h-4 text-neutral-500" />}
            </div>
            <div className={`text-xl font-bold ${color}`}>{value}</div>
          </CardContent>
        </Card>
      </TooltipTrigger>
      {tooltip && <TooltipContent>{tooltip}</TooltipContent>}
    </Tooltip>
  </TooltipProvider>
);

/* -------------------------
   Main Page Component
   ------------------------- */
const PortfolioDashboard: React.FC = () => {
  // tab keys: overview | liquidity | concentrated | rebalance | analytics | settings
  const [tab, setTab] = useState<string>('overview');
  const [showSensitiveData, setShowSensitiveData] = useState<boolean>(true);
  const [autoRebalanceActive, setAutoRebalanceActive] = useState<boolean>(
    rebalanceData.status
  );

  return (
    <div className="w-full min-h-screen bg-neutral-950 text-white">
      <TopNav />

      <main className="max-w-7xl mx-auto px-4 py-10">
        {/* Page header + sensitive toggle */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400">
              Portfolio Dashboard
            </h1>
            <p className="text-sm text-neutral-400 mt-1">
              Snapshot of your unified vaults, liquidity, and rebalancing
              controls.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSensitiveData((s) => !s)}
              className="border-neutral-700"
            >
              {showSensitiveData ? (
                <Eye className="w-4 h-4 mr-2" />
              ) : (
                <EyeOff className="w-4 h-4 mr-2" />
              )}
              {showSensitiveData ? 'Hide Values' : 'Show Values'}
            </Button>

            <div className="text-sm text-neutral-400">
              <div>Auto-Rebalance: </div>
              <div className="mt-1">
                <Badge
                  className={`px-3 py-1 ${autoRebalanceActive ? 'bg-green-600/20 text-green-400' : 'bg-red-600/10 text-red-300'}`}
                >
                  {autoRebalanceActive ? 'ACTIVE' : 'PAUSED'}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Top stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          {topStats.map((s) => (
            <StatCard
              key={s.title}
              title={s.title}
              value={showSensitiveData ? s.value : '••••••'}
              sub={s.sub}
              icon={s.icon}
              trend={s.trend}
            />
          ))}
        </div>

        {/* Tabs */}
        <Tabs value={tab} onValueChange={(v) => setTab(v)} className="w-full">
          <TabsList className="bg-neutral-900/80 border border-neutral-800/50 rounded-xl mb-6 p-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-primary/20 data-[state=active]:text-white"
            >
              <PieChart className="w-4 h-4 mr-2 inline" /> Overview
            </TabsTrigger>
            <TabsTrigger
              value="liquidity"
              className="data-[state=active]:bg-primary/20 data-[state=active]:text-white"
            >
              <DollarSign className="w-4 h-4 mr-2 inline" /> Liquidity
            </TabsTrigger>
            <TabsTrigger
              value="concentrated"
              className="data-[state=active]:bg-primary/20 data-[state=active]:text-white"
            >
              <Target className="w-4 h-4 mr-2 inline" /> Concentrated
            </TabsTrigger>
            <TabsTrigger
              value="rebalance"
              className="data-[state=active]:bg-primary/20 data-[state=active]:text-white"
            >
              <RefreshCcw className="w-4 h-4 mr-2 inline" /> Auto-Rebalance
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="data-[state=active]:bg-primary/20 data-[state=active]:text-white"
            >
              <BarChart3 className="w-4 h-4 mr-2 inline" /> Analytics
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="data-[state=active]:bg-primary/20 data-[state=active]:text-white"
            >
              <Settings className="w-4 h-4 mr-2 inline" /> Settings
            </TabsTrigger>
          </TabsList>

          <AnimatePresence mode="wait">
            {/* --------------- OVERVIEW --------------- */}
            <TabsContent value="overview" key="overview">
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.28 }}
              >
                {/* Portfolio overview metrics */}
                <Card className="bg-neutral-900/50 border border-neutral-800/50 mb-6 rounded-xl">
                  <CardHeader className="p-4">
                    <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                      <Activity className="w-5 h-5 text-primary" /> Portfolio
                      Overview
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <MetricCard
                        title="Total Deposits"
                        value={
                          showSensitiveData ? overview.totalDeposits : '••••••'
                        }
                        icon={Wallet}
                        tooltip="Sum of your deposited assets"
                      />
                      <MetricCard
                        title="Total Borrows"
                        value={
                          showSensitiveData ? overview.totalBorrows : '••••••'
                        }
                        icon={TrendingDown}
                        color="text-red-400"
                        tooltip="Total outstanding borrows"
                      />
                      <MetricCard
                        title="Net Worth"
                        value={showSensitiveData ? overview.netWorth : '••••••'}
                        icon={DollarSign}
                        color="text-green-400"
                        tooltip="Deposits minus borrows"
                      />
                    </div>

                    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <MetricCard
                        title="Health Factor"
                        value={overview.healthFactor}
                        icon={Gauge}
                        color={
                          parseFloat(overview.healthFactor) > 1.5
                            ? 'text-green-400'
                            : 'text-yellow-400'
                        }
                        tooltip="Higher is safer"
                      />
                      <MetricCard
                        title="Daily Return"
                        value={perf.dailyReturn}
                        icon={TrendingUp}
                        color="text-green-400"
                      />
                      <MetricCard
                        title="Total Return"
                        value={perf.totalReturn}
                        icon={Percent}
                        color="text-blue-400"
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* --------------- LIQUIDITY --------------- */}
            <TabsContent value="liquidity" key="liquidity">
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.28 }}
              >
                <div className="relative mb-6">
                  <Card className="bg-neutral-900/50 border border-neutral-800/50 rounded-xl">
                    <CardHeader className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Layers className="w-5 h-5 text-primary" />
                        <CardTitle className="text-lg font-semibold">
                          Unified Liquidity Pool
                        </CardTitle>
                      </div>
                      <div className="text-sm text-neutral-400">
                        Overview · Unified liquidity across vaults
                      </div>
                    </CardHeader>

                    <CardContent className="p-4">
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
                        <div className="bg-neutral-900/60 border border-neutral-800/50 rounded-xl p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-sm text-neutral-400">
                              Pool Utilization
                            </div>
                            <Badge variant="secondary">
                              {liquidityData.utilization}%
                            </Badge>
                          </div>
                          <Progress
                            value={liquidityData.utilization}
                            className="h-3"
                          />
                        </div>
                        <MetricCard
                          title="Current APR"
                          value={liquidityData.apr}
                          icon={Percent}
                          color="text-blue-400"
                        />
                      </div>

                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <MetricCard
                          title="Fees Earned (24h)"
                          value={
                            showSensitiveData
                              ? liquidityData.feesEarned
                              : '••••••'
                          }
                          icon={DollarSign}
                          color="text-green-400"
                        />
                        <Card className="bg-neutral-900/60 border border-neutral-800/50 rounded-xl">
                          <CardContent>
                            <div className="text-sm text-neutral-400 mb-2">
                              Pool Health
                            </div>
                            <div className="text-xs text-neutral-300">
                              Utilization and APR combined indicate pool
                              efficiency and utilization. Monitor frequently to
                              avoid concentration risks.
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            </TabsContent>

            {/* --------------- CONCENTRATED --------------- */}
            <TabsContent value="concentrated" key="concentrated">
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.28 }}
              >
                <Card className="bg-neutral-900/50 border border-neutral-800/50 rounded-xl mb-6">
                  <CardHeader className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Target className="w-5 h-5 text-primary" />
                      <CardTitle className="text-lg font-semibold">
                        Concentrated Liquidity Positions
                      </CardTitle>
                    </div>
                    <div className="text-sm text-neutral-400">
                      Active positions & range monitoring
                    </div>
                  </CardHeader>

                  <CardContent className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
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
                        color="text-blue-400"
                      />
                      <MetricCard
                        title="Efficiency"
                        value={concentratedData.efficiency}
                        icon={Gauge}
                        color="text-green-400"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className="bg-neutral-900/60 border border-red-600/20 rounded-xl">
                        <CardContent>
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <div className="text-sm text-neutral-400">
                                Range Status
                              </div>
                              <div className="mt-1">
                                <Badge variant="destructive">
                                  {concentratedData.rangeStatus}
                                </Badge>
                              </div>
                            </div>
                            <Button
                              size="sm"
                              className="bg-primary hover:bg-primary/80"
                            >
                              Update Position
                            </Button>
                          </div>

                          <div className="text-sm text-neutral-300">
                            Recommended actions:
                            <ul className="list-disc list-inside mt-2 text-xs text-neutral-400">
                              <li>Widen range to capture more fees</li>
                              <li>Rebalance tokens to target ratio</li>
                              <li>Monitor live price and volume</li>
                            </ul>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-neutral-900/60 border border-neutral-800/50 rounded-xl">
                        <CardContent>
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <div className="text-sm text-neutral-400">
                                Real-Time Monitoring
                              </div>
                              <Badge className="bg-green-600/20 text-green-400 mt-1">
                                CONNECTED
                              </Badge>
                            </div>
                            <Clock className="w-5 h-5 text-neutral-400" />
                          </div>

                          <div className="grid grid-cols-1 gap-2">
                            <div className="text-sm text-neutral-300">
                              Live Price:{' '}
                              <span className="font-mono ml-2">
                                {concentratedData.livePrice}
                              </span>
                            </div>
                            <div className="text-sm text-neutral-300">
                              24h Change:{' '}
                              <span className="ml-2">
                                {concentratedData.change24h}
                              </span>
                            </div>
                            <div className="text-sm text-neutral-300">
                              Volume 24h:{' '}
                              <span className="ml-2">
                                {concentratedData.volume24h}
                              </span>
                            </div>
                            <div className="text-sm text-neutral-300">
                              Fees Earned:{' '}
                              <span className="ml-2">
                                {concentratedData.feesEarned}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* --------------- AUTO-REBALANCE --------------- */}
            <TabsContent value="rebalance" key="rebalance">
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.28 }}
              >
                <Card className="bg-neutral-900/50 border border-neutral-800/50 rounded-xl mb-6">
                  <CardHeader className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <RefreshCcw className="w-5 h-5 text-primary" />
                      <CardTitle className="text-lg font-semibold">
                        Auto-Rebalancing
                      </CardTitle>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-sm text-neutral-400">Status</div>
                      <Badge
                        className={
                          autoRebalanceActive
                            ? 'bg-green-600/20 text-green-400'
                            : 'bg-red-600/10 text-red-300'
                        }
                      >
                        {autoRebalanceActive ? 'ACTIVE' : 'PAUSED'}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                      <div>
                        <div className="text-sm text-neutral-400">
                          Total Rebalances
                        </div>
                        <div className="text-xl font-semibold">
                          {rebalanceData.totalRebalances}
                        </div>
                        <div className="text-xs text-neutral-500 mt-1">
                          {rebalanceData.recentLogs[0].action} ·{' '}
                          {rebalanceData.recentLogs[0].time}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Button
                          size="sm"
                          onClick={() => setAutoRebalanceActive((s) => !s)}
                          className="bg-primary"
                        >
                          {autoRebalanceActive
                            ? 'Pause Auto-Rebalancing'
                            : 'Activate Auto-Rebalancing'}
                        </Button>
                        <Button size="sm" variant="outline">
                          View Logs
                        </Button>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="text-sm text-neutral-400 mb-2">
                        Recent Actions
                      </div>
                      <div className="space-y-2">
                        {rebalanceData.recentLogs.map((l) => (
                          <div
                            key={l.id}
                            className="text-sm text-neutral-300 bg-neutral-900/40 p-2 rounded"
                          >
                            <div className="font-medium">{l.action}</div>
                            <div className="text-xs text-neutral-500">
                              {l.time}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* --------------- ANALYTICS --------------- */}
            <TabsContent value="analytics" key="analytics">
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.28 }}
              >
                <Card className="bg-neutral-900/50 border border-neutral-800/50 rounded-xl mb-6">
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg font-semibold flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-primary" /> Analytics
                      Overview
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <Card className="bg-neutral-900/60 border border-neutral-800/50 rounded-xl p-4">
                        <div className="text-sm text-neutral-400">
                          Risk Score
                        </div>
                        <div className="text-2xl font-semibold text-white">
                          {analyticsData.riskScore}/100
                        </div>
                      </Card>

                      <Card className="bg-neutral-900/60 border border-neutral-800/50 rounded-xl p-4">
                        <div className="text-sm text-neutral-400">
                          Sharpe Ratio
                        </div>
                        <div className="text-2xl font-semibold text-white">
                          {analyticsData.sharpeRatio}
                        </div>
                      </Card>

                      <Card className="bg-neutral-900/60 border border-neutral-800/50 rounded-xl p-4">
                        <div className="text-sm text-neutral-400">Notes</div>
                        <div className="text-sm text-neutral-300 mt-2">
                          {analyticsData.notes}
                        </div>
                      </Card>
                    </div>

                    <div className="text-sm text-neutral-400">
                      Performance history charts would appear here
                      (placeholder).
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* --------------- SETTINGS --------------- */}
            <TabsContent value="settings" key="settings">
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.28 }}
              >
                <Card className="bg-neutral-900/50 border border-neutral-800/50 rounded-xl p-4">
                  <CardHeader className="p-0 mb-4">
                    <CardTitle className="text-lg font-semibold flex items-center gap-2">
                      <Settings className="w-5 h-5 text-primary" /> System
                      Settings
                    </CardTitle>
                  </CardHeader>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="bg-neutral-900/60 border border-neutral-800/50 rounded-xl p-4">
                      <div className="text-sm text-neutral-400 mb-2">
                        Manual Rebalance
                      </div>
                      <div className="text-sm text-neutral-300">
                        Trigger an on-demand rebalance across your positions.
                      </div>
                      <div className="mt-3 flex gap-2">
                        <Button size="sm" className="bg-primary">
                          Trigger Rebalance
                        </Button>
                        <Button size="sm" variant="outline">
                          Preview
                        </Button>
                      </div>
                    </Card>

                    <Card className="bg-neutral-900/60 border border-neutral-800/50 rounded-xl p-4">
                      <div className="text-sm text-neutral-400 mb-2">
                        Manual Compound
                      </div>
                      <div className="text-sm text-neutral-300">
                        Compound fees into holdings manually.
                      </div>
                      <div className="mt-3">
                        <Button size="sm" className="bg-primary">
                          Compound Now
                        </Button>
                      </div>
                    </Card>

                    <Card className="bg-neutral-900/60 border border-neutral-800/50 rounded-xl p-4">
                      <div className="text-sm text-neutral-400 mb-2">
                        Emergency Stop
                      </div>
                      <div className="text-sm text-neutral-300">
                        Pause all automated routing & rebalances for safety.
                      </div>
                      <div className="mt-3">
                        <Button size="sm" variant="destructive">
                          Emergency Stop
                        </Button>
                      </div>
                    </Card>
                  </div>
                </Card>
              </motion.div>
            </TabsContent>
          </AnimatePresence>
        </Tabs>

        {/* Footer / small copyright */}
        <div className="mt-8 text-sm text-neutral-500 text-center">
          © {new Date().getFullYear()} NapaFi Technologies. All rights
          reserved.
        </div>
      </main>
    </div>
  );
};

export default PortfolioDashboard;
