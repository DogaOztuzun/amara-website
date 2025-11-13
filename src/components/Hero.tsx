import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <div className="relative h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1513521523607-ba30a1159755?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60" />
      </div>
      
      <div className="relative h-full flex items-center justify-center text-center text-white px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="font-cormorant text-5xl md:text-7xl mb-8">
            Bespoke destination weddings in Turkey
          </h1>
      

          <p className="font-montserrat text-lg md:text-xl mb-12 max-w-2xl mx-auto">
            Your exclusive destination wedding planner in Fethiye
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-white text-warm-brown font-montserrat px-8 py-3 rounded-full hover:bg-dusty-rose hover:text-white transition-colors duration-300"
          >


            Start planning your dream wedding today
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;