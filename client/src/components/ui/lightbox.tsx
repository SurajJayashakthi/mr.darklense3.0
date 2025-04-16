import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { LightboxImage } from '@/hooks/use-lightbox';

interface LightboxProps {
  isOpen: boolean;
  image: LightboxImage | null;
  onClose: () => void;
}

const Lightbox = ({ isOpen, image, onClose }: LightboxProps) => {
  if (!image) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            aria-label="Close lightbox"
          >
            <X size={32} />
          </button>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', damping: 25 }}
            className="max-w-4xl mx-auto"
          >
            <img 
              src={image.src} 
              alt={image.alt} 
              className="max-h-[90vh] max-w-full object-contain" 
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Lightbox;
