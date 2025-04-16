import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { TESTIMONIALS } from '@/lib/constants';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const TestimonialsSection = () => {
  // Double the testimonials for infinite scrolling effect
  const duplicatedTestimonials = [...TESTIMONIALS, ...TESTIMONIALS];
  
  const [scrollPosition, setScrollPosition] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Auto scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        setScrollPosition((prevPosition) => {
          const newPosition = prevPosition + 1;
          // Reset position once we've scrolled through the original set
          if (newPosition >= TESTIMONIALS.length * 300) {
            return 0;
          }
          return newPosition;
        });
        
        if (carouselRef.current) {
          carouselRef.current.scrollLeft = scrollPosition;
        }
      }
    }, 30); // Smooth scrolling
    
    return () => clearInterval(interval);
  }, [scrollPosition]);
  
  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -300,
        behavior: 'smooth',
      });
    }
  };
  
  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: 300,
        behavior: 'smooth',
      });
    }
  };

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
        
        <div className="relative">
          {/* Left scroll button */}
          <button 
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 text-white rounded-full p-2 -ml-4 border border-yellow-600/20"
            aria-label="Scroll left"
          >
            <ChevronLeft size={24} />
          </button>
          
          {/* Testimonial carousel */}
          <div
            ref={carouselRef}
            className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-6 pb-6"
            style={{ scrollBehavior: 'smooth' }}
          >
            {duplicatedTestimonials.map((testimonial, index) => (
              <motion.div 
                key={`${testimonial.id}-${index}`}
                className="dark-card p-6 rounded-lg shadow-lg border border-yellow-600/30 min-w-[300px] md:min-w-[350px] snap-start"
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
          
          {/* Right scroll button */}
          <button 
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 text-white rounded-full p-2 -mr-4 border border-yellow-600/20"
            aria-label="Scroll right"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
