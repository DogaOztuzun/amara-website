import React, { useState, useEffect } from 'react';
import { Instagram, Facebook, PinIcon, Menu } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg'
          : 'bg-black/30 backdrop-blur-sm'
      }`}
      style={{ WebkitBackdropFilter: 'blur(8px)' }}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <a 
              href="#" 
              className={`font-cormorant text-2xl font-semibold ${
                isScrolled ? 'text-warm-brown' : 'text-white'
              } hover:text-dusty-rose transition-colors`}
              aria-label="Amara Wedding - Home"
            >
              AMARA Weddings
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {['About', 'Services', 'Portfolio', 'Packages', 'Testimonials', 'FAQ', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`font-montserrat text-sm ${
                  isScrolled
                    ? 'text-gray-800 hover:text-dusty-rose'
                    : 'text-white hover:text-dusty-rose'
                } transition-colors relative group`}
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-dusty-rose transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {[
              { Icon: Instagram, label: 'Instagram' },
              { Icon: Facebook, label: 'Facebook' },
              { Icon: PinIcon, label: 'Pinterest' },
            ].map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                className={`${
                  isScrolled
                    ? 'text-gray-800 hover:text-dusty-rose'
                    : 'text-white hover:text-dusty-rose'
                } transition-colors p-2`}
                aria-label={label}
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 ${
              isScrolled ? 'text-gray-800' : 'text-white'
            }`}
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white/95 backdrop-blur-md shadow-lg rounded-b-lg"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['About', 'Services', 'Portfolio', 'Packages', 'Testimonials', 'FAQ', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block px-3 py-2 text-base font-montserrat text-gray-800 hover:text-dusty-rose hover:bg-gray-50 rounded-md transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <div className="flex space-x-4 px-3 py-2">
                <Instagram className="w-5 h-5 text-gray-800 hover:text-dusty-rose cursor-pointer transition-colors" />
                <Facebook className="w-5 h-5 text-gray-800 hover:text-dusty-rose cursor-pointer transition-colors" />
                <PinIcon className="w-5 h-5 text-gray-800 hover:text-dusty-rose cursor-pointer transition-colors" />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;