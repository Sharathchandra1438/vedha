import { motion } from "framer-motion";
import heroImg from "@/assets/hero-restaurant.jpeg";

interface PageHeroProps {
  title: string;
  subtitle?: string;
}

const PageHero = ({ title, subtitle }: PageHeroProps) => {
  return (
    <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
      <img
        src={heroImg}
        alt="Vedha Restaurant"
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
      <div className="overlay-dark" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center px-4"
      >
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-cream mb-3">
          {title}
        </h1>
        {subtitle && (
          <p className="font-body text-cream/70 text-lg tracking-wide">{subtitle}</p>
        )}
      </motion.div>
    </section>
  );
};

export default PageHero;
