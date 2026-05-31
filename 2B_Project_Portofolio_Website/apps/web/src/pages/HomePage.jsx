
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowRight, Download, MapPin, Mail, Phone, Linkedin, ActivitySquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import ExperienceCard from '@/components/ExperienceCard.jsx';
import ProjectCard from '@/components/ProjectCard.jsx';
import SkillBadge from '@/components/SkillBadge.jsx';
import CertificationCard from '@/components/CertificationCard.jsx';
import TimelineItem from '@/components/TimelineItem.jsx';
import AwardCard from '@/components/AwardCard.jsx';
import ContactForm from '@/components/ContactForm.jsx';

const HomePage = () => {
  const location = useLocation();

  useEffect(() => {
    // Handle scroll to hash when navigating back from other pages
    if (location.hash) {
      const id = location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          const offset = 80;
          window.scrollTo({
            top: element.offsetTop - offset,
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  }, [location]);

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

  const experiences = [
    {
      role: 'Mine Optimization Engineer',
      company: 'PT Pamapersada Nusantara',
      duration: 'Jan 2023 - Present',
      achievements: [
        'Achieved 90% machine availability through predictive maintenance and operational tracking.',
        'Reduced loading time by 15% and abnormal cycles by 8% via payload optimization.',
        'Delivered $165K/month in operational savings through data-driven fleet management.'
      ],
      tools: ['SQL', 'Power BI', 'Fleet Management Systems', 'Data Analytics']
    },
    {
      role: 'Capabilities Development Intern',
      company: 'PT Pertamina',
      duration: 'Sep 2022 – Jan 2023 (5 months)',
      achievements: [
        'Automated training reporting processes, resulting in 30% time savings.',
        'Designed and deployed comprehensive dashboards tracking metrics for 400+ participants.',
        'Streamlined data collection workflows across multiple departments.'
      ],
      tools: ['Excel (Advanced)', 'Dashboard Design', 'Process Automation']
    },
    {
      role: 'Agile Innovation Intern / Co-Founder',
      company: 'CIAS',
      duration: 'Aug 2021 – Feb 2022 (7 months)',
      achievements: [
        'Successfully launched a sustainable FMCG startup MVP with a lean $300 budget.',
        'Achieved 90% user retention during the MVP phase through rapid iteration.',
        'Generated profitable early sales validating the business model and market fit.'
      ],
      tools: ['Agile Methodology', 'Market Validation', 'Business Development']
    }
  ];

  const projects = [
    {
      title: 'Payload Monitoring & Hauling Optimization System',
      description: 'Developed an integrated system to monitor payload distribution and optimize hauling routes in real-time, addressing inefficiencies in fleet operations.',
      metrics: [
        '15% reduction in loading times',
        '8% reduction in abnormal operational cycles',
        'Significant improvement in overall fleet efficiency'
      ],
      tools: ['Python', 'SQL', 'Optimization Algorithms', 'IoT Data'],
      isFeatured: true
    },
    {
      title: 'Mining Operational Dashboard & KPI Visualization',
      description: 'Designed a centralized BI dashboard providing real-time visibility into critical operational metrics across multiple sites.',
      metrics: [
        'Tracked and maintained 90% machine availability',
        'Unified disparate data sources into a single source of truth'
      ],
      tools: ['Power BI', 'DAX', 'SQL Server'],
      isFeatured: false
    },
    {
      title: 'QGIS-Based Equipment Tracking System',
      description: 'Implemented a spatial visualization system for tracking equipment movement and operational zones to improve safety and coordination.',
      metrics: [
        'Enhanced spatial awareness for dispatchers',
        'Improved safety compliance in restricted zones'
      ],
      tools: ['QGIS', 'Spatial Analysis', 'GPS Integration'],
      isFeatured: false
    }
  ];

  const skills = [
    {
      category: 'Data Analytics & Business Intelligence',
      skills: ['SQL (Advanced)', 'Power BI (Advanced)', 'Excel (Advanced)', 'Data Analysis', 'Statistical Analysis', 'Dashboard Design', 'Data Visualization', 'KPI Analysis']
    },
    {
      category: 'Programming & Optimization',
      skills: ['Python (Intermediate)', 'Linear Programming', 'Mixed Integer Linear Programming', 'Optimization Algorithms', 'DBSCAN Clustering', 'TSP Routing']
    },
    {
      category: 'Mining Operations & Engineering',
      skills: ['Fleet Management Systems', 'Coal Mining Operations', 'Hauling Efficiency Optimization', 'Machine Availability Management', 'Payload Optimization', 'Dispatch System Design']
    },
    {
      category: 'Quality & Process Management',
      skills: ['Statistical Quality Control', 'Lean Six Sigma', 'ISO 31000 Risk Management', 'Process Improvement', 'Quality Management Systems']
    },
    {
      category: 'Emerging Technologies',
      skills: ['IoT Systems', 'Automation', 'Real-time Monitoring', 'Sensor Data Analysis']
    },
    {
      category: 'Business & Innovation',
      skills: ['Startup Operations', 'Product Design', 'Market Validation', 'Business Development', 'Agile Methodology', 'Innovation Thinking']
    }
  ];

  const certifications = [
    {
      title: 'Pengawas Operational Pertama',
      institution: 'BNSP',
      relevance: 'Operational supervision and management certification, recognized in Indonesian mining and industrial operations.',
      status: '2025'
    },
    {
      title: 'Project Management',
      institution: 'PAMA',
      relevance: 'Advanced project planning, execution, and control methodologies for large-scale operations.',
      status: '2024'
    },
    {
      title: 'Data Science',
      institution: 'PAMA',
      relevance: 'Comprehensive training in data analysis, predictive modeling, and generating actionable insights.',
      status: '2023'
    },
    {
      title: 'SHE Pertama Plus',
      institution: 'PAMA',
      relevance: 'Safety, Health, and Environment management, critical for maintaining compliance in mining operations.',
      status: '2023'
    },
    {
      title: 'Business Analytics',
      institution: 'Simplilearn',
      relevance: 'International credential in business data analysis, statistical methods, and decision support systems.',
      status: '2022'
    },
    {
      title: 'Quality Management System',
      institution: 'ISO 9001:2015',
      relevance: 'International standard certification for quality management and continuous process improvement.',
      status: 'Active'
    }
  ];

  const timeline = [
    {
      phase: 'Education Phase',
      period: '2015 - 2022',
      description: 'Built a strong technical foundation with a Diploma in Electronics Engineering (PENS) followed by a Bachelor of Industrial Engineering from Universitas Indonesia (GPA 3.48/4.00). Achieved a 45% reduction in ship routing distance for thesis project.'
    },
    {
      phase: 'Professional Development Phase',
      period: '2021 - 2023',
      description: 'Gained practical experience through agile innovation at CIAS Startup and capabilities development at PT Pertamina. Earned foundational certifications in Business Analytics and Quality Management.'
    },
    {
      phase: 'Operations Excellence Phase',
      period: '2023 - Present',
      description: 'Transitioned into heavy industry as a Mine Optimization Engineer at PT Pamapersada Nusantara. Focused on data-driven fleet management, payload optimization, and achieving significant cost savings.'
    }
  ];

  const awards = [
    {
      title: 'ANOVA Quality Control Project',
      recognition: '3rd Place',
      description: 'Led a quality control initiative focusing on fleet and payload optimization in mining operations.',
      impact: 'Delivered $165K/month in operational savings.'
    },
    {
      title: 'Design Thinking Challenge',
      recognition: '3rd Place',
      description: 'Developed an innovative IoT-based operator tracking system to monitor performance and safety.',
      impact: 'Projected to boost operational productivity by 24%.'
    },
    {
      title: 'NAFTEX Business Case Competition',
      recognition: 'Finalist',
      description: 'Designed and pitched an e-commerce Minimum Viable Product (MVP) with a comprehensive go-to-market strategy.',
      impact: 'Created a highly scalable financial model validated by industry judges.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Fastabiq Rahmat Imanu - Operations Research Engineer | Mining Optimization Specialist</title>
        <meta
          name="description"
          content="Operations Research Engineer and Data Analyst specializing in mining optimization. Transforming operations through data-driven strategies, delivering measurable efficiency gains and cost savings."
        />
      </Helmet>

      {/* HERO SECTION */}
      <section
        id="home"
        className="relative min-h-[100dvh] flex items-center justify-center gradient-overlay pt-20"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1559774944-4e6c033af2fb)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex-shrink-0"
            >
              <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-primary/30 shadow-2xl shadow-primary/20">
                <img
                  src="https://horizons-cdn.hostinger.com/9fd58777-b1fa-4c39-8396-17737740cdb7/35b909461abf334cf353bf739f58c4e8.jpg"
                  alt="Professional headshot of Fastabiq Rahmat Imanu wearing a gray blazer and light blue checkered shirt, standing against a brick wall background"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/10" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex-1 text-center md:text-left space-y-6"
            >
              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight"
                style={{ letterSpacing: '-0.02em' }}
              >
                Operational Excellence Through Data, Optimization & Strategic Analytics
              </h1>

              <p className="text-xl md:text-2xl text-primary font-medium">
                Operations Research Engineer | Mining Optimization Specialist | Data Analyst
              </p>

              <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
                Transforming mining operations through data-driven optimization, delivering measurable results — <strong className="text-foreground font-semibold">$165K/month savings, 15% efficiency gains, 90% machine availability</strong>.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-start">
                <Button
                  onClick={() => scrollToSection('projects')}
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 active:scale-[0.98] h-12 px-8 text-base"
                >
                  View My Work <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  onClick={() => scrollToSection('contact')}
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200 active:scale-[0.98] h-12 px-8 text-base bg-background/50 backdrop-blur-sm"
                >
                  Get In Touch
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="section-spacing bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-7 space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">About Me</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  My career is defined by a continuous evolution toward operational excellence. Starting as an electronics technician, I developed a hands-on understanding of systems. Transitioning into industrial engineering, I learned to optimize processes at scale—culminating in a thesis project that achieved a <strong className="text-foreground">45% reduction in ship routing distance</strong>.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Today, as a data-driven operations specialist in the mining sector, I bridge the gap between complex engineering challenges and advanced analytics. I thrive in environments that require a startup innovation mindset combined with rigorous, enterprise-level execution.
                </p>
                
                <div className="bg-card border border-border rounded-2xl p-8 mt-8 relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary" />
                  <h3 className="text-xl font-bold text-foreground mb-3">Core Philosophy</h3>
                  <p className="text-lg text-muted-foreground italic">
                    "Data without action is just noise. The real value comes from turning insights into operational improvements that drive measurable business results."
                  </p>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-8">
                <div className="bg-card border border-border rounded-2xl p-8">
                  <h3 className="text-xl font-bold text-foreground mb-6">Key Strengths</h3>
                  <ul className="space-y-4">
                    {[
                      'Mining operations domain expertise',
                      'Advanced analytics & data modeling',
                      'Bridging technical and operational teams',
                      'Startup innovation mindset',
                      'Rapid growth trajectory & adaptability'
                    ].map((strength, i) => (
                      <li key={i} className="flex items-start gap-3 text-muted-foreground">
                        <span className="text-primary mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                        <span>{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-primary/10 border border-primary/20 rounded-2xl p-8">
                  <h3 className="text-xl font-bold text-primary mb-3">Career Vision</h3>
                  <p className="text-foreground leading-relaxed">
                    Aspiring to become a globally competitive Operations Research & Analytics professional, leading transformative initiatives in resource-intensive industries.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section id="experience" className="section-spacing bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Professional Experience</h2>
            <p className="text-muted-foreground text-lg">
              A track record of driving efficiency and innovation across industries.
            </p>
          </motion.div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <ExperienceCard key={index} {...exp} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="section-spacing bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Featured Case Studies</h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Applying operations research and data analytics to solve complex industrial challenges.
            </p>
          </motion.div>

          {/* Featured Dashboard Spotlight */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <div className="bg-gradient-to-br from-card to-card border border-primary/20 rounded-3xl p-8 md:p-12 relative overflow-hidden group shadow-2xl shadow-primary/5">
              <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform duration-700">
                <ActivitySquare className="w-64 h-64 text-primary" />
              </div>
              
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-8 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-bold tracking-wide uppercase">
                    Interactive Showcase
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
                    MineFlow AI Dashboard
                  </h3>
                  <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
                    Interactive executive dashboard for real-time fleet productivity monitoring, KPI tracking, and operational simulation. Experience the data-driven approach firsthand.
                  </p>
                </div>
                <div className="md:col-span-4 flex md:justify-end">
                  <Button 
                    asChild
                    size="lg"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 active:scale-[0.98] h-14 px-8 text-base shadow-lg shadow-primary/25 group/btn w-full md:w-auto"
                  >
                    <Link to="/mineflow">
                      Launch Dashboard 
                      <ArrowRight className="ml-2 h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={index} {...project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" className="section-spacing bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Technical Arsenal</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A comprehensive blend of engineering principles, advanced analytics, and business acumen.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((group, index) => (
              <SkillBadge key={index} {...group} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS SECTION */}
      <section id="certifications" className="section-spacing bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Certifications</h2>
            <p className="text-muted-foreground text-lg">
              Continuous learning and professional validation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <CertificationCard key={index} {...cert} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE SECTION */}
      <section id="timeline" className="section-spacing bg-card">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Career Progression</h2>
            <p className="text-muted-foreground text-lg">
              The phases of my professional journey.
            </p>
          </motion.div>

          <div className="space-y-0">
            {timeline.map((item, index) => (
              <TimelineItem key={index} {...item} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* AWARDS SECTION */}
      <section id="awards" className="section-spacing bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Awards & Recognition</h2>
            <p className="text-muted-foreground text-lg">
              Acknowledged for innovation, problem-solving, and business impact.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {awards.map((award, index) => (
              <AwardCard key={index} {...award} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="section-spacing bg-card">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Let's Connect</h2>
              <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                Whether you're looking to optimize operations, leverage data analytics, or discuss potential collaborations, I'm always open to a conversation.
              </p>

              <div className="space-y-6 mb-10">
                <a href="mailto:fastabiqrahmat@gmail.com" className="flex items-center gap-4 p-4 rounded-xl bg-background border border-border hover:border-primary/50 transition-colors group">
                  <div className="p-3 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-medium mb-1">Email</p>
                    <p className="text-foreground font-semibold">fastabiqrahmat@gmail.com</p>
                  </div>
                </a>

                <a href="tel:089668141474" className="flex items-center gap-4 p-4 rounded-xl bg-background border border-border hover:border-primary/50 transition-colors group">
                  <div className="p-3 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-medium mb-1">Phone</p>
                    <p className="text-foreground font-semibold">089668141474</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-background border border-border">
                  <div className="p-3 bg-primary/10 rounded-lg text-primary">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-medium mb-1">Location</p>
                    <p className="text-foreground font-semibold">Bekasi, Indonesia</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200 h-12 px-6"
                  asChild
                >
                  <a href="https://www.linkedin.com/in/fastabiqimanu/" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-5 w-5 mr-2" />
                    Connect on LinkedIn
                  </a>
                </Button>
                <Button
                  variant="secondary"
                  className="bg-secondary/20 text-secondary-foreground hover:bg-secondary/30 transition-all duration-200 h-12 px-6"
                >
                  <Download className="h-5 w-5 mr-2" />
                  CV
                </Button>
              </div>
            </div>

            <div className="bg-background border border-border rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-foreground mb-6">Send a Message</h3>
              <ContactForm />
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
