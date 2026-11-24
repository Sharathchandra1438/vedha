import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import { EASE } from "@/components/motion";
import heroImg from "@/assets/hero-restaurant.jpeg";
import aboutImg from "@/assets/about-interior.jpeg";
import dish1 from "@/assets/dish-1.webp";
import dish2 from "@/assets/dish-2.webp";
import dish3 from "@/assets/dish-3.webp";
import starter from "@/assets/starter.webp";
import booth from "@/assets/booth.webp";
import aquarium from "@/assets/gallery-3.jpeg";
import longTable from "@/assets/gallery-1.jpeg";

type Category = "Food" | "Interiors";

const images: { src: string; alt: string; category: Category; tall?: boolean }[] = [
  { src: heroImg, alt: "The grand dining hall", category: "Interiors" },
  { src: dish1, alt: "Shahi Paneer", category: "Food" },
  { src: longTable, alt: "The long dining table", category: "Interiors", tall: true },
  { src: dish3, alt: "Mutton Keema Biryani in a copper handi", category: "Food" },
  { src: aboutImg, alt: "Lantern-lit dining room", category: "Interiors", tall: true },
  { src: dish2, alt: "Chicken Drumsticks", category: "Food" },
  { src: aquarium, alt: "Aquarium lounge", category: "Interiors" },
  { src: starter, alt: "Indo-Chinese starter", category: "Food" },
  { src: booth, alt: "Private booth seating", category: "Interiors" },
];

const filters = ["All", "Food", "Interiors"] as const;
type Filter = (typeof filters)[number];

const Gallery = () => {
  const [filter, setFilter] = useState<Filter>("All");
  const [selected, setSelected] = useState<number | null>(null);

  const visible = useMemo(() => (filter === "All" ? images : images.filter((i) => i.category === filter)), [filter]);

  const step = useCallback(
    (dir: 1 | -1) => setSelected((s) => (s === null ? s : (s + dir + visible.length) % visible.length)),
    [visible.length],
  );

  // Keyboard controls for the lightbox.
  useEffect(() => {
    if (selected === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [selected, step]);

  const current = selected !== null ? visible[selected] : null;

  return (
    <>
      <PageHero title="Gallery" subtitle="A look at our dishes, interiors and the spaces where memories are made." image={aquarium} />

      <section className="section-padding bg-background">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            title="A feast for the eyes"
            highlight={["feast"]}
            description="Explore the beauty of our dishes, interiors, and dining experiences."
          />

          {/* Filter chips with sliding highlight */}
          <LayoutGroup id="gallery-filter">
            <div className="mx-auto mb-12 flex w-fit gap-1 rounded-full border border-border bg-card p-1.5 shadow-sm">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`relative rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                    filter === f ? "text-white" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {filter === f && (
                    <motion.span layoutId="gallery-pill" className="absolute inset-0 rounded-full bg-secondary" transition={{ type: "spring", stiffness: 400, damping: 32 }} />
                  )}
                  <span className="relative">{f}</span>
                </button>
              ))}
            </div>
          </LayoutGroup>

          {/* Masonry-style grid — items re-flow with a layout animation when filtered */}
          <motion.div layout className="grid auto-rows-[220px] grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {visible.map((img, i) => (
                <motion.button
                  layout
                  key={img.src}
                  onClick={() => setSelected(i)}
                  initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.55, delay: i * 0.05, ease: EASE }}
                  className={`group relative overflow-hidden rounded-3xl text-left ${img.tall ? "row-span-2" : ""}`}
                  aria-label={`Open ${img.alt}`}
                >
                  <span className="block h-full w-full transition-transform duration-700 group-hover:scale-110">
                    <motion.img
                      layoutId={`photo-${img.src}`}
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute inset-x-0 bottom-0 flex translate-y-4 items-end justify-between gap-2 p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <span>
                      <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-accent">{img.category}</span>
                      <span className="block font-display text-lg leading-tight text-white">{img.alt}</span>
                    </span>
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/20 text-white backdrop-blur">
                      <Maximize2 size={15} />
                    </span>
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox — the photo morphs from its grid position */}
      <AnimatePresence>
        {current && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-secondary/95 p-4 backdrop-blur-md"
            onClick={() => setSelected(null)}
            role="dialog"
            aria-modal="true"
            aria-label={current.alt}
          >
            <button
              className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-primary"
              onClick={() => setSelected(null)}
              aria-label="Close"
            >
              <X size={22} />
            </button>
            <button
              className="absolute left-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-primary sm:left-6"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              aria-label="Previous photo"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              className="absolute right-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-primary sm:right-6"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              aria-label="Next photo"
            >
              <ChevronRight size={24} />
            </button>

            <figure className="flex max-h-full flex-col items-center" onClick={(e) => e.stopPropagation()}>
              <motion.img
                layoutId={`photo-${current.src}`}
                key={current.src}
                src={current.src}
                alt={current.alt}
                transition={{ duration: 0.5, ease: EASE }}
                className="max-h-[78vh] max-w-[88vw] rounded-2xl object-contain shadow-2xl"
              />
              <motion.figcaption
                key={`cap-${current.src}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-4 text-center text-white/80"
              >
                <span className="font-display text-lg text-white sm:text-xl">{current.alt}</span>
                <span className="ml-3 text-sm text-white/50">
                  {(selected ?? 0) + 1} / {visible.length}
                </span>
              </motion.figcaption>
            </figure>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Gallery;
