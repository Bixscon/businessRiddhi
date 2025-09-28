"use client";

import React from "react";
import useEmblaCarousel, { EmblaOptionsType } from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import TestimonialCard from "@/components/cards/TestimonialCard";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";

interface Testimonial {
  image: string;
  content: string;
}

type EmblaCarouselProps = {
  slides: Testimonial[];
  className?: string;
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<EmblaCarouselProps> = ({ slides, options, className }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [AutoScroll({ playOnInit: true })]);
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
