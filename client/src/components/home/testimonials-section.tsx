import { motion } from 'framer-motion';
import { TESTIMONIALS } from '@/lib/constants';

const TestimonialsSection = () => {
  return (
    <section className="py-16 bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4 gold-gradient">Client Testimonials</h2>
          <p className="text-gray-300 max-w-3xl mx-auto">What our clients say about our work.</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div 
              key={testimonial.id}
              className="dark-card p-6 rounded-lg shadow-lg border border-yellow-600/30"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-center mb-4">
                <div className="gold-gradient">
                  {[...Array(Math.floor(testimonial.rating))].map((_, i) => (
                    <i key={i} className='bx bxs-star'></i>
                  ))}
                  {testimonial.rating % 1 !== 0 && (
                    <i className='bx bxs-star-half'></i>
                  )}
                </div>
              </div>
              <p className="text-gray-300 italic mb-4">{testimonial.quote}</p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full overflow-hidden mr-3 bg-gray-800 border border-yellow-600/30 flex items-center justify-center">
                  <i className='bx bx-user gold-gradient'></i>
                </div>
                <div>
                  <h4 className="font-medium gold-gradient">{testimonial.name}</h4>
                  <p className="text-sm text-gray-400">{testimonial.service}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
