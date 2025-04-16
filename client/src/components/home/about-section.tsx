import { motion } from 'framer-motion';
import { ABOUT_CONTENT, SOCIAL_LINKS, CONTACT_INFO } from '@/lib/constants';

const AboutSection = () => {
  return (
    <section id="about" className="py-16 bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative overflow-hidden rounded-lg shadow-xl border-2 border-yellow-600/30">
              <div className="absolute inset-0 bg-gradient-to-tr from-yellow-600/20 to-transparent pointer-events-none z-10"></div>
              <img 
                src={ABOUT_CONTENT.image} 
                alt="Suraj Jayashakthi, Photographer" 
                className="w-full h-auto object-cover" 
              />
            </div>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2 space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4 gold-gradient">{ABOUT_CONTENT.title}</h2>
            {ABOUT_CONTENT.description.map((paragraph, index) => (
              <p key={index} className="text-gray-300 leading-relaxed">
                {paragraph}
              </p>
            ))}
            <div className="flex items-center space-x-4 pt-4">
              <a 
                href={SOCIAL_LINKS.facebook} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white hover-gold"
                aria-label="Facebook"
              >
                <i className='bx bxl-facebook text-2xl'></i>
              </a>
              <a 
                href={SOCIAL_LINKS.tiktok} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white hover-gold"
                aria-label="TikTok"
              >
                <i className='bx bxl-tiktok text-2xl'></i>
              </a>
              <a 
                href={SOCIAL_LINKS.whatsapp} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white hover-gold"
                aria-label="WhatsApp"
              >
                <i className='bx bxl-whatsapp text-2xl'></i>
              </a>
            </div>
            <div className="pt-4">
              <div className="flex items-center space-x-4">
                <i className='bx bx-phone gold-gradient text-2xl'></i>
                <span className="text-gray-300">{CONTACT_INFO.phone}</span>
              </div>
              <div className="flex items-center space-x-4 mt-2">
                <i className='bx bx-map gold-gradient text-2xl'></i>
                <span className="text-gray-300">{CONTACT_INFO.location}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
