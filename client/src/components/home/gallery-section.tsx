import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GALLERY_CATEGORIES } from '@/lib/constants';
import { useLightbox } from '@/hooks/use-lightbox';
import Lightbox from '@/components/ui/lightbox';
import { useQuery } from '@tanstack/react-query';
import { fetchGalleryImages, type GalleryImage } from '@/lib/supabase';

const GallerySection = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const { isOpen, currentImage, openLightbox, closeLightbox } = useLightbox();
  
  const { data: images = [] } = useQuery({
    queryKey: ['gallery', activeCategory],
    queryFn: () => fetchGalleryImages(activeCategory),
  });

  return (
    <section id="gallery" className="py-16 bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4 gold-gradient">Photo Gallery</h2>
          <p className="text-gray-300 max-w-3xl mx-auto">Browse through our collection of memorable moments.</p>
        </motion.div>
        
        {/* Gallery Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {GALLERY_CATEGORIES.map((category) => (
            <button 
              key={category.id}
              className={`px-4 py-2 rounded-md focus:outline-none transition-all duration-300 ${
                activeCategory === category.id
                  ? 'gold-button'
                  : 'bg-gray-800 text-white hover:bg-gray-700 border border-yellow-600/30'
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
            {images.map((image) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="gallery-image overflow-hidden rounded-lg cursor-pointer border-2 border-yellow-600/30 shadow-lg shadow-yellow-500/10"
                onClick={() => openLightbox({ src: image.image, alt: image.alt })}
              >
                <img 
                  src={image.image} 
                  alt={image.alt} 
                  className="w-full h-64 object-cover transition-all duration-500 hover:scale-110 hover:brightness-110" 
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
