"use client";

import React from "react";
import Image from "next/image";

// Define recognition items
const recognitionImages = [
  { src: "/recognitions/image-33.png", width: 180, height: 73, alt: "Recognition" },
  { src: "/recognitions/image-31.png", width: 180, height: 75, alt: "Recognition" },
  { src: "/recognitions/image-23.png", width: 180, height: 27, alt: "Recognition" },
  { src: "/whatsapp-image-2025-05-07-at-00-41-49-6045e179-2.png", width: 180, height: 60, alt: "Whatsapp image" },
  { src: "/recognitions/image-24.png", width: 180, height: 70, alt: "Recognition" },
  { src: "/recognitions/image-25.png", width: 180, height: 72, alt: "Recognition" },
  { src: "/recognitions/image-26.png", width: 180, height: 75, alt: "Recognition" },
  { src: "/recognitions/image-27.png", width: 180, height: 70, alt: "Recognition" },
  { src: "/recognitions/image-32.png", width: 90, height: 72, alt: "Recognition" },
  { src: "/recognitions/image-22.png", width: 180, height: 49, alt: "Recognition" },
  { src: "/recognitions/yourstory.png", width: 180, height: 49, alt: "Recognition" },
];

export function RecognitionsList() {
  return (
    <div className="relative w-full py-8 bg-white shadow-[0px_0px_40.1px_#00000029]">
      <h3 className="text-center [font-family:'Degular_Display-SemiBold',Helvetica] font-semibold text-[#1e1e1e] text-[32px] tracking-[-0.70px] leading-[38.4px] mb-8">
        Recognitions &amp; Features
      </h3>
      
      {/* Desktop view - scrolling animation */}
      <div className="relative w-full overflow-hidden hidden md:block">
        <style jsx>{`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(calc(-200px * ${recognitionImages.length}));
            }
          }
          .animate-scroll {
            animation: scroll 40s linear infinite;
          }
          .animate-scroll:hover {
            animation-play-state: paused;
          }
        `}</style>
        <div className="flex animate-scroll items-center">
          {[...recognitionImages, ...recognitionImages].map((img, index) => (
            <div key={index} className="relative flex items-center justify-center shrink-0 mx-8">
              <Image
                className="object-contain opacity-80 hover:opacity-100 transition-all transform hover:scale-105 duration-300"
                alt={img.alt}
                src={img.src}
                width={img.width}
                height={img.height}
                priority={index < 5}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile view - two columns */}
      <div className="grid grid-cols-2 gap-8 px-4 md:hidden">
        {recognitionImages.map((img, index) => (
          <div key={index} className="flex items-center justify-center">
            <Image
              className="object-contain max-w-full h-auto"
              alt={img.alt}
              src={img.src}
              width={img.width}
              height={img.height}
              priority={index < 4}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// This is a non-scrolling version that can be used as a fallback
export function RecognitionsListStatic() {
  return (
    <div className="relative w-full py-8 bg-white shadow-[0px_0px_40.1px_#00000029]">
      <h3 className="text-center [font-family:'Degular_Display-SemiBold',Helvetica] font-semibold text-[#1e1e1e] text-[32px] tracking-[-0.70px] leading-[38.4px] mb-8">
        Recognitions &amp; Features
      </h3>
      
      <div className="flex flex-wrap justify-center items-center gap-4 px-4 overflow-hidden">
        {recognitionImages.map((img, index) => (
          <div key={index} className="flex-shrink-0 mx-4">
            <Image
              className="object-contain"
              alt={img.alt}
              src={img.src}
              width={img.width}
              height={img.height}
              priority={index < 5}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

