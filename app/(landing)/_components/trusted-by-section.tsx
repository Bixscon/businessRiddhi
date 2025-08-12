"use client";

import React from "react";
import Image from "next/image";

const logos = [
  { src: "/trusted by/image 20.png", width: 175, height: 76, alt: "Company Logo" },
  { src: "/trusted by/image 28.png", width: 152, height: 76, alt: "Company Logo" },
  { src: "/trusted by/image 34.png", width: 304, height: 76, alt: "Company Logo" }, // Adjusted ratio
  { src: "/trusted by/image 35.png", width: 285, height: 76, alt: "Company Logo" }, // Adjusted ratio
  { src: "/trusted by/image 36.png", width: 272, height: 38, alt: "Company Logo" },
  { src: "/trusted by/image 37.png", width: 123, height: 76, alt: "Company Logo" }, // Adjusted ratio
  { src: "/trusted by/image 38.png", width: 137, height: 76, alt: "Company Logo" }, // Adjusted ratio
  { src: "/trusted by/image 39.png", width: 176, height: 76, alt: "Company Logo" }, // Adjusted ratio
  { src: "/trusted by/image 40.png", width: 378, height: 76, alt: "Company Logo" }, // Adjusted ratio
  { src: "/trusted by/image 41.png", width: 75, height: 76, alt: "Company Logo" },
  { src: "/trusted by/image 42.png", width: 75, height: 76, alt: "Company Logo" },
  { src: "/trusted by/image 43.png", width: 75, height: 76, alt: "Company Logo" },
  { src: "/trusted by/image 44.png", width: 175, height: 76, alt: "Company Logo" },
  { src: "/trusted by/image 45.png", width: 145, height: 76, alt: "Company Logo" },
];

export default function TrustedBySection() {
  return (
    <div className="flex flex-col items-center w-full max-w-[1368px] mx-auto gap-[45px] py-12">
      <h2 className="font-degular font-semibold text-[32px] leading-[120%] tracking-[-2.2%] text-center text-[#1E1E1E]">
        Trusted By Professionals From
      </h2>
      <div className="relative w-full overflow-hidden">
        <style jsx>{`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(calc(-200px * ${logos.length}));
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
          {[...logos, ...logos].map((logo, index) => (
            <div key={index} className="relative flex items-center justify-center shrink-0 mx-8">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                className="object-contain h-[60px] w-auto opacity-80 hover:opacity-100 transition-all transform hover:scale-105 duration-300"
                style={{
                  maxWidth: '180px',
                  aspectRatio: `${logo.width} / ${logo.height}`
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
