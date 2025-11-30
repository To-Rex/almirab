import { useLanguage } from '@/context/LanguageContext';
import { useTranslations } from '@/utils/translations';
import { motion } from 'framer-motion';

export const Portfolio: React.FC = () => {
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
    hidden: { rotateY: -90, opacity: 0 },
    visible: { rotateY: 0, opacity: 1 },
    hover: {
      rotateY: 5,
      scale: 1.05,
      boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
      transition: { duration: 0.3 }
    }
  };

  const imageVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
    hover: { scale: 1.1, transition: { duration: 0.3 } }
  };

  const buttonVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    hover: { scale: 1.05, transition: { duration: 0.2 } }
  };

  return (
    <motion.section
      id="portfolio"
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
          {t.portfolio.title}
        </motion.h2>
        <motion.p
          className="text-lg text-almirab-dark font-light mb-16 max-w-3xl leading-relaxed"
          variants={descriptionVariants}
          transition={{ type: "spring", damping: 15, delay: 0.2 }}
        >
          {t.portfolio.description}
        </motion.p>

        {/* Portfolio grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
        >
          {t.portfolio.items.map((item, index) => (
            <motion.div
              key={index}
              className="group p-8 bg-white rounded-lg border border-gray-200 hover:border-almirab-blue transition-all cursor-pointer"
              variants={cardVariants}
              whileHover="hover"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ type: "spring", damping: 12, delay: index * 0.1 }}
              style={{ perspective: 1000 }}
            >
              {/* Project Image */}
              <motion.img
                src={item.image}
                alt={item.name}
                className="w-full h-40 object-cover rounded-lg mb-6"
                variants={imageVariants}
                whileHover="hover"
                transition={{ delay: 0.2 }}
              />

              <motion.h3
                className="text-2xl font-bold text-almirab-blue mb-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                viewport={{ once: true }}
              >
                {item.name}
              </motion.h3>
              <motion.p
                className="text-almirab-dark font-light mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                viewport={{ once: true }}
              >
                {item.description}
              </motion.p>
              <motion.button
                className="text-almirab-accent font-semibold hover:opacity-70 transition-opacity"
                variants={buttonVariants}
                whileHover="hover"
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                View Project →
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};
