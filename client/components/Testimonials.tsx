import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  position: string;
  company: string;
  quote: string;
  avatar?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    position: "CEO",
    company: "TechCorp Solutions",
    quote: "Working with this team has been transformative. Their attention to detail and innovative approach helped us achieve our goals faster than we imagined.",
    avatar: undefined, // Will use fallback
  },
  {
    id: 2,
    name: "Michael Chen",
    position: "Product Manager",
    company: "InnovateLabs",
    quote: "The quality of work delivered exceeded our expectations. The team's expertise in modern technologies and commitment to excellence is unmatched.",
    avatar: undefined,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    position: "Marketing Director",
    company: "Growth Dynamics",
    quote: "From concept to execution, this collaboration was seamless. The results speak for themselves - our user engagement increased by 300%.",
    avatar: undefined,
  },
  {
    id: 4,
    name: "David Thompson",
    position: "CTO",
    company: "Future Systems",
    quote: "Their technical expertise and problem-solving abilities are exceptional. They delivered a robust solution that scaled perfectly with our needs.",
    avatar: undefined,
  },
];

export const Testimonials: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.9 },
    visible: { y: 0, opacity: 1, scale: 1 },
    hover: {
      y: -8,
      scale: 1.02,
      boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
      borderColor: "#457b9d"
    }
  };

  const quoteVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { scale: 1, rotate: 0 },
    hover: { scale: 1.1, rotate: 10 }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <motion.section
      id="testimonials"
      className="w-full bg-gray-50 py-20 px-4 sm:px-6 lg:px-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
        >
          <motion.h2
            className="text-4xl sm:text-5xl font-bold text-almirab-blue mb-6"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", damping: 15 }}
            viewport={{ once: true }}
          >
            What Our Clients Say
          </motion.h2>
          <motion.p
            className="text-lg text-almirab-dark font-light max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", damping: 15, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Don't just take our word for it. Here's what our satisfied clients have to say about working with us.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
          variants={containerVariants}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              variants={cardVariants}
              whileHover="hover"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{
                delay: index * 0.1,
                type: "spring",
                damping: 15,
                stiffness: 100
              }}
            >
              <Card className="h-full bg-white border border-gray-200 hover:border-almirab-blue transition-colors relative overflow-hidden">
                <CardContent className="p-8">
                  <motion.div
                    className="absolute top-4 right-4 text-almirab-teal"
                    variants={quoteVariants}
                    whileHover="hover"
                    transition={{
                      delay: 0.3,
                      type: "spring",
                      damping: 12
                    }}
                  >
                    <Quote className="w-8 h-8" />
                  </motion.div>

                  <motion.blockquote
                    className="text-almirab-dark font-light text-lg leading-relaxed mb-6 pr-12"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    "{testimonial.quote}"
                  </motion.blockquote>

                  <motion.div
                    className="flex items-center space-x-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1, type: "spring", damping: 12 }}
                    viewport={{ once: true }}
                  >
                    <Avatar className="w-12 h-12 border-2 border-almirab-teal">
                      <AvatarFallback className="bg-almirab-blue text-white font-semibold">
                        {getInitials(testimonial.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <motion.h4
                        className="font-semibold text-almirab-blue"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", damping: 10 }}
                      >
                        {testimonial.name}
                      </motion.h4>
                      <motion.p
                        className="text-sm text-almirab-dark font-light"
                        initial={{ opacity: 0.7 }}
                        whileHover={{ opacity: 1 }}
                      >
                        {testimonial.position}, {testimonial.company}
                      </motion.p>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};