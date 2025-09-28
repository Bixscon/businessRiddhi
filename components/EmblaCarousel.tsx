"use client";

import React from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import AutoScroll from 'embla-carousel-auto-scroll'
import TestimonialCard from '@/components/cards/TestimonialCard';
import { DotButton, useDotButton } from './EmblaCarouselDotButton'

interface Testimonial {
  image: string;
  content: string;
}

type PropType = {
  slides: Testimonial[]
  className?: string
  options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options, className } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    AutoScroll({ playOnInit: true })
  ])

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi)

  return (
    <div className={max-w-[320px] ${className || ''}}>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex flex-row p-3">
          {slides.map((slide, index) => (
            <div key={index}>
              <TestimonialCard image={slide.image} content={slide.content} />
            </div>
          ))}
        </div>

        <div className="mt-4">
          <div className="flex justify-center items-center gap-2">
            {scrollSnaps.map((_, index) => (
              <DotButton
                key={index}
                onClick={() => onDotButtonClick(index)}
                className={w-3 h-3 rounded-full ${index === selectedIndex ? 'bg-primary-landing' : 'bg-[#D9D9D9]'}}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmblaCarousel
