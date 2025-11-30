import { useLanguage } from '@/context/LanguageContext';
import { useTranslations } from '@/utils/translations';
import { Globe, Smartphone, Cloud, MessageSquare, Headphones, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';

export const Services: React.FC = () => {
  const { language } = useLanguage();
  const t = useTranslations(language);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  const titleVariants = {
    hidden: { scale: 0.5, opacity: 0 },
    visible: { scale: 1, opacity: 1 }
  };

  const cardVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    hover: {
      y: -15,
      boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
      borderColor: "#3B82F6",
      transition: { duration: 0.3 }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { scale: 1, rotate: 0 },
    hover: { rotate: 360, scale: 1.2 }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.section
      id="services"
      className="w-full bg-white py-20 px-4 sm:px-6 lg:px-8 border-t border-gray-200"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-4xl sm:text-5xl font-bold text-almirab-blue mb-6"
          variants={titleVariants}
          transition={{ type: "spring", damping: 10, delay: 0.1 }}
        >
          {t.services.title}
        </motion.h2>
        <motion.p
          className="text-lg text-almirab-dark font-light mb-16 max-w-3xl leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
        >
          {t.services.description}
        </motion.p>

        {/* Services grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
        >
          {t.services.items.map((service, index) => {
            const icons = [Globe, Smartphone, Cloud, MessageSquare, Headphones, BarChart3];
            const IconComponent = icons[index];

            return (
              <motion.div
                key={index}
                className="p-8 bg-gray-50 rounded-lg border border-gray-200 hover:border-almirab-blue hover:shadow-sm transition-all cursor-pointer"
                variants={cardVariants}
                whileHover="hover"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  damping: 12,
                  delay: index * 0.1,
                  bounce: index % 2 === 0 ? 0.4 : 0.6
                }}
              >
                {/* Icon */}
                <motion.div
                  className="w-14 h-14 bg-almirab-blue rounded-lg mb-6 flex items-center justify-center"
                  variants={iconVariants}
                  whileHover="hover"
                  transition={{ delay: 0.2, type: "spring", damping: 8, duration: 0.6 }}
                >
                  <IconComponent className="w-7 h-7 text-white" />
                </motion.div>

                <motion.h3
                  className="text-xl font-bold text-almirab-blue mb-4"
                  variants={textVariants}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  {service.title}
                </motion.h3>
                <motion.p
                  className="text-almirab-dark font-light"
                  variants={textVariants}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  {service.description}
                </motion.p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
};
