import { useLanguage } from '@/context/LanguageContext';
import { useTranslations } from '@/utils/translations';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const { language } = useLanguage();
  const t = useTranslations(language);

  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  const columnVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const linkVariants = {
    hidden: { x: -10, opacity: 0 },
    visible: { x: 0, opacity: 1 },
    hover: { x: 5, color: "#FFFFFF", transition: { duration: 0.2 } }
  };

  const logoVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
    hover: { scale: 1.1, transition: { duration: 0.2 } }
  };

  const MotionLink = motion(Link);

  return (
    <motion.footer
      className="w-full bg-almirab-dark border-t border-gray-700 py-12 px-4 sm:px-6 lg:px-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
      transition={{ type: "spring", damping: 15 }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12"
          variants={containerVariants}
        >
          {/* Company info */}
          <motion.div variants={columnVariants} transition={{ type: "spring", damping: 12 }}>
            <motion.h3
              className="text-lg font-bold text-white mb-4 cursor-pointer"
              variants={logoVariants}
              whileHover="hover"
            >
              {t.footer.company}
            </motion.h3>
            <motion.p
              className="text-gray-400 font-light text-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            >
              {t.about.description}
            </motion.p>
          </motion.div>

          {/* Navigation */}
          <motion.div variants={columnVariants} transition={{ type: "spring", damping: 12 }}>
            <motion.h4
              className="text-sm font-bold text-white mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              Navigation
            </motion.h4>
            <motion.ul
              className="space-y-2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delayChildren: 0.4, staggerChildren: 0.1 }}
            >
              {[
                { label: t.header.home, id: 'home' },
                { label: t.header.about, id: 'about' },
                { label: t.header.services, id: 'services' },
                { label: t.header.portfolio, id: 'portfolio' }
              ].map((item, index) => (
                <motion.li key={index} variants={linkVariants}>
                  <button
                    onClick={() =>
                      document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })
                    }
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {item.label}
                  </button>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Services */}
          <motion.div variants={columnVariants} transition={{ type: "spring", damping: 12 }}>
            <motion.h4
              className="text-sm font-bold text-white mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              {t.header.services}
            </motion.h4>
            <motion.ul
              className="space-y-2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delayChildren: 0.4, staggerChildren: 0.1 }}
            >
              {t.services.items.slice(0, 3).map((service, index) => (
                <motion.li key={index} variants={linkVariants}>
                  <a
                    href="#services"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {service.title}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={columnVariants} transition={{ type: "spring", damping: 12 }}>
            <motion.h4
              className="text-sm font-bold text-white mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              {t.footer.contact}
            </motion.h4>
            <motion.ul
              className="space-y-2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delayChildren: 0.4, staggerChildren: 0.1 }}
            >
              <motion.li variants={linkVariants} className="text-gray-400 text-sm">
                {t.footer.email}
              </motion.li>
              <motion.li variants={linkVariants} className="text-gray-400 text-sm">
                {t.footer.phone}
              </motion.li>
            </motion.ul>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.p
            className="text-gray-400 text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            viewport={{ once: true }}
          >
            © {currentYear} {t.footer.company}. {t.footer.rights}.
          </motion.p>
          <motion.div
            className="flex gap-6 mt-4 md:mt-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delayChildren: 1, staggerChildren: 0.1 }}
          >
            <MotionLink
              to="/privacy-policy"
              className="text-gray-400 hover:text-white transition-colors text-sm"
              variants={linkVariants}
              whileHover="hover"
            >
              Privacy Policy
            </MotionLink>
            <MotionLink
              to="/terms-of-service"
              className="text-gray-400 hover:text-white transition-colors text-sm"
              variants={linkVariants}
              whileHover="hover"
            >
              Terms of Service
            </MotionLink>
          </motion.div>
        </motion.div>
      </div>
    </motion.footer>
  );
};
