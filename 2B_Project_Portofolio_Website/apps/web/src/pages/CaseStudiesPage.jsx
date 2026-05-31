
import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Presentation, Target, TrendingUp, AlertTriangle, Lightbulb, CheckCircle2, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SkillsShowcase from '@/components/SkillsShowcase.jsx';

const slidesData = [
  {
    id: 1,
    title: "INPUT DUMP ANALYSIS & ROAD OPTIMIZATION",
    isCover: true,
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200&h=800&fit=crop",
    subtitle: "KPCS Site - PT Pamapersada Nusantara"
  },
  {
    id: 2,
    title: "Strategic Recommendation & Business Impact",
    image: "https://horizons-cdn.hostinger.com/9fd58777-b1fa-4c39-8396-17737740cdb7/60d92b69d92158043eed0dadc1e558b6.jpg",
    problem: "From Analysis to Actionable Decisions",
    solution: "Implement advanced road improvement strategy (Scenario 2).",
    result: "Multi-billion Rupiah cost savings, increased annual production capacity, improved equipment efficiency, reduced fuel consumption.",
    details: "The final executive recommendation provided a clear, data-backed roadmap for implementation, securing stakeholder buy-in for the optimized strategy."
  },
  {
    id: 3,
    title: "Executive Summary",
    image: "https://horizons-cdn.hostinger.com/9fd58777-b1fa-4c39-8396-17737740cdb7/e9bd1a267151a38be39a40a40252d659.jpg",
    problem: "Evaluating effectiveness of In-Pit Dump investments across KPCS operations",
    finding: "80% of total investment concentrated in road and pit development.",
    details: "Initial analysis revealed a significant disconnect between capital expenditure and operational output. The majority of resources were being poured into infrastructure without a clear correlation to productivity gains."
  },
  {
    id: 4,
    title: "Critical-to-Quality Drivers",
    image: "https://horizons-cdn.hostinger.com/9fd58777-b1fa-4c39-8396-17737740cdb7/b75b02788c65f15a924d2b9492a27a82.jpg",
    problem: "Finding the Variables That Matter Most",
    solution: "Key drivers identified: Hauling efficiency, cycle time, road condition, equipment synchronization, dispatch effectiveness.",
    details: "By isolating the key performance indicators, we shifted focus from gross investment to targeted operational metrics that directly influence the bottom line."
  },
  {
    id: 5,
    title: "Investment vs Productivity Analysis",
    image: "https://horizons-cdn.hostinger.com/9fd58777-b1fa-4c39-8396-17737740cdb7/3f17c723813b28f768ecc998768ed22a.jpg",
    problem: "Measuring the Real Impact of Infrastructure Investment",
    finding: "PA1 showed strong gains, PA2 showed minimal improvement despite similar investment - Identified significant efficiency gap.",
    details: "A comparative analysis across production areas highlighted inefficiencies. PA2's stagnant productivity despite high investment indicated underlying operational bottlenecks not solved by capital alone."
  },
  {
    id: 6,
    title: "Road Investment Scenario Simulation",
    image: "https://horizons-cdn.hostinger.com/9fd58777-b1fa-4c39-8396-17737740cdb7/843c0a869e848f2685cf4dfe5114aed5.jpg",
    problem: "Forecasting Future Costs Through Operational Scenarios",
    solution: "Modeled three investment strategies: Do Nothing, Repair+Compact, Replace Material+Scorea.",
    result: "Strategic material replacement generates significant long-term savings.",
    details: "Advanced scenario modeling allowed leadership to visualize the financial impact of different maintenance strategies over a multi-year horizon."
  },
  {
    id: 7,
    title: "Productivity Impact Simulation",
    isResults: true,
    image: "https://horizons-cdn.hostinger.com/9fd58777-b1fa-4c39-8396-17737740cdb7/d682e0dcd2030e0cda728336ee02abb7.jpg",
    problem: "Quantifying the Operational Value of Road Improvements",
    solution: "Developed operational simulations for fleet productivity under different road conditions.",
    result: "Increased hauling performance, stabilized cycle times, improved morale.",
    details: "Beyond direct cost savings, the simulation demonstrated how optimized infrastructure creates a compounding effect on fleet efficiency and operator well-being."
  },
  {
    id: 8,
    title: "Integrated Fleet Performance Modeling",
    image: "https://horizons-cdn.hostinger.com/9fd58777-b1fa-4c39-8396-17737740cdb7/c148d54f6b81f7c435c6a9636fb4ac68.jpg",
    problem: "Simulating Loader and Hauler Performance Under Multiple Scenarios",
    solution: "Fleet-wide simulation details: 7 loaders + 56 haul trucks.",
    result: "Optimized road conditions increase productive time, reduce delays, enhance mine productivity. Key metrics: Productivity increase, cycle time reduction, fuel savings.",
    details: "A comprehensive digital twin of the fleet operations proved that synchronized equipment dispatching combined with optimal road conditions yields the highest ROI."
  }
];

const CaseStudiesPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slidesData.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? slidesData.length - 1 : prev - 1));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const slide = slidesData[currentSlide];

  return (
    <>
      <Helmet>
        <title>Case Study: Input Dump Analysis & Road Optimization - Fastabiq Rahmat Imanu</title>
        <meta
          name="description"
          content="Detailed case study on mining operations optimization, scenario modeling, and fleet productivity analytics at KPCS Site."
        />
      </Helmet>

      <div className="min-h-screen bg-background pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Presentation className="h-4 w-4" /> 8 Slides
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/20 text-secondary-foreground text-sm font-medium">
                <Target className="h-4 w-4" /> 80% Investment Focus
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted text-muted-foreground text-sm font-medium">
                <TrendingUp className="h-4 w-4" /> Multi-Scenario Analysis
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
              Input Dump Analysis & Road Optimization
            </h1>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 text-lg text-muted-foreground border-l-4 border-primary pl-4">
              <div>
                <strong className="text-foreground block text-sm uppercase tracking-wider mb-1">Client</strong>
                KPCS - PT Pamapersada Nusantara
              </div>
              <div>
                <strong className="text-foreground block text-sm uppercase tracking-wider mb-1">Duration</strong>
                April 18-30, 2026
              </div>
              <div>
                <strong className="text-foreground block text-sm uppercase tracking-wider mb-1">Role</strong>
                Operations Research Expert
              </div>
            </div>
          </motion.div>

          {/* Presentation Container */}
          <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-2xl flex flex-col">
            
            {/* Navigation Bar */}
            <div className="bg-muted/30 border-b border-border p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm font-medium text-muted-foreground">
                Slide {currentSlide + 1} of {slidesData.length}
              </div>
              
              <div className="flex items-center gap-2">
                {slidesData.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      currentSlide === idx ? 'bg-primary w-6' : 'bg-border hover:bg-muted-foreground'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={prevSlide} className="h-8 w-8 rounded-full">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={nextSlide} className="h-8 w-8 rounded-full">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Main Content Area */}
            {slide.isCover ? (
              // Cover Slide Layout
              <div className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${slide.image})`,
                    backgroundPosition: 'center'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
                </div>
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="relative z-10 text-center px-8 max-w-4xl"
                  >
                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight tracking-tight">
                      {slide.title}
                    </h2>
                    <p className="text-2xl md:text-3xl text-primary font-semibold">
                      {slide.subtitle}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            ) : (
              // Content Slide Layout
              <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
                
                {/* Image Display */}
                <div className="lg:col-span-8 bg-black/50 relative overflow-hidden flex items-center justify-center p-4 md:p-8">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentSlide}
                      src={slide.image}
                      alt={slide.title}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                      transition={{ duration: 0.4 }}
                      className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                    />
                  </AnimatePresence>
                </div>

                {/* Insights Panel */}
                <div className="lg:col-span-4 p-6 md:p-8 flex flex-col bg-card border-l border-border">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSlide}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.4 }}
                      className="flex-1 flex flex-col"
                    >
                      <div className="mb-8">
                        {slide.isResults && (
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-4 text-xs font-bold tracking-wider text-amber-500 uppercase bg-amber-500/10 border border-amber-500/20 rounded-full">
                            <Award className="h-3.5 w-3.5" />
                            Results & Impact
                          </div>
                        )}
                        <h2 className="text-2xl font-bold text-foreground leading-tight">
                          {slide.title}
                        </h2>
                      </div>

                      <div className="space-y-6 flex-1">
                        {slide.problem && (
                          <div className="bg-problem/10 border border-problem/20 rounded-xl p-4">
                            <div className="flex items-center gap-2 text-problem font-semibold mb-2">
                              <AlertTriangle className="h-4 w-4" />
                              Problem Statement
                            </div>
                            <p className="text-foreground text-sm leading-relaxed">{slide.problem}</p>
                          </div>
                        )}

                        {slide.solution && (
                          <div className="bg-solution/10 border border-solution/20 rounded-xl p-4">
                            <div className="flex items-center gap-2 text-solution font-semibold mb-2">
                              <Lightbulb className="h-4 w-4" />
                              Approach / Solution
                            </div>
                            <p className="text-foreground text-sm leading-relaxed">{slide.solution}</p>
                          </div>
                        )}

                        {(slide.finding || slide.result) && (
                          <div className="bg-result/10 border border-result/20 rounded-xl p-4">
                            <div className="flex items-center gap-2 text-result font-semibold mb-2">
                              <CheckCircle2 className="h-4 w-4" />
                              {slide.finding ? 'Key Finding' : 'Result'}
                            </div>
                            <p className="text-foreground text-sm leading-relaxed">{slide.finding || slide.result}</p>
                          </div>
                        )}
                      </div>

                      <div className="mt-8 pt-6 border-t border-border">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {slide.details}
                        </p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            )}
          </div>

          <SkillsShowcase />

        </div>
      </div>
    </>
  );
};

export default CaseStudiesPage;
