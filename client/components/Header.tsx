import { useLanguage } from '@/context/LanguageContext';
import { useTranslations } from '@/utils/translations';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export const Header: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const t = useTranslations(language);

  const navItems = [
    { label: t.header.home, id: 'home' },
    { label: t.header.about, id: 'about' },
    { label: t.header.services, id: 'services' },
    { label: t.header.portfolio, id: 'portfolio' },
  ];

  const languages: Array<{ code: 'uz' | 'ru' | 'en'; label: string }> = [
    { code: 'uz', label: 'UZ' },
    { code: 'ru', label: 'RU' },
    { code: 'en', label: 'EN' },
  ];

  const handleNavClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const logoVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { scale: 1, rotate: 0 }
  };

  const navItemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    hover: { y: -2, color: "#10B981", transition: { duration: 0.2 } }
  };

  const languageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
    hover: { scale: 1.1, rotateY: 180, transition: { duration: 0.3 } }
  };

  return (
    <motion.header
      className="sticky top-0 z-50 w-full bg-white border-b border-gray-200"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", damping: 15, stiffness: 100 }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          className="flex-shrink-0"
          variants={logoVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2, type: "spring", damping: 10 }}
          whileHover={{ scale: 1.05 }}
        >
          <a href="#home" className="text-xl font-bold text-almirab-blue">
            almirab
          </a>
        </motion.div>

        {/* Navigation items */}
        <motion.div
          className="hidden md:flex items-center gap-8"
          initial="hidden"
          animate="visible"
          transition={{ delayChildren: 0.4, staggerChildren: 0.1 }}
        >
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="text-sm font-medium text-almirab-blue hover:text-almirab-accent transition-colors"
              variants={navItemVariants}
              whileHover="hover"
              transition={{ type: "spring", damping: 12 }}
            >
              {item.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Language switcher */}
        <motion.div
          className="flex items-center gap-2 border border-gray-300 rounded-lg p-1 bg-white"
          initial="hidden"
          animate="visible"
          transition={{ delayChildren: 0.6, staggerChildren: 0.05 }}
        >
          {languages.map((lang) => (
            <motion.button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={cn(
                'px-3 py-1.5 text-xs font-medium rounded transition-all',
                language === lang.code
                  ? 'bg-almirab-blue text-white'
                  : 'text-almirab-blue hover:bg-gray-100'
              )}
              variants={languageVariants}
              whileHover="hover"
              transition={{ type: "spring", damping: 8 }}
            >
              {lang.label}
            </motion.button>
          ))}
        </motion.div>
      </nav>
    </motion.header>
  );
};
