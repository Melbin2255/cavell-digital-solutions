"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Menu, X, Sparkles, ArrowUp, Zap } from "lucide-react";

export default function HeaderNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window === 'undefined') return;
      
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);

      // Calculate scroll progress safely
      const progress = ((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100) || 0;
      setScrollProgress(progress);

      // Update active section based on scroll position
      const sections = ["hero", "about", "services", "why-choose", "portfolio", "testimonials", "contact"];
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element && scrollPosition >= element.offsetTop - 100) {
          setActiveSection(section);
          break;
        }
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { id: "hero", label: "Home", icon: "🏠" },
    { id: "about", label: "About", icon: "✨" },
    { id: "services", label: "Services", icon: "⚡" },
    { id: "portfolio", label: "Work", icon: "🎯" },
    { id: "contact", label: "Contact", icon: "💬" },
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          isScrolled 
            ? 'bg-background/95 backdrop-blur-xl shadow-xl border-b border-primary/10' 
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6">
          <nav className={`flex items-center justify-between transition-all duration-300 ${
            isScrolled ? 'py-4' : 'py-6'
          }`}>
            {/* Logo */}
            <button
              onClick={() => scrollToSection("hero")}
              className="group flex items-center space-x-3 hover:scale-105 transition-all duration-300"
            >
              <div className="relative">
                <div className="w-10 h-10 bg-cavell-gradient rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <span className="text-white font-bold text-lg">C</span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-chart-2 rounded-full flex items-center justify-center animate-pulse">
                  <ArrowUp className="w-2 h-2 text-white rotate-45" />
                </div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-display font-bold text-cavell-gradient">Cavell</h1>
                <p className="text-xs text-muted-foreground -mt-1">Digital Solutions</p>
              </div>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.slice(0, -1).map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-4 py-2 text-sm font-semibold transition-all duration-300 group ${
                    activeSection === item.id
                      ? 'text-primary'
                      : 'text-foreground hover:text-primary'
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  {activeSection === item.id && (
                    <div className="absolute inset-0 bg-accent rounded-lg animate-scale-in" />
                  )}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </button>
              ))}
            </div>

            {/* Desktop CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => scrollToSection("contact")}
                className="group btn-secondary font-semibold"
              >
                <span className="flex items-center gap-2">
                  Contact Us
                  <ArrowUp className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300 rotate-45" />
                </span>
              </Button>
              <Button
                onClick={() => scrollToSection("contact")}
                className="group btn-primary font-semibold relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                  Get Started
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-chart-2 to-primary bg-[length:200%_100%] animate-gradient" />
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden p-2 hover:bg-accent"
                >
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent 
                side="right" 
                className="w-full sm:w-80 bg-background/95 backdrop-blur-xl border-l border-primary/10"
              >
                <SheetHeader className="text-left">
                  <SheetTitle className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-cavell-gradient rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">C</span>
                    </div>
                    <span className="text-cavell-gradient font-display">Cavell</span>
                  </SheetTitle>
                </SheetHeader>

                <div className="mt-8 space-y-6">
                  {/* Mobile Navigation Links */}
                  <div className="space-y-4">
                    {navItems.map((item, index) => (
                      <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={`group w-full text-left p-4 rounded-xl transition-all duration-300 hover:bg-accent animate-fade-in-up ${
                          activeSection === item.id ? 'bg-accent border border-primary/20' : ''
                        }`}
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="flex items-center space-x-4">
                          <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                            {item.icon}
                          </span>
                          <div>
                            <div className={`font-semibold text-lg ${
                              activeSection === item.id ? 'text-primary' : 'text-foreground'
                            }`}>
                              {item.label}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {item.id === 'hero' && 'Welcome home'}
                              {item.id === 'about' && 'Our story'}
                              {item.id === 'services' && 'What we do'}
                              {item.id === 'portfolio' && 'Our projects'}
                              {item.id === 'contact' && 'Get in touch'}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Mobile CTA Section */}
                  <div className="pt-6 border-t border-border space-y-4">
                    <Button
                      onClick={() => scrollToSection("contact")}
                      className="w-full btn-primary py-4 text-lg font-bold animate-fade-in-up stagger-4"
                    >
                      <span className="flex items-center justify-center gap-3">
                        <Sparkles className="w-5 h-5" />
                        Start Your Project
                        <ArrowUp className="w-5 h-5" />
                      </span>
                    </Button>
                    
                    <div className="text-center space-y-2 animate-fade-in-up stagger-4">
                      <p className="text-sm text-muted-foreground">Ready to transform your business?</p>
                      <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Zap className="w-3 h-3" />
                          Fast delivery
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          Premium quality
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="pt-4 text-center space-y-3 animate-fade-in-up stagger-4">
                    <div className="text-sm text-muted-foreground">
                      <p>Questions? We're here to help!</p>
                      <p className="font-semibold text-primary mt-1">hello@cavell.digital</p>
                    </div>
                    
                    <div className="flex items-center justify-center space-x-6 pt-2">
                      <a
                        href="#"
                        className="text-muted-foreground hover:text-primary transition-colors duration-300"
                      >
                        LinkedIn
                      </a>
                      <a
                        href="#"
                        className="text-muted-foreground hover:text-primary transition-colors duration-300"
                      >
                        Instagram
                      </a>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </nav>
        </div>

        {/* Navigation Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-border">
          <div 
            className="h-full bg-cavell-gradient transition-all duration-300 ease-out"
            style={{
              width: `${scrollProgress}%`
            }}
          />
        </div>
      </header>

      {/* Spacer to prevent content jump */}
      <div className="h-20" />
    </>
  );
}