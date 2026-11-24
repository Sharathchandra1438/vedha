import { motion } from "framer-motion";
import { EASE, SplitText } from "@/components/motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  /** Words in the title to render in italic brand colour, e.g. ["Signature"]. */
  highlight?: string[];
  description?: string;
  light?: boolean;
  align?: "center" | "left";
  className?: string;
}

const SectionHeading = ({
  title,
  highlight = [],
  description,
  light,
  align = "center",
  className,
}: SectionHeadingProps) => {
  const centered = align === "center";
  return (
    <div className={cn("mb-10 sm:mb-14", centered ? "text-center" : "text-left", className)}>
      <h2
        className={cn(
          "font-display text-[1.85rem] font-semibold leading-[1.1] sm:text-5xl sm:leading-[1.05] lg:text-6xl",
          light ? "text-white" : "text-foreground",
        )}
      >
        <SplitText
          text={title}
          inView
          wordClassName={(w) =>
            highlight.includes(w.replace(/[^\w']/g, "")) ? "italic font-normal text-primary" : undefined
          }
        />
      </h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
          className={cn(
            "mt-4 max-w-2xl text-[0.95rem] leading-relaxed sm:mt-5 sm:text-lg",
            centered && "mx-auto",
            light ? "text-white/65" : "text-muted-foreground",
          )}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
};

export default SectionHeading;
