import { TopNav } from "@/components/TopNav";
import { VaultCard } from "@/components/VaultCard";
import { Search, TrendingUp, Shield, Zap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

// Mock vaults for demo - replace with real contract data after deployment
const MOCK_VAULTS = [
  {
    address: "0x1234567890123456789012345678901234567890",
    name: "DAI Yield Optimizer",
    symbol: "yvDAI",
    tvl: "1,234,567",
    apy: "12.5",
    strategies: 3,
    risk: "low" as const,
    asset: "DAI",
  },
  {
    address: "0x2345678901234567890123456789012345678901",
    name: "Compound Strategy Vault",
    symbol: "cvDAI",
    tvl: "567,890",
    apy: "8.2",
    strategies: 2,
    risk: "medium" as const,
    asset: "DAI",
  },
  {
    address: "0x3456789012345678901234567890123456789012",
    name: "Aave V3 Optimizer",
    symbol: "avDAI",
    tvl: "890,123",
    apy: "15.7",
    strategies: 4,
    risk: "high" as const,
    asset: "DAI",
  },
];

const stats = [
  { label: "Total TVL", value: "$2.7M", icon: TrendingUp, color: "text-success" },
  { label: "Active Vaults", value: "3", icon: Shield, color: "text-primary" },
  { label: "Avg APY", value: "12.1%", icon: Zap, color: "text-warning" },
];

const Index = () => {
  const [search, setSearch] = useState("");

  const filteredVaults = MOCK_VAULTS.filter(
    (vault) =>
      vault.name.toLowerCase().includes(search.toLowerCase()) ||
      vault.asset.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <TopNav />

      <main className="pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
              Vault Aggregator
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Optimize your yield with multi-strategy vaults. Deposit, earn, and
              manage your DeFi positions on Sepolia testnet.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-12 max-w-xl mx-auto">
            {stats.map((stat) => (
              <Card key={stat.label} className="bg-card/50 border-border/50">
                <CardContent className="p-4 text-center">
                  <stat.icon className={`w-5 h-5 mx-auto mb-2 ${stat.color}`} />
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Search */}
          <div className="relative max-w-md mx-auto mb-12">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search vaults..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 bg-card/50 border-border/50 h-12"
            />
          </div>

          {/* Vault Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVaults.map((vault) => (
              <VaultCard key={vault.address} {...vault} />
            ))}
          </div>

          {filteredVaults.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No vaults found matching your search.
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
