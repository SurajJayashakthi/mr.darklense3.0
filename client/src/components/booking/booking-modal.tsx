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

// Services data and bank details
import { SERVICES, BANK_DETAILS } from '@/lib/constants'; 

// Schema for booking form
const bookingFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z.string().min(8, { message: 'Please provide a valid phone number' }),
  service: z.string().min(1, { message: 'Please select a service' }),
  package: z.string().min(1, { message: 'Please select a package' }),
  packagePrice: z.number().optional(),
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
  selectedService?: string;
}

const BookingModal = ({ isOpen, onClose, selectedService }: BookingModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      service: selectedService || '',
      package: '',
      location: '',
      message: '',
    },
  });

  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [bookingData, setBookingData] = useState<BookingFormData | null>(null);
  
  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    
    try {
      // Here we would normally call an API endpoint to save the booking
      // For now, we'll just simulate an API call with a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Booking Request Submitted",
        description: "Please check the payment details to complete your booking.",
      });
      
      // Store booking data and show payment details
      setBookingData(data);
      setBookingSubmitted(true);
      setIsSubmitting(false);
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Your booking couldn't be submitted. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };
  
  const handleClose = () => {
    // Reset everything when closing
    form.reset();
    setBookingSubmitted(false);
    setBookingData(null);
    onClose();
  };

  // Time slots available for booking
  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', 
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  // BANK_DETAILS is already imported at the top

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-80"
            onClick={handleClose}
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
                <h2 className="text-2xl font-bold font-serif gold-gradient">
                  {bookingSubmitted ? "Complete Your Booking" : "Book a Photography Session"}
                </h2>
                <button 
                  onClick={handleClose}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Close booking modal"
                >
                  <X size={24} />
                </button>
              </div>
              
              {!bookingSubmitted ? (
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
                          <SelectItem key={service.id} value={service.title}>
                            <div className="flex items-center">
                              <Camera className="mr-2 h-4 w-4 text-yellow-500" />
                              <span>{service.title}</span>
                              <span className="ml-auto text-sm text-gray-400">
                                {service.packages && service.packages.length > 0 ? 
                                  `Rs. ${service.packages[0].price}+` : 
                                  "Custom pricing"}
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {form.formState.errors.service && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.service.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="package" className="text-gray-300">Select Package</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-1">
                      {form.watch('service') && SERVICES.find(s => s.title === form.watch('service'))?.packages.map((pkg, index) => (
                        <div 
                          key={index}
                          onClick={() => {
                            form.setValue('package', pkg.name);
                            form.setValue('packagePrice', pkg.price);
                          }}
                          className={`
                            cursor-pointer p-4 rounded-md border 
                            ${form.watch('package') === pkg.name 
                              ? 'border-yellow-500 bg-yellow-600/10' 
                              : 'border-gray-700 bg-gray-800 hover:border-yellow-600/50'
                            }
                            transition-colors
                          `}
                        >
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium text-white">{pkg.name}</span>
                            <span className="gold-gradient font-bold">Rs. {pkg.price}</span>
                          </div>
                          <div className="text-sm text-gray-400">
                            {pkg.features?.map((feature, i) => (
                              <div key={i} className="flex items-center">
                                <i className='bx bx-check text-yellow-500 mr-1'></i>
                                <span>{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
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
              ) : (
                <div className="space-y-6">
                  <div className="p-4 bg-yellow-500/10 border border-yellow-600/30 rounded-md">
                    <h3 className="text-lg font-bold text-white mb-2">Booking Details</h3>
                    <div className="space-y-2 text-gray-300">
                      <p><span className="text-gray-400">Name:</span> {bookingData?.name}</p>
                      <p><span className="text-gray-400">Service:</span> {bookingData?.service}</p>
                      <p><span className="text-gray-400">Package:</span> {bookingData?.package}</p>
                      <p><span className="text-gray-400">Price:</span> Rs. {bookingData?.packagePrice}</p>
                      <p><span className="text-gray-400">Date:</span> {bookingData?.date ? format(bookingData.date, 'PPP') : ''}</p>
                      <p><span className="text-gray-400">Time:</span> {bookingData?.time}</p>
                      <p><span className="text-gray-400">Location:</span> {bookingData?.location}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold font-serif gold-gradient mb-4">Payment Information</h3>
                    <p className="text-gray-300 mb-4">
                      To secure your booking, please make a deposit of 50% of the session fee using the following bank details:
                    </p>
                    
                    <div className="space-y-4 mb-6 bg-gray-800 p-4 rounded-md border border-yellow-600/30">
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-400">Bank</span>
                        <span className="gold-gradient font-medium">{BANK_DETAILS.bank}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-400">Branch</span>
                        <span className="text-white font-medium">{BANK_DETAILS.branch}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-400">Account Name</span>
                        <span className="text-white font-medium">{BANK_DETAILS.accountName}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-400">Account Number</span>
                        <span className="gold-gradient font-medium">{BANK_DETAILS.accountNumber}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-400">Email</span>
                        <span className="text-white font-medium">{BANK_DETAILS.email}</span>
                      </div>
                    </div>
                    
                    <div className="bg-gray-800 p-4 rounded-md border border-yellow-600/20 mb-6">
                      <p className="text-gray-300 text-sm">
                        <span className="gold-gradient font-bold">Payment Reference:</span> Please use your name and session date as the payment reference (e.g., JohnDoe-15Apr2025).
                      </p>
                    </div>
                    
                    <div className="bg-gray-800 p-4 rounded-md border border-yellow-600/20 mb-6">
                      <p className="text-gray-300 text-sm">
                        After making the payment, please upload your payment confirmation below. The remaining balance will be due on the day of the photoshoot.
                      </p>
                    </div>
                  </div>
                  
                  {/* File Upload Section */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold font-serif gold-gradient mb-2">Upload Payment Confirmation</h3>
                    
                    <div className="grid grid-cols-1 gap-4">
                      <div className="border-2 border-dashed border-yellow-600/30 rounded-lg p-6 text-center">
                        <input 
                          type="file" 
                          id="paymentProof" 
                          className="hidden" 
                          accept=".jpg,.jpeg,.png,.pdf" 
                          onChange={(e) => {
                            // Here you would handle the file upload
                            if (e.target.files?.length) {
                              toast({
                                title: "File received",
                                description: `File "${e.target.files[0].name}" uploaded successfully.`,
                              });
                            }
                          }}
                        />
                        <label 
                          htmlFor="paymentProof" 
                          className="flex flex-col items-center justify-center cursor-pointer"
                        >
                          <div className="p-4 rounded-full bg-yellow-600/10 mb-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </div>
                          <span className="text-white font-medium mb-1">Upload File</span>
                          <span className="text-gray-400 text-sm">JPG, PNG or PDF (max 5MB)</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-4 pt-6">
                    <Button 
                      className="w-full gold-button"
                      onClick={handleClose}
                    >
                      Close
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;