import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "@/components/motion";
// Square, dish-centred crops made for the circles (800×800) — see src/assets/orbit/.
import biryani from "@/assets/orbit/biryani.webp";
import paneer from "@/assets/orbit/paneer.webp";
import hall from "@/assets/orbit/hall.webp";
import kebab from "@/assets/orbit/kebab.webp";
import starter from "@/assets/orbit/starter.webp";
import aquarium from "@/assets/orbit/aquarium.webp";

export interface OrbitItem {
  src: string;
  name: string;
  tag: string;
}

export const orbitItems: OrbitItem[] = [
  { src: biryani, name: "Mutton Keema Biryani", tag: "Biryani" },
  { src: paneer, name: "Shahi Paneer", tag: "Curries" },
  { src: hall, name: "The Grand Hall", tag: "Ambience" },
  { src: kebab, name: "Chicken Drumsticks", tag: "Starters" },
  { src: starter, name: "Indo-Chinese Starters", tag: "Starters" },
  { src: aquarium, name: "Aquarium Lounge", tag: "Ambience" },
];

const RADIUS = 45; // % of the container — sits exactly on the dashed track (inset 5%)

/**
 * Circular hero gallery.
 * Photos ride a slowly rotating circular track. Hover (or tap / focus) a photo and it
 * takes the big centre stage while its name slides out to the right of a leader line.
 */
const HeroOrbit = () => {
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);

  // Auto-advance while the visitor isn't interacting.
  useEffect(() => {
    if (hovering) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % orbitItems.length), 3200);
    return () => window.clearInterval(id);
  }, [hovering]);

  const current = orbitItems[active];

  return (
    <div
      className={`relative mx-auto aspect-square w-full max-w-[min(540px,80vw)] ${hovering ? "orbit-paused" : ""}`}
      onMouseLeave={() => setHovering(false)}
    >
      {/* Soft glow behind the composition */}
      <div aria-hidden className="absolute inset-[12%] rounded-full bg-primary/30 blur-[70px]" />

      {/* Outer hairline + dashed track (the "line" the photos travel on) */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.3, ease: EASE }}
        className="absolute inset-0 rounded-full border border-white/[0.06]"
      />
      <svg
        aria-hidden
        viewBox="0 0 100 100"
        className="absolute inset-[5%] h-[90%] w-[90%] -rotate-90 overflow-visible"
      >
        <motion.circle
          cx="50"
          cy="50"
          r="49.6"
          fill="none"
          stroke="rgba(255,255,255,0.28)"
          strokeWidth="0.35"
          strokeDasharray="1.2 1.6"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.4, ease: EASE }}
        />
      </svg>

      {/* Centre stage */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, delay: 0.2, ease: EASE }}
        className="absolute inset-[21%] rounded-full p-[3px]"
        style={{
          background: "conic-gradient(from 0deg, hsl(var(--primary)), hsl(var(--accent)), transparent 60%, hsl(var(--primary)))",
        }}
      >
        <div className="relative h-full w-full overflow-hidden rounded-full bg-secondary">
          <AnimatePresence initial={false} mode="popLayout">
            <motion.img
              key={current.src}
              src={current.src}
              alt={current.name}
              initial={{ opacity: 0, scale: 1.25, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.9, rotate: 8 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </AnimatePresence>
          <div className="absolute inset-0 rounded-full shadow-[inset_0_0_30px_rgba(0,0,0,0.25)]" />
        </div>
      </motion.div>

      {/* Leader line + caption — slides out to the right of the line on every change */}
      <div className="pointer-events-none absolute left-[79%] top-1/2 z-20 hidden w-[27%] sm:block">
        <motion.span
          key={`dot-${active}`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className="absolute -left-1.5 -top-1.5 h-3 w-3 rounded-full bg-primary ring-4 ring-primary/25"
        />
        <motion.span
          key={`line-${active}`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="absolute left-0 top-0 h-px w-full origin-left bg-gradient-to-r from-primary to-white/60"
        />
      </div>
      <div className="pointer-events-none absolute left-1/2 top-[102%] z-20 w-56 -translate-x-1/2 sm:left-[calc(79%+0.75rem)] sm:top-[calc(50%+0.85rem)] sm:w-48 sm:translate-x-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: -24, filter: "blur(6px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: 16, filter: "blur(6px)" }}
            transition={{ duration: 0.45, ease: EASE }}
            className="rounded-2xl border border-white/15 bg-white/10 p-3 text-center sm:p-4 shadow-2xl backdrop-blur-xl sm:text-left"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-accent">{current.tag}</span>
            <p className="mt-1 font-display text-base leading-tight text-white sm:text-lg">{current.name}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Rotating ring of photos */}
      <div className="orbit-ring absolute inset-0 z-10">
        {orbitItems.map((item, i) => {
          const angle = ((-90 + (360 / orbitItems.length) * i) * Math.PI) / 180;
          const isActive = i === active;
          return (
            <motion.button
              key={item.name}
              type="button"
              aria-label={`Show ${item.name}`}
              aria-pressed={isActive}
              onMouseEnter={() => {
                setHovering(true);
                setActive(i);
              }}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 + i * 0.1, ease: EASE }}
              className="group absolute aspect-square w-[24%] rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              style={{
                left: `${50 + RADIUS * Math.cos(angle)}%`,
                top: `${50 + RADIUS * Math.sin(angle)}%`,
                x: "-50%",
                y: "-50%",
              }}
            >
              <span className="orbit-counter block h-full w-full">
                <span
                  className={`block h-full w-full overflow-hidden rounded-full border-[3px] bg-secondary shadow-[0_12px_30px_-8px_rgba(0,0,0,0.7)] transition-all duration-500 ${
                    isActive ? "scale-110 border-primary ring-4 ring-primary/30" : "border-white/70 hover:scale-105 hover:border-white"
                  }`}
                >
                  <img src={item.src} alt="" loading="eager" decoding="async" className="h-full w-full object-cover" />
                </span>
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default HeroOrbit;
