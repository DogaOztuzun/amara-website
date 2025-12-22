import React from 'react';
import { Instagram, Facebook, PinIcon, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-soft-cream text-text-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="font-cormorant text-lg md:text-2xl font-bold mb-4">AMARA Weddings</h3>
            <p className="text-sm md:text-base text-warm-brown mb-4">
              Creating unforgettable destination weddings in Fethiye, the heart of Turkey.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/amara_weddings_fethiye/" target="_blank" rel="noopener noreferrer" className="hover:text-dusty-rose transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-dusty-rose transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-dusty-rose transition-colors">
                <PinIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-cormorant text-lg md:text-xl font-bold mb-4">Quick links</h4>
            <ul className="space-y-2">
              {['About', 'Services', 'Portfolio', 'Packages', 'Testimonials', 'FAQ', 'Contact'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-warm-brown hover:text-dusty-rose transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-cormorant text-lg md:text-xl font-bold mb-4">Contact info</h4>
            <ul className="space-y-4">
              <li className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                <span className="text-warm-brown">Fethiye, Muğla, Turkey</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-2" />
                <span className="text-warm-brown">+90 (252) XXX XX XX</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                <span className="text-warm-brown">xxx@amara.wedding</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-cormorant text-lg md:text-xl font-bold mb-4">Newsletter</h4>
            <p className="text-sm md:text-base text-warm-brown mb-4">
              Subscribe to receive updates and wedding inspiration
            </p>
            <form className="space-y-4">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-2 rounded-full bg-white border border-warm-brown/20 focus:outline-none focus:ring-2 focus:ring-dusty-rose text-text-dark placeholder-warm-brown/60"
              />
              <button
                type="submit"
                className="w-full bg-dusty-rose text-white py-2 rounded-full hover:bg-white hover:text-warm-brown transition-colors duration-300 cursor-pointer"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-warm-brown/20 text-center">
          <p className="text-warm-brown">
            © {currentYear} Amara Wedding. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
