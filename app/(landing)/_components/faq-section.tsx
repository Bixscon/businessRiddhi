"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { CaretDown, CaretUp } from "@phosphor-icons/react/dist/ssr";
import { useState } from "react";

const faqData = [
  {
    question: "How does Visey reduce my search time for resources?",
    answer:
      "Visey simplifies the search process by offering a curated marketplace of vetted resource providers tailored to the unique needs of Indian startups. Instead of navigating multiple platforms, you can easily filter, compare, and connect with trusted providers for legal, digital marketing, mentorship, and other critical services—all in one place.",
  },
  {
    question: "Is there a cost to join Visey?",
    answer:
      "Visey is India's first dedicated marketplace designed to connect resource providers with startups, helping you generate targeted leads and establish valuable partnerships. Whether you specialize in financial planning, SEO services, or startup mentorship programs, Visey ensures your expertise reaches the startups that need it.",
  },
  {
    question: "Which resource providers can join visey?",
    answer:
      "Visey supports a wide range of resource providers essential to startup success, including legal services, financial consulting, digital marketing, software development, design services, human resources, mentorship programs, and many more. Whether your business specializes in helping startups with company registration or providing tools for scaling operations, Visey connects you directly with your target audience.",
  },
  {
    question: "What is Visey, and how does it benefit resource providers?",
    answer:
      "Visey is India's first dedicated marketplace designed to connect resource providers with startups, helping you generate targeted leads and establish valuable partnerships. Whether you specialize in financial planning, SEO services, or startup mentorship programs, Visey ensures your expertise reaches the startups that need it.",
  },
  {
    question: "What if I don't find the exact service I need?",
    answer:
      "Visey is constantly expanding its service offerings. If you don't find the specific service you need, you can submit a request, and our team will work to onboard suitable resource providers to fulfill your requirements. We aim to ensure no startup resource need goes unmet.",
  },
  {
    question: "How can I leave feedback on a service provider?",
    answer:
      "Feedback is essential for maintaining trust and transparency on Visey. Startups can rate and review resource providers after utilizing their services. These reviews help future users make informed decisions and encourage resource providers to maintain high-quality offerings.",
  },
  {
    question: "How does Visey promote my business to startups?",
    answer:
      "Visey uses advanced search features and category-based listings to make your services visible to Indian startups. Resource providers that opt for premium plans enjoy enhanced rankings, targeted promotions, and priority placements in search results, ensuring their services reach the right audience efficiently. Our digital infrastructure will help your business align with the Startup India vision.",
  },
];

function FaqSection() {
  const [showAll, setShowAll] = useState(false);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  // Control displayed FAQs
  const displayedFaqs = showAll ? faqData : faqData.slice(0, 4);

  return (
    <section className="bg-primary-landing bg-gradient-to-tr from-[#9d0543] to-[#c80755] " aria-labelledby="faq-section-heading">
      <div
        aria-hidden="true"
        style={{
          backgroundImage: "url('/triangle.png')",
          backgroundSize: "100px 100%",
          backgroundPosition: "center",
        }}
        className="relative rotate-0 w-full h-20 bg-repeat-x opacity-10"
      ></div>
      <section className="relative mb-10 pt-10 pb-10 text-base-white max-w-screen-xl xl:mx-auto">
        {/* Heading */}
        <div className="text-center" id="faq-section-heading">
          <p className="text-success-landing text-2xl font-semibold">FAQs</p>
          <h2 className="font-degular font-semibold text-heading4 md:text-heading3 lg:text-heading2 xl:text-heading1 leading-snug">
            Still not Convinced?
          </h2>
          <p className="font-gothic text-base-white mt-1 text-[32px]">
            We&apos;ve got the answers
          </p>
        </div>

        {/* Accordion */}
        <div className="pt-9 px-4">
          <Accordion
            type="single"
            collapsible
            className="w-full space-y-4"
            aria-label="Frequently Asked Questions"
          >            {displayedFaqs.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b-0">
                <AccordionTrigger
                  className="font-gothic px-4 bg-[#BE0752] font-semibold rounded-tl-xl rounded-tr-xl border-b-0 text-base"
                  aria-controls={`content-${index}`}
                  aria-expanded={false}
                >
                  {item.question}
                </AccordionTrigger>
                <AccordionContent
                  id={`content-${index}`}
                  className="px-4 py-4 text-base font-medium"
                >
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Toggle Button */}
        <Button
          variant={"landing"}
          size="sm"
          onClick={toggleShowAll}
          className="gap-x-2 text-base-black absolute -bottom-4 left-1/2 -translate-x-1/2 px-8 z-20 font-bold"
          aria-expanded={showAll}
        >
          <span>{showAll ? "Show Less" : "More"}</span>
          {showAll ? <CaretUp /> : <CaretDown />}
        </Button>
      </section>
    </section>
  );
}

export default FaqSection;
