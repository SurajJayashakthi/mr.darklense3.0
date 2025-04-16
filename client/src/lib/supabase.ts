import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gnkwckmuolrvwpwtkhgp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdua3dja211b2xydndwd3RraGdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ3NDA5NjksImV4cCI6MjA2MDMxNjk2OX0.HQfFU2_zSaVitHtfRretaF9GnP0Tx_FF-ifl7TgDWQI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for future implementation
export type GalleryImage = {
  id: number;
  image_url: string;
  category: string;
  description: string;
};

export type Service = {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: string;
};

export type ContactFormData = {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
};

// Future functions for database operations
export const fetchGalleryImages = async (): Promise<GalleryImage[]> => {
  const { data, error } = await supabase
    .from('gallery')
    .select('*');
  
  if (error) {
    throw new Error(error.message);
  }
  
  return data as GalleryImage[];
};

export const submitContactForm = async (formData: ContactFormData) => {
  const { data, error } = await supabase
    .from('contact_submissions')
    .insert([formData]);
  
  if (error) {
    throw new Error(error.message);
  }
  
  return data;
};
