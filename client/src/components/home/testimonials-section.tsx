import { motion } from 'framer-motion';
import { TESTIMONIALS } from '@/lib/constants';

const TestimonialsSection = () => {
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
          <h2 className="text-3xl md:text-4xl font-bold text-primary font-serif mb-4">Client Testimonials</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">What our clients say about our work.</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div 
              key={testimonial.id}
              className="bg-white p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-center mb-4">
                <div className="text-secondary">
                  {[...Array(Math.floor(testimonial.rating))].map((_, i) => (
                    <i key={i} className='bx bxs-star'></i>
                  ))}
                  {testimonial.rating % 1 !== 0 && (
                    <i className='bx bxs-star-half'></i>
                  )}
                </div>
              </div>
              <p className="text-gray-600 italic mb-4">{testimonial.quote}</p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full overflow-hidden mr-3 bg-purple-100 flex items-center justify-center">
                  <i className='bx bx-user text-secondary'></i>
                </div>
                <div>
                  <h4 className="font-medium text-primary">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.service}</p>
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
