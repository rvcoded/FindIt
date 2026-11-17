import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageCarouselProps {
  images: string[];
  alt: string;
}

export default function ImageCarousel({ images, alt }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);

  const goPrev = () => setCurrentIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const goNext = () => setCurrentIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext();
      else goPrev();
    }
  };

  if (images.length <= 1) {
    return (
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-cream-200">
        <img src={images[0]} alt={alt} className="w-full h-full object-cover" />
      </div>
    );
  }

  return (
    <div
      className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-cream-200 group"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="flex h-full transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((img, i) => (
          <div key={i} className="w-full h-full shrink-0">
            <img src={img} alt={`${alt} - image ${i + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      <button
        onClick={goPrev}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-charcoal-100 shadow-md flex items-center justify-center text-charcoal-600 hover:bg-white transition-all opacity-0 group-hover:opacity-100"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={goNext}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-charcoal-100 shadow-md flex items-center justify-center text-charcoal-600 hover:bg-white transition-all opacity-0 group-hover:opacity-100"
        aria-label="Next image"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`h-2 rounded-full transition-all ${
              i === currentIndex ? 'w-6 bg-white' : 'w-2 bg-white/50'
            }`}
            aria-label={`Go to image ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
