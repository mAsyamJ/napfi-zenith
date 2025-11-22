import { TopNav } from "@/components/TopNav";
import Starfield from "@/components/Starfield";
import { Search } from "lucide-react";
import mockVaults from "@/data/mockVaults.json";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Starfield />
      <TopNav />
      
      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-2xl border border-border mt-6 p-6 sm:p-8 h-[500px]">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-background" />
          
          <div className="relative z-10 max-w-2xl">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-light text-foreground tracking-tight leading-[0.95] max-w-xl">
              Discover Yield In
            </h1>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-semibold text-foreground tracking-tight leading-[0.95] max-w-xl font-jakarta">
              Movement
            </h1>
            <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-[60ch]">
              Vault that automatically routes your capital across DeFi, real‑world assets, creator markets, and community‑powered yield streams. Zero friction. Maximum output. While Nap.
            </p>

            {/* Search Bar */}
            <div className="mt-6">
              <div className="rounded-full ring-1 ring-border bg-card/50 backdrop-blur-xl p-2 flex items-center gap-2 shadow-lg">
                <div className="shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-full bg-secondary hover:bg-secondary/80 ring-1 ring-border transition">
                  <Search className="w-4 h-4 text-foreground" />
                </div>
                <input 
                  type="text" 
                  placeholder="Analyze NapaFi vaults, strategies, and unified yield..."
                  className="flex-1 bg-transparent border-0 outline-none text-sm sm:text-base text-foreground placeholder:text-muted-foreground px-2 py-2"
                />
                <button className="px-6 py-2 rounded-full bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] text-white font-semibold text-sm hover:bg-[position:100%_0] transition-all duration-500">
                  Analyze
                </button>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                Yield that adapts to the market and to your community.
              </p>
            </div>
          </div>
        </section>

        {/* Filter Toolbar */}
        <section className="mt-6 mb-5">
          <div className="bg-card/60 rounded-2xl ring-1 ring-border p-3">
            <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
              <div className="flex gap-2 overflow-x-auto scrollbar-none w-full md:w-auto">
                <button className="flex-none px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium whitespace-nowrap">
                  All Vaults
                </button>
                <button className="flex-none px-4 py-2 rounded-xl bg-secondary text-secondary-foreground hover:bg-secondary/80 text-sm font-medium whitespace-nowrap transition">
                  DeFi
                </button>
                <button className="flex-none px-4 py-2 rounded-xl bg-secondary text-secondary-foreground hover:bg-secondary/80 text-sm font-medium whitespace-nowrap transition">
                  RWAs
                </button>
                <button className="flex-none px-4 py-2 rounded-xl bg-secondary text-secondary-foreground hover:bg-secondary/80 text-sm font-medium whitespace-nowrap transition">
                  Creator Vaults
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Vaults Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-24">
          {mockVaults.slice(0, 8).map((vault) => (
            <Link 
              key={vault.id}
              to={`/vault/${vault.id}`}
              className="group relative overflow-hidden rounded-2xl ring-1 ring-border bg-card/60 hover:ring-primary/50 transition-all duration-300"
            >
              <div className="aspect-[4/5] bg-gradient-to-br from-primary/20 via-accent/10 to-background" />
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h4 className="text-lg font-semibold text-white">
                    {vault.name}
                  </h4>
                  <p className="text-sm text-neutral-300">
                    {vault.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <span className="text-accent font-semibold">{vault.apy}% APY</span>
                    </div>
                    <div className="text-sm text-neutral-400">
                      TVL: ${(vault.tvl / 1000000).toFixed(1)}M
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </section>
      </main>
    </div>
  );
};

export default Index;
