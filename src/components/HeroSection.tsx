"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowUp, TrendingUp, Monitor, BarChart3, Sparkles, ChevronDown } from "lucide-react";
import { toast } from "sonner";

export default function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [showMobileCTA, setShowMobileCTA] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    
    const handleScroll = () => {
      if (typeof window === 'undefined') return;
      
      const scrollPosition = window.scrollY;
      setScrollY(scrollPosition);
      setShowMobileCTA(scrollPosition > 400 && window.innerWidth < 768);
    };

    const handleResize = () => {
      if (typeof window === 'undefined') return;
      setShowMobileCTA(window.scrollY > 400 && window.innerWidth < 768);
    };

    // Intersection Observer for advanced animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (titleRef.current) observer.observe(titleRef.current);
    if (subtitleRef.current) observer.observe(subtitleRef.current);

    if (typeof window !== 'undefined') {
      window.addEventListener("scroll", handleScroll, { passive: true });
      window.addEventListener("resize", handleResize);
    }
    
    return () => {
      clearTimeout(timer);
      if (typeof window !== 'undefined') {
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", handleResize);
      }
      observer.disconnect();
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 15;
    const y = (e.clientY - rect.top - rect.height / 2) / 15;
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1200));
      toast.success("Thank you! We'll get back to you within 24 hours.", {
        description: "Get ready to transform your digital presence!",
      });
      setFormData({ name: "", email: "", message: "" });
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section 
        ref={heroRef}
        className="relative min-h-screen bg-gradient-to-br from-background via-secondary/50 to-accent/30 pt-20 pb-16 overflow-hidden"
        style={{
          transform: `translateY(${scrollY * 0.1}px)`,
        }}
      >
        {/* Enhanced background elements */}
        <div className="absolute inset-0 -z-10">
          {/* Animated gradient orbs */}
          <div 
            className="absolute top-20 right-10 w-96 h-96 rounded-full animate-float animate-pulse-slow opacity-30"
            style={{
              background: `radial-gradient(circle, var(--color-cavell-teal) 0%, var(--color-cavell-green) 50%, transparent 70%)`,
              filter: 'blur(40px)',
            }}
          />
          <div 
            className="absolute bottom-20 left-10 w-80 h-80 rounded-full animate-float opacity-20"
            style={{
              background: `radial-gradient(circle, var(--color-cavell-green) 0%, var(--color-cavell-teal) 50%, transparent 70%)`,
              filter: 'blur(60px)',
              animationDelay: '3s'
            }}
          />
          
          {/* Floating particles */}
          <div className="absolute inset-0">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-primary/20 rounded-full animate-float"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${30 + (i % 3) * 20}%`,
                  animationDelay: `${i * 2}s`,
                  animationDuration: `${4 + i}s`
                }}
              />
            ))}
          </div>
        </div>

        <div className="container mx-auto px-6 h-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[85vh]">
            {/* Enhanced Left Content */}
            <div className="space-y-10">
              <div className="space-y-8">
                <h1 
                  ref={titleRef}
                  className="section-fade text-4xl md:text-5xl lg:text-7xl font-display font-black leading-[0.9] tracking-tight"
                >
                  <span className="block animate-fade-in-up stagger-1">Your Partner in</span>
                  <span className="block text-cavell-gradient animate-fade-in-up stagger-2 animate-shimmer bg-gradient-to-r from-primary via-chart-2 to-primary bg-[length:200%_100%]">
                    Web Development
                  </span>
                  <span className="block animate-fade-in-up stagger-3">& Digital Growth</span>
                </h1>
                
                <p 
                  ref={subtitleRef}
                  className="section-fade text-lg md:text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-2xl animate-fade-in-up stagger-4"
                >
                  We create <span className="text-primary font-semibold">stunning, high-performance</span> websites 
                  and digital solutions that drive <span className="text-chart-2 font-semibold">real business results</span>. 
                  From concept to launch, we're your dedicated technology partner.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 animate-fade-in-up stagger-4">
                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      size="lg" 
                      className="group btn-primary relative overflow-hidden px-10 py-7 text-lg font-bold rounded-2xl"
                    >
                      <span className="relative z-10 flex items-center gap-3">
                        <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                        Start Your Project
                        <ArrowUp className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-primary via-chart-2 to-primary bg-[length:200%_100%] animate-gradient" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md backdrop-blur-xl bg-card/95 border-primary/20">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-display text-cavell-gradient">Let's Start Your Project</DialogTitle>
                      <DialogDescription className="text-base">
                        Tell us about your vision and we'll get back to you within 24 hours with a detailed proposal.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleFormSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-semibold">Name</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          className="h-12 rounded-xl border-primary/20 focus:border-primary focus:ring-primary/20"
                          placeholder="Your full name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-semibold">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          className="h-12 rounded-xl border-primary/20 focus:border-primary focus:ring-primary/20"
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-sm font-semibold">Project Details</Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                          placeholder="Tell us about your project vision, goals, and timeline..."
                          rows={4}
                          className="rounded-xl border-primary/20 focus:border-primary focus:ring-primary/20 resize-none"
                          required
                        />
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full h-12 btn-primary rounded-xl text-base font-semibold"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Sending your message...
                          </span>
                        ) : (
                          "Send Message"
                        )}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>

                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => scrollToSection("contact")}
                  className="group btn-secondary px-10 py-7 text-lg font-bold rounded-2xl border-2"
                >
                  <span className="flex items-center gap-3">
                    Contact Us
                    <ArrowUp className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 rotate-45" />
                  </span>
                </Button>
              </div>
            </div>

            {/* Enhanced Right Visual with Advanced 3D Effects */}
            <div className="relative animate-fade-in-up stagger-4">
              <div 
                className="relative card-elevated p-12 overflow-hidden group"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                  transform: `perspective(1200px) rotateX(${mousePosition.y * 0.5}deg) rotateY(${mousePosition.x * 0.5}deg) translateZ(0)`,
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* 3D Visual Elements */}
                <div className="relative h-96 md:h-[28rem]">
                  {/* Floating Browser Mockup */}
                  <div 
                    className="absolute top-8 left-8 right-8 glass rounded-2xl p-6 shadow-2xl group-hover:shadow-3xl transition-all duration-500"
                    style={{ transform: 'translateZ(60px)' }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-4 h-4 bg-red-400 rounded-full animate-pulse-slow"></div>
                      <div className="w-4 h-4 bg-yellow-400 rounded-full animate-pulse-slow" style={{ animationDelay: '0.5s' }}></div>
                      <div className="w-4 h-4 bg-chart-2 rounded-full animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
                    </div>
                    <div className="space-y-4">
                      <div className="h-3 bg-gradient-to-r from-primary/20 to-chart-2/20 rounded-full animate-shimmer"></div>
                      <div className="h-3 bg-gradient-to-r from-chart-2/20 to-primary/20 rounded-full w-3/4 animate-shimmer" style={{ animationDelay: '0.5s' }}></div>
                      <div className="h-3 bg-gradient-to-r from-primary/20 to-chart-2/20 rounded-full w-1/2 animate-shimmer" style={{ animationDelay: '1s' }}></div>
                    </div>
                    <Monitor className="absolute bottom-4 right-4 w-8 h-8 text-primary/40" />
                  </div>

                  {/* Animated Growth Arrow */}
                  <div 
                    className="absolute bottom-16 left-12 animate-float"
                    style={{ transform: 'translateZ(80px)', animationDelay: '1s' }}
                  >
                    <div className="relative">
                      <TrendingUp className="w-20 h-20 text-chart-2 filter drop-shadow-lg" />
                      <div className="absolute inset-0 w-20 h-20 bg-chart-2/20 rounded-full animate-ping"></div>
                    </div>
                  </div>

                  {/* 3D Analytics Dashboard */}
                  <div 
                    className="absolute bottom-8 right-8 glass rounded-xl p-6 shadow-xl hover-glow"
                    style={{ transform: 'translateZ(40px)' }}
                  >
                    <div className="flex items-end gap-2 h-20 mb-3">
                      {[6, 12, 20, 8, 16, 10].map((height, i) => (
                        <div
                          key={i}
                          className="bg-gradient-to-t from-primary to-chart-2 rounded-t-sm animate-scale-in"
                          style={{
                            width: '6px',
                            height: `${height * 3}px`,
                            animationDelay: `${i * 0.2}s`
                          }}
                        />
                      ))}
                    </div>
                    <BarChart3 className="w-6 h-6 text-primary/60" />
                  </div>

                  {/* Floating Tech Icons */}
                  <div className="absolute inset-0">
                    {[
                      { icon: '⚡', top: '20%', left: '15%', delay: '0s' },
                      { icon: '🚀', top: '60%', left: '80%', delay: '2s' },
                      { icon: '💡', top: '40%', left: '5%', delay: '4s' },
                      { icon: '🎯', top: '15%', right: '10%', delay: '1s' },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="absolute text-2xl animate-float opacity-40 hover:opacity-80 transition-opacity cursor-pointer"
                        style={{
                          top: item.top,
                          left: item.left,
                          right: item.right,
                          animationDelay: item.delay,
                          transform: 'translateZ(20px)'
                        }}
                      >
                        {item.icon}
                      </div>
                    ))}
                  </div>

                  {/* Central Glow Effect */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-32 h-32 border border-primary/20 rounded-full animate-pulse-slow">
                      <div className="w-20 h-20 border border-chart-2/30 rounded-full animate-pulse-slow absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" style={{ animationDelay: '1s' }}>
                        <div className="w-12 h-12 bg-gradient-to-r from-primary/20 to-chart-2/20 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-spin" style={{ animationDuration: '8s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Interactive Gradient Overlay */}
                <div 
                  className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at ${50 + mousePosition.x}% ${50 + mousePosition.y}%, var(--color-cavell-teal)10 0%, transparent 60%)`
                  }}
                />
              </div>
            </div>
          </div>

          {/* Enhanced Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-fade-in-up stagger-4">
            <button
              onClick={() => scrollToSection("about")}
              className="flex flex-col items-center space-y-3 group cursor-pointer"
            >
              <span className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
                Discover More
              </span>
              <div className="w-6 h-10 border-2 border-primary/40 rounded-full flex justify-center group-hover:border-primary transition-colors">
                <ChevronDown className="w-4 h-4 text-primary/60 animate-bounce group-hover:text-primary transition-colors" />
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Enhanced Mobile Sticky CTA */}
      {showMobileCTA && (
        <div className="fixed bottom-6 left-4 right-4 z-50 md:hidden">
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button 
                size="lg" 
                className="w-full btn-primary shadow-2xl rounded-2xl py-4 text-lg font-bold animate-in slide-in-from-bottom-4 backdrop-blur-sm"
              >
                <span className="flex items-center justify-center gap-3">
                  <Sparkles className="w-5 h-5" />
                  Start Your Project
                  <ArrowUp className="w-5 h-5" />
                </span>
              </Button>
            </DialogTrigger>
          </Dialog>
        </div>
      )}
    </>
  );
}