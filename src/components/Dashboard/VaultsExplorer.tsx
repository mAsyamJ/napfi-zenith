import { useState } from "react";
import { Search, ArrowUpDown, ArrowUp, ArrowDown, Filter as FilterIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import vaultsData from "@/data/mockVaults.json";

type SortKey = "name" | "apy" | "tvl" | "deposited" | "dailyYield" | "safetyScore";
type SortOrder = "asc" | "desc" | null;

const protocols = [
  { name: "Ethereum", icon: "⟠", id: "ethereum" },
  { name: "Arbitrum", icon: "🔷", id: "arbitrum" },
  { name: "Base", icon: "🔵", id: "base" },
  { name: "Polygon", icon: "🟣", id: "polygon" },
  { name: "Avalanche", icon: "🔺", id: "avalanche" },
  { name: "BSC", icon: "🟡", id: "bsc" },
  { name: "Optimism", icon: "🔴", id: "optimism" },
];

const categories = [
  "All",
  "Saved",
  "My Positions",
  "Boosts 🔥",
  "Stablecoins",
  "Blue Chips",
  "Memes",
  "Correlated",
  "Single",
  "LP",
  "CLM",
  "Vaults",
  "Pools",
];

export const VaultsExplorer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProtocol, setSelectedProtocol] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortKey, setSortKey] = useState<SortKey | null>("apy");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : sortOrder === "desc" ? null : "asc");
      if (sortOrder === "desc") setSortKey(null);
    } else {
      setSortKey(key);
      setSortOrder("desc");
    }
  };

  const getSortIcon = (key: SortKey) => {
    if (sortKey !== key) return <ArrowUpDown className="h-3 w-3 ml-1 opacity-50" />;
    if (sortOrder === "asc") return <ArrowUp className="h-3 w-3 ml-1 text-primary" />;
    if (sortOrder === "desc") return <ArrowDown className="h-3 w-3 ml-1 text-primary" />;
    return <ArrowUpDown className="h-3 w-3 ml-1 opacity-50" />;
  };

  let filteredVaults = vaultsData.filter((vault) => {
    const matchesSearch = vault.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProtocol = !selectedProtocol || vault.network === selectedProtocol;
    const matchesCategory =
      selectedCategory === "All" ||
      (selectedCategory === "Boosts 🔥" && vault.apy > 15) ||
      vault.category === selectedCategory;
    return matchesSearch && matchesProtocol && matchesCategory;
  });

  if (sortKey && sortOrder) {
    filteredVaults = [...filteredVaults].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      const comparison = aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
      return sortOrder === "asc" ? comparison : -comparison;
    });
  }

  const formatTVL = (tvl: number) => {
    if (tvl >= 1000000) return `$${(tvl / 1000000).toFixed(2)}M`;
    if (tvl >= 1000) return `$${(tvl / 1000).toFixed(2)}K`;
    return `$${tvl.toFixed(2)}`;
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Vaults Explorer</h2>
      </div>

      {/* Protocol Filter Bar */}
      <div className="flex items-center gap-3 overflow-x-auto py-3 px-1 scrollbar-hide mb-4">
        {protocols.map((protocol) => (
          <button
            key={protocol.id}
            onClick={() => setSelectedProtocol(selectedProtocol === protocol.id ? null : protocol.id)}
            className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-all ${
              selectedProtocol === protocol.id
                ? "bg-primary ring-2 ring-primary shadow-[0_0_12px_hsl(var(--primary)/0.5)]"
                : "bg-card border border-border hover:border-primary/50 hover:shadow-[0_0_8px_hsl(var(--primary)/0.3)]"
            }`}
            title={protocol.name}
          >
            {protocol.icon}
          </button>
        ))}
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 flex-wrap mb-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              selectedCategory === category
                ? "bg-primary text-primary-foreground shadow-lg"
                : "bg-card text-muted-foreground hover:bg-muted border border-border"
            }`}
          >
            {category}
            {category === "Boosts 🔥" && (
              <Badge variant="secondary" className="ml-2 text-xs">New</Badge>
            )}
          </button>
        ))}
        <button
          onClick={() => {
            setSelectedCategory("All");
            setSelectedProtocol(null);
            setSearchTerm("");
          }}
          className="px-4 py-2 rounded-xl text-sm font-medium bg-destructive/10 text-destructive hover:bg-destructive/20 border border-destructive/20"
        >
          Clear All
          {(selectedProtocol || selectedCategory !== "All" || searchTerm) && (
            <Badge variant="destructive" className="ml-2 text-xs">1</Badge>
          )}
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search by asset name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-card text-foreground pl-11 pr-16 py-3 rounded-xl border-border focus:border-primary transition-colors"
        />
        <kbd className="absolute right-4 top-1/2 transform -translate-y-1/2 px-2 py-1 text-xs text-muted-foreground bg-muted rounded border border-border">
          /
        </kbd>
      </div>

      {/* Vault Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-border bg-muted/30 text-xs uppercase text-muted-foreground font-semibold">
          <div className="col-span-3">Vault</div>
          <div className="col-span-2 flex items-center cursor-pointer hover:text-foreground" onClick={() => handleSort("name")}>
            Platform {getSortIcon("name")}
          </div>
          <div className="col-span-1 text-center">Wallet</div>
          <div className="col-span-1 text-center cursor-pointer hover:text-foreground" onClick={() => handleSort("deposited")}>
            Deposited {getSortIcon("deposited")}
          </div>
          <div className="col-span-2 text-right cursor-pointer hover:text-foreground" onClick={() => handleSort("apy")}>
            Current APY {getSortIcon("apy")}
          </div>
          <div className="col-span-1 text-right cursor-pointer hover:text-foreground" onClick={() => handleSort("dailyYield")}>
            Daily {getSortIcon("dailyYield")}
          </div>
          <div className="col-span-1 text-right cursor-pointer hover:text-foreground" onClick={() => handleSort("tvl")}>
            TVL {getSortIcon("tvl")}
          </div>
          <div className="col-span-1 text-center cursor-pointer hover:text-foreground" onClick={() => handleSort("safetyScore")}>
            Safety {getSortIcon("safetyScore")}
          </div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-border">
          {filteredVaults.map((vault) => (
            <div
              key={vault.id}
              className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-muted/50 transition-colors cursor-pointer group"
            >
              {/* Vault Name + Tokens */}
              <div className="col-span-3 flex items-center gap-3">
                <div className="flex items-center -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-primary/20 border-2 border-card flex items-center justify-center text-xs font-bold">
                    {vault.tokens[0].slice(0, 2)}
                  </div>
                  {vault.tokens[1] && (
                    <div className="w-8 h-8 rounded-full bg-secondary/20 border-2 border-card flex items-center justify-center text-xs font-bold">
                      {vault.tokens[1].slice(0, 2)}
                    </div>
                  )}
                </div>
                <div>
                  <div className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {vault.name}
                  </div>
                  <div className="text-xs text-muted-foreground capitalize">{vault.network}</div>
                </div>
              </div>

              {/* Platform */}
              <div className="col-span-2 flex items-center">
                <div>
                  <div className="text-sm font-medium text-foreground">{vault.platform}</div>
                  {vault.category && (
                    <Badge variant="outline" className="text-xs mt-1">
                      {vault.category}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Wallet */}
              <div className="col-span-1 flex items-center justify-center text-sm text-muted-foreground">
                {vault.wallet}
              </div>

              {/* Deposited */}
              <div className="col-span-1 flex items-center justify-center text-sm text-muted-foreground">
                {vault.deposited}
              </div>

              {/* Current APY */}
              <div className="col-span-2 flex items-center justify-end">
                <span
                  className={`text-lg font-bold ${
                    vault.apy > 15
                      ? "text-success"
                      : vault.apy > 8
                      ? "text-warning"
                      : "text-foreground"
                  }`}
                >
                  {vault.apy.toFixed(2)}%
                </span>
              </div>

              {/* Daily */}
              <div className="col-span-1 flex items-center justify-end text-sm text-muted-foreground">
                {vault.dailyYield.toFixed(4)}%
              </div>

              {/* TVL */}
              <div className="col-span-1 flex items-center justify-end">
                <div className="text-right">
                  <div className="text-sm font-semibold text-foreground">{formatTVL(vault.tvl)}</div>
                  <div className="text-xs text-muted-foreground">{formatTVL(vault.tvl * 0.85)}</div>
                </div>
              </div>

              {/* Safety */}
              <div className="col-span-1 flex items-center justify-center">
                <div className="flex flex-col items-center gap-1">
                  <div className="flex gap-0.5">
                    {[1, 2, 3].map((bar) => (
                      <div
                        key={bar}
                        className={`w-1 h-4 rounded-sm ${
                          vault.safetyScore >= bar * 30
                            ? "bg-success"
                            : "bg-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">{vault.safetyScore}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredVaults.length === 0 && (
          <div className="py-12 text-center text-muted-foreground">
            <FilterIcon className="h-12 w-12 mx-auto mb-4 opacity-20" />
            <p className="text-lg font-medium">No vaults found</p>
            <p className="text-sm">Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>
    </div>
  );
};
