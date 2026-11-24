import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Gem, HandHeart, Landmark, Sparkles } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import { EASE, ParallaxImage, Reveal, Stagger, StaggerItem } from "@/components/motion";
import aboutImg from "@/assets/about-interior.jpeg";
import booth from "@/assets/booth.webp";
import longTable from "@/assets/gallery-1.jpeg";

const values = [
  { icon: Landmark, title: "Heritage", desc: "Rooted in centuries-old culinary traditions passed down through generations." },
  { icon: Sparkles, title: "Innovation", desc: "Pushing boundaries with modern techniques while honoring classic flavors." },
  { icon: Gem, title: "Quality", desc: "Only the finest seasonal ingredients sourced from trusted local producers." },
  { icon: HandHeart, title: "Hospitality", desc: "Every guest is family, deserving of warmth, care, and an exceptional experience." },
];

const milestones = [
  { k: "April 8, 2026", title: "Doors open", desc: "Hotel Vedha welcomes its first guests on the Mumbai Highway." },
  { k: "NH 65", title: "On the highway", desc: "One of the largest restaurants in Sangareddy, easy to reach for travellers." },
  { k: "15 km", title: "Close to it all", desc: "Within 15 km of Manjeera Dam and IIT Hyderabad." },
];

/** A paragraph whose words light up as it scrolls through the viewport. */
const ScrollLitText = ({ text }: { text: string }) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className="flex flex-wrap font-display text-2xl leading-snug sm:text-4xl lg:text-5xl">
      {words.map((w, i) => {
        const start = i / words.length;
        return <Word key={i} word={w} range={[start, start + 1 / words.length]} progress={scrollYProgress} />;
      })}
    </p>
  );
};

const Word = ({
  word,
  range,
  progress,
}: {
  word: string;
  range: [number, number];
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) => {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.25em]">
      {word}
    </motion.span>
  );
};

const About = () => {
  return (
    <>
      <PageHero title="About Us" subtitle="A new culinary destination celebrating India's rich heritage through a contemporary dining experience." image={longTable} />

      {/* Story */}
      <section className="section-padding bg-background">
        <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2">
          <div className="relative">
            <Reveal variant="clip" duration={1.3}>
              <ParallaxImage src={aboutImg} alt="Vedha dining room" className="aspect-[4/5] rounded-[28px]" />
            </Reveal>
            <Reveal variant="scale" delay={0.5} className="absolute -bottom-8 -right-4 w-40 sm:-right-10 sm:w-52">
              <img src={booth} alt="Private booth seating" loading="lazy" className="aspect-square w-full rounded-3xl border-4 border-background object-cover shadow-2xl" />
            </Reveal>
          </div>

          <div>
            <SectionHeading align="left" title="The Hotel Vedha story" highlight={["Vedha"]} className="mb-8" />
            <Stagger className="space-y-5 text-muted-foreground" stagger={0.15}>
              <StaggerItem variant="right">
                <p className="leading-relaxed">
                  Opening its doors on April 8th, 2026, Hotel Vedha is a new culinary destination born from a passion
                  to celebrate India's rich heritage through a contemporary dining experience. Every dish is crafted as
                  a tribute to the flavors that shaped our journey.
                </p>
              </StaggerItem>
              <StaggerItem variant="right">
                <p className="leading-relaxed">
                  Hotel Vedha proudly stands as one of the largest restaurants in Sangareddy, strategically located
                  on the bustling Mumbai Highway (National Highway 65). Designed with elegance and scale, our
                  space offers a refined and welcoming atmosphere for families, travelers, and food lovers.
                </p>
              </StaggerItem>
              <StaggerItem variant="right">
                <p className="leading-relaxed">
                  Conveniently situated within 15 kilometers of popular destinations like Manjeera Dam and
                  IIT Hyderabad, Hotel Vedha is perfectly positioned for those exploring the region. From carefully
                  curated dishes to a thoughtfully designed ambiance, every detail reflects our commitment to
                  delivering an exceptional dining experience from day one.
                </p>
              </StaggerItem>
            </Stagger>
          </div>
        </div>
      </section>

      {/* Scroll-lit statement */}
      <section className="section-padding bg-muted/50">
        <div className="mx-auto max-w-5xl">
          <ScrollLitText text="We believe a great meal is more than food — it is warmth, heritage and the joy of sharing a table with the people you love." />
        </div>
      </section>

      {/* Milestones — line draws itself */}
      <section className="section-padding bg-background">
        <div className="mx-auto max-w-6xl">
          <SectionHeading title="Rooted on the highway" highlight={["highway"]} />
          <div className="relative grid gap-10 md:grid-cols-3">
            <motion.div
              aria-hidden
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: EASE }}
              className="absolute left-0 right-0 top-[11px] hidden h-px origin-left bg-gradient-to-r from-primary via-accent to-primary/20 md:block"
            />
            {milestones.map((m, i) => (
              <motion.div
                key={m.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 + i * 0.25, ease: EASE }}
                className="relative"
              >
                <span className="relative z-10 mb-6 block h-[23px] w-[23px] rounded-full border-4 border-background bg-primary shadow-[0_0_0_4px_hsl(var(--primary)/0.2)]" />
                <p className="font-display text-3xl font-semibold text-primary sm:text-4xl">{m.k}</p>
                <h3 className="mt-3 font-display text-lg font-semibold sm:text-xl">{m.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values — flip-up cards on dark */}
      <section className="section-padding grain relative overflow-hidden bg-secondary">
        <div aria-hidden className="absolute -left-20 top-0 h-96 w-96 rounded-full bg-primary/25 blur-[140px]" />
        <div className="relative mx-auto max-w-6xl">
          <SectionHeading light title="Our values" highlight={["values"]} />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4" style={{ perspective: 1200 }}>
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, rotateX: -70, y: 40 }}
                whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.9, delay: i * 0.12, ease: EASE }}
                style={{ transformOrigin: "top center" }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-7 transition-colors duration-500 hover:border-primary/40 hover:bg-white/[0.07]"
              >
                <span className="absolute right-6 top-5 font-display text-4xl text-white/[0.06] sm:text-5xl transition-colors duration-500 group-hover:text-primary/20">
                  0{i + 1}
                </span>
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/15 text-primary transition-all duration-500 group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                  <v.icon size={22} />
                </div>
                <h3 className="mt-6 font-display text-xl font-semibold text-white sm:text-2xl">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
