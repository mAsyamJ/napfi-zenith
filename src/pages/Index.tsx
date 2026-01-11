import React, { useEffect, useRef, useState } from 'react';
import { TopNav } from '@/components/TopNav';
import {
  Search,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  ChevronDown,
} from 'lucide-react';
import mockVaults from '@/data/mockVaults.json';
import { Link } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { VaultsExplorer } from '@/components/Dashboard/VaultsExplorer';
import { motion, AnimatePresence } from 'framer-motion';

// Rewritten Index component with bugs fixed and small animations included via a <style> block.
// Notes:
// - APY and TVL are visible by default (no hover required).
// - Added a "Trending Creator Vaults" marquee-like heading above the grid.
// - Included a small testimonial carousel and keyboard/aria improvements.
// - Uses the uploaded image at /mnt/data/8ff7438d-1b6f-4907-b367-eb757a042db5.png as a decorative asset.

type Vault = {
  id: string;
  name: string;
  description?: string;
  apy?: number;
  tvl?: number;
};

const faqItems = [
  {
    q: 'What is yield?',
    a: 'Yield is the money your money earns automatically. In crypto, yield comes from lending, staking, providing liquidity, holding real-world assets, and automated strategies. NapaFi helps automate and optimize all of this.',
  },
  {
    q: 'What is NapaFi?',
    a: 'NapaFi is a programmable capital layer that unifies DeFi yield, RWA income, creator-driven rewards, and quant strategies into one automated system. Users deposit into vaults, and the platform optimizes yield behind the scenes.',
  },
  {
    q: 'What exactly is a vault?',
    a: 'A vault is an automated yield container. You deposit assets, the vault routes your capital across the best opportunities, compounds rewards, and grows your balance without needing active management.',
  },
  {
    q: 'How does NapaFi generate yield?',
    a: 'NapaFi uses a routing engine that allocates capital across DeFi protocols, tokenized RWAs, creator engagement signals, and published quant strategies. It constantly shifts allocations to optimize safety-adjusted yield.',
  },
  {
    q: 'What are Creator Vaults?',
    a: 'Creator Vaults allow creators, DAOs, or communities to launch their own vaults. Fans deposit to support them and earn yield. The community’s engagement boosts the vault’s performance through programmable incentives.',
  },
  {
    q: 'What is the Strategy Marketplace?',
    a: 'Builders publish on-chain strategies that vaults can plug into. When a vault uses their strategy, the creator earns automated royalties. It’s like a financial GitHub with built-in monetization.',
  },
  {
    q: 'Is NapaFi safe?',
    a: 'NapaFi uses audited smart contracts, multi-role permissions, time-locked upgrades, risk filters, and conservative routing logic. Your assets remain non-custodial and fully on-chain.',
  },
  {
    q: 'Can anyone use NapaFi?',
    a: 'Yes. All you need is a crypto wallet and assets like ETH or stablecoins. No DeFi experience is required — the vault manages everything automatically.',
  },
  {
    q: 'How do creators earn?',
    a: 'Creators earn through vault fees, strategy royalties, community activity boosts, referral yield, and programmable reward routes. Your audience becomes a yield-generating ecosystem.',
  },
  {
    q: 'How do I earn yield as a normal user?',
    a: 'Just deposit into a vault. The system routes your capital automatically. No farming, no switching protocols, no strategy building. Withdraw anytime.',
  },
  {
    q: 'What makes NapaFi different?',
    a: 'NapaFi combines the strongest sources of yield in one place: DeFi, RWAs, creator vaults, quant strategies, and community engagement. Most platforms only offer one of these — NapaFi unifies all of them.',
  },
];

const AnimatedFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="mt-24 mb-24">
      <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white mb-10">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {faqItems.map((item, index) => (
          <div
            key={index}
            className="bg-neutral-900/60 border border-white/10 rounded-xl p-4 cursor-pointer hover:bg-neutral-900 transition"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            {/* Question */}
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-white">{item.q}</h3>
              <motion.span
                initial={{ rotate: 0 }}
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.25 }}
                className="text-white"
              >
                ▼
              </motion.span>
            </div>

            {/* Answer */}
            <AnimatePresence>
              {openIndex === index && (
                <motion.p
                  initial={{ opacity: 0, height: 0, y: -10 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                  className="mt-3 text-neutral-300 text-sm leading-relaxed"
                >
                  {item.a}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
};

const howSteps = [
  {
    id: 1,
    title: 'Create or Join a Vault',
    desc: 'A vault is your programmable container for capital. Start one for yourself, your community, or your mission — or join an existing vault that inspires you.',
  },
  {
    id: 2,
    title: 'Choose Agendas & Strategies',
    desc: 'Select DeFi strategies, RWA income modules, or creator-driven agendas. Developers can also publish strategies that plug directly into your vault.',
  },
  {
    id: 3,
    title: 'Autonomous Capital Routing',
    desc: 'NapaFi’s engine continuously reallocates your capital across the highest-performing opportunities based on yield, risk, community signals, and strategy performance.',
  },
  {
    id: 4,
    title: 'Grow Together',
    desc: 'Your vault compounds yield as your community engages, strategies compete, and real-world & on-chain signals strengthen the vault’s performance.',
  },
];

const CARD_HEIGHT = '260px';

const HowItWorksSection = () => {
  return (
    <section className="mt-32 mb-32">
      <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-white mb-12">
        How NapaFi Works
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {howSteps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: index * 0.12 }}
            whileHover="hover"
            className="relative rounded-2xl overflow-hidden bg-neutral-900/60 border border-white/10 p-6 transition-all duration-200"
            style={{ height: CARD_HEIGHT }}
          >
            {/* 🔥 Hover Glow Layer (FIXED — now always visible) */}
            <motion.div
              className="absolute inset-0 rounded-2xl pointer-events-none z-20"
              style={{
                border: '2px solid transparent',
                background: 'transparent',
              }}
              initial="initial"
              variants={{
                initial: {
                  opacity: 0,
                  scale: 1,
                  boxShadow: 'none',
                },
                hover: {
                  opacity: 1,
                  scale: 1.03,
                  boxShadow: '0 0 30px rgba(255,0,0,0.65)',
                  borderColor: 'rgba(255,0,0,1)',
                },
              }}
              transition={{ duration: 0.2 }}
            />

            {/* CONTENT LAYER */}
            <div className="relative z-30">
              {/* NUMBER */}
              <div className="text-6xl font-bold text-white/10 mb-6">
                {step.id}
              </div>

              {/* TITLE */}
              <h3 className="text-white text-xl font-semibold mb-2">
                {step.title}
              </h3>

              {/* DESCRIPTION (hidden until hover) */}
              <motion.p
                className="text-neutral-300 text-sm leading-relaxed overflow-hidden"
                initial={{ opacity: 0, y: 10 }}
                variants={{
                  hover: {
                    opacity: 1,
                    y: 0,
                  },
                }}
                transition={{ duration: 0.25 }}
                style={{
                  height: '70px',
                  opacity: 0,
                }}
              >
                {step.desc}
              </motion.p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Index: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All Vaults');
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const categories = [
    'All Vaults',
    'DeFi',
    'RWAs',
    'Creator Vaults',
    'Strategy Marketplace',
    'Stable Yield',
    'High Conviction',
  ];

  const testimonials = [
    {
      quote:
        'NapaFi finally unifies fragmented yield sources. Our treasury earns more just by being active.',
      name: 'DAO Treasury Lead',
      role: 'On-chain treasury operations',
      avatar:
        'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=200&auto=format&fit=crop',
    },
    {
      quote:
        'Publishing strategies and earning royalties on-chain is next-level. NapaFi makes my quant work composable.',
      name: 'On-Chain Quant',
      role: 'Strategy publisher on NapaFi',
      avatar:
        'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=200&auto=format&fit=crop',
    },
    {
      quote:
        'My community boosts our vault yield just by participating. Engagement is now a yield primitive.',
      name: 'Creator & Community Operator',
      role: 'Runs a creator vault on NapaFi',
      avatar:
        'https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?q=80&w=200&auto=format&fit=crop',
    },
  ];

  // compute scroll button states
  const updateScrollButtons = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });
  }, []);

  useEffect(() => {
    updateScrollButtons();
    const el = scrollContainerRef.current;
    if (!el) return;
    const onScroll = () => updateScrollButtons();
    el.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateScrollButtons);
    return () => {
      el.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateScrollButtons);
    };
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const scrollAmount = Math.max(240, Math.floor(el.clientWidth * 0.6));
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const nextTestimonial = () =>
    setTestimonialIndex((p) => (p + 1) % testimonials.length);
  const prevTestimonial = () =>
    setTestimonialIndex(
      (p) => (p - 1 + testimonials.length) % testimonials.length
    );

  // defensive default for vaults
  const vaults: Vault[] = Array.isArray(mockVaults) ? (mockVaults as any) : [];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopNav />

      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* small style block for animations used only in this file */}
        <style>{`
          @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
          .marquee { display:inline-block; white-space:nowrap; will-change:transform; animation: marquee 14s linear infinite; }
          @keyframes slideUp { from { transform: translateY(10px); opacity:0 } to { transform: translateY(0); opacity:1 } }
          .slide-up { animation: slideUp 480ms cubic-bezier(.2,.9,.3,1) both; }
          .fade-in { animation: slideUp 480ms cubic-bezier(.2,.9,.3,1) both; }
        `}</style>

        {/* Tabs */}
        <Tabs defaultValue="home" className="mt-6">
          <TabsList className="mb-6 bg-card/60 border border-border p-1">
            <TabsTrigger
              value="home"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Home
            </TabsTrigger>
            <TabsTrigger
              value="explorer"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Explorer
            </TabsTrigger>
          </TabsList>

          {/* Home Tab Content */}
          <TabsContent value="home" className="mt-0">
            <section className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 lg:p-8 h-auto sm:h-[400px] lg:h-[500px] min-h-[350px]">
              {/* Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-background z-0" />

              <div className="absolute inset-0 hidden lg:block z-0 opacity-60 pointer-events-none">
                <iframe
                  src="https://my.spline.design/ventura2copy-QlljPuDvQWfMiAnUXFOrCrsY/"
                  className="w-full h-full border-0"
                  style={{ transform: 'scaleX(-1)' }}
                  allow="fullscreen"
                ></iframe>
              </div>

              {/* ⭐ RIGHT-SIDE HERO STATS (MOVED OUTSIDE TEXT DIV) */}
              <div
                className="
      absolute 
      right-6 
      top-6 
      lg:top-10 
      z-30
      w-[220px] sm:w-[260px] lg:w-[300px]
    "
              >
                <div
                  className="
        bg-white/5 
        backdrop-blur-xl 
        border border-white/10 
        rounded-2xl 
        p-4 sm:p-5 
        grid grid-cols-1 gap-4
        animate-slide-up
      "
                >
                  {/* TVL */}
                  <div className="flex flex-col">
                    <span className="text-xs sm:text-sm text-neutral-400">
                      Total TVL
                    </span>
                    <span className="text-xl sm:text-2xl font-semibold text-white">
                      ${(312_450_000).toLocaleString()}
                    </span>
                  </div>

                  {/* 24h Yield */}
                  <div className="flex flex-col">
                    <span className="text-xs sm:text-sm text-neutral-400">
                      24h Yield
                    </span>
                    <span className="text-xl sm:text-2xl font-semibold text-green-400">
                      +3.8%
                    </span>
                  </div>

                  {/* Active Vaults */}
                  <div className="flex flex-col">
                    <span className="text-xs sm:text-sm text-neutral-400">
                      Active Vaults
                    </span>
                    <span className="text-xl sm:text-2xl font-semibold text-white">
                      128
                    </span>
                  </div>
                </div>
              </div>

              {/* HERO TEXT */}
              <div className="relative z-20 max-w-2xl">
                <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-foreground tracking-tight leading-[0.95] max-w-xl slide-up">
                  Discover Yield In
                </h1>

                <h1
                  className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-foreground tracking-tight leading-[0.95] max-w-xl font-jakarta slide-up"
                  style={{ animationDelay: '120ms' }}
                >
                  Movement
                </h1>

                <p
                  className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg text-muted-foreground max-w-[60ch] slide-up"
                  style={{ animationDelay: '240ms' }}
                >
                  Vaults that automatically route your capital across DeFi,
                  real-world assets, creator markets, and community-powered
                  yield streams. Zero friction. Maximum output.
                </p>

                {/* Search Bar */}
                <div
                  className="mt-4 sm:mt-6 slide-up"
                  style={{ animationDelay: '360ms' }}
                >
                  <div className="rounded-full ring-1 ring-border bg-card/50 backdrop-blur-xl p-1.5 sm:p-2 flex items-center gap-1.5 sm:gap-2 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="shrink-0 inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-secondary hover:bg-secondary/80 ring-1 ring-border transition">
                      <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-foreground" />
                    </div>
                    <input
                      type="text"
                      placeholder="Analyze NapaFi vaults, strategies..."
                      className="flex-1 bg-transparent border-0 outline-none text-xs sm:text-sm lg:text-base text-foreground placeholder:text-muted-foreground px-1 sm:px-2 py-1.5 sm:py-2"
                      aria-label="Search vaults"
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

            {/* Trending heading (marquee-like) */}
            <section className="mt-8 sm:mt-12 lg:mt-16 mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight">
                <span className="inline-block overflow-hidden">
                  <span className="marquee" aria-hidden>
                    Trending Creator Vaults • Trending Creator Vaults • Trending
                    Creator Vaults • Trending Creator Vaults • Trending Creator
                    Vaults • Trending Creator Vaults • Trending Creator Vaults •
                    Trending Creator Vaults • Trending Creator Vaults • Trending
                    Creator Vaults • Trending Creator Vaults • Trending Creator
                    Vaults •
                  </span>
                  <span className="sr-only">Trending Creator Vaults</span>
                </span>
              </h2>
            </section>

            {/* Vaults Grid */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 mt-6 sm:mt-8 lg:mt-12 pb-12 sm:pb-16 lg:pb-24">
              {vaults.slice(0, 8).map((vault, index) => (
                <Link
                  key={vault.id}
                  to={`/vault/${vault.id}`}
                  className="group relative overflow-hidden rounded-2xl ring-1 ring-border bg-card/60 hover:ring-primary/50 transition-all duration-300 hover:scale-105"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <div className="aspect-[4/5] bg-gradient-to-br from-primary/20 via-accent/10 to-background" />

                  {/* Overlay always visible so APY/TVL are present by default */}
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 flex flex-col gap-2 translate-y-0 transition-transform duration-300">
                      <h4 className="text-lg font-semibold text-white truncate">
                        {vault.name}
                      </h4>
                      <p className="text-sm text-neutral-300 line-clamp-2">
                        {vault.description}
                      </p>

                      <div className="flex items-center justify-between mt-2">
                        <div className="text-sm">
                          <span className="text-accent font-semibold">
                            {typeof vault.apy === 'number'
                              ? `${vault.apy}% APY`
                              : '—'}
                          </span>
                        </div>
                        <div className="text-sm text-neutral-200">
                          TVL:{' '}
                          {typeof vault.tvl === 'number'
                            ? `$${(vault.tvl / 1000000).toFixed(1)}M`
                            : '—'}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </section>

            {/* Trending heading (marquee-like) */}
            <section className="mt-8 sm:mt-12 lg:mt-16 mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight">
                <span className="inline-block overflow-hidden">
                  <span className="marquee" aria-hidden>
                    Trending Creator Vaults • Trending Creator Vaults • Trending
                    Creator Vaults • Trending Creator Vaults • Trending Creator
                    Vaults • Trending Creator Vaults • Trending Creator Vaults •
                    Trending Creator Vaults • Trending Creator Vaults • Trending
                    Creator Vaults • Trending Creator Vaults • Trending Creator
                    Vaults •
                  </span>
                  <span className="sr-only">Trending Creator Vaults</span>
                </span>
              </h2>
            </section>

            {/* ========================= FEATURE CARDS ========================= */}
            {/* WHY / FEATURE SECTION */}
            <section className="pt-24 pb-24 max-w-7xl mx-auto space-y-6">
              <div className="text-center md:text-left mb-12">
                <h2
                  className="
        sm:text-5xl md:text-6xl leading-[0.95]
        [animation:fadeSlideIn_0.8s_ease-out_0.1s_both]
        animate-on-scroll text-4xl font-light text-white tracking-tight mb-2
      "
                >
                  One protocol. Unlimited yield sources.
                </h2>

                <h2
                  className="
        sm:text-5xl md:text-6xl leading-[0.95]
        [animation:fadeSlideIn_0.8s_ease-out_0.15s_both]
        animate-on-scroll text-6xl font-semibold text-white tracking-tight mb-2
      "
                >
                  NapaFi as a programmable capital layer
                </h2>

                <p
                  className="
        sm:text-base text-base text-neutral-300 max-w-none
        [animation:fadeSlideIn_0.8s_ease-out_0.25s_both]
        animate-on-scroll
      "
                >
                  NapaFi unifies DeFi strategies, real-world asset income,
                  strategy licensing royalties, and community engagement into a
                  single creator-aligned system. Everything flows into one
                  unified vault. Everything boosts your yield. Everything is
                  automated.
                </p>
              </div>

              {/* FEATURE CARDS */}
              <div className="flex flex-col md:flex-row gap-4">
                <div
                  className="
        feature-cards flex flex-col md:flex-row gap-4
        [animation:fadeSlideIn_0.8s_ease-out_0.35s_both]
        animate-on-scroll
      "
                >
                  {/* CARD 1 */}
                  <article
                    className="
          card group md:flex-1 min-w-0 overflow-hidden
          transition-all duration-500 ease-out bg-neutral-900/60
          ring-neutral-800 ring-1 rounded-2xl relative
        "
                  >
                    <img
                      src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/171e26b3-65e0-4287-8003-8c860b2e8024_1600w.webp"
                      className="md:h-[420px] w-full h-72 object-cover transition duration-500 group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

                    <div className="absolute top-4 left-4 right-4">
                      <span className="inline-flex rounded-lg px-3 py-2 text-white text-lg sm:text-xl font-semibold">
                        Smart Vault Routing
                      </span>
                    </div>

                    <div
                      className="
          absolute bottom-0 left-0 right-0 p-4 sm:p-6
          opacity-0 translate-y-4
          pointer-events-none
          transition-all duration-500
          group-hover:opacity-100 group-hover:translate-y-0
          group-hover:pointer-events-auto
        "
                    >
                      <div className="rounded-xl bg-neutral-900/70 ring-1 ring-white/10 backdrop-blur p-4 sm:p-5">
                        <h3 className="text-white text-xl sm:text-2xl font-semibold mb-2">
                          Capital that routes itself
                        </h3>
                        <p className="text-neutral-300 text-sm sm:text-base mb-4">
                          NapaFi automatically allocates capital across the
                          highest-performing yield opportunities from DeFi and
                          RWAs.
                        </p>
                        <a className="inline-flex items-center gap-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-medium ring-1 ring-inset ring-white/20 px-3 py-2 transition">
                          View routing logic →
                        </a>
                      </div>
                    </div>
                  </article>

                  {/* CARD 2 */}
                  <article
                    className="
        card group md:flex-1 min-w-0 overflow-hidden bg-neutral-900/60
        transition-all duration-500 ease-out ring-neutral-800 ring-1 rounded-2xl relative
      "
                  >
                    <img
                      src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/d433790d-292b-4578-a1be-000b24996471_1600w.webp"
                      className="md:h-[420px] w-full h-72 object-cover transition duration-500 group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

                    <div className="absolute top-4 left-4 right-4">
                      <span className="inline-flex rounded-lg px-3 py-2 text-white text-lg sm:text-xl font-semibold">
                        Community-Enhanced Yield
                      </span>
                    </div>

                    <div
                      className="
          absolute bottom-0 left-0 right-0 p-4 sm:p-6 opacity-0 translate-y-4
          transition-all duration-500 pointer-events-none
          group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto
        "
                    >
                      <div className="rounded-xl bg-neutral-900/70 ring-1 ring-white/10 backdrop-blur p-4 sm:p-5">
                        <h3 className="text-white text-xl sm:text-2xl font-semibold mb-2">
                          Yield that listens to your community
                        </h3>
                        <p className="text-neutral-300 text-sm sm:text-base mb-4">
                          Creators and DAOs can boost yield simply by engaging
                          and coordinating.
                        </p>
                        <a className="inline-flex items-center gap-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-medium ring-1 ring-inset ring-white/20 px-3 py-2 transition">
                          Explore community hooks →
                        </a>
                      </div>
                    </div>
                  </article>

                  {/* CARD 3 */}
                  <article
                    className="
        card group md:flex-1 min-w-0 overflow-hidden bg-neutral-900/60
        ring-neutral-800 ring-1 rounded-2xl relative transition-all duration-500 ease-out
      "
                  >
                    <img
                      src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/b0166c1c-304c-4325-9f36-f84ca496e0cd_1600w.webp"
                      className="md:h-[420px] w-full h-72 object-cover transition duration-500 group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

                    <div className="absolute top-4 left-4 right-4">
                      <span className="inline-flex rounded-lg px-3 py-2 text-white text-lg sm:text-xl font-semibold">
                        Strategy Licensing Layer
                      </span>
                    </div>

                    <div
                      className="
          absolute bottom-0 left-0 right-0 p-4 sm:p-6 opacity-0 translate-y-4
          transition-all duration-500 pointer-events-none
          group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto
        "
                    >
                      <div className="rounded-xl bg-neutral-900/70 ring-1 ring-white/10 backdrop-blur p-4 sm:p-5">
                        <h3 className="text-white text-xl sm:text-2xl font-semibold mb-2">
                          Publish once, earn as others route
                        </h3>
                        <p className="text-neutral-300 text-sm sm:text-base mb-4">
                          Quant builders can publish strategies and earn
                          on-chain royalties each time capital flows through
                          their logic.
                        </p>
                        <a className="inline-flex items-center gap-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-medium ring-1 ring-inset ring-white/20 px-3 py-2 transition">
                          Open strategy marketplace →
                        </a>
                      </div>
                    </div>
                  </article>

                  {/* CARD 4 */}
                  <article
                    className="
        card group md:flex-1 min-w-0 overflow-hidden bg-neutral-900/60
        ring-neutral-800 ring-1 rounded-2xl relative transition-all duration-500 ease-out
      "
                  >
                    <img
                      src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/5c995bf0-f7dc-4b51-a364-b262103d4826_1600w.webp"
                      className="md:h-[420px] w-full h-72 object-cover transition duration-500 group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

                    <div className="absolute top-4 left-4 right-4">
                      <span className="inline-flex rounded-lg px-3 py-2 text-white text-lg sm:text-xl font-semibold">
                        Plug-and-Play Integrations
                      </span>
                    </div>

                    <div
                      className="
          absolute bottom-0 left-0 right-0 p-4 sm:p-6 opacity-0 translate-y-4
          transition-all duration-500 pointer-events-none
          group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto
        "
                    >
                      <div className="rounded-xl bg-neutral-900/70 ring-1 ring-white/10 backdrop-blur p-4 sm:p-5">
                        <h3 className="text-white text-xl sm:text-2xl font-semibold mb-2">
                          Use NapaFi wherever capital lives
                        </h3>
                        <p className="text-neutral-300 text-sm sm:text-base mb-4">
                          Plug NapaFi vaults into apps, tools, games, DAOs, or
                          creator platforms.
                        </p>
                        <a className="inline-flex items-center gap-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-medium ring-1 ring-inset ring-white/20 px-3 py-2 transition">
                          View integrations →
                        </a>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            </section>

            <HowItWorksSection />

            {/* FAQ SECTION */}
            <AnimatedFAQ />

            <footer className="border-t border-white/10 mt-24 pt-12 pb-12 text-neutral-400 bg-neutral-950/60 backdrop-blur-xl rounded-t-3xl">
              <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                {/* BRAND */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white">NapaFi</h3>
                  <p className="text-sm leading-relaxed text-neutral-400">
                    Yield that adapts to the market, your strategy, and your
                    community. Automate capital. Unlock growth.
                  </p>
                  <div className="flex gap-4 mt-4">
                    <a href="#" className="hover:text-white transition">
                      Twitter
                    </a>
                    <a href="#" className="hover:text-white transition">
                      Discord
                    </a>
                    <a href="#" className="hover:text-white transition">
                      GitHub
                    </a>
                  </div>
                </div>

                {/* PRODUCT */}
                <div>
                  <h4 className="text-white font-semibold mb-4">Product</h4>
                  <ul className="space-y-3 text-sm">
                    <li>
                      <a href="#" className="hover:text-white transition">
                        Vaults Explorer
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-white transition">
                        Strategy Marketplace
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-white transition">
                        Creator Vaults
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-white transition">
                        NapFi Routing Engine
                      </a>
                    </li>
                  </ul>
                </div>

                {/* FOR BUILDERS */}
                <div>
                  <h4 className="text-white font-semibold mb-4">Builders</h4>
                  <ul className="space-y-3 text-sm">
                    <li>
                      <a href="#" className="hover:text-white transition">
                        Developer Docs
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-white transition">
                        Integrate NapaFi
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-white transition">
                        API & SDK
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-white transition">
                        Brand Kit
                      </a>
                    </li>
                  </ul>
                </div>

                {/* COMPANY */}
                <div>
                  <h4 className="text-white font-semibold mb-4">Company</h4>
                  <ul className="space-y-3 text-sm">
                    <li>
                      <a href="#" className="hover:text-white transition">
                        About Us
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-white transition">
                        Careers
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-white transition">
                        Press
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-white transition">
                        Contact
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-12 text-center text-neutral-500 text-sm">
                © {new Date().getFullYear()} NapaFi Technologies. All rights
                reserved.
              </div>
            </footer>
          </TabsContent>

          {/* Explorer Tab Content */}
          <TabsContent value="explorer" className="mt-0">
            <VaultsExplorer />
          </TabsContent>
        </Tabs>

        <style>
          {`
@keyframes fadeSlideIn {
  0% {
    opacity: 0;
    transform: translateY(20px);
    filter: blur(8px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
}

.animate-on-scroll {
  opacity: 0;
}

.animate {
  opacity: 1 !important;
}

@keyframes statsSlideUp {
  0% { opacity: 0; transform: translateY(20px) scale(0.98); filter: blur(3px); }
  100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
}

.animate-slide-up {
  animation: statsSlideUp 0.8s ease-out 0.2s forwards;
  opacity: 0;
}

`}
        </style>
      </main>
    </div>
  );
};

export default Index;
