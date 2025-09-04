"use client";

import { useState, useEffect, useRef } from "react";
import { ExternalLink, Eye, ArrowRight, X, ChevronLeft, ChevronRight, Sparkles, Code, Palette, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

export default function PortfolioSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [filter, setFilter] = useState("all");
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "-50px" }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    if (titleRef.current) observer.observe(titleRef.current);
    if (gridRef.current) observer.observe(gridRef.current);

    return () => observer.disconnect();
  }, []);

  const projects = [
    {
      id: 1,
      title: "TechStart E-commerce Platform",
      category: "Web Development",
      type: "web-dev",
      description: "Modern e-commerce solution with React, Node.js, and Stripe integration",
      longDescription: "A comprehensive e-commerce platform built for a growing tech startup. Features include real-time inventory management, advanced search and filtering, secure payment processing, and a custom admin dashboard.",
      image: "/api/placeholder/400/300",
      images: ["/api/placeholder/400/300", "/api/placeholder/400/300", "/api/placeholder/400/300"],
      tags: ["React", "Node.js", "Stripe", "MongoDB"],
      gradient: "from-blue-500 to-cyan-500",
      results: ["300% increase in online sales", "50% faster page load times", "95% customer satisfaction"],
      link: "#",
      emoji: "🛒"
    },
    {
      id: 2,
      title: "GrowthCorp SEO Campaign",
      category: "Digital Marketing",
      type: "marketing",
      description: "Complete SEO overhaul that boosted organic traffic by 400% in 6 months",
      longDescription: "A comprehensive SEO campaign that transformed GrowthCorp's online presence. We implemented technical SEO improvements, content strategy, and link building campaigns.",
      image: "/api/placeholder/400/300",
      images: ["/api/placeholder/400/300", "/api/placeholder/400/300"],
      tags: ["SEO", "Content Strategy", "Analytics", "Link Building"],
      gradient: "from-green-500 to-emerald-500",
      results: ["400% organic traffic increase", "85% improvement in SERP rankings", "200% lead generation growth"],
      link: "#",
      emoji: "📈"
    },
    {
      id: 3,
      title: "FinanceFlow Mobile App",
      category: "Mobile Development",
      type: "web-dev",
      description: "React Native financial tracking app with AI-powered insights",
      longDescription: "A sophisticated financial management app that helps users track expenses, set budgets, and receive AI-powered financial insights. Built with React Native for cross-platform compatibility.",
      image: "/api/placeholder/400/300",
      images: ["/api/placeholder/400/300", "/api/placeholder/400/300", "/api/placeholder/400/300"],
      tags: ["React Native", "AI/ML", "Firebase", "Financial APIs"],
      gradient: "from-purple-500 to-pink-500",
      results: ["50K+ downloads in first month", "4.8/5 app store rating", "35% user retention increase"],
      link: "#",
      emoji: "📱"
    },
    {
      id: 4,
      title: "AutomateMax Workflow System",
      category: "Automation",
      type: "automation",
      description: "Custom workflow automation saving 15+ hours weekly",
      longDescription: "An intelligent workflow automation system that streamlines business processes. Built with n8n and custom integrations to connect various business tools and automate repetitive tasks.",
      image: "/api/placeholder/400/300",
      images: ["/api/placeholder/400/300", "/api/placeholder/400/300"],
      tags: ["n8n", "API Integration", "Workflow Design", "Business Logic"],
      gradient: "from-orange-500 to-red-500",
      results: ["15+ hours saved weekly", "90% reduction in manual tasks", "Zero error rate in automation"],
      link: "#",
      emoji: "⚡"
    },
    {
      id: 5,
      title: "BrandVision Identity System",
      category: "Brand Design",
      type: "design",
      description: "Complete brand identity redesign with modern visual system",
      longDescription: "A comprehensive brand identity overhaul including logo design, color palette, typography system, and brand guidelines. Created a cohesive visual identity across all touchpoints.",
      image: "/api/placeholder/400/300",
      images: ["/api/placeholder/400/300", "/api/placeholder/400/300", "/api/placeholder/400/300"],
      tags: ["Brand Identity", "Logo Design", "Visual System", "Guidelines"],
      gradient: "from-indigo-500 to-purple-500",
      results: ["120% brand recognition increase", "85% customer preference boost", "Consistent brand application"],
      link: "#",
      emoji: "🎨"
    },
    {
      id: 6,
      title: "DataViz Analytics Dashboard",
      category: "Data Visualization",
      type: "web-dev",
      description: "Interactive dashboard with real-time analytics and reporting",
      longDescription: "A powerful analytics dashboard that transforms complex data into actionable insights. Features real-time data visualization, custom reporting, and interactive charts.",
      image: "/api/placeholder/400/300",
      images: ["/api/placeholder/400/300", "/api/placeholder/400/300"],
      tags: ["D3.js", "React", "Real-time Data", "Custom Charts"],
      gradient: "from-teal-500 to-blue-500",
      results: ["60% faster decision making", "100% data accuracy", "40% increase in data usage"],
      link: "#",
      emoji: "📊"
    }
  ];

  const categories = [
    { id: "all", label: "All Projects", icon: Sparkles },
    { id: "web-dev", label: "Web Development", icon: Code },
    { id: "marketing", label: "Digital Marketing", icon: Zap },
    { id: "design", label: "Brand Design", icon: Palette },
    { id: "automation", label: "Automation", icon: Code }
  ];

  const filteredProjects = filter === "all" 
    ? projects 
    : projects.filter(project => project.type === filter);

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const openProject = (projectId: number) => {
    setSelectedProject(projectId);
    setCurrentImageIndex(0);
  };

  const closeProject = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    const project = projects.find(p => p.id === selectedProject);
    if (project && currentImageIndex < project.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const selectedProjectData = projects.find(p => p.id === selectedProject);

  return (
    <>
      <section 
        ref={sectionRef}
        className="section-container relative bg-gradient-to-br from-background via-secondary/30 to-accent/20 overflow-hidden"
        id="portfolio"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-primary/4 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-chart-2/3 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
          
          {/* Mesh gradient overlay */}
          <div 
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `
                linear-gradient(45deg, var(--color-primary) 1px, transparent 1px),
                linear-gradient(-45deg, var(--color-chart-2) 1px, transparent 1px)
              `,
              backgroundSize: '32px 32px'
            }}
          />
        </div>

        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16 space-y-6">
              <h2 
                ref={titleRef}
                className="section-fade text-3xl md:text-4xl lg:text-5xl font-display font-black"
              >
                <span className="text-foreground animate-fade-in-up stagger-1">Our</span>{" "}
                <span className="text-cavell-gradient animate-fade-in-up stagger-2 relative inline-block">
                  Work
                  <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary to-chart-2 rounded-full animate-scale-in stagger-3" />
                </span>
              </h2>
              
              <p className="section-fade text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto animate-fade-in-up stagger-3">
                From stunning websites to data-driven marketing campaigns, explore how we've helped businesses{" "}
                <span className="text-primary font-semibold">transform their digital presence</span>{" "}
                and achieve{" "}
                <span className="text-chart-2 font-semibold">measurable results</span>.
              </p>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in-up stagger-3">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <Button
                    key={category.id}
                    variant={filter === category.id ? "default" : "outline"}
                    onClick={() => setFilter(category.id)}
                    className={`group relative overflow-hidden transition-all duration-300 ${
                      filter === category.id 
                        ? 'btn-primary shadow-lg scale-105' 
                        : 'btn-secondary hover:scale-105'
                    }`}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <Icon className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                      {category.label}
                    </span>
                    {filter === category.id && (
                      <div className="absolute inset-0 bg-gradient-to-r from-primary via-chart-2 to-primary bg-[length:200%_100%] animate-gradient" />
                    )}
                  </Button>
                );
              })}
            </div>

            {/* Projects Grid */}
            <div 
              ref={gridRef}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mb-16"
            >
              {filteredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className={`section-fade group card-elevated overflow-hidden cursor-pointer hover-lift animate-fade-in-up`}
                  style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                  onClick={() => openProject(project.id)}
                >
                  {/* Image Container */}
                  <div className="relative h-48 md:h-56 overflow-hidden">
                    {/* Placeholder for project image */}
                    <div className={`w-full h-full bg-gradient-to-br ${project.gradient} flex items-center justify-center relative group-hover:scale-110 transition-transform duration-500`}>
                      <div className="text-6xl opacity-60">{project.emoji}</div>
                      
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="flex items-center space-x-4">
                          <Button size="sm" variant="secondary" className="backdrop-blur-sm">
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Button>
                        </div>
                      </div>

                      {/* Category badge */}
                      <div className="absolute top-4 left-4">
                        <Badge className={`bg-gradient-to-r ${project.gradient} text-white border-0 animate-pulse-slow`}>
                          {project.category}
                        </Badge>
                      </div>

                      {/* Sparkle effect on hover */}
                      {hoveredProject === project.id && (
                        <div className="absolute top-2 right-2">
                          <Sparkles className="w-6 h-6 text-white animate-ping" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-8 space-y-4">
                    <div className="space-y-3">
                      <h3 className="text-xl md:text-2xl font-display font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                        {project.title}
                      </h3>
                      
                      <p className="text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                        {project.description}
                      </p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span 
                          key={tagIndex}
                          className="px-3 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-full group-hover:bg-primary/10 group-hover:text-primary transition-colors duration-300"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="px-3 py-1 bg-muted text-muted-foreground text-xs font-medium rounded-full">
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>

                    {/* View Project Link */}
                    <div className="flex items-center justify-between pt-4 border-t border-border/50">
                      <div className="flex items-center space-x-2 text-primary font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <span className="text-sm">View Project</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                      
                      <div className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Click to explore
                      </div>
                    </div>
                  </div>

                  {/* Interactive border */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/20 transition-all duration-300" />
                  
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 -top-2 -left-2 right-2 bottom-2 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                </div>
              ))}
            </div>

            {/* Call-to-Action */}
            <div className="text-center animate-fade-in-up stagger-4">
              <div className="inline-flex flex-col items-center space-y-6 p-10 bg-gradient-to-r from-accent/60 to-secondary/60 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer group backdrop-blur-sm">
                <div className="flex items-center space-x-4">
                  <div className="w-3 h-3 bg-chart-2 rounded-full animate-pulse" />
                  <span className="text-xl font-display font-bold text-foreground group-hover:text-primary transition-colors">
                    Ready to start your project?
                  </span>
                  <div className="w-3 h-3 bg-primary rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                </div>
                
                <p className="text-muted-foreground text-center max-w-md group-hover:text-foreground/80 transition-colors">
                  Let's discuss your vision and create something extraordinary together.
                </p>
                
                <Button
                  onClick={scrollToContact}
                  className="group btn-primary text-lg font-semibold px-8 py-4"
                >
                  <span className="flex items-center gap-3">
                    <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                    Start Your Project
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Detail Modal */}
      <Dialog open={selectedProject !== null} onOpenChange={() => closeProject()}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto backdrop-blur-xl bg-card/95 border-primary/20">
          {selectedProjectData && (
            <div className="space-y-8">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{selectedProjectData.emoji}</div>
                    <h3 className="text-2xl md:text-3xl font-display font-bold text-cavell-gradient">
                      {selectedProjectData.title}
                    </h3>
                  </div>
                  <Badge className={`bg-gradient-to-r ${selectedProjectData.gradient} text-white border-0`}>
                    {selectedProjectData.category}
                  </Badge>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={closeProject}
                  className="p-2"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Image Gallery */}
              <div className="relative">
                <div className={`aspect-video rounded-2xl bg-gradient-to-br ${selectedProjectData.gradient} flex items-center justify-center relative overflow-hidden`}>
                  <div className="text-8xl opacity-40">{selectedProjectData.emoji}</div>
                  
                  {/* Navigation arrows */}
                  {selectedProjectData.images.length > 1 && (
                    <>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="absolute left-4 top-1/2 -translate-y-1/2 backdrop-blur-sm"
                        onClick={prevImage}
                        disabled={currentImageIndex === 0}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="absolute right-4 top-1/2 -translate-y-1/2 backdrop-blur-sm"
                        onClick={nextImage}
                        disabled={currentImageIndex === selectedProjectData.images.length - 1}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                </div>
                
                {/* Image indicators */}
                {selectedProjectData.images.length > 1 && (
                  <div className="flex justify-center space-x-2 mt-4">
                    {selectedProjectData.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentImageIndex ? 'bg-primary' : 'bg-muted'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Project Details */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h4 className="font-display font-semibold text-lg mb-3 text-primary">Project Overview</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedProjectData.longDescription}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-display font-semibold text-lg mb-3 text-primary">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProjectData.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="bg-accent">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-display font-semibold text-lg mb-3 text-primary">Key Results</h4>
                    <div className="space-y-3">
                      {selectedProjectData.results.map((result, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className={`w-2 h-2 bg-gradient-to-r ${selectedProjectData.gradient} rounded-full animate-pulse`} />
                          <span className="text-sm text-foreground">{result}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button
                      onClick={scrollToContact}
                      className="w-full btn-primary"
                    >
                      <span className="flex items-center justify-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        Start Similar Project
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}