import { useState } from 'react';
import { motion } from 'framer-motion';
import BookingModal from '@/components/booking/booking-modal';

const HeroSection = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const openBookingModal = () => {
    setIsBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
  };

  return (
    <section id="home" className="pt-24 md:pt-32 pb-16 md:pb-24 bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          <motion.div 
            className="lg:w-1/2 space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight font-serif">
              Capturing Life's <span className="gold-gradient">Beautiful</span> Moments
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed">
              Specialized in weddings, portraits, and events photography. Let's create timeless memories together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a 
                href="#services" 
                className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm gold-button"
              >
                View Packages
              </a>
              <button 
                onClick={openBookingModal}
                className="inline-flex justify-center items-center px-6 py-3 border border-yellow-600 text-base font-medium rounded-md text-white bg-transparent hover:bg-gray-800 hover:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-all duration-300"
              >
                Book a Session
              </button>
            </div>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2 mt-10 lg:mt-0"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative overflow-hidden rounded-lg shadow-2xl border-2 border-yellow-600/30">
              <div className="absolute inset-0 bg-gradient-to-tr from-yellow-600/20 to-transparent pointer-events-none z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1581591524425-c7e0978865fc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Professional photographer in action" 
                className="w-full h-auto object-cover transform transition-transform duration-500 hover:scale-105" 
              />
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Booking Modal */}
      <BookingModal isOpen={isBookingModalOpen} onClose={closeBookingModal} />
    </section>
  );
};

export default HeroSection;
