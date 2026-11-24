import { motion } from "framer-motion";
import { ArrowUpRight, Clock, Mail, MapPin, Navigation, Phone } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import { PHONE_DISPLAY, PHONE_HREF } from "@/components/Navbar";
import { ADDRESS, DIRECTIONS_URL, EMAIL } from "@/components/Footer";
import { EASE, Reveal, TiltCard } from "@/components/motion";
import booth from "@/assets/booth.webp";

const contactInfo = [
  { icon: MapPin, title: "Address", detail: "Hotel Vedha, Mumbai Highway (NH 65), Near Sangareddy, Telangana", href: DIRECTIONS_URL, cta: "Get directions", external: true },
  { icon: Phone, title: "Phone", detail: PHONE_DISPLAY, href: PHONE_HREF, cta: "Call now" },
  { icon: Mail, title: "Email", detail: EMAIL, href: `mailto:${EMAIL}`, cta: "Write to us" },
  { icon: Clock, title: "Hours", detail: "Daily: 11 AM – 11:30 PM", cta: "Open every day" },
];

const Contact = () => {
  return (
    <>
      <PageHero title="Contact Us" subtitle="Questions, feedback or planning an event? Our team is here to help." image={booth} />

      <section className="section-padding bg-background">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            title="Visit Hotel Vedha"
            highlight={["Vedha"]}
            description="Whether you have a question, feedback, or wish to plan an event, our team is here to help."
          />

          {/* Cards spring in one by one */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {contactInfo.map((item, i) => {
              const Wrapper = item.href ? "a" : "div";
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 60, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ type: "spring", stiffness: 120, damping: 16, delay: i * 0.1 }}
                >
                  <TiltCard max={6} className="group h-full rounded-3xl">
                    <Wrapper
                      {...(item.href ? { href: item.href, ...(item.external ? { target: "_blank", rel: "noreferrer" } : {}) } : {})}
                      className="flex h-full flex-col rounded-3xl border border-border bg-card p-6 transition-all duration-500 group-hover:border-primary/30 group-hover:shadow-[0_24px_60px_-24px_hsl(var(--primary)/0.35)]"
                    >
                      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary transition-all duration-500 group-hover:rotate-[-8deg] group-hover:bg-primary group-hover:text-white">
                        <item.icon size={20} />
                      </span>
                      <h3 className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">{item.title}</h3>
                      <p className="mt-2 break-words font-display text-base leading-snug text-foreground sm:text-lg">{item.detail}</p>
                      <span className="mt-auto flex items-center gap-1 pt-5 text-sm font-semibold text-primary">
                        {item.cta}
                        {item.href && <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />}
                      </span>
                    </Wrapper>
                  </TiltCard>
                </motion.div>
              );
            })}
          </div>

          {/* Map — reveals with a clip mask */}
          <div className="relative mt-14">
            <Reveal variant="clip" duration={1.2}>
              <div className="h-[460px] overflow-hidden rounded-[28px] border border-border shadow-xl">
                <iframe
                  title="Vedha Restaurant Location"
                  src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d903.7477916668297!2d78.08385626956108!3d17.594717998958018!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTfCsDM1JzQxLjAiTiA3OMKwMDUnMDQuMiJF!5e1!3m2!1sen!2sin!4v1775569499947!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
              className="relative mx-4 -mt-16 rounded-3xl border border-white/60 bg-white/90 p-6 shadow-2xl backdrop-blur-xl sm:absolute sm:bottom-6 sm:left-6 sm:mx-0 sm:mt-0 sm:max-w-sm"
            >
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Find us</p>
              <p className="mt-2 font-display text-lg leading-snug sm:text-xl">{ADDRESS}</p>
              <a href={DIRECTIONS_URL} target="_blank" rel="noreferrer" className="btn-primary mt-5">
                <Navigation size={16} /> Open in Google Maps
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
