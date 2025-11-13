import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        >
          <div className="relative h-[500px]">
            <img
              src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="Mediterranean wedding setup"
              className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-xl"
            />
          </div>
          
          <div>
            <h2 className="text-4xl font-cormorant font-bold mb-6">
              Why choose AMARA Weddings
            </h2>
            <p className="text-lg mb-6 text-gray-600">
              AMARA Weddings is a full-service destination wedding planner based in Turkey. 
              We help couples from around the world realize their dream weddings in Fethiye, Turkey’s paradise.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="font-cormorant text-2xl font-bold mb-2">Full-service destination wedding planning</h3>
              </div>
              <div>
                <h3 className="font-cormorant text-2xl font-bold mb-2">Best venues and vendors</h3>
              </div>
              <div>
                <h3 className="font-cormorant text-2xl font-bold mb-2">Pricing flexibility</h3>
              </div>
              <div>
                <h3 className="font-cormorant text-2xl font-bold mb-2">Multilingual support</h3>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;