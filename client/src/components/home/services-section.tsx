import { useState } from 'react';
import { motion } from 'framer-motion';
import { SERVICES } from '@/lib/constants';
import BookingModal from '@/components/booking/booking-modal';

const ServicesSection = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');

  const openBookingModal = (serviceName: string) => {
    setSelectedService(serviceName);
    setIsBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
  };

  return (
    <section id="services" className="py-16 bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4 gold-gradient">Photography Services</h2>
          <p className="text-gray-300 max-w-3xl mx-auto">Choose the perfect package for your special moments.</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES.map((service, index) => (
            <motion.div 
              key={service.id}
              className="dark-card rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:transform hover:scale-105"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="h-48 bg-black flex items-center justify-center">
                <i className={`bx ${service.icon} text-6xl gold-gradient`}></i>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold font-serif mb-2 gold-gradient">{service.title}</h3>
                <div className="mb-4">
                  {service.packages.map((pkg, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b border-gray-700">
                      <span className="text-gray-300">{pkg.name}</span>
                      <span className="gold-gradient font-bold">Rs. {pkg.price}</span>
                    </div>
                  ))}
                  <div className="text-sm text-gray-400 mt-2">
                    {service.description}
                  </div>
                </div>
                <button 
                  onClick={() => openBookingModal(service.title)}
                  className="block w-full text-center py-2 px-4 gold-button rounded-md transition-colors duration-300"
                >
                  Book Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={closeBookingModal} 
        selectedService={selectedService}
      />
    </section>
  );
};

export default ServicesSection;
