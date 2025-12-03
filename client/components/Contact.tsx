import { useLanguage } from '@/context/LanguageContext';
import { useTranslations } from '@/utils/translations';
import { motion } from 'framer-motion';

export const Contact: React.FC = () => {
  const { language } = useLanguage();
  const t = useTranslations(language);

  const sectionVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const titleVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1 }
  };

  const descriptionVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const buttonVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
    hover: {
      scale: 1.05,
      boxShadow: "0 0 30px rgba(255,255,255,0.3)",
      backgroundColor: "#10B981",
      transition: { duration: 0.3 }
    },
    tap: { scale: 0.95 }
  };

  const infoVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: { x: 0, opacity: 1 }
  };

  return (
    <motion.section
      id="contact"
      className="w-full bg-almirab-blue py-32 px-4 sm:px-6 lg:px-8 border-t border-gray-200"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      variants={sectionVariants}
      transition={{ type: "spring", damping: 15 }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          className="text-4xl sm:text-5xl font-bold text-white mb-6"
          variants={titleVariants}
          transition={{ delay: 0.2, type: "spring", damping: 10 }}
        >
          {t.contact.title}
        </motion.h2>
        <motion.p
          className="text-lg text-almirab-light font-light mb-12 leading-relaxed"
          variants={descriptionVariants}
          transition={{ delay: 0.4, type: "spring", damping: 12 }}
        >
          {t.contact.description}
        </motion.p>

        <motion.button
          className="px-10 py-4 bg-almirab-accent text-white font-semibold rounded-lg hover:opacity-90 transition-opacity inline-block"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          transition={{ delay: 0.6, type: "spring", damping: 8 }}
        >
          {t.contact.cta}
        </motion.button>

        {/* Additional contact info */}
        <motion.div
          className="mt-16 space-y-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delayChildren: 0.8, staggerChildren: 0.2 }}
        >
          <motion.p
            className="text-almirab-light"
            variants={infoVariants}
            transition={{ type: "spring", damping: 12 }}
          >
            <span className="font-semibold">{t.footer.emailLabel}:</span> {t.footer.email}
          </motion.p>
          <motion.p
            className="text-almirab-light"
            variants={infoVariants}
            transition={{ type: "spring", damping: 12 }}
          >
            <span className="font-semibold">{t.footer.contact}:</span> {t.footer.phone}
          </motion.p>
        </motion.div>
      </div>
    </motion.section>
  );
};
