import { useState, useRef, type ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselProps {
  children: ReactNode[];
}

export default function Carousel({ children }: CarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 5);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 5);
  };

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector('[data-carousel-item]') as HTMLElement | null;
    const scrollAmount = cardWidth ? cardWidth.offsetWidth + 24 : 320;
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        onScroll={updateScrollState}
        className="flex gap-6 overflow-x-auto no-scrollbar snap-x-carousel pb-4"
      >
        {children.map((child, i) => (
          <div
            key={i}
            data-carousel-item
            className="snap-center-item shrink-0 w-[300px] sm:w-[340px]"
          >
            {child}
          </div>
        ))}
      </div>
      {canScrollLeft && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 w-11 h-11 rounded-full bg-white border border-charcoal-100 shadow-lg flex items-center justify-center text-charcoal-600 hover:bg-cream-100 hover:text-sand-600 transition-all"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}
      {canScrollRight && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 w-11 h-11 rounded-full bg-white border border-charcoal-100 shadow-lg flex items-center justify-center text-charcoal-600 hover:bg-cream-100 hover:text-sand-600 transition-all"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
