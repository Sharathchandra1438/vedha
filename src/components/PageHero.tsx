import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import heroImg from "@/assets/hero-restaurant.jpeg";
import { EASE, SplitText } from "@/components/motion";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  image?: string;
}

const PageHero = ({ title, subtitle, image = heroImg }: PageHeroProps) => {
  return (
    <section className="grain relative flex min-h-[52vh] items-end overflow-hidden bg-secondary pb-14 pt-32 sm:pb-20 sm:pt-36 sm:min-h-[68vh]">
      {/* Slow Ken Burns zoom-out on the background photo */}
      <img
        src={image}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full animate-ken-burns object-cover"
      />
      <div className="overlay-dark" />
      <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/40 to-transparent" />

      {/* Glow accents */}
      <div aria-hidden className="pointer-events-none absolute -left-32 top-1/3 h-80 w-80 rounded-full bg-primary/30 blur-[120px]" />
      <div aria-hidden className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-accent/20 blur-[120px]" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.nav
          aria-label="Breadcrumb"
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
          className="mb-6 flex items-center gap-1.5 text-sm text-white/60"
        >
          <Link to="/" className="transition-colors hover:text-white">
            Home
          </Link>
          <ChevronRight size={14} />
          <span className="text-white">{title}</span>
        </motion.nav>

        <h1 className="max-w-4xl font-display text-[2.5rem] font-semibold leading-[1] text-white sm:text-6xl lg:text-8xl">
          <SplitText text={title} delay={0.35} />
        </h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
            className="mt-4 max-w-xl text-[0.95rem] text-white/70 sm:mt-6 sm:text-lg"
          >
            {subtitle}
          </motion.p>
        )}

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.8, ease: EASE }}
          className="mt-8 h-px origin-left sm:mt-10 bg-gradient-to-r from-primary via-white/30 to-transparent"
        />
      </div>
    </section>
  );
};

export default PageHero;
