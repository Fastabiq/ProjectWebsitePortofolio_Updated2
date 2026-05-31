import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

const SkillGroup = ({ category, skills }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">{category}</h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Badge
              variant="secondary"
              className="px-4 py-2 text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-all duration-200 cursor-default"
            >
              {skill}
            </Badge>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SkillGroup;