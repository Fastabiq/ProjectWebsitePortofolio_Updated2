import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

const SkillBadge = ({ category, skills, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-card border border-border rounded-2xl p-6 hover:border-primary/30 transition-colors"
    >
      <h3 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b border-border/50">
        {category}
      </h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, i) => {
          // Parse skill and proficiency if formatted as "Skill (Proficiency)"
          const match = skill.match(/(.+?)(?:\s*\((.+?)\))?$/);
          const name = match ? match[1].trim() : skill;
          const proficiency = match && match[2] ? match[2].trim() : null;

          return (
            <Badge
              key={i}
              variant="secondary"
              className="px-3 py-1.5 text-sm font-medium bg-muted/50 hover:bg-primary/20 hover:text-primary transition-colors cursor-default border border-transparent hover:border-primary/30"
            >
              {name}
              {proficiency && (
                <span className="ml-1.5 text-xs opacity-70 font-normal">
                  {proficiency}
                </span>
              )}
            </Badge>
          );
        })}
      </div>
    </motion.div>
  );
};

export default SkillBadge;