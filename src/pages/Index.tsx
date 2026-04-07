import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Star, Utensils, Clock, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import heroImg from "@/assets/hero-restaurant.jpeg";
import dish1 from "@/assets/dish-1.jpg";
import dish2 from "@/assets/dish-2.jpg";
import dish3 from "@/assets/dish-3.jpeg";
import chefImg from "@/assets/chef.jpeg";

const features = [
  { icon: Utensils, title: "Fine Dining", desc: "Exquisite multi-course meals crafted with passion" },
  { icon: Clock, title: "Timeless Recipes", desc: "Traditional flavors reimagined for the modern palate" },
  { icon: Award, title: "Award Winning", desc: "Recognized for culinary excellence and hospitality" },
];

const Index = () => {
  return (
    <>
      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <img
          src={heroImg}
          alt="Vedha Restaurant luxury dining"
          className="absolute inset-0 w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="overlay-dark" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative z-10 text-center px-4 max-w-3xl"
        >
          <span className="font-body text-sm uppercase tracking-[0.4em] text-primary block mb-4">
            Welcome to
          </span>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-8xl font-bold text-cream mb-6">
            Vedha
          </h1>
          <p className="font-body text-cream/80 text-lg sm:text-xl mb-8 leading-relaxed">
            Where every dish tells a story of heritage, crafted with the finest ingredients
            and served with timeless elegance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* <Button asChild size="lg" className="gold-gradient text-secondary font-body uppercase tracking-widest text-sm hover:opacity-90">
              <Link to="/reservations">Reserve a Table</Link>
            </Button> */}
            <Button asChild variant="outline" size="lg" className="text-cream bg-primary/50 font-body uppercase tracking-widest text-sm">
              <Link to="/menu">View Menu</Link>
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="section-padding bg-background">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="text-center p-8"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <f.icon className="text-primary" size={28} />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="font-body text-muted-foreground text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About Preview */}
      <section className="section-padding bg-card">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <img src={chefImg} alt="Chef at Vedha" className="rounded-lg shadow-2xl w-full object-cover max-h-[500px]" loading="lazy" width={800} height={1000} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="font-body text-sm uppercase tracking-[0.3em] text-primary mb-2 block">Our Story</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              A Legacy of Flavor
            </h2>
            <div className="w-12 h-0.5 bg-primary mb-6" />
            <p className="font-body text-muted-foreground leading-relaxed mb-6">
              Vedha was born from a deep reverence for culinary traditions and a bold vision to redefine fine dining.
              Our chefs blend time-honored techniques with contemporary innovation, creating dishes that are as
              beautiful as they are unforgettable.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-primary font-body text-sm uppercase tracking-widest hover:gap-3 transition-all"
            >
              Discover More <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Signature Dishes */}
      <section className="section-padding bg-background">
        <SectionHeading subtitle="Taste the Best" title="Signature Dishes" description="Handcrafted with passion, our signature dishes showcase the essence of Vedha's culinary philosophy." />
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { img: dish1, name: "Shahi Paneer", desc: "Rich and creamy" },
            { img: dish2, name: "Chicken Drumsticks", desc: "Crispy and flavorful" },
            { img: dish3, name: "Mutton Keema Biryani", desc: "Spicy biryani with tender mutton" },
          ].map((dish, i) => (
            <motion.div
              key={dish.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="group"
            >
              <div className="overflow-hidden rounded-lg mb-4">
                <img
                  src={dish.img}
                  alt={dish.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  width={800}
                  height={800}
                />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground">{dish.name}</h3>
              <p className="font-body text-muted-foreground text-sm mt-1">{dish.desc}</p>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-body uppercase tracking-widest text-sm">
            <Link to="/menu">Full Menu <ArrowRight size={14} className="ml-2" /></Link>
          </Button>
        </div>
      </section>

      {/* Testimonial */}
      {/* <section className="relative section-padding overflow-hidden">
        <img src={heroImg} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        <div className="overlay-dark" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <div className="flex justify-center gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={20} className="text-primary fill-primary" />
            ))}
          </div>
          <blockquote className="font-display text-2xl sm:text-3xl italic text-cream leading-relaxed mb-6">
            "An extraordinary dining experience. Every course was a masterpiece, and the ambiance is
            simply unparalleled."
          </blockquote>
          {/* <p className="font-body text-cream/60 text-sm uppercase tracking-widest">— Priya Sharma, Food Critic</p> */}
        {/* </div>
      </section> */}

      {/* CTA */}
      {/* <section className="section-padding bg-secondary text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-secondary-foreground mb-4">
            Ready for an Unforgettable Evening?
          </h2>
          <p className="font-body text-secondary-foreground/60 mb-8 max-w-xl mx-auto">
            Reserve your table at Vedha and experience the art of fine dining.
          </p>
          <Button asChild size="lg" className="gold-gradient text-secondary font-body uppercase tracking-widest text-sm hover:opacity-90">
            <Link to="/reservations">Make a Reservation</Link>
          </Button>
        </motion.div>
      </section> */}
    </>
  );
};

export default Index;
