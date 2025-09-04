"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUp, Mail, Phone, MapPin, Linkedin, Instagram, Twitter, Globe, Heart, Sparkles, Send, Check } from "lucide-react";
import { toast } from "sonner";

export default function FooterSection() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        setShowBackToTop(window.scrollY > 300);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubscribing(true);

    try {
      // Simulate subscription
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSubscribed(true);
      toast.success("Welcome to our newsletter!", {
        description: "You'll receive our latest insights and project updates."
      });
      setEmail("");
      
      // Reset success state after 3 seconds
      setTimeout(() => setIsSubscribed(false), 3000);
    } catch (error) {
      toast.error("Subscription failed", {
        description: "Please try again or contact us directly."
      });
    } finally {
      setIsSubscribing(false);
    }
  };

  const quickLinks = [
    { label: "Home", id: "hero" },
    { label: "About", id: "about" },
    { label: "Services", id: "services" },
    { label: "Portfolio", id: "portfolio" },
    { label: "Testimonials", id: "testimonials" },
    { label: "Contact", id: "contact" }
  ];

  const services = [
    "Web Development",
    "Digital Marketing",
    "Brand Design",
    "Automation",
    "SEO Services",
    "Consulting"
  ];

  const socialLinks = [
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "#",
      gradient: "from-blue-500 to-blue-600",
      hoverColor: "hover:text-blue-500"
    },
    {
      icon: Instagram,
      label: "Instagram", 
      href: "#",
      gradient: "from-pink-500 to-purple-600",
      hoverColor: "hover:text-pink-500"
    },
    {
      icon: Twitter,
      label: "Twitter",
      href: "#", 
      gradient: "from-sky-500 to-blue-500",
      hoverColor: "hover:text-sky-500"
    },
    {
      icon: Globe,
      label: "Website",
      href: "#",
      gradient: "from-green-500 to-emerald-500", 
      hoverColor: "hover:text-green-500"
    }
  ];

  return (
    <>
      <footer className="relative bg-gradient-to-br from-foreground via-slate-900 to-slate-800 text-white overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-chart-2/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
          
          {/* Grid pattern */}
          <div 
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '32px 32px'
            }}
          />
        </div>

        <div className="container mx-auto px-6 py-16 relative z-10">
          <div className="max-w-7xl mx-auto">
            {/* Main Footer Content */}
            <div className="grid lg:grid-cols-4 gap-12 lg:gap-16 mb-16">
              {/* Company Info */}
              <div className="lg:col-span-2 space-y-8 animate-fade-in-up">
                {/* Logo and Description */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="w-12 h-12 bg-cavell-gradient rounded-2xl flex items-center justify-center shadow-xl animate-glow">
                        <span className="text-white font-bold text-xl">C</span>
                      </div>
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-chart-2 rounded-full flex items-center justify-center animate-pulse">
                        <ArrowUp className="w-2 h-2 text-white rotate-45" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-display font-bold text-cavell-gradient">Cavell</h3>
                      <p className="text-gray-400 text-sm -mt-1">Digital Solutions</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 leading-relaxed max-w-md">
                    We're a forward-thinking digital team delivering end-to-end solutions — from sleek websites to 
                    high-performance marketing campaigns. Your partner in{" "}
                    <span className="text-cavell-gradient font-semibold">digital growth</span>.
                  </p>
                </div>

                {/* Newsletter Signup */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-display font-semibold text-lg text-white">Stay Updated</h4>
                    <p className="text-gray-400 text-sm">Get the latest insights and project updates delivered to your inbox.</p>
                  </div>
                  
                  <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                    <div className="flex gap-3">
                      <div className="flex-1 relative">
                        <Input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email"
                          className="h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-primary focus:ring-primary/20 rounded-xl"
                          required
                        />
                        {isSubscribed && (
                          <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            <Check className="w-5 h-5 text-green-400 animate-scale-in" />
                          </div>
                        )}
                      </div>
                      <Button
                        type="submit"
                        disabled={isSubscribing || isSubscribed}
                        className="group btn-primary h-12 px-6 rounded-xl"
                      >
                        {isSubscribing ? (
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : isSubscribed ? (
                          <Check className="w-5 h-5" />
                        ) : (
                          <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                        )}
                      </Button>
                    </div>
                  </form>
                </div>

                {/* Contact Info */}
                <div className="space-y-4">
                  <h4 className="font-display font-semibold text-lg text-white">Get in Touch</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer group">
                      <Mail className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300" />
                      <span className="text-sm">hello@cavell.digital</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer group">
                      <Globe className="w-5 h-5 text-chart-2 group-hover:scale-110 transition-transform duration-300" />
                      <span className="text-sm">Worldwide Remote Services</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="space-y-6 animate-fade-in-up stagger-1">
                <h4 className="font-display font-semibold text-lg text-white">Quick Links</h4>
                <div className="space-y-3">
                  {quickLinks.map((link, index) => (
                    <button
                      key={link.id}
                      onClick={() => scrollToSection(link.id)}
                      className="group block text-gray-300 hover:text-white transition-all duration-300 text-sm hover:translate-x-2"
                    >
                      <span className="flex items-center space-x-2">
                        <div className="w-1 h-1 bg-primary rounded-full group-hover:w-2 transition-all duration-300" />
                        <span>{link.label}</span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Services */}
              <div className="space-y-6 animate-fade-in-up stagger-2">
                <h4 className="font-display font-semibold text-lg text-white">Our Services</h4>
                <div className="space-y-3">
                  {services.map((service, index) => (
                    <div
                      key={index}
                      className="group flex items-center space-x-2 text-gray-300 hover:text-white transition-all duration-300 text-sm hover:translate-x-2 cursor-pointer"
                    >
                      <div className="w-1 h-1 bg-chart-2 rounded-full group-hover:w-2 transition-all duration-300" />
                      <span>{service}</span>
                    </div>
                  ))}
                </div>
                
                {/* CTA */}
                <div className="pt-4">
                  <Button
                    onClick={() => scrollToSection("contact")}
                    variant="outline"
                    className="group border-white/20 text-white hover:bg-white hover:text-foreground transition-all duration-300"
                  >
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                      Get Started
                    </span>
                  </Button>
                </div>
              </div>
            </div>

            {/* Social Links and Bottom Bar */}
            <div className="pt-12 border-t border-white/10">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                {/* Social Links */}
                <div className="flex items-center space-x-6 animate-fade-in-up stagger-3">
                  <span className="text-gray-400 text-sm font-medium">Follow us:</span>
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.href}
                        className={`group flex items-center justify-center w-10 h-10 bg-white/10 rounded-xl hover:scale-110 transition-all duration-300 hover:shadow-lg ${social.hoverColor}`}
                        aria-label={social.label}
                      >
                        <Icon className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors duration-300" />
                      </a>
                    );
                  })}
                </div>

                {/* Copyright */}
                <div className="flex items-center space-x-4 text-gray-400 text-sm animate-fade-in-up stagger-4">
                  <span>© 2025 Cavell. All rights reserved.</span>
                  <span className="flex items-center space-x-1">
                    <span>Made with</span>
                    <Heart className="w-4 h-4 text-red-400 animate-pulse" />
                    <span>for digital growth</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-chart-2 to-primary animate-gradient bg-[length:200%_100%]" />
      </footer>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-cavell-gradient rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 animate-in slide-in-from-bottom-4 group"
          aria-label="Back to top"
        >
          <ArrowUp className="w-6 h-6 text-white mx-auto group-hover:-translate-y-1 transition-transform duration-300" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-chart-2 to-primary rounded-2xl animate-gradient bg-[length:200%_100%] -z-10" />
        </button>
      )}
    </>
  );
}