"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  Funnel,
  Command,
  Aperture,
} from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import TrustedBySection from "./trusted-by-section";

const cardData = [
  {
    title: "Get your first funding & more",
    description:
      "Grants, Equity Investments, Founder fellowship and Loans for your business",
  },
  {
    title: "Build your team",
    description:
      "CTO, accounting, marketing & more, we’ll help you find the right match in seconds",
  },
  {
    title: "Get investor ready startup resume",
    description:
      "Effortless document creation and sharing",
  },
];

const features = [
  {
    title: "Find Free",
    subtitle: "Resources in 3-clicks",
  },
  {
    title: "Connect",
    subtitle: "With Resource Providers that offer what you need",
  },
  {
    title: "Rate & Review",
    subtitle: "Your experience",
  },
];

function MarketplaceSection() {
  // Intersection Observer hook
  const { ref: statsRef, inView: statsInView } = useInView({
    threshold: 0, // Trigger when 30% of the section is visible
    triggerOnce: true, // Animate only once
  });

  // Days counter logic
  const [daysFromStart, setDaysFromStart] = useState(0);

  useEffect(() => {
    const calculateDays = () => {
      const startDate = new Date("2024-11-14"); // Start date
      const today = new Date(); // Today's date
      const differenceInTime = today.getTime() - startDate.getTime(); // Difference in milliseconds
      const daysDifference = Math.floor(
        differenceInTime / (1000 * 60 * 60 * 24),
      ); // Convert to days
      setDaysFromStart(daysDifference);
    };

    calculateDays();

    // Update daily at midnight
    const interval = setInterval(
      () => {
        calculateDays();
      },
      1000 * 60 * 60 * 24,
    ); // 24 hours

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);
  const stats = [
    {
      value: daysFromStart, // Use your dynamic calculation
      subtitle: "Days",
    },
    {
      value: 750,
      suffix: "+",
      subtitle: "Startup Members",
    },
    {
      value: 850,
      suffix: "+",
      subtitle: "Resources Providers Listed",
    },
  ];

  return (
    <section
      className="relative w-full"
      aria-labelledby="marketplace-heading"
      ref={statsRef}
    >
      {/* Top wave - full width */}
      <div
        className="absolute inset-x-0 top-0 w-full h-[250px] md:h-[200px] lg:h-[300px] opacity-60"
        aria-hidden="true"
      >
        <Image
          src="/numberwave.svg"
          fill
          className="object-cover object-left"
          alt="Background wave image"
          loading="lazy"
        />
      </div>

      {/* Content container with max-width */}
      <div className="relative max-w-screen-xl mx-auto px-4 py-9 md:py-14 lg:py-20">        {/* Stats section */}
        <div className="relative z-10 space-y-6 text-center sm:flex sm:space-y-0 sm:justify-between">
          {stats.map((stat, index) => (
            <div key={index} className="flex-grow space-y-1">
              <p className="font-degular text-heading4 lg:text-heading3 xl:text-heading2">                {statsInView ? (
                <>
                  <CountUp
                    start={0}
                    end={stat.value}
                    duration={2}
                    separator=","
                  />
                  {stat.suffix && stat.suffix}
                </>
              ) : (
                0
              )}
              </p>
              <p className="text-xl lg:text-hero text-primary font-medium">
                {stat.subtitle}
              </p>
            </div>
          ))}
        </div>

        {/* Trusted By Section */}
        <div className="relative z-10 mt-16">
          <TrustedBySection />
        </div>

        {/* Main content */}
        <div className="pt-9 md:pt-16 lg:pt-24 xl:pt-24 space-y-9 md:space-y-14 xl:space-y-20">
          {/* Heading and Subheading */}
          <div className="space-y-4 text-center md:space-y-4">
            <h2
              id="marketplace-heading"
              className="font-degular font-semibold text-heading4 md:text-heading3 lg:text-heading2 xl:text-heading1 leading-snug"
            >
              India&#39;s First Marketplace for Startups to Find Resource
              Providers.
              {/* India&apos;s First Marketplace for Startups to Find Resource Providers */}
            </h2>
            <p className="font-gothic font-medium text-lg">
              Discover all business solutions for your startup needs in{" "}
              <span className="font-bold">one trusted destination</span> with
              Visey.
            </p>
          </div>

          {/* Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-2 sm:px-4">
            {cardData.map((data, idx) => (
              <div
                key={data.title}
                className="relative z-10 p-6 sm:p-8 md:p-10 rounded-2xl space-y-4 bg-primary-landing-light text-base-white w-full"
              >                <div className="relative w-[58px] h-[58px] rounded-full inline-flex justify-center items-center bg-success-landing">
                  {idx === 0 && (
                    <div className="w-11 h-11 relative">
                      <Image
                        src="/currencyinr.svg"
                        alt="Funding icon"
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                  {idx === 1 && (
                    <div className="w-11 h-11 relative">
                      <Image
                        src="/usersthree.svg"
                        alt="Team building icon"
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                  {idx === 2 && (
                    <div className="w-11 h-11 relative">
                      <Image
                        src="/files.svg"
                        alt="Documents icon"
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <h3 className="font-degular font-medium text-hero">
                    {data.title}
                  </h3>
                  <p className="font-gothic">{data.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Features Section */}
          <div className="flex flex-col items-center px-4">
            <h2 className="font-degular font-semibold text-[#4a4a4a] text-2xl sm:text-3xl md:text-4xl text-center leading-tight mb-8">
              Find the right resources in seconds, not hours.
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full py-6 md:py-10">
              {features.map((feat) => (
                <div key={feat.title} className="flex flex-col items-center text-center">
                  <div className="font-degular font-normal text-[#9d0543] text-2xl sm:text-3xl mb-2">
                    {feat.title}
                  </div>
                  <div className="font-gothic font-medium text-black text-base sm:text-lg">
                    {feat.subtitle}
                  </div>
                </div>
              ))}
            </div>{/* Call-to-Action */}
            <Button
              variant="landing"
              className="h-[60px] px-10 py-1 bg-[#d43a63] rounded-[1000px] shadow-[1px_1px_16px_#00000040] relative z-10"
            >
              <Link href="/login" className="flex items-center">                <span className="text-white font-visey-UI-3-desktop-body-feature-accent font-[number:var(--visey-UI-3-desktop-body-feature-accent-font-weight)] text-[length:var(--visey-UI-3-desktop-body-feature-accent-font-size)] tracking-[var(--visey-UI-3-desktop-body-feature-accent-letter-spacing)] leading-[var(--visey-UI-3-desktop-body-feature-accent-line-height)] whitespace-nowrap [font-style:var(--visey-UI-3-desktop-body-feature-accent-font-style)]">
                Get resource now
              </span>
                <div className="inline-flex items-center justify-center p-2 rounded-[1000px]">
                  <ArrowUpRight size={24} className="text-white" />
                </div>
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom wave - full width */}
      <div
        className="absolute left-0 bottom-0 w-full h-[400px] md:h-[850px]"
        aria-hidden="true"
      >
        <Image
          src="/cards-bg.png"
          fill
          className="object-contain opacity-40"
          alt="Background wave image"
          loading="lazy"
        />
      </div>
    </section>
  );
}

export default MarketplaceSection;
