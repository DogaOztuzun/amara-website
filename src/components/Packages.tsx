import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check } from 'lucide-react';

const packages = [
  {
    name: 'Elopement package',
    subtitle: '(up to 8 people)',
    features: [
      'Assistance with selecting your elopement wedding venue',
      'A personal wedding planner',
      'A day-of wedding coordinator',
      'Online consultations with our destination wedding planners',
      'Symbolic ceremony or legal ceremony with an officiant',
      'Professional photographer (1-hour photoshoot)',
      'Expert guidance on everything related to your wedding and travel in Turkey',
    ],
  },
  {
    name: 'Classic destination wedding package',
    subtitle: '',
    features: [
      'Venue selection assistance',
      'A personal wedding planner',
      'A day-of wedding coordinator',
      'Online consultations with our destination wedding planners',
      'Symbolic ceremony or legal ceremony with an officiant',
      'Professional photographer (90-minute photoshoot)',
      'Video recording',
      'Background music for the ceremony (pre-recorded playlist)',
      'Simple wedding cake',
      'Guest seating arrangement coordination',
      'Expert guidance on everything related to your wedding and travel in Turkey',
    ],
  },
  {
    name: 'Custom wedding ceremony',
    subtitle: '(fully customizable)',
    isCustom: true,
    description: 'Have something special in mind? We specialize in bespoke weddings — pretty much anything you might think of, we can realize it!',
  },
];

const Packages = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="packages" className="py-20 bg-soft-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-cormorant font-bold mb-4">Our wedding packages</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Tailored wedding packages for your dream destination wedding in Fethiye.
          </p>
        </div>

        <motion.div ref={ref} className="mb-16">
          {/* Vertical Cards for Elopement and Classic Packages */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {packages.slice(0, 2).map((pkg, index) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                {/* Header Section */}
                <div className="p-8 bg-dusty-rose text-white text-center h-32 flex flex-col justify-center">
                  <h3 className="text-3xl font-cormorant font-bold mb-2">{pkg.name}</h3>
                  {pkg.subtitle && (
                    <p className="text-base italic text-white/90">
                      {pkg.subtitle}
                    </p>
                  )}
                </div>

                {/* Features Section */}
                <div className="p-8">
                  {pkg.features && (
                    <ul className="space-y-4">
                      {pkg.features.map((feature) => (
                        <li key={feature} className="flex items-start">
                          <Check className="w-5 h-5 text-dusty-rose mr-3 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Custom Package Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mb-12 max-w-3xl mx-auto"
          >
            <h3 className="text-3xl font-cormorant font-bold mb-2">
              Custom wedding ceremony
            </h3>
            <p className="text-base italic text-gray-600 mb-4">
              (fully customizable)
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Have something special in mind? We specialize in bespoke weddings — pretty much anything you might think of, we can realize it!
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center space-y-6 bg-white rounded-2xl shadow-lg p-12"
        >
          <p className="text-3xl font-cormorant font-bold text-gray-900">
            Prices for our packages start from €3,000
          </p>

          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-gray-700 mb-6">
              Our wedding packages include essential services. Fill out the form below to get a detailed list of our extra services or reach out to us to discuss custom options.
            </p>
          </div>

          <a
            href="#contact"
            className="inline-block px-10 py-4 bg-dusty-rose text-white rounded-full hover:bg-warm-brown transition-all duration-300 text-lg font-medium shadow-md hover:shadow-xl"
          >
            Design your perfect wedding package with our expert guidance
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Packages;