import { NAV_LINKS, SOCIAL_LINKS, CONTACT_INFO } from '@/lib/constants';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-8 md:mb-0">
            <h3 className="text-2xl font-bold font-serif mb-4">
              Mr. <span className="gold-gradient">DarkLense</span>
            </h3>
            <p className="text-gray-300 max-w-md">
              Capturing life's beautiful moments through the lens of creativity and passion.
            </p>
            <div className="flex items-center space-x-4 mt-6">
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
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4 gold-gradient">Quick Links</h4>
              <ul className="space-y-2">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a 
                      href={link.href} 
                      className="text-gray-300 hover-gold"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4 gold-gradient">Services</h4>
              <ul className="space-y-2">
                <li><a href="#services" className="text-gray-300 hover-gold">Wedding Photography</a></li>
                <li><a href="#services" className="text-gray-300 hover-gold">Couple Photoshoot</a></li>
                <li><a href="#services" className="text-gray-300 hover-gold">Birthday Photography</a></li>
                <li><a href="#services" className="text-gray-300 hover-gold">Event Photography</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4 gold-gradient">Contact</h4>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-300">
                  <i className='bx bx-phone mr-2 gold-gradient'></i>
                  {CONTACT_INFO.phone}
                </li>
                <li className="flex items-center text-gray-300">
                  <i className='bx bx-envelope mr-2 gold-gradient'></i>
                  {CONTACT_INFO.email}
                </li>
                <li className="flex items-center text-gray-300">
                  <i className='bx bx-map mr-2 gold-gradient'></i>
                  {CONTACT_INFO.location}
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-yellow-600/30 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400">&copy; {currentYear} Mr. DarkLense Photography. All rights reserved.</p>
          <div className="mt-4 sm:mt-0">
            <a href="#" className="text-gray-400 hover-gold mx-2">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover-gold mx-2">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
