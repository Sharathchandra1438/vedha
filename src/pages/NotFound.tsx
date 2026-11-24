import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, UtensilsCrossed } from "lucide-react";
import { EASE } from "@/components/motion";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <section className="bg-dots relative flex min-h-[80vh] items-center justify-center px-4 pb-20 pt-36">
      <div className="text-center">
        <motion.div
          initial={{ rotate: -30, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 160, damping: 12 }}
          className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-primary text-white shadow-xl"
        >
          <UtensilsCrossed size={34} />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
          className="mt-8 font-display text-7xl font-semibold sm:text-8xl text-foreground"
        >
          404
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
          className="mt-3 text-lg text-muted-foreground"
        >
          Oops! This page isn't on the menu.
        </motion.p>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}>
          <Link to="/" className="btn-primary mt-8">
            <ArrowLeft size={16} /> Return to Home
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default NotFound;
