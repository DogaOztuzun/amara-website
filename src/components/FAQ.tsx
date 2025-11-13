import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: 'Why have a destination wedding in Turkey?',
    answer: 'Turkey is one of the most beautiful and affordable destinations for a wedding, boasting picturesque natural landscapes, a rich cultural heritage, and world-class hospitality. Whether you dream of a romantic beach ceremony, a historic palace wedding, or a luxury yacht celebration, Turkey provides a wide selection of wedding venues.<br/><br/>From the stunning coastal regions of Fethiye, Antalya, and Bodrum to majestic cliffs, lush pine forests, and centuries-old architectural marvels across the country, Turkey has something to offer for every taste and style. Its Mediterranean climate allows having outdoor weddings nearly year-round. On average, a destination wedding in Turkey is more affordable than in many other European countries while offering high-quality services and a luxurious experience.',
  },
  {
    question: 'Why is Fethiye the perfect wedding destination?',
    answer: 'Nestled along the picturesque Turkish Riviera, Fethiye offers the perfect blend of natural beauty, history, and romance, making it a dream wedding destination. With majestic mountains, turquoise seas, and luxurious venues, Fethiye is a paradise for couples seeking a perfect wedding celebration.<br/><br/>Fethiye offers exceptional value for a world-class experience. Couples can enjoy premium services and luxury wedding venues without exceeding their budget. With its mild Mediterranean climate, Fethiye is ideal for outdoor weddings nearly year-round.<br/><br/>As a home to many ancient civilizations, Fethiye is steeped in history and myths about the love stories between gods and mortals. In these mystical surroundings, among its timeless landmarks, your wedding in Fethiye will become not just an event but a magical celebration of love and romance.',
  },
  {
    question: 'How much does a wedding in Turkey cost?',
    answer: 'The cost of a wedding in Turkey can vary greatly depending on the location, venue, number of guests, catering, decor, and other services included. Additional expenses, including legal fees, translation services, travel costs, and transportation and accommodation for you and your guests, should also be considered.<br/><br/>On average, a destination wedding in Turkey costs between €8,000 and €20,000. The cost of smaller intimate weddings, including elopement weddings, can start from around €3,000, while all-inclusive luxury weddings in big cities or resort areas range from €15,000 to €20,000 or more. The cost per guest typically starts from €100 to €200, depending on the venue and services included.',
  },
  {
    question: 'Can foreigners get married in Turkey?',
    answer: 'Yes, foreigners can legally marry in Turkey. However, a few legal requirements must be met, including obtaining a certificate of no impediment, translating and notarizing documents, and conducting a civil ceremony by Turkish authorities.',
  },
  {
    question: 'What documents do I need to get married in Turkey?',
    answer: 'The documents required for a legal marriage in Turkey include:<ul class="list-disc ml-6 mt-2 space-y-1"><li>Passport (with a translated and notarized copy)</li><li>Birth certificate (with apostille, translated and notarized)</li><li>Single status certificate (Certificate of No Impediment to Marriage (CNI) or Statement of Celibacy) (proves both parties are free to marry)</li><li>Health report from a health institution in Turkey (requires doing a blood test)</li><li>Divorce or death certificate (if applicable, to prove previous marriages are legally dissolved)</li></ul>',
  },
  {
    question: 'What are the popular destination wedding locations in Turkey?',
    answer: 'Turkey is home to many breathtaking wedding destinations, each with its own charm and character.<br/><br/>Istanbul — a cosmopolitan city that blends rich history, magnificent architecture, and vibrant culture. With its rooftop venues overlooking the Bosphorus, luxurious Ottoman palaces, and grand ballrooms, Istanbul is a popular choice for couples seeking a wedding with cosmopolitan elegance or a historical touch.<br/><br/>Antalya is known for its luxurious resorts, Blue Flag beaches, and ancient ruins. The city offers a variety of spectacular wedding venues — from five-star beachfront hotels to historic estates — making it ideal for a grand wedding celebration.<br/><br/>Bodrum — a glamorous coastal town that combines historic charm with modern luxury. Its whitewashed buildings, luxury beach clubs, and picturesque marina create the perfect setting for chic, stylish weddings.<br/><br/>Fethiye, located along Turkey\'s Turquoise Coast, is popular among couples seeking a scenic seaside wedding, beach wedding, or yacht wedding. Known for its pristine beaches, crystal-clear waters, and mild Mediterranean climate, Fethiye is an excellent choice for both intimate and luxurious wedding celebrations.',
  },
  {
    question: 'Do I need a wedding planner for a destination wedding in Turkey?',
    answer: 'While it\'s possible to plan a wedding in Turkey on your own, hiring a professional wedding planner makes the process much smoother. A local wedding planner handles all the logistics, including venue booking, vendor coordination, legal paperwork, and guest arrangements, which saves you time and helps you avoid miscommunication.<br/><br/>A wedding planner based in Turkey likely has strong connections with trusted vendors, including florists, photographers, caterers, and entertainment providers. This insider knowledge enables them to negotiate more favorable rates, avoid common pitfalls, and help you make the most of your budget. In many cases, the cost savings they secure on venues and services can offset the expense of hiring them.',
  },
  {
    question: 'What is an intimate destination wedding?',
    answer: 'An intimate destination wedding is a small-scale celebration, typically with fewer than 50 guests. Small, intimate wedding ceremonies allow couples to focus on celebrating their special day with the closest family and friends. These weddings provide a more personal, relaxed, and budget-friendly alternative to larger, traditional ceremonies.<br/><br/>Micro weddings and elopements are gaining popularity in Turkey, offering couples a variety of romantic locations ideal for intimate celebrations. Fethiye, in particular, is a perfect destination for a small wedding. Whether you\'re looking for a secluded beach ceremony, a private villa wedding, or an exotic adventure elopement, Fethiye offers incredible locations for intimate weddings.',
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-soft-cream">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-cormorant font-bold mb-4">
            Destination wedding in Turkey:<br />
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about planning a destination wedding in Turkey.
          </p>
        </div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-md overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-8 py-6 flex justify-between items-center text-left hover:bg-gray-50 transition-colors duration-200"
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-8">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0">
                  {openIndex === index ? (
                    <Minus className="w-6 h-6 text-dusty-rose" />
                  ) : (
                    <Plus className="w-6 h-6 text-dusty-rose" />
                  )}
                </div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-6">
                      <p
                        className="text-gray-700 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: faq.answer }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">
            Have questions about our wedding planning services? We're here to help!
          </p>
          <a
            href="#contact"
            className="inline-block px-8 py-3 bg-dusty-rose text-white rounded-full hover:bg-warm-brown transition-colors duration-300 font-medium"
          >
            Contact us
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
