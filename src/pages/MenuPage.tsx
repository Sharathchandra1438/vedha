import { forwardRef, useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import PageHero from "@/components/PageHero";
import { EASE } from "@/components/motion";
import { menuData, topCategories, totalDishes, type MenuItem, type TopCategory } from "@/data/menu";
import dish3 from "@/assets/dish-3.webp";

// ─── Price Display Helper ─────────────────────────────────────────────────────
const PriceDisplay = ({ item }: { item: MenuItem }) => {
  if (item.price2 || item.price3) {
    const rows = [
      { label: item.price3 ? "Bachelor" : "", price: item.price },
      item.price2 && { label: item.priceLabel2 ?? "", price: item.price2 },
      item.price3 && { label: item.priceLabel3 ?? "", price: item.price3 },
    ].filter(Boolean) as { label: string; price: string }[];
    return (
      <div className="flex min-w-[120px] flex-col items-end gap-1">
        {rows.map((r) => (
          <div key={r.label + r.price} className="flex items-center gap-2">
            {r.label && (
              <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                {r.label}
              </span>
            )}
            <span className="font-display text-base font-semibold text-primary">{r.price}</span>
          </div>
        ))}
      </div>
    );
  }
  return <span className="whitespace-nowrap font-display text-base font-semibold text-primary sm:text-lg">{item.price}</span>;
};

const isSpecial = (name: string) => /vedha'?s/i.test(name);

// forwardRef so AnimatePresence's "popLayout" mode can measure each card as it leaves.
const ItemCard = forwardRef<HTMLDivElement, { item: MenuItem; index: number; context?: string }>(({ item, index, context }, ref) => (
  <motion.div
    ref={ref}
    layout
    initial={{ opacity: 0, y: 18, scale: 0.98 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, scale: 0.96 }}
    transition={{ duration: 0.4, delay: Math.min(index * 0.03, 0.4), ease: EASE }}
    className="group relative flex items-start justify-between gap-4 overflow-hidden rounded-2xl border border-border bg-card p-5 transition-[border-color,box-shadow] duration-300 hover:border-primary/30 hover:shadow-[0_16px_40px_-20px_hsl(var(--primary)/0.4)]"
  >
    <span className="absolute inset-y-0 left-0 w-1 origin-top scale-y-0 bg-primary transition-transform duration-300 group-hover:scale-y-100" />
    <div className="flex-1">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="font-display text-[0.95rem] font-semibold leading-snug sm:text-[1.05rem] text-foreground">{item.name}</h3>
        {isSpecial(item.name) && (
          <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent">
            House special
          </span>
        )}
      </div>
      {item.desc && <p className="mt-0.5 text-sm text-muted-foreground">{item.desc}</p>}
      {context && <p className="mt-1 text-xs font-medium text-muted-foreground">{context}</p>}
    </div>
    <PriceDisplay item={item} />
  </motion.div>
));
ItemCard.displayName = "ItemCard";

// ─── Component ────────────────────────────────────────────────────────────────
const MenuPage = () => {
  const [activeTop, setActiveTop] = useState<TopCategory>("soups");
  const [activeSub, setActiveSub] = useState<string>(menuData["soups"][0].sub);
  const [query, setQuery] = useState("");

  const handleTopChange = (key: TopCategory) => {
    setActiveTop(key);
    setActiveSub(menuData[key][0].sub);
  };

  const sections = menuData[activeTop];
  const hasSubs = sections.length > 1;
  const visibleItems = hasSubs ? sections.find((s) => s.sub === activeSub)?.items ?? [] : sections[0].items;

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;
    const results: { item: MenuItem; context: string }[] = [];
    for (const cat of topCategories) {
      for (const sec of menuData[cat.key]) {
        for (const item of sec.items) {
          if (item.name.toLowerCase().includes(q)) {
            results.push({ item, context: sec.sub === cat.label ? cat.label : `${cat.label} · ${sec.sub}` });
          }
        }
      }
    }
    return results;
  }, [query]);

  return (
    <>
      <PageHero
        title="Our Menu"
        subtitle={`${Math.floor(totalDishes / 10) * 10}+ dishes across ${topCategories.length} categories — from slow-cooked biryanis to sizzling tandoor.`}
        image={dish3}
      />

      <section className="bg-background px-4 pb-24 pt-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          {/* ── Search ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
            className="relative mx-auto mb-8 max-w-xl"
          >
            <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search dishes — biryani, paneer, soup…"
              aria-label="Search the menu"
              className="h-12 w-full rounded-full border border-border bg-card pl-12 pr-12 text-sm sm:h-14 shadow-sm outline-none transition-all placeholder:text-muted-foreground/70 focus:border-primary/40 focus:shadow-[0_0_0_4px_hsl(var(--primary)/0.12)]"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-4 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-primary hover:text-white"
              >
                <X size={14} />
              </button>
            )}
          </motion.div>

          {/* ── Sticky category bar ── */}
          <div className="sticky top-[96px] z-30 sm:top-[106px] -mx-4 mb-6 px-4 sm:mx-0 sm:px-0">
            <LayoutGroup id="top-cats">
              <div className="no-scrollbar flex gap-1 overflow-x-auto rounded-full border border-border bg-card/90 p-1.5 shadow-[0_10px_30px_-15px_rgba(30,15,10,0.25)] backdrop-blur-xl sm:flex-wrap sm:justify-center">
                {topCategories.map((cat) => {
                  const active = !searchResults && activeTop === cat.key;
                  return (
                    <button
                      key={cat.key}
                      onClick={() => {
                        setQuery("");
                        handleTopChange(cat.key);
                      }}
                      className={`relative shrink-0 rounded-full px-3.5 py-1.5 text-[13px] font-semibold sm:px-4 sm:py-2 sm:text-sm transition-colors duration-300 ${
                        active ? "text-white" : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {active && (
                        <motion.span
                          layoutId="menu-pill"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                          className="absolute inset-0 -z-0 rounded-full bg-primary shadow-[0_6px_16px_-6px_hsl(var(--primary)/0.8)]"
                        />
                      )}
                      <span className="relative">{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            </LayoutGroup>
          </div>

          {/* ── Sub-Category Tabs (shown only when multiple subs) ── */}
          <AnimatePresence initial={false}>
            {!searchResults && hasSubs && (
              <motion.div
                key={activeTop}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="overflow-hidden"
              >
                <LayoutGroup id="sub-cats">
                  <div className="mb-8 flex flex-wrap justify-center gap-2 pt-1">
                    {sections.map((sec) => {
                      const active = activeSub === sec.sub;
                      return (
                        <button
                          key={sec.sub}
                          onClick={() => setActiveSub(sec.sub)}
                          className={`relative rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors duration-300 ${
                            active ? "border-transparent text-primary" : "border-border text-muted-foreground hover:border-primary/40 hover:text-primary"
                          }`}
                        >
                          {active && (
                            <motion.span
                              layoutId="sub-pill"
                              transition={{ type: "spring", stiffness: 400, damping: 34 }}
                              className="absolute inset-0 rounded-full border border-primary/40 bg-primary/10"
                            />
                          )}
                          <span className="relative">{sec.sub}</span>
                        </button>
                      );
                    })}
                  </div>
                </LayoutGroup>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Heading for current view ── */}
          <div className="mb-5 flex items-end justify-between gap-4">
            <AnimatePresence mode="wait">
              <motion.h2
                key={searchResults ? `q-${query}` : `${activeTop}-${activeSub}`}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{ duration: 0.3 }}
                className="font-display text-2xl font-semibold sm:text-3xl"
              >
                {searchResults
                  ? `Results for “${query.trim()}”`
                  : `${topCategories.find((c) => c.key === activeTop)?.label}${hasSubs ? ` · ${activeSub}` : ""}`}
              </motion.h2>
            </AnimatePresence>
            <span className="shrink-0 text-sm text-muted-foreground">
              {(searchResults ?? visibleItems).length} items
            </span>
          </div>

          {/* ── Menu Items ── */}
          <motion.div layout className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {searchResults
                ? searchResults.map(({ item, context }, i) => (
                    <ItemCard key={`${context}-${item.name}`} item={item} index={i} context={context} />
                  ))
                : visibleItems.map((item, i) => <ItemCard key={`${activeTop}-${activeSub}-${item.name}`} item={item} index={i} />)}
            </AnimatePresence>
          </motion.div>

          {searchResults && searchResults.length === 0 && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-16 text-center text-muted-foreground">
              No dishes match “{query.trim()}”. Try another word.
            </motion.p>
          )}

          <p className="mt-10 text-center text-xs text-muted-foreground">
            All prices are in Indian Rupees (₹).
          </p>
        </div>
      </section>
    </>
  );
};

export default MenuPage;
