import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { cn } from "@/lib/utils";

export const EASE = [0.22, 1, 0.36, 1] as const;

/* ─── Reveal ──────────────────────────────────────────────────────────────────
   One wrapper, many entrance styles — each section picks a different one. */
type RevealVariant = "up" | "down" | "left" | "right" | "scale" | "blur" | "rotate" | "clip";

const revealVariants: Record<RevealVariant, Variants> = {
  up: { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0 } },
  down: { hidden: { opacity: 0, y: -40 }, show: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: -60 }, show: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 60 }, show: { opacity: 1, x: 0 } },
  scale: { hidden: { opacity: 0, scale: 0.85 }, show: { opacity: 1, scale: 1 } },
  blur: { hidden: { opacity: 0, filter: "blur(14px)", y: 20 }, show: { opacity: 1, filter: "blur(0px)", y: 0 } },
  rotate: { hidden: { opacity: 0, rotate: -6, y: 40 }, show: { opacity: 1, rotate: 0, y: 0 } },
  clip: {
    hidden: { clipPath: "inset(100% 0% 0% 0% round 28px)" },
    show: { clipPath: "inset(0% 0% 0% 0% round 28px)" },
  },
};

interface RevealProps {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  className?: string;
  amount?: number;
}

export const Reveal = ({ children, variant = "up", delay = 0, duration = 0.8, className, amount = 0.25 }: RevealProps) =>
  variant === "clip" ? (
    // A fully clipped element counts as invisible to IntersectionObserver in Chromium, so an
    // unclipped outer wrapper watches the viewport and the inner element runs the clip animation.
    <motion.div className={className} initial="hidden" whileInView="show" viewport={{ once: true, amount }}>
      <motion.div variants={revealVariants.clip} transition={{ duration, delay, ease: EASE }}>
        {children}
      </motion.div>
    </motion.div>
  ) : (
  <motion.div
    className={className}
    variants={revealVariants[variant]}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount }}
    transition={{ duration, delay, ease: EASE }}
  >
    {children}
  </motion.div>
);

/* ─── Stagger ─────────────────────────────────────────────────────────────── */
export const Stagger = ({
  children,
  className,
  stagger = 0.1,
  delay = 0,
  amount = 0.2,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  amount?: number;
}) => (
  <motion.div
    className={className}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount }}
    variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
  >
    {children}
  </motion.div>
);

export const StaggerItem = ({
  children,
  className,
  variant = "up",
}: {
  children: ReactNode;
  className?: string;
  variant?: RevealVariant;
}) => (
  <motion.div className={className} variants={revealVariants[variant]} transition={{ duration: 0.7, ease: EASE }}>
    {children}
  </motion.div>
);

/* ─── SplitText — words rise out of a mask one after another ──────────────── */
export const SplitText = ({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.06,
  inView = false,
}: {
  text: string;
  className?: string;
  wordClassName?: (word: string, i: number) => string | undefined;
  delay?: number;
  stagger?: number;
  inView?: boolean;
}) => {
  const words = text.split(" ");
  const trigger = inView
    ? { initial: "hidden", whileInView: "show", viewport: { once: true, amount: 0.5 } }
    : { initial: "hidden", animate: "show" };
  return (
    <motion.span
      className={cn("inline", className)}
      aria-label={text}
      {...trigger}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`} aria-hidden className="inline-block overflow-hidden pb-[0.22em] -mb-[0.22em] pr-[0.04em] -mr-[0.04em] align-bottom">
          <motion.span
            className={cn("inline-block", wordClassName?.(word, i))}
            variants={{ hidden: { y: "110%", rotate: 4 }, show: { y: "0%", rotate: 0 } }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && " "}
        </span>
      ))}
    </motion.span>
  );
};

/* ─── Counter — counts up when scrolled into view ─────────────────────────── */
export const Counter = ({ to, suffix = "", duration = 2 }: { to: number; suffix?: string; duration?: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration,
      ease: EASE,
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {value}
      {suffix}
    </span>
  );
};

/* ─── Marquee — infinite ticker ───────────────────────────────────────────── */
export const Marquee = ({
  children,
  reverse = false,
  className,
}: {
  children: ReactNode;
  reverse?: boolean;
  className?: string;
}) => (
  <div className={cn("group relative flex overflow-hidden", className)}>
    <div
      className={cn(
        "flex w-max shrink-0 items-center group-hover:[animation-play-state:paused]",
        reverse ? "animate-marquee-reverse" : "animate-marquee",
      )}
    >
      <div className="flex shrink-0 items-center">{children}</div>
      <div className="flex shrink-0 items-center" aria-hidden>
        {children}
      </div>
    </div>
  </div>
);

/* ─── TiltCard — 3D tilt that follows the cursor ──────────────────────────── */
export const TiltCard = ({ children, className, max = 10 }: { children: ReactNode; className?: string; max?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(y, [0, 1], [max, -max]), { stiffness: 200, damping: 18 });
  const rotateY = useSpring(useTransform(x, [0, 1], [-max, max]), { stiffness: 200, damping: 18 });
  const glareX = useTransform(x, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(y, [0, 1], ["0%", "100%"]);
  const glare = useTransform(
    [glareX, glareY],
    ([gx, gy]) => `radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.28), transparent 55%)`,
  );

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width);
    y.set((e.clientY - r.top) / r.height);
  };
  const reset = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className={cn("relative [transform-style:preserve-3d]", className)}
    >
      {children}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: glare }}
      />
    </motion.div>
  );
};

/* ─── ParallaxImage — image drifts slower than the page ───────────────────── */
export const ParallaxImage = ({
  src,
  alt,
  className,
  imgClassName,
  strength = 60,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  strength?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-strength, strength]);
  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        style={{ y, scale: 1.2 }}
        className={cn("h-full w-full object-cover", imgClassName)}
      />
    </div>
  );
};

/* ─── Magnetic — element leans toward the cursor ──────────────────────────── */
export const Magnetic = ({ children, className, strength = 0.35 }: { children: ReactNode; className?: string; strength?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 250, damping: 15 });
  const y = useSpring(0, { stiffness: 250, damping: 15 });
  return (
    <motion.div
      ref={ref}
      className={cn("inline-block", className)}
      style={{ x, y }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
};
