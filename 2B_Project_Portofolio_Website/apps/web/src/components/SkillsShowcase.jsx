
import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Target } from 'lucide-react';

const SkillsShowcase = () => {
  const skills = [
    "Operations Research & Decision Analysis",
    "Cost-Benefit Analysis",
    "Scenario Modeling & Simulation",
    "Forecasting (Moving Average, ARIMA, Seasonal Trend)",
    "Mining Production Optimization",
    "Fleet Productivity Analytics",
    "Executive Dashboard Development",
    "KPI Design & Performance Measurement",
    "Strategic Decision Support",
    "Data Storytelling for Leadership"
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mt-16 bg-card border border-border rounded-2xl p-8"
    >
      <div className="flex items-center gap-3 mb-6">
        <Target className="h-6 w-6 text-primary" />
        <h3 className="text-2xl font-bold text-foreground">Applied Technical Skills</h3>
      </div>
      <div className="flex flex-wrap gap-3">
        {skills.map((skill, index) => (
          <Badge 
            key={index} 
            variant="secondary" 
            className="bg-secondary/20 text-secondary-foreground hover:bg-secondary/30 border-none px-4 py-2 text-sm font-medium"
          >
            {skill}
          </Badge>
        ))}
      </div>
    </motion.div>
  );
};

export default SkillsShowcase;
