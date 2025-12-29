import { useLanguage } from '@/context/LanguageContext';
import { useTranslations } from '@/utils/translations';
import { motion } from 'framer-motion';
import { Monitor } from 'lucide-react';
import { FaAndroid, FaApple } from 'react-icons/fa';

export const Hero: React.FC = () => {
  const { language } = useLanguage();
  const t = useTranslations(language);

  const handleContactClick = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const buttonVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
    hover: { scale: 1.05, boxShadow: "0 10px 25px rgba(0,0,0,0.2)" },
    tap: { scale: 0.95 }
  };

  const shapeVariants = {
    hidden: { rotate: -20, scale: 0.8, opacity: 0 },
    visible: { rotate: 0, scale: 1, opacity: 1 },
    hover: { rotate: 5, scale: 1.05 }
  };

  return (
    <motion.section
      id="home"
      className="relative w-full bg-white pt-20 pb-32 px-4 sm:px-6 lg:px-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            className="space-y-8"
            variants={itemVariants}
            transition={{ type: "spring", damping: 12, stiffness: 100 }}
          >
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-almirab-blue leading-tight"
              variants={itemVariants}
              transition={{ type: "spring", damping: 12, stiffness: 100 }}
            >
              {t.hero.title}
            </motion.h1>
            <motion.p
              className="text-lg sm:text-xl text-almirab-dark font-light leading-relaxed"
              variants={itemVariants}
              transition={{ type: "spring", damping: 12, stiffness: 100, delay: 0.1 }}
            >
              {t.hero.subtitle}
            </motion.p>
            <motion.button
              onClick={handleContactClick}
              className="px-8 py-4 bg-almirab-accent text-white font-semibold rounded-lg hover:opacity-90 transition-opacity inline-block"
              variants={buttonVariants}
              transition={{ delay: 0.6, type: "spring", damping: 10 }}
              whileHover="hover"
              whileTap="tap"
            >
              {t.hero.cta}
            </motion.button>
          </motion.div>

          {/* Right decorative element */}
          <motion.div
            className="relative hidden lg:flex items-center justify-center"
            variants={shapeVariants}
            transition={{ delay: 0.8, type: "spring", damping: 8 }}
            whileHover="hover"
          >
            <div className="relative w-64 h-64">
              <motion.div
                className="absolute inset-0 bg-almirab-blue rounded-3xl transform -rotate-12 opacity-10"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              ></motion.div>
              <motion.div
                className="absolute inset-8 bg-almirab-teal rounded-2xl transform rotate-6 opacity-15"
                animate={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              ></motion.div>
              <motion.div
                className="absolute inset-16 bg-almirab-blue rounded-xl opacity-10"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              ></motion.div>
            </div>
            <motion.div
              className="absolute top-0 left-0"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <FaAndroid size={48} className="text-almirab-blue" />
            </motion.div>
            <motion.div
              className="absolute bottom-0 right-0"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              <FaApple size={48} className="text-almirab-teal" />
            </motion.div>
            <motion.div
              className="absolute top-0 right-0"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <Monitor size={48} className="text-almirab-accent" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};
