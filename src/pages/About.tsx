import { motion } from "framer-motion";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import aboutImg from "@/assets/about-interior.jpeg";
import chefImg from "@/assets/chef.jpeg";

const values = [
  { title: "Heritage", desc: "Rooted in centuries-old culinary traditions passed down through generations." },
  { title: "Innovation", desc: "Pushing boundaries with modern techniques while honoring classic flavors." },
  { title: "Quality", desc: "Only the finest seasonal ingredients sourced from trusted local producers." },
  { title: "Hospitality", desc: "Every guest is family, deserving of warmth, care, and an exceptional experience." },
];

const About = () => {
  return (
    <>
      <PageHero title="About Us" subtitle="Our Story, Our Passion" />

      <section className="section-padding bg-background">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <img src={aboutImg} alt="Vedha dining room" className="rounded-lg shadow-2xl w-full object-cover" loading="lazy" width={1200} height={800} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <SectionHeading subtitle="Est. 2026" title="The Hotel Vedha Story" />
            <p className="font-body text-muted-foreground leading-relaxed mb-4">
              Opening its doors on April 8th, 2026, Hotel Vedha is a new culinary destination born from a passion
              to celebrate India's rich heritage through a contemporary dining experience.
              every dish is crafted as a tribute to the flavors that shaped his journey.
            </p>

            <p className="font-body text-muted-foreground leading-relaxed mb-4">
              Hotel Vedha proudly stands as one of the largest restaurants in Sangareddy, strategically located
              on the bustling Mumbai Highway (National Highway 65). Designed with elegance and scale, our
              space offers a refined and welcoming atmosphere for families, travelers, and food lovers.
            </p>

            <p className="font-body text-muted-foreground leading-relaxed">
              Conveniently situated within 15 kilometers of popular destinations like Manjeera Dam and
              IIT Hyderabad, Hotel Vedha is perfectly positioned for those exploring the region. From carefully
              curated dishes to a thoughtfully designed ambiance, every detail reflects our commitment to
              delivering an exceptional dining experience from day one.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-card">
        <SectionHeading subtitle="What We Believe" title="Our Values" />
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center p-6 rounded-lg border border-border bg-background"
            >
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">{v.title}</h3>
              <p className="font-body text-muted-foreground text-sm">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Chef */}
      {/* <section className="section-padding bg-background">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="order-2 lg:order-1"
          >
            <span className="font-body text-sm uppercase tracking-[0.3em] text-primary block mb-2">Meet the Chef</span>
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">Placeholder</h2>
            <div className="w-12 h-0.5 bg-primary mb-6" />
            <p className="font-body text-muted-foreground leading-relaxed mb-4">
              With over 20 years of experience across placeholder kitchens in Paris, London, and Mumbai,
              Chef Arjun brings a global perspective to Indian cuisine. His philosophy: respect the ingredient,
              honor the tradition, surprise the palate.
            </p>
            <p className="font-body text-muted-foreground leading-relaxed">
              Under his leadership, Vedha has earned numerous accolades and a devoted following of food
              enthusiasts who seek authenticity elevated to art.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="order-1 lg:order-2"
          >
            <img src={chefImg} alt="Chef Arjun Kapoor" className="rounded-lg shadow-2xl w-full object-cover max-h-[500px]" loading="lazy" width={800} height={1000} />
          </motion.div>
        </div>
      </section> */}
    </>
  );
};

export default About;
