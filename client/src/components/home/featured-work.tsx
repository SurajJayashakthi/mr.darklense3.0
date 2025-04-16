import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FEATURED_WORK } from '@/lib/constants';
import { useLightbox } from '@/hooks/use-lightbox';
import Lightbox from '@/components/ui/lightbox';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const FeaturedWork = () => {
  const { isOpen, currentImage, openLightbox, closeLightbox } = useLightbox();
  const carouselRef = useRef<HTMLDivElement>(null);
  
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
    <section className="py-16 bg-gray-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4 gold-gradient">Featured Work</h2>
          <p className="text-gray-300 max-w-3xl mx-auto">A glimpse of the moments we've captured for our amazing clients.</p>
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
          
          {/* Featured work carousel */}
          <div
            ref={carouselRef}
            className="flex overflow-x-auto scrollbar-hide gap-6 pb-6"
            style={{ scrollBehavior: 'smooth' }}
          >
            {FEATURED_WORK.map((item, index) => (
              <motion.div 
                key={item.id}
                className="gallery-image overflow-hidden rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 border-2 border-yellow-600/30 min-w-[300px] sm:min-w-[350px] md:min-w-[400px] flex-shrink-0"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => openLightbox({ src: item.image, alt: item.title })}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-50 hover:opacity-30 transition-opacity z-10"></div>
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-80 object-cover transition-transform duration-500 hover:scale-105" 
                  />
                </div>
                <div className="p-4 bg-gray-900 border-t border-yellow-600/20">
                  <h3 className="text-lg font-semibold gold-gradient">{item.title}</h3>
                  <p className="text-sm text-gray-300">{item.location}</p>
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
        
        <div className="text-center mt-10">
          <a 
            href="#gallery" 
            className="inline-flex items-center text-white hover-gold font-medium"
          >
            View Full Gallery 
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </div>
      
      <Lightbox 
        isOpen={isOpen} 
        image={currentImage} 
        onClose={closeLightbox} 
      />
    </section>
  );
};

export default FeaturedWork;
