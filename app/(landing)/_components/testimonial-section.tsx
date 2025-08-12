import Image from 'next/image';
import TestimonialsCarousel from './testimonials-carousel';

function TestimonialSection() {
  return (
    <section
      className="relative pt-24"
      aria-labelledby="testimonial-section-heading"
    >
      {/* Decorative Top Wave */}
      <div
        className="absolute inset-x-0 top-0 w-full h-[250px] md:h-[200px] lg:h-[300px] opacity-60"
        aria-hidden="true"
      >
        <Image
          src="/wave-real-2.png"
          fill
          className="object-cover object-left"
          alt="Wave-shaped decorative background"
          loading="lazy" // Lazy-loaded
        />
      </div>

      {/* Section Heading */}
      <div className="space-y-2 text-center">
        <h2
          id="testimonial-section-heading"
          className="font-degular font-semibold text-heading4 md:text-heading3 lg:text-heading2 xl:text-heading1 leading-snug"
        >
          Experiences speak louder
        </h2>
        <p className="text-lg font-gothic font-medium">
          &quot;This is the most helpful resource for my startup&quot;
        </p>
      </div>      {/* Carousel Section */}
      <div className="py-24">
        <TestimonialsCarousel />
      </div>

      {/* Decorative Bottom Triangle */}
      <div
        className="relative rotate-180 w-full h-20 bg-repeat-x opacity-10"
        aria-hidden="true"
        style={{
          backgroundImage: "url('/triangle.png')",
          backgroundSize: '100px 100%',
          backgroundPosition: 'center',
        }}
      ></div>
    </section>
  );
}

export default TestimonialSection;
