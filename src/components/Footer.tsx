import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h3 className="font-display text-3xl font-bold text-gold-gradient mb-4">Hotel Vedha</h3>
            <p className="text-secondary-foreground/60 font-body text-sm leading-relaxed">
              An exquisite dining experience where tradition meets contemporary culinary artistry.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg text-primary mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {[
                { to: "/", label: "Home" },
                { to: "/about", label: "About Us" },
                { to: "/menu", label: "Menu" },
                { to: "/gallery", label: "Gallery" },
                // { to: "/reservations", label: "Reservations" },
                { to: "/contact", label: "Contact" },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-secondary-foreground/60 hover:text-primary transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg text-primary mb-4">Contact</h4>
            <div className="flex flex-col gap-3 text-sm text-secondary-foreground/60">
              <div className="flex items-start gap-2">
                <MapPin size={16} className="text-primary mt-0.5 shrink-0" />
                <span>
                  Vedha Restaurant, Mumbai Highway (NH 65), Near Sangareddy, Telangana
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-primary shrink-0" />
                <span>+91 7377722999</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-primary shrink-0" />
                <span>hotelvedha.sangareddy@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-display text-lg text-primary mb-4">Hours</h4>
            <div className="flex flex-col gap-2 text-sm text-secondary-foreground/60">
              <div className="pl-6">
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-primary shrink-0" />
                  <span>Daily: 11:00 AM – 11:30 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary/10 text-center">
          <p className="text-secondary-foreground/40 text-sm">
            © {new Date().getFullYear()} Vedha Restaurant. All rights reserved.
          </p>
          <p className="text-secondary-foreground/40 text-xs mt-2">
            Developed by Marketing Spaces, a Tech Mecha Torque enterprise
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
