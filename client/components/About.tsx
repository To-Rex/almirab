import { useLanguage } from '@/context/LanguageContext';
import { useTranslations } from '@/utils/translations';
import { Award, Users, Lightbulb, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export const About: React.FC = () => {
  const { language } = useLanguage();
  const t = useTranslations(language);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.15
      }
    }
  };

  const titleVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1 }
  };

  const descriptionVariants = {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1 }
  };

  const cardVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    hover: { y: -10, boxShadow: "0 20px 40px rgba(0,0,0,0.1)", borderColor: "#3B82F6" }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { scale: 1, rotate: 0 },
    hover: { scale: 1.2, rotate: 10 }
  };

  return (
    <motion.section
      id="about"
      className="w-full bg-gray-50 py-20 px-4 sm:px-6 lg:px-8 border-t border-gray-200"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-4xl sm:text-5xl font-bold text-almirab-blue mb-6"
          variants={titleVariants}
          transition={{ type: "spring", damping: 15 }}
        >
          {t.about.title}
        </motion.h2>
        <motion.p
          className="text-lg text-almirab-dark font-light mb-16 max-w-3xl leading-relaxed"
          variants={descriptionVariants}
          transition={{ type: "spring", damping: 15, delay: 0.2 }}
        >
          {t.about.description}
        </motion.p>

        {/* Strengths grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
        >
          {t.about.strengths.map((strength, index) => {
            const icons = [Award, Users, Lightbulb, CheckCircle];
            const IconComponent = icons[index];

            return (
              <motion.div
                key={index}
                className="p-8 bg-white rounded-lg border border-gray-200 hover:border-almirab-blue transition-colors cursor-pointer"
                variants={cardVariants}
                whileHover="hover"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: "spring", damping: 12 }}
              >
                <motion.div
                  className="w-12 h-12 bg-almirab-blue rounded-lg mb-6 flex items-center justify-center"
                  variants={iconVariants}
                  whileHover="hover"
                  transition={{ delay: 0.3, type: "spring", damping: 10 }}
                >
                  <IconComponent className="w-6 h-6 text-white" />
                </motion.div>
                <motion.h3
                  className="text-lg font-bold text-almirab-blue mb-3"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {strength.title}
                </motion.h3>
                <motion.p
                  className="text-almirab-dark font-light"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {strength.description}
                </motion.p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
};
