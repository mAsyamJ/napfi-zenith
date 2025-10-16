export interface Strategy {
  id: string;
  name: string;
  description: string;
  allocation: number;
  apy: number;
  status: "active" | "inactive";
  riskScore: "low" | "medium" | "high";
  managementFee: number;
  performanceFee: number;
  lastReport: string;
  rewards: string[];
  contractAddress: string;
  etherscanUrl: string;
  dailyApy: number;
  weeklyApy: number;
  monthlyApy: number;
  dailyChange: number;
  weeklyChange: number;
  monthlyChange: number;
  performanceData: number[];
  icon: string;
}

export const mockStrategies: Strategy[] = [
  {
    id: "1",
    name: "Uniswap V3 DAI/ETH LP",
    description: "Core Strategy",
    allocation: 65,
    apy: 8.1,
    status: "active",
    riskScore: "medium",
    managementFee: 0,
    performanceFee: 10,
    lastReport: "2 days ago",
    rewards: ["DAI", "ETH"],
    contractAddress: "0x1234...5678",
    etherscanUrl: "https://etherscan.io/address/0x1234567890",
    dailyApy: 8.3,
    weeklyApy: 7.9,
    monthlyApy: 8.5,
    dailyChange: 0.3,
    weeklyChange: -0.5,
    monthlyChange: 1.2,
    performanceData: [7.5, 7.8, 7.9, 8.2, 8.0, 8.3, 8.1],
    icon: "sparkles"
  },
  {
    id: "2",
    name: "Yearn DAI/ETH LP Optimizer",
    description: "Dynamic yield optimizer",
    allocation: 25,
    apy: 3.1,
    status: "active",
    riskScore: "low",
    managementFee: 0,
    performanceFee: 20,
    lastReport: "5 hours ago",
    rewards: ["DAI", "ETH", "YFI"],
    contractAddress: "0xabcd...efgh",
    etherscanUrl: "https://etherscan.io/address/0xabcdefgh",
    dailyApy: 3.2,
    weeklyApy: 3.0,
    monthlyApy: 3.3,
    dailyChange: 0.1,
    weeklyChange: -0.1,
    monthlyChange: 0.4,
    performanceData: [2.9, 3.0, 3.1, 3.0, 3.1, 3.2, 3.1],
    icon: "trending-up"
  },
  {
    id: "3",
    name: "DAI/ETH LP Staking Rewards",
    description: "Passive staking rewards",
    allocation: 10,
    apy: 1.2,
    status: "active",
    riskScore: "low",
    managementFee: 0,
    performanceFee: 5,
    lastReport: "1 day ago",
    rewards: ["DAI"],
    contractAddress: "0x9876...4321",
    etherscanUrl: "https://etherscan.io/address/0x98764321",
    dailyApy: 1.2,
    weeklyApy: 1.3,
    monthlyApy: 1.1,
    dailyChange: 0,
    weeklyChange: 0.1,
    monthlyChange: -0.1,
    performanceData: [1.2, 1.3, 1.2, 1.3, 1.2, 1.2, 1.2],
    icon: "wallet"
  },
  {
    id: "4",
    name: "Curve stETH/ETH LP",
    description: "Inactive strategy",
    allocation: 0,
    apy: 0,
    status: "inactive",
    riskScore: "medium",
    managementFee: 0,
    performanceFee: 10,
    lastReport: "30 days ago",
    rewards: ["CRV", "ETH"],
    contractAddress: "0xfeed...beef",
    etherscanUrl: "https://etherscan.io/address/0xfeedbeef",
    dailyApy: 0,
    weeklyApy: 0,
    monthlyApy: 0,
    dailyChange: 0,
    weeklyChange: 0,
    monthlyChange: 0,
    performanceData: [0, 0, 0, 0, 0, 0, 0],
    icon: "pause"
  }
];
