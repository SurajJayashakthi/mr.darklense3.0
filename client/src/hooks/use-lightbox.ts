import { useState } from 'react';

export interface LightboxImage {
  src: string;
  alt: string;
}

export const useLightbox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<LightboxImage | null>(null);

  const openLightbox = (image: LightboxImage) => {
    setCurrentImage(image);
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setIsOpen(false);
    document.body.style.overflow = 'auto';
  };

  return {
    isOpen,
    currentImage,
    openLightbox,
    closeLightbox
  };
};

export default useLightbox;
