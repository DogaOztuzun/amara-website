import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const images = [
  // All (8 images)
  { src: '/gallery/all/-11.jpg', category: 'All' },
  { src: '/gallery/all/-13.jpg', category: 'All' },
  { src: '/gallery/all/-4.jpg', category: 'All' },
  { src: '/gallery/all/-8.jpg', category: 'All' },
  { src: '/gallery/all/DSC05228.jpg', category: 'All' },
  { src: '/gallery/all/DSC_2941.jpg', category: 'All' },
  { src: '/gallery/all/MP3A1809edit.jpg', category: 'All' },
  { src: '/gallery/all/MZO_2131.jpg', category: 'All' },
  // Beach Wedding (8 images)
  { src: '/gallery/beach-wedding/-11.jpg', category: 'Beach Wedding' },
  { src: '/gallery/beach-wedding/-190.jpg', category: 'Beach Wedding' },
  { src: '/gallery/beach-wedding/DSC06033.jpg', category: 'Beach Wedding' },
  { src: '/gallery/beach-wedding/DSC_2956.jpg', category: 'Beach Wedding' },
  { src: '/gallery/beach-wedding/DSC_6835.jpg', category: 'Beach Wedding' },
  { src: '/gallery/beach-wedding/MP3A1909.jpg', category: 'Beach Wedding' },
  { src: '/gallery/beach-wedding/MZO_2131.jpg', category: 'Beach Wedding' },
  { src: '/gallery/beach-wedding/MZO_2206.jpg', category: 'Beach Wedding' },
  // Hotel Wedding (8 images)
  { src: '/gallery/hotel-wedding/-28.jpg', category: 'Hotel Wedding' },
  { src: '/gallery/hotel-wedding/-4.jpg', category: 'Hotel Wedding' },
  { src: '/gallery/hotel-wedding/-5.jpg', category: 'Hotel Wedding' },
  { src: '/gallery/hotel-wedding/DSC05203.jpg', category: 'Hotel Wedding' },
  { src: '/gallery/hotel-wedding/DSC05228.jpg', category: 'Hotel Wedding' },
  { src: '/gallery/hotel-wedding/DSC_2948.jpg', category: 'Hotel Wedding' },
  { src: '/gallery/hotel-wedding/DSC_3365.jpg', category: 'Hotel Wedding' },
  { src: '/gallery/hotel-wedding/DSC_5664.jpg', category: 'Hotel Wedding' },
  // Decor (8 images)
  { src: '/gallery/decor/-16.jpg', category: 'Decor' },
  { src: '/gallery/decor/-9.jpg', category: 'Decor' },
  { src: '/gallery/decor/DSC06002.jpg', category: 'Decor' },
  { src: '/gallery/decor/DSC_2955.jpg', category: 'Decor' },
  { src: '/gallery/decor/DSC_3044.jpg', category: 'Decor' },
  { src: '/gallery/decor/DSC_3045.jpg', category: 'Decor' },
  { src: '/gallery/decor/DSC_3455.jpg', category: 'Decor' },
  { src: '/gallery/decor/MP3A1809edit.jpg', category: 'Decor' },
  // Ceremony (8 images)
  { src: '/gallery/ceremony/-13.jpg', category: 'Ceremony' },
  { src: '/gallery/ceremony/-184.jpg', category: 'Ceremony' },
  { src: '/gallery/ceremony/-185.jpg', category: 'Ceremony' },
  { src: '/gallery/ceremony/-8.jpg', category: 'Ceremony' },
  { src: '/gallery/ceremony/DSC_0758edit.jpg', category: 'Ceremony' },
  { src: '/gallery/ceremony/DSC_2941.jpg', category: 'Ceremony' },
  { src: '/gallery/ceremony/DSC_5465_1.jpg', category: 'Ceremony' },
  { src: '/gallery/ceremony/DSC_5539.jpg', category: 'Ceremony' },
  // Dinner & Reception (8 images)
  { src: '/gallery/dinner-reception/Dinner.jpg', category: 'Dinner & Reception' },
  { src: '/gallery/dinner-reception/DSC06003.jpg', category: 'Dinner & Reception' },
  { src: '/gallery/dinner-reception/DSC_2279.jpg', category: 'Dinner & Reception' },
  { src: '/gallery/dinner-reception/DSC_2288.jpg', category: 'Dinner & Reception' },
  { src: '/gallery/dinner-reception/DSC_2289.jpg', category: 'Dinner & Reception' },
  { src: '/gallery/dinner-reception/DSC_3366.jpg', category: 'Dinner & Reception' },
  { src: '/gallery/dinner-reception/DSC_3369.jpg', category: 'Dinner & Reception' },
  { src: '/gallery/dinner-reception/DSC_3454.jpg', category: 'Dinner & Reception' },
];

const Gallery = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [filter, setFilter] = useState('All');

  // Preload all images on mount so they're cached and appear instantly
  useEffect(() => {
    images.forEach((image) => {
      const img = new Image();
      img.src = image.src;
    });
  }, []);

  const filteredImages = images.filter(img => img.category === filter);

  const goToPrevious = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === 0 ? filteredImages.length - 1 : selectedIndex - 1);
    }
  };

  const goToNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === filteredImages.length - 1 ? 0 : selectedIndex + 1);
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'Escape') setSelectedIndex(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, filteredImages.length]);

  return (
    <section id="portfolio" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-4xl font-cormorant font-bold mb-4">Amara Wedding Photo Gallery</h2>
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 px-2">
            {['All', 'Beach Wedding', 'Hotel Wedding', 'Decor', 'Ceremony', 'Dinner & Reception'].map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-3 md:px-4 py-2 text-sm md:text-base rounded-full transition-colors duration-300 cursor-pointer ${
                  filter === category
                    ? 'bg-dusty-rose text-white'
                    : 'bg-soft-cream hover:bg-dusty-rose/20'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {filteredImages.map((image, index) => (
            <div
              key={`${filter}-${index}`}
              className="relative group cursor-pointer"
              onClick={() => setSelectedIndex(index)}
            >
              <img
                src={image.src}
                alt={`Wedding ${image.category}`}
                className="w-full aspect-square object-cover rounded-lg"
                style={{ filter: 'sepia(15%) saturate(110%) brightness(105%) contrast(95%)' }}
              />
            </div>
          ))}
        </div>

        {selectedIndex !== null && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl w-full flex items-center">
              {/* Previous button */}
              <button
                onClick={goToPrevious}
                className="absolute left-4 md:-left-16 text-white hover:text-dusty-rose cursor-pointer z-10"
              >
                <ChevronLeft className="w-10 h-10" />
              </button>

              {/* Close button */}
              <button
                onClick={() => setSelectedIndex(null)}
                className="absolute -top-12 right-0 text-white hover:text-dusty-rose cursor-pointer"
              >
                <X className="w-8 h-8" />
              </button>

              {/* Image */}
              <img
                src={filteredImages[selectedIndex].src}
                alt="Selected wedding"
                className="w-full h-auto rounded-lg"
                style={{ filter: 'sepia(15%) saturate(110%) brightness(105%) contrast(95%)' }}
              />

              {/* Next button */}
              <button
                onClick={goToNext}
                className="absolute right-4 md:-right-16 text-white hover:text-dusty-rose cursor-pointer z-10"
              >
                <ChevronRight className="w-10 h-10" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
