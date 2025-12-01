import { useLanguage } from '@/context/LanguageContext';
import { useTranslations } from '@/utils/translations';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
  const { language } = useLanguage();
  const t = useTranslations(language);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.section
      className="w-full bg-white py-20 px-4 sm:px-6 lg:px-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-almirab-blue mb-6">
            {t.privacyPolicy.title}
          </h1>
          <p className="text-lg sm:text-xl text-almirab-dark font-light max-w-3xl mx-auto">
            {t.privacyPolicy.introduction}
          </p>
        </motion.div>

        <div className="space-y-12">
          <motion.div variants={itemVariants} className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-almirab-blue mb-4">
              {t.privacyPolicy.informationCollection.title}
            </h2>
            <p className="text-almirab-dark leading-relaxed">
              {t.privacyPolicy.informationCollection.content}
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-almirab-blue mb-4">
              {t.privacyPolicy.useOfInformation.title}
            </h2>
            <p className="text-almirab-dark leading-relaxed">
              {t.privacyPolicy.useOfInformation.content}
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-almirab-blue mb-4">
              {t.privacyPolicy.dataSharing.title}
            </h2>
            <p className="text-almirab-dark leading-relaxed">
              {t.privacyPolicy.dataSharing.content}
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-almirab-blue mb-4">
              {t.privacyPolicy.userRights.title}
            </h2>
            <p className="text-almirab-dark leading-relaxed">
              {t.privacyPolicy.userRights.content}
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-almirab-blue mb-4">
              {t.privacyPolicy.cookies.title}
            </h2>
            <p className="text-almirab-dark leading-relaxed">
              {t.privacyPolicy.cookies.content}
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-almirab-blue mb-4">
              {t.privacyPolicy.contactInformation.title}
            </h2>
            <div className="text-almirab-dark leading-relaxed">
              <p className="mb-4">{t.privacyPolicy.contactInformation.content}</p>
              <p className="font-semibold">{t.privacyPolicy.contactInformation.email}</p>
              <p className="font-semibold">{t.privacyPolicy.contactInformation.phone}</p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="text-center pt-8 border-t border-gray-200">
            <p className="text-sm text-almirab-dark">
              {t.privacyPolicy.lastUpdated}
            </p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default PrivacyPolicy;