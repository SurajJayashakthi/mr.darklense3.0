import { useState, useEffect } from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import HeroSection from '@/components/home/hero-section';
import FeaturedWork from '@/components/home/featured-work';
import ServicesSection from '@/components/home/services-section';
import GallerySection from '@/components/home/gallery-section';
import AboutSection from '@/components/home/about-section';
import TestimonialsSection from '@/components/home/testimonials-section';
import ContactSection from '@/components/home/contact-section';
import { useScrollSpy } from '@/hooks/use-scroll-spy';

const HomePage = () => {
  // Track active section for navigation highlighting
  const sections = ['home', 'about', 'gallery', 'services', 'contact'];
  const activeSection = useScrollSpy(sections);
  
  // Set page title
  useEffect(() => {
    document.title = 'Mr. DarkLense Photography | Capture Your Moments';
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header activeSection={activeSection} />
      
      <main>
        <HeroSection />
        <FeaturedWork />
        <AboutSection />
        <GallerySection />
        <ServicesSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;
