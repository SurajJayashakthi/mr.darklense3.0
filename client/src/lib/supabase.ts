
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gnkwckmuolrvwpwtkhgp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdua3dja211b2xydndwd3RraGdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ3NDA5NjksImV4cCI6MjA2MDMxNjk2OX0.HQfFU2_zSaVitHtfRretaF9GnP0Tx_FF-ifl7TgDWQI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types 
export type GalleryImage = {
  id: number;
  image_url: string;
  category: string;
  description: string;
  created_at?: string;
};

// Gallery management functions
export const uploadGalleryImage = async (file: File, category: string): Promise<GalleryImage> => {
  const timestamp = new Date().getTime();
  const filePath = `gallery/${timestamp}-${file.name}`;
  
  // Upload to storage
  const { data: storageData, error: storageError } = await supabase.storage
    .from('gallery')
    .upload(filePath, file);
    
  if (storageError) throw storageError;

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('gallery')
    .getPublicUrl(filePath);

  // Insert into gallery table
  const { data, error } = await supabase
    .from('gallery')
    .insert([{
      image_url: publicUrl,
      category,
      description: file.name
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const fetchGalleryImages = async (category?: string): Promise<GalleryImage[]> => {
  let query = supabase.from('gallery').select('*');
  
  if (category && category !== 'all') {
    query = query.eq('category', category);
  }
  
  const { data, error } = await query.order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
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

// Storage functions
export const uploadImage = async (file: File, path: string): Promise<string> => {
  const { data, error } = await supabase.storage
    .from('gallery')
    .upload(`${path}/${file.name}`, file);

  if (error) throw error;
  
  const { data: { publicUrl } } = supabase.storage
    .from('gallery')
    .getPublicUrl(`${path}/${file.name}`);
    
  return publicUrl;
};

export const deleteImage = async (path: string) => {
  const { error } = await supabase.storage
    .from('gallery')
    .remove([path]);
    
  if (error) throw error;
};

export const submitContactForm = async (formData: ContactFormData) => {
  const { data, error } = await supabase
    .from('contact_submissions')
    .insert([formData]);
  
  if (error) throw error;
  return data;
};
