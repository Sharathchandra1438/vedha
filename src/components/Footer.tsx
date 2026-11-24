import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import { Logo, PHONE_DISPLAY, PHONE_HREF } from "@/components/Navbar";
import { EASE, Stagger, StaggerItem } from "@/components/motion";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/menu", label: "Menu" },
  { to: "/gallery", label: "Gallery" },
  // { to: "/reservations", label: "Reservations" },
  { to: "/contact", label: "Contact" },
];

export const EMAIL = "hotelvedha.sangareddy@gmail.com";
export const ADDRESS = "Vedha Restaurant, Mumbai Highway (NH 65), Near Sangareddy, Telangana";
export const DIRECTIONS_URL = "https://www.google.com/maps/search/?api=1&query=17.594718,78.083856";

const Footer = () => {
  const { pathname } = useLocation();
  return (
    <footer className="grain relative overflow-hidden bg-secondary text-secondary-foreground">
      <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-primary/20 blur-[140px]" />

      <div className="relative mx-auto max-w-6xl px-4 pb-10 pt-20 sm:px-6 lg:px-8">
        <Stagger className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12" stagger={0.12}>
          {/* Brand */}
          <StaggerItem className="lg:col-span-4">
            <Link
              to="/"
              aria-label="Hotel Vedha home"
              title="Go to home page"
              className="group inline-block rounded-2xl transition-transform duration-300 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-secondary"
              onClick={() => pathname === "/" && window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <Logo light size="lg" />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/55">
              An exquisite dining experience where tradition meets contemporary culinary artistry.
            </p>
            <a href={PHONE_HREF} className="btn-primary mt-6">
              <Phone size={16} /> {PHONE_DISPLAY}
            </a>
          </StaggerItem>

          {/* Quick Links */}
          <StaggerItem className="lg:col-span-2">
            <h4 className="mb-5 font-body text-xs font-bold uppercase tracking-[0.22em] text-white/40">Explore</h4>
            <ul className="flex flex-col gap-3">
              {links.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="group inline-flex items-center gap-1 text-sm text-white/70 transition-colors hover:text-white"
                  >
                    <span className="relative">
                      {link.label}
                      <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
                    </span>
                    <ArrowUpRight size={13} className="-translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </StaggerItem>

          {/* Contact */}
          <StaggerItem className="lg:col-span-3">
            <h4 className="mb-5 font-body text-xs font-bold uppercase tracking-[0.22em] text-white/40">Visit</h4>
            <div className="flex flex-col gap-4 text-sm text-white/70">
              <a href={DIRECTIONS_URL} target="_blank" rel="noreferrer" className="flex items-start gap-3 transition-colors hover:text-white">
                <MapPin size={16} className="mt-0.5 shrink-0 text-primary" />
                <span>{ADDRESS}</span>
              </a>
              <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 break-all transition-colors hover:text-white">
                <Mail size={16} className="shrink-0 text-primary" />
                <span>{EMAIL}</span>
              </a>
            </div>
          </StaggerItem>

          {/* Hours */}
          <StaggerItem className="lg:col-span-3">
            <h4 className="mb-5 font-body text-xs font-bold uppercase tracking-[0.22em] text-white/40">Hours</h4>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <div className="flex items-center gap-2 text-sm text-white/80">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-emerald-400" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </span>
                Open every day
              </div>
              <div className="mt-3 flex items-center gap-2 whitespace-nowrap font-display text-lg text-white">
                <Clock size={18} className="text-primary" />
                11:00 AM – 11:30 PM
              </div>
            </div>
          </StaggerItem>
        </Stagger>

        {/* Giant wordmark */}
        <div className="relative mt-20 select-none overflow-hidden" aria-hidden>
          <motion.div
            initial={{ y: "60%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: EASE }}
            className="bg-gradient-to-b from-white/[0.14] to-white/0 bg-clip-text text-center font-display text-[24vw] font-semibold leading-[0.8] tracking-tighter text-transparent lg:text-[15rem]"
          >
            Vedha
          </motion.div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-8 text-center text-xs text-white/40 sm:flex-row sm:text-left">
          <p>© {new Date().getFullYear()} Vedha Restaurant. All rights reserved.</p>
          <p>Developed by Marketing Spaces, a Tech Mecha Torque enterprise</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
