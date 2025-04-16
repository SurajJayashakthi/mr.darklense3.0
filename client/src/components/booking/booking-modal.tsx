import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, Camera, DollarSign } from 'lucide-react';
import { format } from 'date-fns';

// UI Components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

// Services data
import { SERVICES } from '@/lib/constants'; 

// Schema for booking form
const bookingFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z.string().min(8, { message: 'Please provide a valid phone number' }),
  service: z.string().min(1, { message: 'Please select a service' }),
  date: z.date({
    required_error: 'Please select a date',
  }),
  time: z.string().min(1, { message: 'Please select a time' }),
  location: z.string().min(3, { message: 'Please provide a location' }),
  message: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingFormSchema>;

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal = ({ isOpen, onClose }: BookingModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      service: '',
      location: '',
      message: '',
    },
  });

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    
    try {
      // Here we would normally call an API endpoint to save the booking
      // For now, we'll just simulate an API call with a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Booking Request Submitted",
        description: "We'll contact you shortly to confirm your session.",
      });
      
      // Reset form and close modal
      form.reset();
      onClose();
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Your booking couldn't be submitted. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Time slots available for booking
  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', 
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-80"
            onClick={onClose}
          />
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25 }}
            className="relative bg-gray-900 border-2 border-yellow-600/30 rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold font-serif gold-gradient">Book a Photography Session</h2>
                <button 
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Close booking modal"
                >
                  <X size={24} />
                </button>
              </div>
              
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-gray-300">Full Name</Label>
                    <Input 
                      id="name"
                      placeholder="Enter your name"
                      {...form.register('name')}
                      className="bg-gray-800 border-gray-700 text-white mt-1"
                    />
                    {form.formState.errors.name && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.name.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="text-gray-300">Email</Label>
                    <Input 
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      {...form.register('email')}
                      className="bg-gray-800 border-gray-700 text-white mt-1"
                    />
                    {form.formState.errors.email && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.email.message}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="phone" className="text-gray-300">Phone Number</Label>
                  <Input 
                    id="phone"
                    placeholder="Enter your phone number"
                    {...form.register('phone')}
                    className="bg-gray-800 border-gray-700 text-white mt-1"
                  />
                  {form.formState.errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{form.formState.errors.phone.message}</p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="service" className="text-gray-300">Select Service</Label>
                  <Select onValueChange={(value) => form.setValue('service', value)}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white mt-1">
                      <SelectValue placeholder="Choose a service" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700 text-white">
                      {SERVICES.map((service) => (
                        <SelectItem key={service.id} value={service.name}>
                          <div className="flex items-center">
                            <Camera className="mr-2 h-4 w-4 text-yellow-500" />
                            <span>{service.name}</span>
                            <span className="ml-auto text-sm text-gray-400">${service.price}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {form.formState.errors.service && (
                    <p className="text-red-500 text-sm mt-1">{form.formState.errors.service.message}</p>
                  )}
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-gray-300 block mb-1">Preferred Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="bg-gray-800 border-gray-700 text-white w-full justify-start"
                        >
                          <Calendar className="mr-2 h-4 w-4 text-yellow-500" />
                          {form.watch('date') ? (
                            format(form.watch('date'), 'PPP')
                          ) : (
                            <span>Select date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-700">
                        <CalendarComponent
                          mode="single"
                          selected={form.watch('date')}
                          onSelect={(date) => date && form.setValue('date', date)}
                          initialFocus
                          className="text-white"
                        />
                      </PopoverContent>
                    </Popover>
                    {form.formState.errors.date && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.date.message as string}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="time" className="text-gray-300">Preferred Time</Label>
                    <Select onValueChange={(value) => form.setValue('time', value)}>
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white mt-1">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700 text-white">
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            <div className="flex items-center">
                              <Clock className="mr-2 h-4 w-4 text-yellow-500" />
                              <span>{time}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {form.formState.errors.time && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.time.message}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="location" className="text-gray-300">Shoot Location</Label>
                  <Input 
                    id="location"
                    placeholder="Enter the location for your photo shoot"
                    {...form.register('location')}
                    className="bg-gray-800 border-gray-700 text-white mt-1"
                  />
                  {form.formState.errors.location && (
                    <p className="text-red-500 text-sm mt-1">{form.formState.errors.location.message}</p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="message" className="text-gray-300">Additional Information</Label>
                  <Textarea 
                    id="message"
                    placeholder="Any special requests or details about your shoot"
                    {...form.register('message')}
                    rows={3}
                    className="bg-gray-800 border-gray-700 text-white mt-1"
                  />
                </div>
                
                <div>
                  <Button 
                    type="submit" 
                    className="w-full gold-button"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Book Now"}
                  </Button>
                  
                  <p className="text-gray-400 text-sm text-center mt-4">
                    By booking, you agree to our terms and cancellation policy.
                  </p>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;