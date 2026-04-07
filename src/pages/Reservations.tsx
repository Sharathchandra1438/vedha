// import { useState } from "react";
// import { motion } from "framer-motion";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { CalendarDays, Users, Clock } from "lucide-react";
// import PageHero from "@/components/PageHero";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import { useToast } from "@/hooks/use-toast";

// const schema = z.object({
//   name: z.string().trim().min(1, "Name is required").max(100),
//   email: z.string().trim().email("Valid email is required").max(255),
//   phone: z.string().trim().min(10, "Valid phone number required").max(15),
//   date: z.string().min(1, "Date is required"),
//   time: z.string().min(1, "Time is required"),
//   guests: z.string().min(1, "Number of guests required"),
//   notes: z.string().max(500).optional(),
// });

// type FormData = z.infer<typeof schema>;

// const Reservations = () => {
//   const { toast } = useToast();
//   const [submitted, setSubmitted] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm<FormData>({
//     resolver: zodResolver(schema),
//   });

//   const onSubmit = (data: FormData) => {
//     setSubmitted(true);
//     toast({
//       title: "Reservation Confirmed!",
//       description: `Thank you ${data.name}, your table for ${data.guests} on ${data.date} at ${data.time} has been reserved.`,
//     });
//     reset();
//     setTimeout(() => setSubmitted(false), 3000);
//   };

//   return (
//     <>
//       <PageHero title="Reservations" subtitle="Book Your Experience" />

//       <section className="section-padding bg-background">
//         <div className="max-w-2xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//           >
//             {/* Info cards */}
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
//               {[
//                 { icon: CalendarDays, label: "Open Daily" },
//                 { icon: Clock, label: "12 PM – 11 PM" },
//                 { icon: Users, label: "2 – 20 Guests" },
//               ].map((item) => (
//                 <div key={item.label} className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border">
//                   <item.icon className="text-primary shrink-0" size={20} />
//                   <span className="font-body text-sm text-foreground">{item.label}</span>
//                 </div>
//               ))}
//             </div>

//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                 <div>
//                   <Label htmlFor="name" className="font-body text-sm text-foreground">Full Name</Label>
//                   <Input id="name" {...register("name")} className="mt-1.5" placeholder="John Doe" />
//                   {errors.name && <p className="text-destructive text-xs mt-1">{errors.name.message}</p>}
//                 </div>
//                 <div>
//                   <Label htmlFor="email" className="font-body text-sm text-foreground">Email</Label>
//                   <Input id="email" type="email" {...register("email")} className="mt-1.5" placeholder="john@example.com" />
//                   {errors.email && <p className="text-destructive text-xs mt-1">{errors.email.message}</p>}
//                 </div>
//               </div>

//               <div>
//                 <Label htmlFor="phone" className="font-body text-sm text-foreground">Phone</Label>
//                 <Input id="phone" type="tel" {...register("phone")} className="mt-1.5" placeholder="+91 98765 43210" />
//                 {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone.message}</p>}
//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
//                 <div>
//                   <Label htmlFor="date" className="font-body text-sm text-foreground">Date</Label>
//                   <Input id="date" type="date" {...register("date")} className="mt-1.5" />
//                   {errors.date && <p className="text-destructive text-xs mt-1">{errors.date.message}</p>}
//                 </div>
//                 <div>
//                   <Label htmlFor="time" className="font-body text-sm text-foreground">Time</Label>
//                   <Input id="time" type="time" {...register("time")} className="mt-1.5" />
//                   {errors.time && <p className="text-destructive text-xs mt-1">{errors.time.message}</p>}
//                 </div>
//                 <div>
//                   <Label htmlFor="guests" className="font-body text-sm text-foreground">Guests</Label>
//                   <Input id="guests" type="number" min="1" max="20" {...register("guests")} className="mt-1.5" placeholder="2" />
//                   {errors.guests && <p className="text-destructive text-xs mt-1">{errors.guests.message}</p>}
//                 </div>
//               </div>

//               <div>
//                 <Label htmlFor="notes" className="font-body text-sm text-foreground">Special Requests</Label>
//                 <Textarea id="notes" {...register("notes")} className="mt-1.5" placeholder="Dietary requirements, celebrations, etc." rows={3} />
//               </div>

//               <Button
//                 type="submit"
//                 size="lg"
//                 className="w-full gold-gradient text-secondary font-body uppercase tracking-widest text-sm hover:opacity-90"
//               >
//                 {submitted ? "Reservation Sent!" : "Reserve Now"}
//               </Button>
//             </form>
//           </motion.div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default Reservations;
