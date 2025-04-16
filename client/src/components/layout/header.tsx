import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '@/lib/constants';
import { motion } from 'framer-motion';

interface HeaderProps {
  activeSection: string;
}

const Header = ({ activeSection }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace('#', ''));
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth',
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-background/95 shadow-sm backdrop-blur-sm py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <a href="#" className="flex items-center space-x-2">
            <span className="text-2xl md:text-3xl font-bold text-primary font-serif tracking-wider">
              Mr. <span className="text-secondary">DarkLense</span>
            </span>
          </a>
          
          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className={`relative menu-item text-primary hover:text-secondary transition-colors duration-300 ${
                  activeSection === link.href.replace('#', '') ? 'active' : ''
                }`}
              >
                {link.label}
                <span className={`absolute left-0 bottom-0 h-0.5 bg-secondary transition-all duration-300 ${
                  activeSection === link.href.replace('#', '') ? 'w-full' : 'w-0'
                }`} />
              </button>
            ))}
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden focus:outline-none text-primary"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        <motion.div 
          className="md:hidden overflow-hidden"
          initial={false}
          animate={{ height: isMenuOpen ? 'auto' : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isMenuOpen && (
            <nav className="px-2 pt-2 pb-4 space-y-1 bg-background shadow-lg rounded-md mt-2">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                    activeSection === link.href.replace('#', '')
                      ? 'text-secondary bg-purple-50'
                      : 'text-primary hover:text-secondary hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </nav>
          )}
        </motion.div>
      </div>
    </header>
  );
};

export default Header;
