import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    name: 'Yehya & Mariam',
    location: 'United Kingdom',
    text: 'We had a beautiful seaside ceremony in the Club Tuana Hotel in Fethiye, organized by Amara Weddings. Their team took care of every detail when arranging our wedding, so we didn\'t have to worry about a thing, especially miscommunication with local vendors. The entire experience of our trip to Turkey and our wedding in Fethiye felt like a fairytale. We couldn\'t have asked for better wedding planners!',
    date: 'June 2024',
    image: '/images/testimonials/couple1.jpg',
  },
  {
    name: 'Tatiana & Slava',
    location: 'Germany',
    text: 'We cannot thank Amara Weddings enough for organizing our perfect wedding ceremony and reception! From the moment we reached out, the team was attentive and genuinely passionate about bringing our ideas to life. We had our ceremony in a spot with breathtaking sea views. The decor, food, and live music at the reception were flawless, just as we imagined. Our guests looked satisfied. We couldn\'t have asked for a more beautiful day. Thank you, Amara team, for making our dream wedding come true!',
    date: 'September 2024',
    image: '/images/testimonials/couple2.jpg',
  },
  {
    name: 'Berivan & Gojko',
    location: 'France',
    text: 'Choosing Amara Weddings for our elopement in Fethiye was the best decision we could have made. We wanted to have a romantic beach ceremony, and their team understood our vision from the start. They found us a beautiful, secluded spot on the shore and set up a cozy dinner under the stars just for us. The Amara team took care of every detail, so we could truly enjoy each moment. If you\'re planning an elopement, don\'t hesitate to contact Amara Weddings — they will make it magical!',
    date: 'May 2024',
    image: '/images/testimonials/couple3.jpg',
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-cormorant font-bold mb-4">Customer testimonials</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Hear from couples who celebrated their special day with us in Fethiye.
          </p>
        </div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          {/* Slider Container */}
          <div className="bg-soft-cream rounded-3xl shadow-xl p-12 relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="flex flex-col items-center text-center"
              >
                {/* Round Photo */}
                <div className="mb-8">
                  <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-lg">
                    <img
                      src={currentTestimonial.image}
                      alt={currentTestimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-700 leading-relaxed text-lg italic mb-8 max-w-3xl">
                  {currentTestimonial.text}
                </p>

                {/* Name */}
                <div className="border-t-2 border-dusty-rose pt-6">
                  <p className="text-2xl font-cormorant font-bold text-gray-900">
                    {currentTestimonial.name}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white hover:bg-dusty-rose text-gray-700 hover:text-white rounded-full p-3 shadow-lg transition-all duration-300"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white hover:bg-dusty-rose text-gray-700 hover:text-white rounded-full p-3 shadow-lg transition-all duration-300"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-dusty-rose w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
