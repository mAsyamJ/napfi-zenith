import { useState } from "react";
import { Search, Filter, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { VaultCard } from "./VaultCard";
import vaultsData from "@/data/mockVaults.json";

export const VaultsExplorer = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredVaults = vaultsData.filter((vault) =>
    vault.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Vaults Explorer</h2>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search vaults..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-background border-border w-64 pl-10 focus:border-primary transition-colors"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2 bg-background border-border">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span>Filters</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-card border-border w-48 p-3">
              <p className="text-sm font-semibold mb-2">Risk Level</p>
              <div className="space-y-2 mb-3">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" className="rounded" />
                  <span>Low</span>
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" className="rounded" />
                  <span>Medium</span>
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" className="rounded" />
                  <span>High</span>
                </label>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2 bg-background border-border">
                <span>Highest APY</span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-card border-border">
              <DropdownMenuItem className="text-primary">Highest APY</DropdownMenuItem>
              <DropdownMenuItem>Lowest Risk</DropdownMenuItem>
              <DropdownMenuItem>Highest TVL</DropdownMenuItem>
              <DropdownMenuItem>Recently Added</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="w-full space-y-0 bg-card rounded-lg overflow-hidden border border-border">
        {filteredVaults.map((vault) => (
          <VaultCard 
            key={vault.id} 
            name={vault.name}
            token={vault.token}
            network={vault.network}
            apy={vault.apy}
            tvl={vault.tvl}
            risk={vault.risk as "low" | "medium" | "high"}
          />
        ))}
      </div>
    </div>
  );
};
