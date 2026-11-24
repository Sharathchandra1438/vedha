import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Menu, Phone, X } from "lucide-react";
import { EASE } from "@/components/motion";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/menu", label: "Menu" },
  { to: "/gallery", label: "Gallery" },
  // { to: "/reservations", label: "Reservations" },
  { to: "/contact", label: "Contact" },
];

/** Routes that open with a dark hero — the header starts transparent with light text on these. */
const DARK_HERO_ROUTES = ["/", "/about", "/menu", "/gallery", "/contact"];

export const PHONE_DISPLAY = "+91 73777 22999";
export const PHONE_HREF = "tel:+917377722999";

/**
 * The restaurant's own logo (public/logo.png — a transparent, cropped copy of favicon.png).
 * It sits on a warm cream badge so the red artwork stays crisp over both the dark hero
 * and the white floating header.
 */
export const Logo = ({ light, size = "md" }: { light: boolean; size?: "md" | "lg" }) => (
  <span
    className={`relative inline-flex items-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#FFFBF5] via-[#FFF3E4] to-[#FDE6D2] ring-1 transition-shadow duration-500 ${
      size === "lg" ? "px-4 py-2.5" : "px-3 py-1.5"
    } ${
      light
        ? "shadow-[0_10px_30px_-8px_rgba(0,0,0,0.55)] ring-white/40"
        : "shadow-[0_6px_18px_-8px_hsl(var(--primary)/0.45)] ring-primary/15"
    }`}
  >
    {/* soft sheen that sweeps across on hover */}
    <span
      aria-hidden
      className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-0 transition-all duration-700 group-hover:left-[120%] group-hover:opacity-100"
    />
    <img
      src="/logo.png"
      alt="Hotel Vedha — Multi Cuisine Restaurant"
      width={592}
      height={200}
      className={`relative w-auto select-none ${size === "lg" ? "h-16" : "h-10 sm:h-12"}`}
      draggable={false}
    />
  </span>
);

const Navbar = () => {
  // Read the scroll position immediately so the header renders in the right state on first paint.
  const [scrolled, setScrolled] = useState(() => typeof window !== "undefined" && window.scrollY > 24);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const { pathname } = useLocation();

  // Keep the header's style change instant for a moment after load, while the browser restores
  // the scroll position on refresh; afterwards scrolling animates it smoothly.
  const [animated, setAnimated] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setAnimated(true), 800);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => setMobileOpen(false), [pathname]);

  // Lock page scroll while the mobile menu is open.
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  const floating = scrolled || mobileOpen || !DARK_HERO_ROUTES.includes(pathname);
  const light = !floating; // light text over a dark hero

  const isActive = (to: string) => (to === "/" ? pathname === "/" : pathname.startsWith(to));
  const bubbleTarget = hovered ?? navLinks.find((l) => isActive(l.to))?.to ?? null;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 px-3 sm:px-4 ${animated ? "transition-[padding] duration-500" : ""} ${
        floating ? "pt-3" : "pt-4"
      }`}
    >
      {/* No entrance animation: the header stays put when the page loads or is refreshed. */}
      <motion.nav
        className={`relative mx-auto flex items-center justify-between border ${
          animated ? "transition-all duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]" : ""
        } ${
          floating
            ? "max-w-6xl rounded-2xl border-white/60 bg-white/85 px-3 py-2.5 shadow-[0_8px_32px_rgba(28,18,12,0.14),inset_0_1px_0_rgba(255,255,255,0.7)] backdrop-blur-xl backdrop-saturate-150 sm:px-5"
            : "max-w-[100%] rounded-none border-transparent bg-transparent px-1 py-3 sm:px-4"
        }`}
      >
        <Link
          to="/"
          aria-label="Hotel Vedha home"
          title="Go to home page"
          className="group cursor-pointer rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          onClick={() => pathname === "/" && window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <span className="block transition-transform duration-300 group-hover:scale-105">
            <Logo light={light} />
          </span>
        </Link>

        {/* Desktop: links in a pill with a sliding bubble */}
        <div
          onMouseLeave={() => setHovered(null)}
          className={`hidden items-center gap-1 rounded-full border p-1.5 transition-colors duration-500 lg:flex ${
            light ? "border-white/15 bg-white/[0.06]" : "border-foreground/10 bg-foreground/[0.04]"
          }`}
        >
          {navLinks.map((link) => {
            const active = isActive(link.to);
            return (
              <NavLink
                key={link.to}
                to={link.to}
                onMouseEnter={() => setHovered(link.to)}
                className={`relative z-10 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                  active || hovered === link.to
                    ? light
                      ? "text-white"
                      : "text-foreground"
                    : light
                      ? "text-white/65 hover:text-white"
                      : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {bubbleTarget === link.to && (
                  <motion.span
                    layoutId="nav-bubble"
                    transition={{ duration: 0.3, ease: [0, 0, 0.2, 1] }}
                    className={`absolute inset-0 -z-10 rounded-full ${
                      light ? "bg-white/15 ring-1 ring-white/20" : "bg-white shadow-sm ring-1 ring-foreground/5"
                    }`}
                  />
                )}
                {link.label}
              </NavLink>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <a
            href={PHONE_HREF}
            className={`group hidden items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold transition-colors duration-300 sm:inline-flex ${
              light ? "bg-white text-foreground hover:bg-primary hover:text-white" : "bg-secondary text-white hover:bg-primary"
            }`}
          >
            <Phone size={15} />
            Call to Reserve
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </a>
          <button
            className={`rounded-lg p-2 transition-colors lg:hidden ${
              light ? "text-white hover:bg-white/10" : "text-foreground hover:bg-foreground/5"
            }`}
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={mobileOpen ? "x" : "menu"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="block"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="absolute inset-x-0 top-full mt-2 origin-top rounded-2xl border border-white/60 bg-white/95 p-3 shadow-2xl shadow-black/10 backdrop-blur-xl lg:hidden"
            >
              <motion.ul
                initial="hidden"
                animate="show"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } } }}
                className="flex flex-col"
              >
                {navLinks.map((link) => (
                  <motion.li
                    key={link.to}
                    variants={{ hidden: { opacity: 0, x: -16 }, show: { opacity: 1, x: 0 } }}
                  >
                    <Link
                      to={link.to}
                      className={`flex items-center justify-between rounded-xl px-4 py-3 font-display text-lg transition-colors ${
                        isActive(link.to) ? "bg-primary/10 text-primary" : "text-foreground hover:bg-foreground/5"
                      }`}
                    >
                      {link.label}
                      <ArrowRight size={18} className="opacity-50" />
                    </Link>
                  </motion.li>
                ))}
                <motion.li variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }} className="mt-2">
                  <a href={PHONE_HREF} className="btn-primary w-full">
                    <Phone size={16} /> Call {PHONE_DISPLAY}
                  </a>
                </motion.li>
              </motion.ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
};

export default Navbar;
