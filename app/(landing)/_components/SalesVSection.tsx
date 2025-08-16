import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

const MARQUEE_TEXT = "Visey Exclusive Launch";
const MARQUEE_REPEAT = 20;

function MarqueeBar() {
  return (
    <div className="bg-primary-landing-light text-white overflow-hidden whitespace-nowrap">
      <div className="animate-marquee inline-block py-2 font-semibold">
        {Array(MARQUEE_REPEAT)
          .fill(MARQUEE_TEXT)
          .map((txt, i) => (
           <>
            <span className="px-6" key={i}>{txt}</span>
            <span className="px-6 items-center" key={i}>.</span>
           </>
          ))}
      </div>
    </div>
  );
}

export default function SalesVSection() {
  return (
    <div className="relative bg-white">
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
      {/* Top marquee bar */}
      <MarqueeBar />

      {/* Main content */}
      <div className="flex flex-col md:flex-row items-center md:items-start justify-center py-12 px-6 md:px-16">
        {/* Left Logo */}
        <div className="flex-shrink-0 md:w-1/2 mb-8 md:mb-0 md:mr-12 order-1 md:order-none justify-center">
          <img
            src="/SalesV Logo.png"
            alt="SalesV Logo"
            className="max-w-full lg:mx-auto"
          />
        </div>

        {/* Right Content */}
        <div className="max-w-xl md:w-1/2 text-center md:text-left order-2 md:order-none">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            SalesV
          </h2>
          <p className="italic text-gray-600 mb-6 text-lg">Sell like Hell.</p>
          <p className="text-gray-700 mb-4">
            The first ever outcome-led Sales Acceleration Sprint for 10
            early-stage Visey startups.
          </p>
          <p className="text-gray-700 mb-4">
            You bring the product. Jay Shah brings the sales channels. Together,
            you unlock revenue, fast.
          </p>
          <p className="text-gray-700 mb-4">
            For the first 3 months, Jay will run your sales and GTM like it’s
            his own startup– testing, selling, iterating, building systems.
          </p>
          <p className="text-gray-700 mb-6">
            If the engine runs, you scale together. If not, you take the
            blueprint and sprint solo. Simple right?
          </p>
          <p className="font-semibold mb-6">
            Apply to SalesV by Visey &amp; Jay Shah.
          </p>
          <Link target="_blank" href={"https://lu.ma/event/evt-IO5AfJHVHOSh60X"}>
          <button className="bg-gray-100 px-6 py-3 fw-bold rounded-full shadow hover:shadow-lg transition flex items-center justify-center gap-2 mx-auto md:mx-0">
            Register Now{" "}
                   <ArrowUpRight size={24} />
          </button>
          </Link>
        </div>
      </div>

      {/* Bottom marquee bar */}
      <MarqueeBar />

      {/* Marquee animation */}
      <style>{`
        @keyframes marquee2 {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee2 {
          display: inline-block;
          animation: marquee 45s linear infinite;
        }
      `}</style>
    </div>
  );
}
