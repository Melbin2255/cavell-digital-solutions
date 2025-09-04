"use client";

import { useState, useEffect, useRef } from "react";
import { Rocket, Lightbulb, BarChart3, HeadphonesIcon, Zap, Shield, Clock, Award, ChevronRight, Sparkles } from "lucide-react";

export default function WhyChooseSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredTile, setHoveredTile] = useState<number | null>(null);
  const [showStats, setShowStats] = useState(false);
  const [animatedCounts, setAnimatedCounts] = useState<number[]>([0, 0, 0, 0]);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            entry.target.classList.add("visible");
            
            // Trigger stats animation
            if (entry.target === statsRef.current) {
              setShowStats(true);
              animateCounters();
            }
          }
        });
      },
      { threshold: 0.2, rootMargin: "-50px" }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    if (titleRef.current) observer.observe(titleRef.current);
    if (statsRef.current) observer.observe(statsRef.current);

    return () => observer.disconnect();
  }, []);

  const animateCounters = () => {
    const targets = [150, 98, 24, 99];
    const duration = 2000;
    const steps = 60;
    const increment = targets.map(target => target / steps);
    
    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      setAnimatedCounts(prev => 
        prev.map((_, index) => Math.min(Math.floor(increment[index] * currentStep), targets[index]))
      );
      
      if (currentStep >= steps) {
        clearInterval(timer);
        setAnimatedCounts(targets);
      }
    }, duration / steps);
  };

  const values = [
    {
      icon: Rocket,
      title: "End-to-End Digital Partner",
      description: "From strategy to execution, we handle every aspect of your digital transformation journey.",
      stat: { value: animatedCounts[0], suffix: "+", label: "Projects Delivered" },
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
      emoji: "🚀",
      features: ["Strategy & Planning", "Design & Development", "Launch & Support"]
    },
    {
      icon: Lightbulb,
      title: "Innovative, Scalable Solutions",
      description: "Cutting-edge technologies and forward-thinking approaches that grow with your business.",
      stat: { value: animatedCounts[1], suffix: "%", label: "Client Satisfaction" },
      gradient: "from-yellow-500 to-orange-500",
      bgGradient: "from-yellow-50 to-orange-50", 
      emoji: "💡",
      features: ["Modern Tech Stack", "Scalable Architecture", "Future-Proof Design"]
    },
    {
      icon: BarChart3,
      title: "Results You Can Measure",
      description: "Data-driven strategies with transparent reporting and measurable business impact.",
      stat: { value: animatedCounts[2], suffix: "/7", label: "Support Available" },
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50",
      emoji: "📊",
      features: ["Analytics & Insights", "Performance Tracking", "ROI Optimization"]
    },
    {
      icon: HeadphonesIcon,
      title: "Dedicated Client Support",
      description: "Personal attention, clear communication, and ongoing support throughout our partnership.",
      stat: { value: animatedCounts[3], suffix: "%", label: "Response Rate" },
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50",
      emoji: "🤝",
      features: ["Dedicated Account Manager", "24/7 Support", "Regular Check-ins"]
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="section-container relative bg-gradient-to-br from-secondary/30 via-accent/20 to-background overflow-hidden"
      id="why-choose"
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 -z-20">
        {/* Large gradient orbs */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-chart-2/4 rounded-full blur-3xl animate-float" style={{ animationDelay: '5s' }} />
        
        {/* Geometric pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, var(--color-primary) 2px, transparent 2px),
              radial-gradient(circle at 75% 75%, var(--color-chart-2) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px, 40px 40px'
          }}
        />
        
        {/* Animated particles */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary/30 rounded-full animate-float"
              style={{
                left: `${10 + i * 12}%`,
                top: `${20 + (i % 4) * 15}%`,
                animationDelay: `${i * 1.5}s`,
                animationDuration: `${6 + i}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Decorative Arrow */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 -z-10">
        <div className="w-24 h-1 bg-gradient-to-r from-primary to-chart-2 rounded-full relative">
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-chart-2 border-y-2 border-y-transparent" />
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20 space-y-6">
            <h2 
              ref={titleRef}
              className="section-fade text-3xl md:text-4xl lg:text-5xl font-display font-black"
            >
              <span className="text-foreground animate-fade-in-up stagger-1">Why Work</span>{" "}
              <span className="text-cavell-gradient animate-fade-in-up stagger-2 relative inline-block">
                With Us?
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary to-chart-2 rounded-full animate-scale-in stagger-3" />
              </span>
            </h2>
            
            <p className="section-fade text-lg md:text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto animate-fade-in-up stagger-3">
              We combine{" "}
              <span className="text-primary font-semibold">technical expertise</span>{" "}
              and{" "}
              <span className="text-chart-2 font-semibold">marketing insights</span>{" "}
              to create solutions that not only look great but also drive{" "}
              <span className="text-cavell-gradient font-bold">measurable results</span>.
            </p>
          </div>

          {/* Values Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 mb-20">
            {values.map((value, index) => {
              const Icon = value.icon;
              const isHovered = hoveredTile === index;
              
              return (
                <div
                  key={index}
                  className={`section-fade group card-elevated p-8 text-center hover-lift cursor-pointer relative overflow-hidden animate-fade-in-up`}
                  style={{ animationDelay: `${0.4 + index * 0.15}s` }}
                  onMouseEnter={() => setHoveredTile(index)}
                  onMouseLeave={() => setHoveredTile(null)}
                >
                  {/* Background Gradient */}
                  <div 
                    className={`absolute inset-0 bg-gradient-to-br ${value.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`}
                  />

                  {/* Animated Pattern Background */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500">
                    <div 
                      className="absolute inset-0"
                      style={{
                        backgroundImage: `radial-gradient(circle at 50% 50%, currentColor 1px, transparent 1px)`,
                        backgroundSize: '20px 20px',
                        animation: 'float 6s ease-in-out infinite'
                      }}
                    />
                  </div>

                  {/* Icon Section */}
                  <div className="relative mb-6">
                    <div className="relative mx-auto w-20 h-20 group-hover:scale-110 transition-transform duration-300">
                      {/* Icon Background with pulse effect */}
                      <div className={`absolute inset-0 bg-gradient-to-r ${value.gradient} rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                        <div className="absolute inset-0 bg-white/10 rounded-2xl animate-pulse-slow" />
                      </div>
                      
                      {/* Rotating outer ring */}
                      <div className="absolute -inset-1 border border-primary/20 rounded-2xl animate-spin opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ animationDuration: '10s' }} />
                      
                      {/* Icon */}
                      <div className="relative w-full h-full flex items-center justify-center">
                        <Icon className="w-10 h-10 text-white drop-shadow-sm group-hover:scale-110 transition-transform duration-200" />
                      </div>
                      
                      {/* Hover effects */}
                      {isHovered && (
                        <>
                          <div className="absolute -top-2 -right-2">
                            <Sparkles className="w-6 h-6 text-chart-2 animate-ping" />
                          </div>
                          <div className="absolute -bottom-1 -left-1">
                            <div className="w-3 h-3 bg-primary/40 rounded-full animate-pulse" />
                          </div>
                        </>
                      )}
                    </div>

                    {/* Emoji decorator */}
                    <div 
                      className="absolute -top-3 -left-3 text-2xl animate-float"
                      style={{ animationDelay: `${index * 2}s` }}
                    >
                      {value.emoji}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-4 relative z-10">
                    <h3 className="text-xl font-display font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                      {value.title}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                      {value.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      {value.features.map((feature, featureIndex) => (
                        <div 
                          key={featureIndex}
                          className="flex items-center justify-center space-x-2 text-xs text-muted-foreground"
                        >
                          <div className={`w-1 h-1 bg-gradient-to-r ${value.gradient} rounded-full animate-pulse`} />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Stat Display */}
                    <div className={`mt-4 p-3 bg-gradient-to-r ${value.gradient} rounded-xl text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0`}>
                      <div className="text-2xl font-bold">
                        {showStats ? value.stat.value : 0}{value.stat.suffix}
                      </div>
                      <div className="text-xs opacity-90">{value.stat.label}</div>
                    </div>
                  </div>

                  {/* Interactive border */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/20 transition-all duration-300" />
                  
                  {/* Accent bar */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${value.gradient} scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-b-2xl`} />
                  
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 -top-2 -left-2 right-2 bottom-2 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                </div>
              );
            })}
          </div>

          {/* Stats Counter Section */}
          <div 
            ref={statsRef}
            className="text-center space-y-8 animate-fade-in-up stagger-4"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {values.map((value, index) => (
                <div 
                  key={index}
                  className="space-y-2 animate-scale-in"
                  style={{ animationDelay: `${1 + index * 0.2}s` }}
                >
                  <div className={`text-3xl md:text-4xl font-display font-bold text-transparent bg-gradient-to-r ${value.gradient} bg-clip-text`}>
                    {showStats ? value.stat.value : 0}{value.stat.suffix}
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    {value.stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Call-to-Action */}
            <div className="inline-flex items-center space-x-4 px-8 py-6 bg-gradient-to-r from-accent/60 to-secondary/60 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer group backdrop-blur-sm">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-chart-2 animate-pulse" />
                  <span className="text-lg font-display font-semibold text-foreground group-hover:text-primary transition-colors">
                    Ready to accelerate your growth?
                  </span>
                  <Award className="w-5 h-5 text-primary animate-pulse" style={{ animationDelay: '1s' }} />
                </div>
                <ChevronRight className="w-6 h-6 text-primary group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}