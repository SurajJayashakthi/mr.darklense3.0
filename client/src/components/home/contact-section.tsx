import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BANK_DETAILS, CONTACT_INFO, SOCIAL_LINKS } from '@/lib/constants';
import { ContactFormData, submitContactForm } from '@/lib/supabase';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters long' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  phone: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(10, { message: 'Message must be at least 10 characters long' }),
});

const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<ContactFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      service: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      // For now, just simulate submission
      // When Supabase is fully integrated, use: await submitContactForm(data);
      console.log('Form submitted:', data);
      
      // Success toast
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you as soon as possible.",
      });
      
      // Reset form
      form.reset();
    } catch (error) {
      // Error toast
      toast({
        title: "Failed to send message",
        description: "Please try again later or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4 gold-gradient">Get In Touch</h2>
          <p className="text-gray-300 max-w-3xl mx-auto">Have a project in mind? Contact us to discuss your photography needs.</p>
        </motion.div>
        
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="dark-card p-6 rounded-lg shadow-lg border-2 border-yellow-600/30">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-300">Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} className="bg-gray-800 border-gray-700 text-white" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-300">Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="Your email" {...field} className="bg-gray-800 border-gray-700 text-white" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="Your phone number" {...field} className="bg-gray-800 border-gray-700 text-white" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="service"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">Service Interested In</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                              <SelectValue placeholder="Select a service" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-gray-800 border-gray-700 text-white">
                            <SelectItem value="none">Select a service</SelectItem>
                            <SelectItem value="wedding">Wedding Photography</SelectItem>
                            <SelectItem value="couple">Couple Photoshoot</SelectItem>
                            <SelectItem value="birthday">Birthday Photography</SelectItem>
                            <SelectItem value="event">Event Photography</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us about your project" 
                            rows={4} 
                            {...field} 
                            className="bg-gray-800 border-gray-700 text-white"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full gold-button"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </div>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="dark-card p-6 rounded-lg shadow-lg h-full border-2 border-yellow-600/30">
              <h3 className="text-2xl font-bold font-serif mb-6 gold-gradient">Contact Information</h3>
              
              <div className="space-y-6 mb-8">
                <div>
                  <h4 className="text-lg font-semibold gold-gradient mb-4">Studio Location</h4>
                  <p className="text-gray-300">Visit our studio to discuss your photography needs in person and view our portfolio.</p>
                  <div className="mt-3 bg-gray-800 p-4 rounded-md border border-yellow-600/20">
                    <p className="text-gray-300">{CONTACT_INFO.location}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold gold-gradient mb-4">Business Hours</h4>
                  <div className="space-y-2 text-gray-300">
                    <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p>Saturday: 10:00 AM - 4:00 PM</p>
                    <p>Sunday: By Appointment Only</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-lg font-semibold gold-gradient">Contact Directly</h4>
                <div className="flex items-center space-x-4">
                  <i className='bx bx-phone gold-gradient text-xl'></i>
                  <span className="text-gray-300">{CONTACT_INFO.phone}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <i className='bx bx-envelope gold-gradient text-xl'></i>
                  <span className="text-gray-300">{CONTACT_INFO.email}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <i className='bx bx-map gold-gradient text-xl'></i>
                  <span className="text-gray-300">{CONTACT_INFO.location}</span>
                </div>
                
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
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
