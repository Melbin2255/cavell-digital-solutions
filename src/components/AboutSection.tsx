"use client";

import { useState, useEffect, useRef } from "react";
import { Zap, TrendingUp, Users, ArrowRight, Sparkles } from "lucide-react";

export default function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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
      { threshold: 0.2, rootMargin: "-50px" }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    if (titleRef.current) observer.observe(titleRef.current);
    if (paragraphRef.current) observer.observe(paragraphRef.current);
    if (cardsRef.current) observer.observe(cardsRef.current);

    return () => observer.disconnect();
  }, []);

  const highlights = [
    {
      icon: Zap,
      title: "Innovative Web Development",
      description: "Cutting-edge technologies and modern frameworks to build lightning-fast, scalable solutions.",
      gradient: "from-yellow-400 to-orange-500",
      bgGradient: "from-yellow-50 to-orange-50",
      emoji: "⚡"
    },
    {
      icon: TrendingUp,
      title: "Growth-Focused Marketing",
      description: "Data-driven strategies that turn visitors into customers and drive measurable business growth.",
      gradient: "from-green-400 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50",
      emoji: "📈"
    },
    {
      icon: Users,
      title: "Reliable Partnership",
      description: "Dedicated support and transparent communication throughout your entire digital transformation journey.",
      gradient: "from-blue-400 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
      emoji: "🤝"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="section-container relative bg-gradient-to-br from-background via-secondary/30 to-accent/20 overflow-hidden"
      id="about"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-chart-2/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
        
        {/* Floating geometric shapes */}
        <div className="absolute top-1/4 right-1/4 w-4 h-4 bg-primary/20 rounded-full animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/3 left-1/4 w-3 h-3 bg-chart-2/30 rounded-full animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/5 w-2 h-2 bg-primary/40 rounded-full animate-float" style={{ animationDelay: '4s' }} />
      </div>

      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 space-y-6">
            <h2 
              ref={titleRef}
              className="section-fade text-3xl md:text-4xl lg:text-5xl font-display font-black text-cavell-gradient"
            >
              <span className="inline-block animate-fade-in-up stagger-1">About</span>{" "}
              <span className="inline-block animate-fade-in-up stagger-2 relative">
                Cavell
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary to-chart-2 rounded-full animate-scale-in stagger-3" />
              </span>
            </h2>
            
            <p 
              ref={paragraphRef}
              className="section-fade text-lg md:text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto animate-fade-in-up stagger-3"
            >
              At Cavell, we believe{" "}
              <span className="text-primary font-semibold relative group">
                technology and marketing
                <span className="absolute inset-0 bg-primary/10 -skew-x-12 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left -z-10" />
              </span>{" "}
              go hand in hand. We're a forward-thinking digital team delivering{" "}
              <span className="text-chart-2 font-semibold">end-to-end solutions</span>{" "}
              — from sleek, responsive websites to high-performance marketing campaigns. Our mission is simple:{" "}
              <span className="text-cavell-gradient font-bold">build, automate, and grow businesses online.</span>
            </p>
          </div>

          {/* Highlight Cards */}
          <div 
            ref={cardsRef}
            className="grid md:grid-cols-3 gap-8 lg:gap-12"
          >
            {highlights.map((highlight, index) => {
              const Icon = highlight.icon;
              return (
                <div
                  key={index}
                  className={`section-fade group card-elevated p-8 md:p-10 text-center hover-lift cursor-pointer relative overflow-hidden animate-fade-in-up`}
                  style={{ animationDelay: `${0.4 + index * 0.2}s` }}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Card Background Gradient */}
                  <div 
                    className={`absolute inset-0 bg-gradient-to-br ${highlight.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`}
                  />
                  
                  {/* Animated Background Pattern */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500">
                    <div className="absolute inset-0" style={{
                      backgroundImage: `radial-gradient(circle at 25% 25%, currentColor 2px, transparent 2px)`,
                      backgroundSize: '24px 24px',
                      animation: 'float 8s ease-in-out infinite'
                    }} />
                  </div>

                  {/* Icon Container */}
                  <div className="relative mb-6">
                    <div className="relative mx-auto w-20 h-20 group-hover:scale-110 transition-transform duration-300">
                      {/* Icon Background */}
                      <div className={`absolute inset-0 bg-gradient-to-r ${highlight.gradient} rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 animate-glow`} />
                      
                      {/* Rotating Ring */}
                      <div className="absolute inset-0 border-2 border-primary/20 rounded-2xl animate-spin" style={{ animationDuration: '8s' }} />
                      
                      {/* Icon */}
                      <div className="relative w-full h-full flex items-center justify-center">
                        <Icon className="w-10 h-10 text-white drop-shadow-sm" />
                      </div>
                      
                      {/* Hover Sparkles */}
                      {hoveredCard === index && (
                        <div className="absolute -top-2 -right-2">
                          <Sparkles className="w-6 h-6 text-chart-2 animate-ping" />
                        </div>
                      )}
                    </div>

                    {/* Emoji Decorator */}
                    <div className="absolute -top-2 -left-2 text-2xl animate-float" style={{ animationDelay: `${index}s` }}>
                      {highlight.emoji}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-4 relative z-10">
                    <h3 className="text-xl md:text-2xl font-display font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                      {highlight.title}
                    </h3>
                    
                    <p className="text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                      {highlight.description}
                    </p>

                    {/* Learn More Link */}
                    <div className={`flex items-center justify-center space-x-2 text-primary font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0`}>
                      <span className="text-sm">Learn More</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>

                  {/* Interactive Border */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/20 transition-all duration-300" />
                  
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 -top-2 -left-2 right-2 bottom-2 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                </div>
              );
            })}
          </div>

          {/* Call-to-Action */}
          <div className="text-center mt-16 animate-fade-in-up stagger-4">
            <div className="inline-flex items-center space-x-4 px-8 py-4 bg-gradient-to-r from-accent to-secondary rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-chart-2 rounded-full animate-pulse" />
                <span className="text-sm font-semibold text-muted-foreground group-hover:text-foreground transition-colors">
                  Ready to get started?
                </span>
              </div>
              <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}