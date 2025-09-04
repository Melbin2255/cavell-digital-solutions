"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Quote, Star, Play, Pause, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function TestimonialsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [hoveredTestimonial, setHoveredTestimonial] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

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
    if (carouselRef.current) observer.observe(carouselRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const testimonials = [
    {
      id: 1,
      quote: "Cavell transformed our online presence completely. Their blend of technical expertise and marketing insights is unbeatable. We saw a 300% increase in leads within just 3 months!",
      author: "Sarah Johnson",
      company: "TechStart Solutions",
      role: "CEO & Founder",
      avatar: "SJ",
      rating: 5,
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
      highlight: "300% lead increase",
      emoji: "🚀"
    },
    {
      id: 2,
      quote: "Working with Cavell was a game-changer for our business. They delivered a stunning website and backed it with a marketing strategy that actually works. Professional, creative, and reliable.",
      author: "Michael Chen",
      company: "GrowthCorp",
      role: "Marketing Director",
      avatar: "MC", 
      rating: 5,
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50",
      highlight: "400% traffic boost",
      emoji: "📈"
    },
    {
      id: 3,
      quote: "The automation system Cavell built for us has been incredible. We're saving 15+ hours per week and our processes are now error-free. They truly understand business needs.",
      author: "Emily Rodriguez",
      company: "AutomateMax",
      role: "Operations Manager",
      avatar: "ER",
      rating: 5,
      gradient: "from-purple-500 to-pink-500", 
      bgGradient: "from-purple-50 to-pink-50",
      highlight: "15+ hours saved weekly",
      emoji: "⚡"
    },
    {
      id: 4,
      quote: "Cavell's design work exceeded our expectations. They created a brand identity that perfectly captures our vision and resonates with our customers. The attention to detail is remarkable.",
      author: "David Kim",
      company: "BrandVision Co.",
      role: "Creative Director",
      avatar: "DK",
      rating: 5,
      gradient: "from-orange-500 to-red-500",
      bgGradient: "from-orange-50 to-red-50", 
      highlight: "120% brand recognition",
      emoji: "🎨"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="section-container relative bg-gradient-to-br from-accent/30 via-secondary/40 to-background overflow-hidden"
      id="testimonials"
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 -z-10">
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-chart-2/4 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
        
        {/* Quote pattern background */}
        <div 
          className="absolute inset-0 opacity-[0.01]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23009688' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}
        />
        
        {/* Floating quote marks */}
        <div className="absolute top-20 right-20 text-6xl text-primary/5 animate-float" style={{ animationDelay: '2s' }}>❝</div>
        <div className="absolute bottom-20 left-20 text-4xl text-chart-2/5 animate-float" style={{ animationDelay: '4s' }}>❞</div>
      </div>

      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 space-y-6">
            <h2 
              ref={titleRef}
              className="section-fade text-3xl md:text-4xl lg:text-5xl font-display font-black"
            >
              <span className="text-foreground animate-fade-in-up stagger-1">What Clients</span>{" "}
              <span className="text-cavell-gradient animate-fade-in-up stagger-2 relative inline-block">
                Say
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary to-chart-2 rounded-full animate-scale-in stagger-3" />
              </span>
            </h2>
            
            <p className="section-fade text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto animate-fade-in-up stagger-3">
              Don't just take our word for it. Here's what our{" "}
              <span className="text-primary font-semibold">satisfied clients</span>{" "}
              have to say about working with{" "}
              <span className="text-chart-2 font-semibold">Cavell</span>.
            </p>
          </div>

          {/* Testimonials Carousel */}
          <div 
            ref={carouselRef}
            className="relative mb-16 animate-fade-in-up stagger-4"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <div className="overflow-hidden rounded-3xl">
              <div 
                className="flex transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div
                    key={testimonial.id}
                    className="w-full flex-shrink-0 px-4"
                    onMouseEnter={() => setHoveredTestimonial(testimonial.id)}
                    onMouseLeave={() => setHoveredTestimonial(null)}
                  >
                    <div className={`card-elevated p-8 md:p-12 relative overflow-hidden group transition-all duration-500 ${
                      hoveredTestimonial === testimonial.id ? 'scale-[1.02]' : ''
                    }`}>
                      {/* Background gradient */}
                      <div 
                        className={`absolute inset-0 bg-gradient-to-br ${testimonial.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                      />
                      
                      {/* Quote icon */}
                      <div className="absolute top-8 left-8 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                        <Quote className="w-16 h-16 text-primary transform rotate-180" />
                      </div>
                      
                      {/* Emoji decorator */}
                      <div className="absolute top-6 right-6 text-3xl animate-float opacity-40 group-hover:opacity-80 transition-opacity duration-300">
                        {testimonial.emoji}
                      </div>

                      <div className="relative z-10 space-y-8">
                        {/* Rating Stars */}
                        <div className="flex items-center space-x-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-5 h-5 fill-current text-yellow-400 animate-scale-in`}
                              style={{ animationDelay: `${i * 0.1}s` }}
                            />
                          ))}
                        </div>

                        {/* Quote */}
                        <blockquote className="text-lg md:text-xl text-foreground leading-relaxed font-medium italic group-hover:text-foreground/90 transition-colors duration-300">
                          "{testimonial.quote}"
                        </blockquote>

                        {/* Testimonial footer */}
                        <div className="flex items-center justify-between pt-6 border-t border-border/50">
                          <div className="flex items-center space-x-4">
                            <Avatar className="w-14 h-14 border-2 border-primary/20 group-hover:border-primary/40 transition-colors duration-300">
                              <AvatarFallback className={`bg-gradient-to-r ${testimonial.gradient} text-white font-bold`}>
                                {testimonial.avatar}
                              </AvatarFallback>
                            </Avatar>
                            
                            <div className="space-y-1">
                              <div className="font-display font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                                {testimonial.author}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {testimonial.role}
                              </div>
                              <div className="text-sm font-semibold text-primary">
                                {testimonial.company}
                              </div>
                            </div>
                          </div>

                          {/* Highlight metric */}
                          <div className={`px-4 py-2 bg-gradient-to-r ${testimonial.gradient} text-white rounded-full text-sm font-semibold shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                            {testimonial.highlight}
                          </div>
                        </div>
                      </div>

                      {/* Sparkles effect on hover */}
                      {hoveredTestimonial === testimonial.id && (
                        <div className="absolute bottom-4 right-4">
                          <Sparkles className="w-6 h-6 text-chart-2 animate-ping" />
                        </div>
                      )}

                      {/* Interactive border */}
                      <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-primary/20 transition-all duration-300" />
                      
                      {/* Shimmer effect */}
                      <div className="absolute inset-0 -top-2 -left-2 right-2 bottom-2 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-between mt-8">
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={prevSlide}
                  className="group p-3 rounded-full hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
                >
                  <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform duration-300" />
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={nextSlide}
                  className="group p-3 rounded-full hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
                >
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform duration-300" />
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleAutoPlay}
                  className="group p-3 ml-2 hover:bg-accent transition-colors duration-300"
                >
                  {isAutoPlaying ? (
                    <Pause className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300" />
                  ) : (
                    <Play className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300" />
                  )}
                </Button>
              </div>

              {/* Slide indicators */}
              <div className="flex items-center space-x-3">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`transition-all duration-300 ${
                      index === currentSlide
                        ? 'w-8 h-2 bg-primary rounded-full'
                        : 'w-2 h-2 bg-muted rounded-full hover:bg-primary/60'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              {/* Auto-play indicator */}
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <div className={`w-2 h-2 rounded-full ${isAutoPlaying ? 'bg-chart-2 animate-pulse' : 'bg-muted'}`} />
                <span>{isAutoPlaying ? 'Auto-playing' : 'Paused'}</span>
              </div>
            </div>
          </div>

          {/* Call-to-Action */}
          <div className="text-center animate-fade-in-up stagger-4">
            <div className="inline-flex flex-col items-center space-y-6 p-10 bg-gradient-to-r from-accent/60 to-secondary/60 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer group backdrop-blur-sm">
              <div className="flex items-center space-x-4">
                <Quote className="w-6 h-6 text-primary group-hover:rotate-12 transition-transform duration-300" />
                <span className="text-xl font-display font-bold text-foreground group-hover:text-primary transition-colors">
                  Ready to join our success stories?
                </span>
                <Quote className="w-6 h-6 text-chart-2 transform rotate-180 group-hover:-rotate-12 transition-transform duration-300" />
              </div>
              
              <p className="text-muted-foreground text-center max-w-md group-hover:text-foreground/80 transition-colors">
                Let's create something amazing together and add your success story to our collection.
              </p>
              
              <Button
                onClick={scrollToContact}
                className="group btn-primary text-lg font-semibold px-8 py-4"
              >
                <span className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                  Start Your Success Story
                  <Quote className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}