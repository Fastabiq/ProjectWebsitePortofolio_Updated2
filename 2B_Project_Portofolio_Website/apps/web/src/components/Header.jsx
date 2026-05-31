
import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useLocation, useNavigate, Link } from 'react-router-dom';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === '/';

  const navItems = [
    { id: 'home', label: 'Home', path: '/' },
    { id: 'about', label: 'About', path: '/' },
    { id: 'experience', label: 'Experience', path: '/' },
    { id: 'projects', label: 'Projects', path: '/' },
    { id: 'skills', label: 'Skills', path: '/' },
    { id: 'timeline', label: 'Timeline', path: '/' },
    { id: 'case-studies', label: 'Case Studies', path: '/case-studies' },
    { id: 'mineflow', label: 'MineFlow AI', path: '/mineflow' }
  ];

  useEffect(() => {
    if (!isHome) {
      setActiveSection(location.pathname.substring(1) || 'home');
      return;
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['home', 'about', 'experience', 'projects', 'skills', 'timeline', 'contact']
        .map(id => document.getElementById(id));
        
      const scrollPosition = window.scrollY + 150;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome, location]);

  const handleNavigation = (item) => {
    setIsOpen(false);
    
    // If it's a separate page route
    if (item.path !== '/') {
      navigate(item.path);
      return;
    }

    // If we are not on home page and want to go to a home section
    if (!isHome) {
      navigate(`/#${item.id}`);
      return;
    }

    // If we are on home page, scroll to section
    const element = document.getElementById(item.id);
    if (element) {
      const offset = 80;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    } else if (item.id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || !isHome
          ? 'bg-background/80 backdrop-blur-lg border-b border-border shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link
            to="/"
            className="text-xl font-bold text-foreground hover:text-primary transition-colors duration-200 flex flex-col items-start"
          >
            <span style={{ letterSpacing: '-0.02em' }}>Fastabiq Rahmat Imanu</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeSection === item.id || (item.path !== '/' && location.pathname === item.path)
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="ml-4 pl-4 border-l border-border">
              <Button
                onClick={() => handleNavigation({ id: 'contact', path: '/' })}
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Get In Touch
              </Button>
            </div>
          </nav>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="text-foreground">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-card border-l-border">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <nav className="flex flex-col gap-2 mt-8">
                {[...navItems, { id: 'contact', label: 'Contact', path: '/' }].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item)}
                    className={`px-4 py-3 rounded-lg text-left font-medium transition-all duration-200 ${
                      activeSection === item.id || (item.path !== '/' && location.pathname === item.path)
                        ? 'text-primary bg-primary/10'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
