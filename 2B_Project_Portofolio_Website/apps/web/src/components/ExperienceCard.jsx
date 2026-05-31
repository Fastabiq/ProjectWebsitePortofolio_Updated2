
import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, CheckCircle2, Wrench } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const ExperienceCard = ({ role, company, duration, achievements, tools, index }) => {
  const isCurrentRole = duration.includes('Present');

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative pl-8 md:pl-0"
    >
      {/* Timeline line for mobile */}
      <div className="absolute left-[11px] top-8 bottom-[-2rem] w-0.5 bg-border md:hidden last:hidden" />
      
      <Card className={`premium-card overflow-hidden group ${isCurrentRole ? 'border-primary/40 shadow-lg shadow-primary/10' : ''}`}>
        <CardContent className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                {role}
              </h3>
              <div className="flex items-center gap-2 text-lg text-muted-foreground font-medium">
                <Briefcase className="h-5 w-5 text-primary" />
                <span>{company}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm bg-muted/50 px-3 py-1.5 rounded-full w-fit">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className={isCurrentRole ? 'text-primary font-semibold' : 'text-muted-foreground'}>
                {duration}
              </span>
              {isCurrentRole && (
                <Badge className="ml-1 bg-primary/20 text-primary border-none text-xs h-5 px-2 flex items-center">
                  Current
                </Badge>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                Key Achievements & Impact
              </h4>
              <ul className="space-y-3">
                {achievements.map((achievement, i) => (
                  <li key={i} className="text-muted-foreground leading-relaxed flex items-start gap-3">
                    <span className="text-primary mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {tools && tools.length > 0 && (
              <div className="pt-4 border-t border-border/50">
                <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Wrench className="h-4 w-4 text-primary" />
                  Tools & Technologies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {tools.map((tool, i) => (
                    <Badge key={i} variant="secondary" className="bg-secondary/20 text-secondary-foreground hover:bg-secondary/30 border-none">
                      {tool}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ExperienceCard;
