import { useLanguage } from '@/context/LanguageContext';
import { useTranslations } from '@/utils/translations';
import { Code, Database, Globe, Smartphone, Cloud, Palette, Zap, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

interface Skill {
  name: string;
  proficiency: number;
  icon: React.ComponentType<{ className?: string }>;
}

export const Skills: React.FC = () => {
  const { language } = useLanguage();
  const t = useTranslations(language);

  const skills: Skill[] = [
    { name: 'JavaScript/TypeScript', proficiency: 95, icon: Code },
    { name: 'React/Next.js', proficiency: 90, icon: Globe },
    { name: 'Node.js', proficiency: 85, icon: Zap },
    { name: 'Database Design', proficiency: 80, icon: Database },
    { name: 'Mobile Development', proficiency: 75, icon: Smartphone },
    { name: 'Cloud Services', proficiency: 70, icon: Cloud },
    { name: 'UI/UX Design', proficiency: 85, icon: Palette },
    { name: 'Security', proficiency: 65, icon: Shield },
  ];

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
    hidden: { y: -50, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const skillCardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    hover: { y: -5, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }
  };

  const getProgressAnimation = (proficiency: number) => ({
    width: `${proficiency}%`,
    transition: { duration: 1.5, delay: 0.3 }
  });

  return (
    <motion.section
      id="skills"
      className="w-full bg-white py-20 px-4 sm:px-6 lg:px-8 border-t border-gray-200"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-4xl sm:text-5xl font-bold text-almirab-blue mb-6 text-center"
          variants={titleVariants}
          transition={{ type: "spring", damping: 15 }}
        >
          Technical Skills
        </motion.h2>
        <motion.p
          className="text-lg text-almirab-dark font-light mb-16 max-w-3xl mx-auto text-center leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          Here are the technologies and tools I work with, showcasing my proficiency levels through animated progress bars.
        </motion.p>

        {/* Skills grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
        >
          {skills.map((skill, index) => {
            const IconComponent = skill.icon;

            return (
              <motion.div
                key={skill.name}
                className="p-6 bg-gray-50 rounded-lg border border-gray-200 hover:border-almirab-blue transition-colors"
                variants={skillCardVariants}
                whileHover="hover"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: "spring", damping: 12 }}
              >
                {/* Icon */}
                <motion.div
                  className="w-12 h-12 bg-almirab-blue rounded-lg mb-4 flex items-center justify-center"
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2 + index * 0.1, type: "spring", damping: 10 }}
                  viewport={{ once: true }}
                >
                  <IconComponent className="w-6 h-6 text-white" />
                </motion.div>

                {/* Skill name */}
                <motion.h3
                  className="text-lg font-bold text-almirab-blue mb-3"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {skill.name}
                </motion.h3>

                {/* Proficiency percentage */}
                <motion.div
                  className="text-sm text-almirab-dark font-medium mb-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {skill.proficiency}%
                </motion.div>

                {/* Progress bar */}
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-almirab-blue to-almirab-teal rounded-full"
                    initial={{ width: 0 }}
                    whileInView={getProgressAnimation(skill.proficiency)}
                    viewport={{ once: true }}
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
};