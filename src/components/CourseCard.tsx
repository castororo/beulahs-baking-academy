import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Clock, Award } from "lucide-react";

interface CourseCardProps {
  title: string;
  duration: string;
  tag?: string;
  shortDesc: string;
  delay?: number;
  image?: string;
  imageAlt?: string;
}

export const CourseCard = ({ title, duration, tag, shortDesc, delay = 0, image, imageAlt }: CourseCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group relative bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col h-full"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-chocolate/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {image && (
        <div className="relative w-full h-[180px] overflow-hidden">
          <img
            src={image}
            alt={imageAlt || title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      )}

      <div className="relative p-5 flex flex-col flex-grow">
        {tag && (
          <Badge className="mb-3 bg-accent text-accent-foreground w-fit">
            {tag}
          </Badge>
        )}

        <h3 className="text-xl font-bold mb-2 text-balance group-hover:text-chocolate transition-colors">
          {title}
        </h3>

        <p className="text-muted-foreground mb-4 text-sm leading-relaxed flex-grow">
          {shortDesc}
        </p>

        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-auto">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Award className="w-4 h-4" />
            <span>Certificate</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-chocolate to-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
    </motion.div>
  );
};
