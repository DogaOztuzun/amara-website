import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MapPin, UtensilsCrossed, Music, Camera, Palette, FileText, Hotel, Car, Plane, Sparkles, Heart, PartyPopper } from 'lucide-react';

const services = [
  {
    icon: MapPin,
    title: 'Venue selection',
    description: 'From luxury resorts to private villas, we\'ll help you find the perfect wedding venue.',
  },
  {
    icon: UtensilsCrossed,
    title: 'Catering',
    description: 'Our menus include international cuisine and local Turkish flavors.',
  },
  {
    icon: Music,
    title: 'Entertainment',
    description: 'We offer a wide range of entertainment options that match your wedding style and theme.',
  },
  {
    icon: Camera,
    title: 'Photography & Video',
    description: 'We collaborate with professional photographers and videographers who know the most stunning locations in the Fethiye region.',
  },
  {
    icon: Palette,
    title: 'Decoration & Design',
    description: 'From personal design consultations to custom decor elements, we handle every detail to create a unified style for your wedding.',
  },
  {
    icon: FileText,
    title: 'Formal wedding ceremony',
    description: 'We provide full assistance with the legal documentation required for civil marriage in Turkey for foreigners.',
  },
  {
    icon: Hotel,
    title: 'Accommodation',
    description: 'We\'ll help you find the perfect place to stay, tailored to your preferences, group size, and budget.',
  },
  {
    icon: Car,
    title: 'Transfer services',
    description: 'We offer private transfers for you and your guests, including airport pickups and shuttle service to venues and hotels.',
  },
  {
    icon: Plane,
    title: 'Travel concierge',
    description: 'We\'ll take care of every detail of your journey, from the moment you arrive in Turkey to your departure.',
  },
  {
    icon: Sparkles,
    title: 'Concept wedding',
    description: 'Looking for something unique? We offer a wide selection of themed wedding concepts.',
  },
  {
    icon: Heart,
    title: 'Elopement wedding',
    description: 'We organize elopement weddings in different styles and settings, including adventure elopements in breathtaking natural landscapes.',
  },
  {
    icon: PartyPopper,
    title: 'Unique experiences',
    description: 'Make your wedding celebration even more enjoyable with curated activities and adventures for you and your guests.',
  },
];

const Services = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="services" className="py-20 bg-soft-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-cormorant font-bold mb-4">Our wedding planning services</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            From finding the perfect venue to coordinating vendors and everything in between,
            we'll plan out every detail to make your wedding nothing short of magical.
          </p>
        </div>

        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-dusty-rose mb-4">
                <service.icon className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-cormorant font-bold mb-3">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 mb-6">
            Fill out the form below to learn more about our services.
          </p>
          <a
            href="#contact"
            className="inline-block bg-dusty-rose text-white px-8 py-3 rounded-lg font-medium hover:bg-warm-brown transition-colors duration-300"
          >
            Learn more about our services
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;