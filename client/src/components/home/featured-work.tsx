import { motion } from 'framer-motion';
import { FEATURED_WORK } from '@/lib/constants';
import { useLightbox } from '@/hooks/use-lightbox';
import Lightbox from '@/components/ui/lightbox';

const FeaturedWork = () => {
  const { isOpen, currentImage, openLightbox, closeLightbox } = useLightbox();

  return (
    <section className="py-16 bg-neutral-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary font-serif mb-4">Featured Work</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">A glimpse of the moments we've captured for our amazing clients.</p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED_WORK.map((item, index) => (
            <motion.div 
              key={item.id}
              className="gallery-image overflow-hidden rounded-lg shadow-md cursor-pointer hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => openLightbox({ src: item.image, alt: item.title })}
            >
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-80 object-cover transition-transform duration-500 hover:scale-105" 
              />
              <div className="p-4 bg-white">
                <h3 className="text-lg font-semibold text-primary">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <a 
            href="#gallery" 
            className="inline-flex items-center text-secondary hover:text-purple-700 font-medium"
          >
            View Full Gallery 
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
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
