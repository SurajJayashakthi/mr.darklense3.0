import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { TESTIMONIALS } from '@/lib/constants';

import React, { useState } from 'react';

import { useState } from 'react';

const TestimonialsSection = () => {
  // Double the testimonials for infinite scrolling effect
  const duplicatedTestimonials = [...TESTIMONIALS, ...TESTIMONIALS];
  
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Auto scroll effect with better performance
  useEffect(() => {
    let animationFrameId: number;
    let lastTimestamp = 0;
    const scrollSpeed = 0.1; // pixels per millisecond - reduced for slower scrolling
    
    const scrollCarousel = (timestamp: number) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const elapsed = timestamp - lastTimestamp;
      
      if (carouselRef.current) {
        // Calculate how far to scroll based on elapsed time
        const scrollAmount = scrollSpeed * elapsed;
        carouselRef.current.scrollLeft += scrollAmount;
        
        // If we've scrolled to the end of the first set, jump back to start
        const totalWidth = carouselRef.current.scrollWidth / 2;
        if (carouselRef.current.scrollLeft >= totalWidth) {
          carouselRef.current.scrollLeft = 0;
        }
      }
      
      lastTimestamp = timestamp;
      animationFrameId = requestAnimationFrame(scrollCarousel);
    };
    
    // Start the animation
    animationFrameId = requestAnimationFrame(scrollCarousel);
    
    // Pause scrolling when user interacts with the carousel
    const handleMouseEnter = () => {
      cancelAnimationFrame(animationFrameId);
    };
    
    const handleMouseLeave = () => {
      lastTimestamp = 0;
      animationFrameId = requestAnimationFrame(scrollCarousel);
    };
    
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('mouseenter', handleMouseEnter);
      carousel.addEventListener('mouseleave', handleMouseLeave);
    }
    
    return () => {
      cancelAnimationFrame(animationFrameId);
      if (carousel) {
        carousel.removeEventListener('mouseenter', handleMouseEnter);
        carousel.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <section className="py-16 bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4 gold-gradient">Client Testimonials</h2>
          <p className="text-gray-300 max-w-3xl mx-auto">What our clients say about our work.</p>
        </motion.div>
        
        <div className="overflow-hidden">
          {/* Testimonial carousel - auto scrolling infinite loop */}
          <div
            ref={carouselRef}
            className="flex overflow-hidden gap-6 pb-6"
          >
            {duplicatedTestimonials.map((testimonial, index) => (
              <motion.div 
                key={`${testimonial.id}-${index}`}
                className="dark-card p-6 rounded-lg shadow-lg border border-yellow-600/30 min-w-[300px] md:min-w-[350px] flex-shrink-0"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center mb-4">
                  <div className="gold-gradient">
                    {[...Array(Math.floor(testimonial.rating))].map((_, i) => (
                      <i key={i} className='bx bxs-star'></i>
                    ))}
                    {testimonial.rating % 1 !== 0 && (
                      <i className='bx bxs-star-half'></i>
                    )}
                  </div>
                </div>
                <p className="text-gray-300 italic mb-4">{testimonial.quote}</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full overflow-hidden mr-3 bg-gray-800 border border-yellow-600/30 flex items-center justify-center">
                    <i className='bx bx-user gold-gradient'></i>
                  </div>
                  <div>
                    <h4 className="font-medium gold-gradient">{testimonial.name}</h4>
                    <p className="text-sm text-gray-400">{testimonial.service}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
