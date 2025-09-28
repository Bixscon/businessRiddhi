"use client";

import React from "react";
import { EmblaCarouselType } from "embla-carousel";

// DotButton Component
type DotButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  selected?: boolean;
};
export const DotButton: React.FC<DotButtonProps> = ({ selected, className, ...props }) => {
  return (
    <button
      className={`w-3 h-3 rounded-full ${selected ? "bg-primary-landing" : "bg-[#D9D9D9]"} ${
        className || ""
      }`}
      {...props}
    />
  );
};

// Hook for Embla Carousel
export const useDotButton = (emblaApi?: EmblaCarouselType) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);

  const onDotButtonClick = React.useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  React.useEffect(() => {
    if (!emblaApi) return;

    setScrollSnaps(emblaApi.scrollSnapList());
    setSelectedIndex(emblaApi.selectedScrollSnap());

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  return { selectedIndex, scrollSnaps, onDotButtonClick };
};
