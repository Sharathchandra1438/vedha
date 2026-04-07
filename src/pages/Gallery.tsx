import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import heroImg from "@/assets/hero-restaurant.jpeg";
import aboutImg from "@/assets/about-interior.jpeg";
import dish1 from "@/assets/dish-1.jpg";
import dish2 from "@/assets/dish-2.jpg";
import dish3 from "@/assets/dish-3.jpeg";
import chefImg from "@/assets/chef.jpeg";
import gallery1 from "@/assets/gallery-1.jpeg";
import gallery2 from "@/assets/gallery-2.jpeg";
import gallery3 from "@/assets/gallery-3.jpeg";

const images = [
  { src: heroImg, alt: "Elegant dining room", category: "Ambiance" },
  { src: dish1, alt: "Seared scallops", category: "Food" },
  { src: gallery1, alt: "Signature cocktail", category: "Drinks" },
  { src: aboutImg, alt: "Grand hall", category: "Ambiance" },
  { src: dish2, alt: "Chocolate fondant", category: "Food" },
  { src: gallery2, alt: "Steak dinner", category: "Food" },
  { src: chefImg, alt: "Chef at work", category: "Kitchen" },
  { src: dish3, alt: "Bruschetta platter", category: "Food" },
  { src: gallery3, alt: "Outdoor patio", category: "Ambiance" },
];

const Gallery = () => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <>
      <PageHero title="Gallery" subtitle="Moments at Vedha" />

      <section className="section-padding bg-background">
        <SectionHeading
          subtitle="Visual Journey"
          title="A Feast for the Eyes"
          description="Explore the beauty of our dishes, interiors, and dining experiences."
        />
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="cursor-pointer overflow-hidden rounded-lg group"
              onClick={() => setSelected(img.src)}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-espresso/90 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <button
              className="absolute top-6 right-6 text-cream hover:text-primary transition-colors"
              onClick={() => setSelected(null)}
              aria-label="Close"
            >
              <X size={32} />
            </button>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={selected}
              alt="Gallery preview"
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Gallery;
