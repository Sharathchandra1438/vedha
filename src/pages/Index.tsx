import { useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight, Award, Clock, MapPin, Navigation, Phone, Sparkle, Utensils } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import HeroOrbit from "@/components/HeroOrbit";
import { PHONE_HREF } from "@/components/Navbar";
import { DIRECTIONS_URL } from "@/components/Footer";
import { Counter, EASE, Magnetic, Marquee, ParallaxImage, Reveal, SplitText, Stagger, StaggerItem, TiltCard } from "@/components/motion";
import { topCategories, totalDishes } from "@/data/menu";
import heroImg from "@/assets/hero-restaurant.jpeg";
import aboutImg from "@/assets/about-interior.jpeg";
import longTable from "@/assets/gallery-1.jpeg";
import aquarium from "@/assets/gallery-3.jpeg";
import booth from "@/assets/booth.webp";
import starter from "@/assets/starter.webp";
import dish1 from "@/assets/dish-1.webp";
import dish2 from "@/assets/dish-2.webp";
import dish3 from "@/assets/dish-3.webp";

const features = [
  { icon: Utensils, title: "Fine Dining", desc: "Exquisite multi-course meals crafted with passion" },
  { icon: Clock, title: "Timeless Recipes", desc: "Traditional flavors reimagined for the modern palate" },
  { icon: Award, title: "Award Winning", desc: "Recognized for culinary excellence and hospitality" },
];

const signatureDishes = [
  { img: dish1, name: "Shahi Paneer", desc: "Rich and creamy", price: "₹339", tag: "Curries" },
  { img: dish2, name: "Chicken Drumsticks", desc: "Crispy and flavorful", price: "₹329", tag: "Starters" },
  { img: dish3, name: "Mutton Keema Biryani", desc: "Spicy biryani with tender mutton", price: "₹459", tag: "Biryani" },
  { img: starter, name: "Indo-Chinese Starters", desc: "Wok-tossed, fiery and fresh", price: "from ₹189", tag: "Starters" },
];

const ambience = [
  { src: heroImg, title: "The Grand Hall", note: "Spacious seating for families & groups" },
  { src: booth, title: "Private Booths", note: "Cosy corners for quiet conversations" },
  { src: aquarium, title: "Aquarium Lounge", note: "A calm, green centrepiece" },
  { src: longTable, title: "The Long Table", note: "Built for big celebrations" },
  { src: aboutImg, title: "Lantern-lit Dining", note: "Warm, glowing evenings" },
];

/* ─── Hero ────────────────────────────────────────────────────────────────── */
const Hero = () => (
  <section className="grain relative overflow-hidden bg-secondary pb-28 pt-32 sm:pb-24 lg:min-h-screen lg:pt-36">
    <div aria-hidden className="bg-dots-dark absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
    <div aria-hidden className="absolute -left-40 top-20 h-[28rem] w-[28rem] rounded-full bg-primary/25 blur-[140px]" />
    <div aria-hidden className="absolute -right-20 bottom-0 h-[24rem] w-[24rem] rounded-full bg-accent/15 blur-[140px]" />

    <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:px-8">
      <div className="text-center lg:text-left">
        <h1 className="font-display text-[2.45rem] font-semibold leading-[0.98] tracking-tight text-white sm:text-7xl xl:text-[5.6rem]">
          <SplitText
            text="Where every dish tells a story."
            delay={0.35}
            wordClassName={(w) => (w.startsWith("story") ? "italic font-normal text-brand-gradient pr-1" : undefined)}
          />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: EASE }}
          className="mx-auto mt-5 max-w-lg text-[0.95rem] leading-relaxed text-white/65 sm:mt-6 sm:text-lg lg:mx-0"
        >
          Heritage recipes, crafted with the finest ingredients and served with timeless elegance —
          at one of the largest restaurants in Sangareddy.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.05, ease: EASE }}
          className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start"
        >
          <Magnetic>
            <Link to="/menu" className="btn-primary group">
              Explore the Menu
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </Magnetic>
          <a href={DIRECTIONS_URL} target="_blank" rel="noreferrer" className="btn-ghost-dark">
            <Navigation size={16} /> Get Directions
          </a>
        </motion.div>

        <motion.dl
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 1.25 } } }}
          className="mx-auto mt-12 grid max-w-md grid-cols-3 divide-x divide-white/10 rounded-2xl border border-white/10 bg-white/[0.04] py-4 backdrop-blur lg:mx-0"
        >
          {[
            { value: <Counter to={Math.floor(totalDishes / 10) * 10} suffix="+" />, label: "Dishes" },
            { value: <Counter to={topCategories.length} />, label: "Categories" },
            { value: "7/7", label: "Days open" },
          ].map((s) => (
            <motion.div
              key={s.label}
              variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
              className="px-3 text-center"
            >
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-display text-xl font-semibold text-white sm:text-3xl">{s.value}</dd>
              <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/45 sm:text-[11px] sm:tracking-[0.18em]">{s.label}</p>
            </motion.div>
          ))}
        </motion.dl>
      </div>

      <div className="relative pb-24 sm:pb-0 lg:pl-6">
        <HeroOrbit />
      </div>
    </div>

    {/* Scroll cue */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.8 }}
      className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/40 lg:flex"
    >
      Scroll
      <span className="flex h-9 w-5 justify-center rounded-full border border-white/25 pt-1.5">
        <motion.span
          animate={{ y: [0, 10, 0], opacity: [1, 0.2, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="h-1.5 w-1 rounded-full bg-white/70"
        />
      </span>
    </motion.div>
  </section>
);

/* ─── Crossing ticker bands ───────────────────────────────────────────────── */
const Tickers = () => {
  const words = topCategories.map((c) => c.label);
  return (
    <section aria-hidden className="relative z-10 -mt-10 overflow-hidden py-10">
      <div className="-rotate-2 scale-105 bg-primary py-4 shadow-xl">
        <Marquee>
          {words.map((w) => (
            <span key={w} className="flex items-center gap-6 px-6 font-display text-xl italic text-white sm:text-3xl">
              {w}
              <Sparkle size={18} className="fill-accent text-accent" />
            </span>
          ))}
        </Marquee>
      </div>
      <div className="absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 rotate-2 scale-105 bg-secondary py-4">
        <Marquee reverse>
          {words.map((w) => (
            <span key={w} className="flex items-center gap-6 px-6 text-sm font-bold uppercase tracking-[0.3em] text-white/70">
              {w}
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

/* ─── Why Vedha — bento grid, blur-in stagger ─────────────────────────────── */
const WhyVedha = () => (
  <section className="section-padding relative bg-background">
    <div aria-hidden className="bg-dots absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />
    <div className="relative mx-auto max-w-6xl">
      <SectionHeading
        title="Crafted for every kind of craving"
        highlight={["craving"]}
        description="From quick highway stops to long family celebrations, every visit is built around great food and warm hospitality."
      />

      <Stagger className="grid auto-rows-[minmax(190px,auto)] grid-cols-1 gap-5 md:grid-cols-3" stagger={0.12}>
        <StaggerItem variant="blur" className="group relative overflow-hidden rounded-3xl md:col-span-2 md:row-span-2">
          <img src={heroImg} alt="Main dining hall at Hotel Vedha" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/30 to-transparent" />
          <div className="relative flex h-full min-h-[340px] flex-col justify-end p-7 sm:p-9">
            <h3 className="max-w-md font-display text-2xl font-semibold text-white sm:text-4xl">
              One of the largest restaurants in Sangareddy
            </h3>
            <p className="mt-3 max-w-md text-white/70">
              Designed with elegance and scale — a refined, welcoming space for families, travellers and food lovers.
            </p>
          </div>
        </StaggerItem>

        {features.map((f) => (
          <StaggerItem key={f.title} variant="blur">
            <div className="group relative h-full overflow-hidden rounded-3xl border border-border bg-card p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-[0_24px_60px_-24px_hsl(var(--primary)/0.35)]">
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/10 blur-2xl transition-transform duration-700 group-hover:scale-150" />
              <div className="relative grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary transition-all duration-500 group-hover:rotate-[-8deg] group-hover:bg-primary group-hover:text-white">
                <f.icon size={22} />
              </div>
              <h3 className="relative mt-6 font-display text-xl font-semibold sm:text-2xl">{f.title}</h3>
              <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
            </div>
          </StaggerItem>
        ))}

        <StaggerItem variant="blur" className="md:col-span-2">
          <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-3xl bg-secondary p-7 text-white sm:flex-row sm:items-center">
            <div aria-hidden className="absolute -left-10 top-0 h-40 w-40 rounded-full bg-primary/40 blur-3xl" />
            <div className="relative">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/50">Open every day</p>
              <p className="mt-2 font-display text-2xl sm:text-4xl">11:00 AM – 11:30 PM</p>
            </div>
            <a href={PHONE_HREF} className="btn-primary relative shrink-0">
              <Phone size={16} /> Call to Reserve
            </a>
          </div>
        </StaggerItem>
      </Stagger>
    </div>
  </section>
);

/* ─── Story — clip-path image reveal + spinning badge ─────────────────────── */
const Story = () => (
  <section className="section-padding overflow-hidden bg-muted/50">
    <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-2">
      <div className="relative">
        <Reveal variant="clip" duration={1.3}>
          <ParallaxImage src={aboutImg} alt="Vedha dining room" className="aspect-[4/5] rounded-[28px]" />
        </Reveal>

        {/* Rotating text badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5, ease: EASE }}
          className="absolute -right-4 -top-6 sm:-right-8"
        >
          <div className="relative grid h-32 w-32 place-items-center rounded-full bg-primary text-white shadow-2xl sm:h-36 sm:w-36">
            <motion.svg
              viewBox="0 0 100 100"
              className="absolute inset-0 h-full w-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            >
              <defs>
                <path id="badge-circle" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
              </defs>
              <text className="fill-white text-[9.5px] font-bold uppercase tracking-[0.2em]">
                <textPath href="#badge-circle">Hotel Vedha • Since 2026 • Sangareddy •</textPath>
              </text>
            </motion.svg>
            <Utensils size={26} />
          </div>
        </motion.div>

        {/* Floating info chip */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
          className="absolute -bottom-6 left-4 flex animate-float items-center gap-3 rounded-2xl border border-border bg-card/95 p-4 shadow-xl backdrop-blur sm:-left-8"
        >
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent/15 text-accent">
            <MapPin size={20} />
          </span>
          <span>
            <span className="block text-sm font-semibold">Mumbai Highway, NH 65</span>
            <span className="block text-xs text-muted-foreground">15 km from IIT Hyderabad</span>
          </span>
        </motion.div>
      </div>

      <div>
        <SectionHeading
          align="left"
          title="A legacy of flavor"
          highlight={["flavor"]}
          className="mb-8"
        />
        <Reveal variant="right" delay={0.1}>
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
            Vedha was born from a deep reverence for culinary traditions and a bold vision to redefine fine dining.
            Our chefs blend time-honored techniques with contemporary innovation, creating dishes that are as
            beautiful as they are unforgettable.
          </p>
        </Reveal>
        <Stagger className="mt-8 grid grid-cols-2 gap-4" delay={0.2}>
          {[
            { k: "April 8, 2026", v: "Doors opened" },
            { k: "15 km", v: "From Manjeera Dam" },
          ].map((s) => (
            <StaggerItem key={s.v} variant="scale" className="rounded-2xl border border-border bg-card p-5">
              <p className="font-display text-xl font-semibold text-primary sm:text-2xl">{s.k}</p>
              <p className="mt-1 text-sm text-muted-foreground">{s.v}</p>
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal variant="up" delay={0.3}>
          <Link to="/about" className="btn-outline group mt-9">
            Discover our story
            <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </Reveal>
      </div>
    </div>
  </section>
);

/* ─── Signature dishes — 3D tilt cards ────────────────────────────────────── */
const Signature = () => (
  <section className="section-padding bg-background">
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <SectionHeading
          align="left"
          title="Signature dishes"
          highlight={["Signature"]}
          description="Handcrafted with passion, our signature dishes showcase the essence of Vedha's culinary philosophy."
          className="mb-0"
        />
        <Reveal variant="left">
          <Link to="/menu" className="btn-primary group shrink-0">
            Full Menu <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>

      <Stagger className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4" stagger={0.12}>
        {signatureDishes.map((dish) => (
          <StaggerItem key={dish.name} variant="rotate">
            <TiltCard className="group h-full rounded-3xl">
              <div className="h-full overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-shadow duration-500 group-hover:shadow-[0_30px_60px_-25px_rgba(30,15,10,0.35)]">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={dish.img}
                    alt={dish.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-foreground backdrop-blur">
                    {dish.tag}
                  </span>
                  <span className="absolute bottom-4 right-4 rounded-full bg-primary px-3.5 py-1.5 text-sm font-bold text-white shadow-lg [transform:translateZ(40px)]">
                    {dish.price}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-semibold sm:text-xl">{dish.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{dish.desc}</p>
                </div>
              </div>
            </TiltCard>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  </section>
);

/* ─── Ambience — pinned section, horizontal scroll ────────────────────────── */
const Ambience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useLayoutEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      setDistance(Math.max(0, trackRef.current.scrollWidth - window.innerWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={sectionRef} className="relative bg-secondary" style={{ height: `calc(100vh + ${distance}px)` }}>
      <div className="grain sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div aria-hidden className="absolute right-0 top-0 h-96 w-96 rounded-full bg-primary/20 blur-[140px]" />
        <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            light
            align="left"
            title="Step inside Vedha"
            highlight={["inside"]}
            className="mb-10"
          />
        </div>

        <motion.div ref={trackRef} style={{ x }} className="flex w-max gap-6 pl-4 pr-10 sm:pl-6 lg:pl-[max(2rem,calc((100vw-72rem)/2+2rem))]">
          {ambience.map((a, i) => (
            <div
              key={a.title}
              className="group relative h-[52vh] w-[78vw] shrink-0 overflow-hidden rounded-3xl sm:w-[52vw] lg:w-[34vw]"
            >
              <img src={a.src} alt={a.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <span className="absolute left-5 top-5 font-display text-sm text-white/70">0{i + 1}</span>
              <div className="absolute inset-x-0 bottom-0 translate-y-2 p-6 transition-transform duration-500 group-hover:translate-y-0">
                <h3 className="font-display text-xl text-white sm:text-3xl">{a.title}</h3>
                <p className="mt-1 text-sm text-white/70">{a.note}</p>
              </div>
            </div>
          ))}
          <Link
            to="/gallery"
            className="group grid h-[52vh] w-[60vw] shrink-0 place-items-center rounded-3xl border border-white/15 bg-white/[0.04] text-white transition-colors hover:bg-primary sm:w-[30vw] lg:w-[20vw]"
          >
            <span className="flex flex-col items-center gap-4 font-display text-xl sm:text-2xl">
              <span className="grid h-16 w-16 place-items-center rounded-full border border-white/30 transition-transform duration-500 group-hover:rotate-45 group-hover:scale-110">
                <ArrowUpRight size={26} />
              </span>
              View gallery
            </span>
          </Link>
        </motion.div>

        <div className="mx-auto mt-10 w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="h-px w-full bg-white/10">
            <motion.div style={{ width: progress }} className="h-px bg-primary" />
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─── CTA ─────────────────────────────────────────────────────────────────── */
const CallToAction = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.88, 1]);
  const radius = useTransform(scrollYProgress, [0, 1], [64, 32]);

  return (
    <section className="bg-background px-4 py-24 sm:px-6 lg:px-8">
      <motion.div
        ref={ref}
        style={{ scale, borderRadius: radius }}
        className="grain relative mx-auto max-w-6xl overflow-hidden bg-secondary px-6 py-20 text-center sm:px-12 sm:py-24"
      >
        <img src={heroImg} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-25" />
        <div aria-hidden className="absolute -bottom-32 left-1/2 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-primary/50 blur-[120px]" />
        <div className="relative">
          <h2 className="mx-auto max-w-3xl font-display text-[1.85rem] font-semibold leading-[1.08] text-white sm:text-6xl">
            <SplitText
              text="Your table on NH 65 is waiting."
              inView
              wordClassName={(w) => (w === "waiting." ? "italic font-normal text-brand-gradient pr-1" : undefined)}
            />
          </h2>
          <Reveal variant="up" delay={0.3}>
            <p className="mx-auto mt-5 max-w-xl text-[0.95rem] text-white/65 sm:text-base">
              Drop in for lunch, dinner or a family celebration — open daily from 11 AM to 11:30 PM.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Magnetic>
                <a href={PHONE_HREF} className="btn-primary">
                  <Phone size={16} /> Call to Reserve
                </a>
              </Magnetic>
              <a href={DIRECTIONS_URL} target="_blank" rel="noreferrer" className="btn-ghost-dark">
                <Navigation size={16} /> Get Directions
              </a>
            </div>
          </Reveal>
        </div>
      </motion.div>
    </section>
  );
};

const Index = () => (
  <>
    <Hero />
    <Tickers />
    <WhyVedha />
    <Story />
    <Signature />
    <Ambience />
    <CallToAction />
  </>
);

export default Index;
