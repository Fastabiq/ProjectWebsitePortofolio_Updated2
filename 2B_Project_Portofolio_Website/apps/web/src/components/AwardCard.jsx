import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const AwardCard = ({ title, description, recognition, impact, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="premium-card relative overflow-hidden">
        <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
          <Trophy className="h-32 w-32" />
        </div>
        <CardContent className="p-6 md:p-8 relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500">
              <Trophy className="h-6 w-6" />
            </div>
            <span className="text-sm font-bold text-amber-500 uppercase tracking-wider">
              {recognition}
            </span>
          </div>
          
          <h3 className="text-xl font-bold text-foreground mb-3 leading-tight">
            {title}
          </h3>
          
          <p className="text-muted-foreground mb-4 leading-relaxed">
            {description}
          </p>
          
          <div className="bg-muted/30 rounded-lg p-4 border border-border/50 flex items-start gap-3">
            <Star className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <p className="text-sm text-foreground font-medium">
              <span className="text-muted-foreground block text-xs uppercase tracking-wider mb-1">Impact</span>
              {impact}
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AwardCard;