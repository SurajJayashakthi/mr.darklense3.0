import { motion } from 'framer-motion';
import { FEATURED_WORK } from '@/lib/constants';
import { useLightbox } from '@/hooks/use-lightbox';
import Lightbox from '@/components/ui/lightbox';
import { ArrowRight } from 'lucide-react';

const FeaturedWork = () => {
  const { isOpen, currentImage, openLightbox, closeLightbox } = useLightbox();

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
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED_WORK.map((item, index) => (
            <motion.div 
              key={item.id}
              className="gallery-image overflow-hidden rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 border-2 border-yellow-600/30"
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
