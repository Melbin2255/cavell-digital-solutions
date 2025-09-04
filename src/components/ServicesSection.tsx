"use client";

import { useState, useEffect, useRef } from "react";
import { Monitor, Smartphone, Settings, Search, Target, BarChart3, Palette, Brain, ChevronDown, ChevronUp, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ServicesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

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

    return () => observer.disconnect();
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const services = [
    {
      category: "Web Development",
      icon: Monitor,
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
      description: "Modern, responsive websites and web applications built with cutting-edge technologies.",
      services: [
        "Custom Website Development",
        "E-commerce Solutions", 
        "Progressive Web Apps (PWA)",
        "API Development & Integration"
      ],
      detailServices: [
        "React & Next.js Applications",
        "Full-Stack Development",
        "Database Design & Optimization",
        "Cloud Hosting & Deployment"
      ],
      metrics: "90% faster load times",
      emoji: "💻"
    },
    {
      category: "Digital Marketing",
      icon: Target,
      gradient: "from-green-500 to-emerald-500", 
      bgGradient: "from-green-50 to-emerald-50",
      description: "Data-driven marketing strategies that convert visitors into loyal customers.",
      services: [
        "Search Engine Optimization (SEO)",
        "Pay-Per-Click Advertising (PPC)",
        "Social Media Marketing",
        "Content Marketing Strategy"
      ],
      detailServices: [
        "Conversion Rate Optimization",
        "Email Marketing Automation",
        "Analytics & Performance Tracking",
        "Brand Positioning & Strategy"
      ],
      metrics: "300% ROI average",
      emoji: "🎯"
    },
    {
      category: "Brand Solutions",
      icon: Palette,
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50", 
      description: "Complete brand identity and visual design solutions that make lasting impressions.",
      services: [
        "Logo & Visual Identity Design",
        "Brand Strategy & Positioning",
        "UI/UX Design Systems",
        "Marketing Materials Design"
      ],
      detailServices: [
        "Brand Guidelines Development",
        "Website & App Design",
        "Print & Digital Collateral",
        "Brand Voice & Messaging"
      ],
      metrics: "95% client satisfaction",
      emoji: "🎨"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="section-container relative bg-gradient-to-br from-background to-secondary/50 overflow-hidden"
      id="services"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-chart-2/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, var(--color-primary) 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20 space-y-6">
            <h2 
              ref={titleRef}
              className="section-fade text-3xl md:text-4xl lg:text-5xl font-display font-black"
            >
              <span className="text-foreground animate-fade-in-up stagger-1">Our</span>{" "}
              <span className="text-cavell-gradient animate-fade-in-up stagger-2 relative inline-block">
                Expertise
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary to-chart-2 rounded-full animate-scale-in stagger-3" />
              </span>
            </h2>
            
            <p className="section-fade text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto animate-fade-in-up stagger-3">
              We combine technical excellence with creative innovation to deliver{" "}
              <span className="text-primary font-semibold">comprehensive digital solutions</span>{" "}
              that drive real business growth.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-10">
            {services.map((service, index) => {
              const Icon = service.icon;
              const isExpanded = expandedCard === index;
              const isHovered = hoveredCard === index;
              
              return (
                <div
                  key={index}
                  className={`section-fade group card-elevated relative overflow-hidden transition-all duration-500 cursor-pointer animate-fade-in-up ${
                    isExpanded ? 'lg:col-span-2 lg:row-span-2' : 'hover-lift'
                  }`}
                  style={{ animationDelay: `${0.4 + index * 0.2}s` }}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => setExpandedCard(isExpanded ? null : index)}
                >
                  {/* Background Gradient */}
                  <div 
                    className={`absolute inset-0 bg-gradient-to-br ${service.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />
                  
                  {/* Content */}
                  <div className="relative z-10 p-8 md:p-10">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        {/* Icon Container */}
                        <div className="relative">
                          <div className={`w-16 h-16 bg-gradient-to-r ${service.gradient} rounded-2xl shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 animate-glow`}>
                            <Icon className="w-8 h-8 text-white" />
                          </div>
                          
                          {/* Emoji Decorator */}
                          <div className="absolute -top-2 -right-2 text-xl animate-float" style={{ animationDelay: `${index * 2}s` }}>
                            {service.emoji}
                          </div>

                          {/* Sparkles on hover */}
                          {isHovered && (
                            <div className="absolute -top-1 -left-1">
                              <Sparkles className="w-5 h-5 text-chart-2 animate-ping" />
                            </div>
                          )}
                        </div>

                        <div>
                          <h3 className="text-xl md:text-2xl font-display font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                            {service.category}
                          </h3>
                          <div className={`mt-2 px-3 py-1 bg-gradient-to-r ${service.gradient} text-white text-xs font-semibold rounded-full inline-block`}>
                            {service.metrics}
                          </div>
                        </div>
                      </div>

                      {/* Expand Button */}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary/10"
                      >
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-primary" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-primary" />
                        )}
                      </Button>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed mb-6 group-hover:text-foreground/80 transition-colors duration-300">
                      {service.description}
                    </p>

                    {/* Services List */}
                    <div className="space-y-3 mb-6">
                      {service.services.map((item, itemIndex) => (
                        <div 
                          key={itemIndex}
                          className="flex items-center space-x-3 animate-fade-in-up"
                          style={{ animationDelay: `${0.6 + itemIndex * 0.1}s` }}
                        >
                          <div className={`w-2 h-2 bg-gradient-to-r ${service.gradient} rounded-full animate-pulse`} />
                          <span className="text-sm font-medium text-foreground">{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Expanded Content */}
                    <div className={`transition-all duration-500 overflow-hidden ${
                      isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <div className="border-t border-border/50 pt-6 space-y-4">
                        <h4 className="font-display font-semibold text-lg text-primary">Additional Services</h4>
                        <div className="grid sm:grid-cols-2 gap-3">
                          {service.detailServices.map((item, itemIndex) => (
                            <div 
                              key={itemIndex}
                              className="flex items-center space-x-3 animate-fade-in-up"
                              style={{ animationDelay: `${0.8 + itemIndex * 0.1}s` }}
                            >
                              <div className={`w-1.5 h-1.5 bg-gradient-to-r ${service.gradient} rounded-full`} />
                              <span className="text-sm text-muted-foreground">{item}</span>
                            </div>
                          ))}
                        </div>

                        {/* CTA Button */}
                        <div className="pt-4">
                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                              scrollToContact();
                            }}
                            className="group btn-primary w-full sm:w-auto"
                          >
                            <span className="flex items-center gap-2">
                              Get Started
                              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                            </span>
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Learn More Hint */}
                    {!isExpanded && (
                      <div className="flex items-center justify-center space-x-2 text-primary font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <span className="text-sm">Click to learn more</span>
                        <ChevronDown className="w-4 h-4 animate-bounce" />
                      </div>
                    )}
                  </div>

                  {/* Interactive Border */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/20 transition-all duration-300" />
                  
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 -top-2 -left-2 right-2 bottom-2 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                </div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-20 animate-fade-in-up stagger-4">
            <div className="inline-flex flex-col items-center space-y-4 p-8 bg-gradient-to-r from-accent/50 to-secondary/50 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer group backdrop-blur-sm">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-chart-2 rounded-full animate-pulse" />
                <span className="text-lg font-display font-semibold text-foreground group-hover:text-primary transition-colors">
                  Need a custom solution?
                </span>
                <div className="w-4 h-4 bg-primary rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
              </div>
              <p className="text-muted-foreground group-hover:text-foreground/80 transition-colors">
                Let's discuss your unique requirements and build something amazing together.
              </p>
              <Button
                onClick={scrollToContact}
                className="group btn-primary mt-4"
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                  Start Your Project
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}