import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";

const contactInfo = [
  { icon: MapPin, title: "Address", detail: "Hotel Vedha, Mumbai Highway (NH 65), Near Sangareddy, Telangana" },
  { icon: Phone, title: "Phone", detail: "+91 7377722999" },
  { icon: Mail, title: "Email", detail: "hotelvedha.sangareddy@gmail.com" },
  { icon: Clock, title: "Hours", detail: "Daily: 11 AM – 11:30 PM" },
];

const Contact = () => {
  return (
    <>
      <PageHero title="Contact Us" subtitle="We'd Love to Hear From You" />

      <section className="section-padding bg-background">
        <SectionHeading subtitle="Get In Touch" title="Visit Hotel Vedha" description="Whether you have a question, feedback, or wish to plan an event, our team is here to help." />

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {contactInfo.map((item) => (
              <div key={item.title} className="flex items-start gap-4 p-5 rounded-lg bg-card border border-border">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <item.icon className="text-primary" size={18} />
                </div>
                <div>
                  <h3 className="font-display text-base font-semibold text-foreground">{item.title}</h3>
                  <p className="font-body text-muted-foreground text-sm mt-1">{item.detail}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-lg overflow-hidden shadow-lg h-[400px]"
          >
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
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Contact;
