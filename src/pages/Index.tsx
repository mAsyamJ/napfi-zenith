import { TopNav } from "@/components/TopNav";
import { Search, ChevronLeft, ChevronRight, SlidersHorizontal, ChevronDown } from "lucide-react";
import mockVaults from "@/data/mockVaults.json";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { VaultsExplorer } from "@/components/Dashboard/VaultsExplorer";

const Index = () => {
  const [activeCategory, setActiveCategory] = useState("All Vaults");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const categories = [
    "All Vaults",
    "DeFi",
    "RWAs",
    "Creator Vaults",
    "Strategy Marketplace",
    "Stable Yield",
    "High Conviction"
  ];

  const updateScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
    }
  };

  useEffect(() => {
    updateScrollButtons();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', updateScrollButtons);
      return () => container.removeEventListener('scroll', updateScrollButtons);
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 250;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopNav />
      
      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tabs */}
        <Tabs defaultValue="home" className="mt-6">
          <TabsList className="mb-6 bg-card/60 border border-border p-1">
            <TabsTrigger value="home" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Home</TabsTrigger>
            <TabsTrigger value="explorer" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Explorer</TabsTrigger>
          </TabsList>

          {/* Home Tab Content */}
          <TabsContent value="home" className="mt-0">
            {/* Hero Section */}
            <section className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 lg:p-8 h-auto sm:h-[400px] lg:h-[500px] min-h-[350px]">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-background" />
          
          <div className="relative z-10 max-w-2xl">
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-foreground tracking-tight leading-[0.95] max-w-xl">
              Discover Yield In
            </h1>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-foreground tracking-tight leading-[0.95] max-w-xl font-jakarta">
              Movement
            </h1>
            <p className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg text-muted-foreground max-w-[60ch]">
              Vault that automatically routes your capital across DeFi, real‑world assets, creator markets, and community‑powered yield streams. Zero friction. Maximum output. While Nap.
            </p>

            {/* Search Bar */}
            <div className="mt-4 sm:mt-6">
              <div className="rounded-full ring-1 ring-border bg-card/50 backdrop-blur-xl p-1.5 sm:p-2 flex items-center gap-1.5 sm:gap-2 shadow-lg">
                <div className="shrink-0 inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-secondary hover:bg-secondary/80 ring-1 ring-border transition">
                  <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-foreground" />
                </div>
                <input 
                  type="text" 
                  placeholder="Analyze NapaFi vaults, strategies..."
                  className="flex-1 bg-transparent border-0 outline-none text-xs sm:text-sm lg:text-base text-foreground placeholder:text-muted-foreground px-1 sm:px-2 py-1.5 sm:py-2"
                />
                <button className="px-3 sm:px-6 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] text-white font-semibold text-xs sm:text-sm hover:bg-[position:100%_0] transition-all duration-500 whitespace-nowrap">
                  Analyze
                </button>
              </div>
              <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-muted-foreground">
                Yield that adapts to the market and to your community.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8 sm:mt-12 lg:mt-16 mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight">
            <span className="inline-block animate-slide-in">
              Trending Creator Vaults
            </span>
          </h2>
        </section>

            {/* Vaults Grid */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 mt-6 sm:mt-8 lg:mt-12 pb-12 sm:pb-16 lg:pb-24">
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
          </TabsContent>

          {/* Explorer Tab Content */}
          <TabsContent value="explorer" className="mt-0">
            <VaultsExplorer />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
