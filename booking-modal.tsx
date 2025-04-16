import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import { format } from 'date-fns';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { SERVICES } from '@/lib/constants';

const supabaseUrl = 'https://gnkwckmuolrvwpwtkhgp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdua3dja211b2xydndwd3RraGdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ3NDA5NjksImV4cCI6MjA2MDMxNjk2OX0.HQfFU2_zSaVitHtfRretaF9GnP0Tx_FF-ifl7TgDWQI';
const supabase = createClient(supabaseUrl, supabaseKey);

const bookingFormSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(10),
  date: z.date(),
  time: z.string(),
  location: z.string(),
  service: z.string(),
  notes: z.string().optional(),
});

export function BookingModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const [bookingData, setBookingData] = useState<any>(null);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      date: new Date(),
      time: '',
      location: '',
      service: '',
      notes: '',
    },
  });

  const onSubmit = (data: any) => {
    setBookingData(data);
    setStep(2);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0] && bookingData) {
      const file = e.target.files[0];
      const filePath = `confirmations/${Date.now()}_${file.name}`;

      const { data: uploadData, error: uploadError } = await supabase.storage.from('bookings').upload(filePath, file);
      if (uploadError) {
        toast({ title: 'Upload failed', description: uploadError.message });
        return;
      }

      const { data: publicUrl } = supabase.storage.from('bookings').getPublicUrl(filePath);

      const { error: insertError } = await supabase.from('bookings').insert({
        ...bookingData,
        date: format(bookingData.date, 'yyyy-MM-dd'),
        file_url: publicUrl?.publicUrl || '',
      });

      if (insertError) {
        toast({ title: 'Booking failed', description: insertError.message });
        return;
      }

      toast({ title: 'Booking confirmed!', description: 'We will contact you soon.' });
      setFile(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-black">
          <X />
        </button>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h2 className="text-xl font-bold mb-4">Book a Session</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div><Label>Name</Label><Input {...register('name')} /></div>
                <div><Label>Email</Label><Input type="email" {...register('email')} /></div>
                <div><Label>Phone</Label><Input {...register('phone')} /></div>
                <div><Label>Date</Label>
                  <CalendarComponent
                    mode="single"
                    selected={watch('date')}
                    onSelect={(date) => setValue('date', date!)}
                  />
                </div>
                <div><Label>Time</Label><Input {...register('time')} /></div>
                <div><Label>Location</Label><Input {...register('location')} /></div>
                <div>
                  <Label>Service</Label>
                  <Select onValueChange={(val) => setValue('service', val)}>
                    <SelectTrigger><SelectValue placeholder="Select service" /></SelectTrigger>
                    <SelectContent>
                      {SERVICES.map((s) => (
                        <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div><Label>Notes</Label><Textarea {...register('notes')} /></div>
                <Button type="submit" className="w-full mt-4">Book Now</Button>
              </form>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h2 className="text-xl font-bold mb-4">Payment Details</h2>
              <div className="space-y-2 mb-4 text-sm">
                <p><strong>Bank:</strong> Sampath Bank</p>
                <p><strong>Branch:</strong> Horana</p>
                <p><strong>Account Name:</strong> P.D.U SAMPATH</p>
                <p><strong>Account Number:</strong> 1057 5268 8022</p>
                <p><strong>Email:</strong> Udaras007@gmail.com</p>
              </div>
              <div className="mb-4">
                <Label>Upload payment confirmation</Label>
                <Input type="file" onChange={handleFileChange} />
                {file && <p className="mt-2 text-sm text-green-600">Uploaded: {file.name}</p>}
              </div>
              <Button className="w-full" onClick={onClose}>Finish</Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
