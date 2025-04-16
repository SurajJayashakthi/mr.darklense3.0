import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GALLERY_CATEGORIES, GALLERY_IMAGES } from '@/lib/constants';
import { useLightbox } from '@/hooks/use-lightbox';
import Lightbox from '@/components/ui/lightbox';

const GallerySection = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const { isOpen, currentImage, openLightbox, closeLightbox } = useLightbox();
  
  const filteredImages = activeCategory === 'all' 
    ? GALLERY_IMAGES 
    : GALLERY_IMAGES.filter(img => img.category === activeCategory);

  return (
    <section id="gallery" className="py-16 bg-neutral-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary font-serif mb-4">Photo Gallery</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">Browse through our collection of memorable moments.</p>
        </motion.div>
        
        {/* Gallery Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {GALLERY_CATEGORIES.map((category) => (
            <button 
              key={category.id}
              className={`px-4 py-2 rounded-md focus:outline-none transition-colors duration-300 ${
                activeCategory === category.id
                  ? 'bg-secondary text-white'
                  : 'bg-white text-primary hover:bg-purple-100'
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>
        
        {/* Gallery Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <AnimatePresence>
            {filteredImages.map((image) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="gallery-image overflow-hidden rounded-lg cursor-pointer"
                onClick={() => openLightbox({ src: image.image, alt: image.alt })}
              >
                <img 
                  src={image.image} 
                  alt={image.alt} 
                  className="w-full h-64 object-cover transition-transform duration-500 hover:scale-110" 
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
      
      <Lightbox 
        isOpen={isOpen} 
        image={currentImage} 
        onClose={closeLightbox} 
      />
    </section>
  );
};

export default GallerySection;
