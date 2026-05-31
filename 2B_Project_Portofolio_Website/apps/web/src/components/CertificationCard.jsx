import React from 'react';
import { motion } from 'framer-motion';
import { Award, ShieldCheck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const CertificationCard = ({ title, institution, relevance, status, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Card className="premium-card h-full">
        <CardContent className="p-6 flex flex-col h-full">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2.5 bg-primary/10 rounded-lg text-primary">
              <Award className="h-5 w-5" />
            </div>
            <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5">
              {status}
            </Badge>
          </div>
          
          <h3 className="text-lg font-bold text-foreground mb-1 leading-tight">
            {title}
          </h3>
          <p className="text-sm font-medium text-primary mb-3">
            {institution}
          </p>
          
          <div className="mt-auto pt-4 border-t border-border/50">
            <p className="text-sm text-muted-foreground flex items-start gap-2">
              <ShieldCheck className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
              <span className="leading-relaxed">{relevance}</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CertificationCard;