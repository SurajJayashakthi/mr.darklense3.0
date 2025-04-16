import { motion } from 'framer-motion';
import { SERVICES } from '@/lib/constants';

const ServicesSection = () => {
  return (
    <section id="services" className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary font-serif mb-4">Photography Services</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">Choose the perfect package for your special moments.</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES.map((service, index) => (
            <motion.div 
              key={service.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:transform hover:scale-105"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="h-48 bg-purple-100 flex items-center justify-center">
                <i className={`bx ${service.icon} text-6xl text-secondary`}></i>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-primary font-serif mb-2">{service.title}</h3>
                <div className="mb-4">
                  {service.packages.map((pkg, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-600">{pkg.name}</span>
                      <span className="text-primary font-bold">Rs. {pkg.price}</span>
                    </div>
                  ))}
                  <div className="text-sm text-gray-500 mt-2">
                    {service.description}
                  </div>
                </div>
                <a 
                  href="#contact" 
                  className="block text-center py-2 px-4 bg-secondary text-white rounded-md hover:bg-purple-700 transition-colors duration-300"
                >
                  Book Now
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
