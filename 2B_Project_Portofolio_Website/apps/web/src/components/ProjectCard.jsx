import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Activity, Target, Wrench } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const ProjectCard = ({ title, description, metrics, tools, index, isFeatured }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={isFeatured ? "md:col-span-2" : ""}
    >
      <Card className="premium-card h-full flex flex-col group">
        <CardContent className="p-6 md:p-8 flex flex-col h-full">
          <div className="mb-6">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-primary/10 rounded-xl text-primary">
                <Activity className="h-6 w-6" />
              </div>
              <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 leading-tight">
              {title}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>

          <div className="mt-auto space-y-6">
            {metrics && metrics.length > 0 && (
              <div className="bg-muted/30 rounded-xl p-4 border border-border/50">
                <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Target className="h-4 w-4 text-primary" />
                  Impact Metrics
                </h4>
                <ul className="space-y-2">
                  {metrics.map((metric, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>{metric}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <div className="flex flex-wrap gap-2">
                {tools.map((tool, i) => (
                  <Badge key={i} variant="outline" className="border-border text-muted-foreground">
                    {tool}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;