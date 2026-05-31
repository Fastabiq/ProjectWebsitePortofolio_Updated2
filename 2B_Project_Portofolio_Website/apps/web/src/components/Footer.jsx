import React from 'react';
import { Linkedin, Mail, Phone, Download, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleDownloadCV = () => {
    // Placeholder for CV download
    console.log('CV download initiated');
  };

  return (
    <footer className="bg-card border-t border-border pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="lg:col-span-2">
            <span className="text-2xl font-bold text-foreground mb-4 block" style={{ letterSpacing: '-0.02em' }}>
              Fastabiq Rahmat Imanu
            </span>
            <p className="text-muted-foreground text-base leading-relaxed max-w-md mb-6">
              Operations Research Engineer & Mining Optimization Specialist. Transforming complex operational data into measurable business results.
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="icon"
                className="border-border text-muted-foreground hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all duration-200"
                asChild
              >
                <a href="https://www.linkedin.com/in/fastabiqimanu/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="border-border text-muted-foreground hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all duration-200"
                asChild
              >
                <a href="mailto:fastabiqrahmat@gmail.com" aria-label="Email">
                  <Mail className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>

          <div>
            <span className="text-sm font-semibold text-foreground mb-6 block tracking-wider uppercase">
              Quick Links
            </span>
            <div className="flex flex-col gap-3">
              {['Home', 'About', 'Experience', 'Projects', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-muted-foreground hover:text-primary text-sm transition-colors duration-200 text-left w-fit flex items-center gap-1 group"
                >
                  {item}
                  <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <span className="text-sm font-semibold text-foreground mb-6 block tracking-wider uppercase">
              Contact Info
            </span>
            <div className="flex flex-col gap-4 mb-6">
              <a href="mailto:fastabiqrahmat@gmail.com" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                <Mail className="h-4 w-4" />
                fastabiqrahmat@gmail.com
              </a>
              <a href="tel:089668141474" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                <Phone className="h-4 w-4" />
                089668141474
              </a>
            </div>
            <Button
              onClick={handleDownloadCV}
              variant="secondary"
              className="w-full bg-secondary/20 text-secondary-foreground hover:bg-secondary/30 transition-all duration-200"
            >
              <Download className="h-4 w-4 mr-2" />
              Download CV
            </Button>
          </div>
        </div>

        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Fastabiq Rahmat Imanu. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Age: 27</span>
            <span className="h-1 w-1 rounded-full bg-border" />
            <span>Bekasi, Indonesia</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;