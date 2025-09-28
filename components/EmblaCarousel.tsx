"use client";

import React from "react";
import useEmblaCarousel, { EmblaOptionsType } from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import dynamic from "next/dynamic";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";

// Dynamic import for TestimonialCard to avoid SSR issues
const TestimonialCard = dynamic(() => import("@/components/cards/TestimonialCard"), { ssr: false });

interface Testimonial {
  image: string;
  content: string;
}

type EmblaCarouselProps = {
  slides: Testimonial[];
  className?: string;
  options?: EmblaOptionsType;
};

export const EmblaCarousel: React.FC<EmblaCarouselProps> = ({ slides = [], options, className }) => {
  // Only initialize AutoScroll on client
  const [emblaRef, emblaApi] = useEmblaCarousel(
    options,
    typeof window !== "undefined" ? [AutoScroll({ playOnInit: true })] : []
  );

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);

  return (
    <div className={`max-w-[320px] ${className || ""}`}>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex flex-row p-3">
          {slides.map((slide, index) => (
            <div key={index}>
              <TestimonialCard image={slide.image} content={slide.content} />
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-center gap-2">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              selected={index === selectedIndex}
              onClick={() => onDotButtonClick(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
