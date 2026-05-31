import React from 'react';
import { motion } from 'framer-motion';
import { CircleDot } from 'lucide-react';

const TimelineItem = ({ phase, period, description, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative pl-8 md:pl-0"
    >
      {/* Desktop Layout */}
      <div className="hidden md:grid grid-cols-[1fr_auto_1fr] gap-8 items-center">
        <div className={`text-right ${index % 2 === 0 ? 'order-1' : 'order-3 text-left'}`}>
          <h3 className="text-xl font-bold text-foreground mb-1">{phase}</h3>
          <p className="text-primary font-medium mb-3">{period}</p>
          <p className="text-muted-foreground leading-relaxed">{description}</p>
        </div>
        
        <div className="order-2 flex flex-col items-center relative">
          <div className="absolute top-0 bottom-0 w-0.5 bg-border -z-10" />
          <div className="h-10 w-10 rounded-full bg-background border-4 border-primary flex items-center justify-center z-10">
            <CircleDot className="h-4 w-4 text-primary" />
          </div>
        </div>
        
        <div className={index % 2 === 0 ? 'order-3' : 'order-1'} />
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden pb-10 last:pb-0">
        <div className="absolute left-[11px] top-8 bottom-0 w-0.5 bg-border last:hidden" />
        <div className="absolute left-0 top-1.5 h-6 w-6 rounded-full bg-background border-4 border-primary flex items-center justify-center z-10">
          <CircleDot className="h-2.5 w-2.5 text-primary" />
        </div>
        
        <div className="pl-4">
          <h3 className="text-xl font-bold text-foreground mb-1">{phase}</h3>
          <p className="text-primary font-medium text-sm mb-3">{period}</p>
          <p className="text-muted-foreground leading-relaxed text-sm">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default TimelineItem;