"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MessageSquare, Send, Check, AlertCircle, Phone, MapPin, Clock, Sparkles, ArrowRight, Globe, Linkedin, Instagram } from "lucide-react";
import { toast } from "sonner";

export default function ContactSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    budget: "",
    timeline: "",
    services: [] as string[]
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [messageCharCount, setMessageCharCount] = useState(0);
  
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);

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
    if (formRef.current) observer.observe(formRef.current);
    if (contactInfoRef.current) observer.observe(contactInfoRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setMessageCharCount(formData.message.length);
  }, [formData.message]);

  const serviceOptions = [
    { id: "web-dev", label: "Web Development", icon: "💻" },
    { id: "marketing", label: "Digital Marketing", icon: "📈" },
    { id: "branding", label: "Brand Design", icon: "🎨" },
    { id: "automation", label: "Automation", icon: "⚡" },
    { id: "consulting", label: "Consulting", icon: "💡" }
  ];

  const validateField = (name: string, value: string) => {
    switch (name) {
      case "name":
        return value.length < 2 ? "Name must be at least 2 characters" : "";
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(value) ? "Please enter a valid email address" : "";
      case "message":
        return value.length < 10 ? "Message must be at least 10 characters" : "";
      default:
        return "";
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Real-time validation
    const error = validateField(name, value);
    setFormErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleServiceToggle = (serviceId: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter(id => id !== serviceId)
        : [...prev.services, serviceId]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const errors: Record<string, string> = {};
    errors.name = validateField("name", formData.name);
    errors.email = validateField("email", formData.email);
    errors.message = validateField("message", formData.message);
    
    setFormErrors(errors);
    
    // Check if there are any errors
    if (Object.values(errors).some(error => error !== "")) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSuccess(true);
      toast.success("Thank you for your message!", {
        description: "We'll get back to you within 24 hours with a detailed proposal.",
        duration: 5000,
      });
      
      // Reset form after success
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          message: "",
          budget: "",
          timeline: "",
          services: []
        });
        setIsSuccess(false);
      }, 3000);
      
    } catch (error) {
      toast.error("Something went wrong", {
        description: "Please try again or contact us directly at hello@cavell.digital"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email us",
      value: "hello@cavell.digital",
      description: "Get a response within 24 hours",
      gradient: "from-blue-500 to-cyan-500",
      delay: "0.4s"
    },
    {
      icon: Clock,
      label: "Response time",
      value: "24 hours",
      description: "We're always here to help",
      gradient: "from-green-500 to-emerald-500",
      delay: "0.6s"
    },
    {
      icon: Globe,
      label: "Service areas",
      value: "Worldwide",
      description: "Remote collaboration specialists",
      gradient: "from-purple-500 to-pink-500",
      delay: "0.8s"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="section-container relative bg-gradient-to-br from-background via-accent/20 to-secondary/30 overflow-hidden"
      id="contact"
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/4 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-chart-2/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
        
        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(var(--color-primary) 1px, transparent 1px),
              linear-gradient(90deg, var(--color-primary) 1px, transparent 1px)
            `,
            backgroundSize: '32px 32px'
          }}
        />
        
        {/* Floating message icons */}
        <div className="absolute top-20 left-20 text-4xl text-primary/5 animate-float" style={{ animationDelay: '1s' }}>💬</div>
        <div className="absolute bottom-20 right-20 text-3xl text-chart-2/5 animate-float" style={{ animationDelay: '3s' }}>✉️</div>
      </div>

      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20 space-y-6">
            <h2 
              ref={titleRef}
              className="section-fade text-3xl md:text-4xl lg:text-5xl font-display font-black"
            >
              <span className="text-foreground animate-fade-in-up stagger-1">Let's Build Something</span>{" "}
              <span className="text-cavell-gradient animate-fade-in-up stagger-2 relative inline-block">
                Great Together
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary to-chart-2 rounded-full animate-scale-in stagger-3" />
              </span>
            </h2>
            
            <p className="section-fade text-lg md:text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto animate-fade-in-up stagger-3">
              Whether you need a{" "}
              <span className="text-primary font-semibold">stunning website</span>, a{" "}
              <span className="text-chart-2 font-semibold">growth-focused marketing campaign</span>, or{" "}
              <span className="text-cavell-gradient font-bold">complete digital transformation</span>{" "}
              — we're here to help make it happen.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16 items-start">
            {/* Contact Form */}
            <div 
              ref={formRef}
              className="lg:col-span-2 section-fade animate-fade-in-up stagger-4"
            >
              <div className="card-elevated p-8 md:p-12 relative overflow-hidden group">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-secondary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Success State */}
                {isSuccess && (
                  <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center z-20 animate-fade-in-up">
                    <div className="text-center space-y-6">
                      <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto animate-scale-in">
                        <Check className="w-10 h-10 text-white" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-2xl font-display font-bold text-green-700">Message Sent Successfully!</h3>
                        <p className="text-green-600">We'll get back to you within 24 hours.</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="relative z-10">
                  <div className="flex items-center space-x-3 mb-8">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary to-chart-2 rounded-2xl flex items-center justify-center animate-glow">
                      <MessageSquare className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-display font-bold text-foreground">Start Your Project</h3>
                      <p className="text-muted-foreground">Tell us about your vision</p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Name and Email Row */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label 
                          htmlFor="name" 
                          className={`text-sm font-semibold transition-colors duration-300 ${
                            focusedField === 'name' ? 'text-primary' : 'text-foreground'
                          }`}
                        >
                          Full Name *
                        </Label>
                        <div className="relative">
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            onFocus={() => setFocusedField('name')}
                            onBlur={() => setFocusedField(null)}
                            className={`h-14 rounded-xl transition-all duration-300 ${
                              formErrors.name 
                                ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                                : focusedField === 'name'
                                ? 'border-primary focus:border-primary focus:ring-primary/20 shadow-lg'
                                : 'border-border focus:border-primary focus:ring-primary/20'
                            }`}
                            placeholder="Your full name"
                            required
                          />
                          {formErrors.name && (
                            <div className="flex items-center space-x-1 mt-2 text-red-500 text-sm">
                              <AlertCircle className="w-4 h-4" />
                              <span>{formErrors.name}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label 
                          htmlFor="email" 
                          className={`text-sm font-semibold transition-colors duration-300 ${
                            focusedField === 'email' ? 'text-primary' : 'text-foreground'
                          }`}
                        >
                          Email Address *
                        </Label>
                        <div className="relative">
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            onFocus={() => setFocusedField('email')}
                            onBlur={() => setFocusedField(null)}
                            className={`h-14 rounded-xl transition-all duration-300 ${
                              formErrors.email 
                                ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                                : focusedField === 'email'
                                ? 'border-primary focus:border-primary focus:ring-primary/20 shadow-lg'
                                : 'border-border focus:border-primary focus:ring-primary/20'
                            }`}
                            placeholder="your@email.com"
                            required
                          />
                          {formErrors.email && (
                            <div className="flex items-center space-x-1 mt-2 text-red-500 text-sm">
                              <AlertCircle className="w-4 h-4" />
                              <span>{formErrors.email}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Services Selection */}
                    <div className="space-y-4">
                      <Label className="text-sm font-semibold text-foreground">
                        Services Interested In
                      </Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {serviceOptions.map((service) => (
                          <button
                            key={service.id}
                            type="button"
                            onClick={() => handleServiceToggle(service.id)}
                            className={`group relative p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                              formData.services.includes(service.id)
                                ? 'border-primary bg-accent text-primary shadow-lg scale-105'
                                : 'border-border hover:border-primary/50 hover:bg-accent/50'
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <span className="text-xl group-hover:scale-110 transition-transform duration-200">
                                {service.icon}
                              </span>
                              <span className="text-sm font-medium">{service.label}</span>
                            </div>
                            {formData.services.includes(service.id) && (
                              <div className="absolute top-2 right-2">
                                <Check className="w-4 h-4 text-primary animate-scale-in" />
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Budget and Timeline */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="budget" className="text-sm font-semibold text-foreground">
                          Project Budget (Optional)
                        </Label>
                        <select
                          name="budget"
                          value={formData.budget}
                          onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                          className="h-14 w-full rounded-xl border border-border bg-background px-4 text-foreground focus:border-primary focus:ring-primary/20 transition-all duration-300"
                        >
                          <option value="">Select budget range</option>
                          <option value="under-5k">Under $5,000</option>
                          <option value="5k-10k">$5,000 - $10,000</option>
                          <option value="10k-25k">$10,000 - $25,000</option>
                          <option value="25k-50k">$25,000 - $50,000</option>
                          <option value="50k+">$50,000+</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="timeline" className="text-sm font-semibold text-foreground">
                          Timeline (Optional)
                        </Label>
                        <select
                          name="timeline"
                          value={formData.timeline}
                          onChange={(e) => setFormData(prev => ({ ...prev, timeline: e.target.value }))}
                          className="h-14 w-full rounded-xl border border-border bg-background px-4 text-foreground focus:border-primary focus:ring-primary/20 transition-all duration-300"
                        >
                          <option value="">Select timeline</option>
                          <option value="asap">ASAP</option>
                          <option value="1-month">Within 1 month</option>
                          <option value="2-3-months">2-3 months</option>
                          <option value="3-6-months">3-6 months</option>
                          <option value="6-months+">6+ months</option>
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label 
                          htmlFor="message" 
                          className={`text-sm font-semibold transition-colors duration-300 ${
                            focusedField === 'message' ? 'text-primary' : 'text-foreground'
                          }`}
                        >
                          Project Details *
                        </Label>
                        <span className={`text-xs transition-colors duration-300 ${
                          messageCharCount > 500 ? 'text-yellow-500' : 'text-muted-foreground'
                        }`}>
                          {messageCharCount}/1000
                        </span>
                      </div>
                      <div className="relative">
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          onFocus={() => setFocusedField('message')}
                          onBlur={() => setFocusedField(null)}
                          className={`min-h-32 rounded-xl resize-none transition-all duration-300 ${
                            formErrors.message 
                              ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                              : focusedField === 'message'
                              ? 'border-primary focus:border-primary focus:ring-primary/20 shadow-lg'
                              : 'border-border focus:border-primary focus:ring-primary/20'
                          }`}
                          placeholder="Tell us about your project vision, goals, target audience, and any specific requirements or ideas you have in mind..."
                          maxLength={1000}
                          required
                        />
                        {formErrors.message && (
                          <div className="flex items-center space-x-1 mt-2 text-red-500 text-sm">
                            <AlertCircle className="w-4 h-4" />
                            <span>{formErrors.message}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="group w-full btn-primary h-14 text-lg font-bold rounded-xl relative overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-3">
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Sending your message...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                            Send Message
                            <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                          </>
                        )}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-primary via-chart-2 to-primary bg-[length:200%_100%] animate-gradient" />
                    </Button>
                  </form>
                </div>

                {/* Interactive border */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/20 transition-all duration-300" />
              </div>
            </div>

            {/* Contact Information */}
            <div 
              ref={contactInfoRef}
              className="section-fade space-y-8 animate-fade-in-up stagger-4"
            >
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-2xl font-display font-bold text-foreground">Get in Touch</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Ready to discuss your project? We're here to help bring your vision to life.
                  </p>
                </div>

                {/* Contact Info Cards */}
                <div className="space-y-4">
                  {contactInfo.map((info, index) => {
                    const Icon = info.icon;
                    return (
                      <div
                        key={index}
                        className={`card-elevated p-6 hover-lift group cursor-pointer animate-fade-in-up`}
                        style={{ animationDelay: info.delay }}
                      >
                        <div className="flex items-start space-x-4">
                          <div className={`w-12 h-12 bg-gradient-to-r ${info.gradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 animate-glow`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          
                          <div className="flex-1 space-y-1">
                            <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                              {info.label}
                            </h4>
                            <p className="text-lg font-bold text-primary">
                              {info.value}
                            </p>
                            <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
                              {info.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Social Links */}
                <div className="card-elevated p-6 space-y-4">
                  <h4 className="font-display font-semibold text-lg text-foreground">Follow Us</h4>
                  <div className="flex items-center space-x-4">
                    <a
                      href="#"
                      className="group flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl hover:scale-110 transition-all duration-300 hover:shadow-lg"
                    >
                      <Linkedin className="w-6 h-6 text-white" />
                    </a>
                    <a
                      href="#"
                      className="group flex items-center justify-center w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl hover:scale-110 transition-all duration-300 hover:shadow-lg"
                    >
                      <Instagram className="w-6 h-6 text-white" />
                    </a>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Stay updated with our latest projects and insights
                  </p>
                </div>

                {/* Quick Response Promise */}
                <div className="card-elevated p-6 bg-gradient-to-br from-accent/60 to-secondary/60 backdrop-blur-sm">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-3 h-3 bg-chart-2 rounded-full animate-pulse" />
                    <span className="font-semibold text-foreground">Quick Response Promise</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    We'll respond to your message within 24 hours with a detailed proposal and next steps for your project.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}