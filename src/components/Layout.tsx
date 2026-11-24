import { MotionConfig, motion, useScroll, useSpring } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-accent via-primary to-accent"
    />
  );
};

const Layout = ({ children }: LayoutProps) => {
  return (
    // reducedMotion="user" turns transform animations off for visitors who ask for less motion.
    <MotionConfig reducedMotion="user">
      <div className="flex min-h-screen flex-col overflow-x-clip">
        <ScrollProgress />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </MotionConfig>
  );
};

export default Layout;
