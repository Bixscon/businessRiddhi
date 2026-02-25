import PartnerForm from "@/components/PartnerForm";
import { ChartLineUp, UsersThree, Eye } from '@phosphor-icons/react/dist/ssr';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import React from 'react';
import { Metadata } from 'next';
import { useState } from "react";
export const metadata:Metadata={
  title:"Partner with Visey | Empowering India's Startup Ecosystem",
  description:"Partner with Visey to support India’s innovative startups. Join our network of investors, mentors, and resource providers to create lasting impact and growth."
}
const page = () => {
  const [name, setName] = useState("");
const [designation, setDesignation] = useState("");
const [organization, setOrganization] = useState("");
  return (
    <div className="m-8 mb-24 p-8 border-2 rounded-xl">
      <div>
        <h1 className="font-degular font-semibold text-heading4 md:text-heading3 lg:text-heading2 xl:text-heading1 leading-snug text-[#3f3f3f]">
           Partner With Us
        </h1>
        <p className="font-medium">
        At Visey, we&#39;re passionate about empowering India’s entrepreneurial ecosystem. We believe that collaboration drives success, and by partnering with Visey, you can be part of a dynamic network of investors, mentors, resource providers, and other key stakeholders. Our shared mission is to support innovative startups and create a thriving environment for entrepreneurs across the country.
        </p>
      </div>
      <div className="pt-16">
        <h2 className="font-semibold text-2xl mb-8 text-center">Why Partner with Visey?</h2>
        <div className="max-w-screen-2xl mx-auto flex flex-col gap-6 md:flex-row">
          <div
            className="px-10 pt-10 pb-24 rounded-2xl space-y-6 bg-primary-landing-light text-base-white flex-1"
          >
            <div
              className="p-2 rounded-full inline-flex justify-center items-center bg-success-landing">
              <ChartLineUp size={36} className="text-[#709B08]" />
            </div>
            <div className="space-y-4 ">
              <h3 className="font-degular font-medium text-hero leading-tight">
              Access to a Dynamic Startup Community
              </h3>
              <p className="">
              Join a vibrant community of entrepreneurs, innovative businesses, and startup founders. By collaborating with Visey, you can connect with passionate entrepreneurs, offer your resources, and build long-term relationships with the leaders of tomorrow.
              </p>
            </div>
          </div>
          <div
            className="px-10 pt-10 pb-24 rounded-2xl space-y-6 bg-primary-landing-light text-base-white flex-1"
          >
            <div
              className="p-2 rounded-full inline-flex justify-center items-center bg-success-landing">
              <UsersThree size={36} className="text-[#709B08]" />
            </div>
            <div className="space-y-4 ">
              <h3 className="font-degular font-medium text-hero leading-tight">
              Create a Lasting Impact
              </h3>
              <p className="">
              Our partnership will help break down barriers for startups, accelerating their growth and fostering an ecosystem where creativity and innovation thrive. At Visey, collaboration isn’t just a partnership—it’s a shared commitment to building a resilient and accessible environment for entrepreneurial success.
              </p>
            </div>
          </div>
          <div
            className="px-10 pt-10 pb-24 rounded-2xl space-y-6 bg-primary-landing-light text-base-white flex-1"
          >
            <div
              className="p-2 rounded-full inline-flex justify-center items-center bg-success-landing">
              <Eye size={36} className="text-[#709B08]" />
            </div>
            <div className="space-y-4 ">
              <h3 className="font-degular font-medium text-hero leading-tight">
              Mutual Growth Opportunities
              </h3>
              <p className="">
              As a Visey partner, you’ll have access to a wealth of resources, strategic insights, and alliances. Together, we unlock growth opportunities that benefit both our partners and the startups we support.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-16">
        <h2 className="font-semibold text-2xl text-center">Who Can Partner with Us?</h2>
        <p className="pt-8">We are looking to partner with individuals and organizations that align with our vision for a flourishing startup ecosystem. This includes:</p>
        <ul className="pt-6 list-disc pl-4">
          <li>
            <p>
              <span className="font-semibold">Investors:</span>
              Looking to fund high-impact ventures and drive startup growth.
            </p>
          </li>
          <li>
            <p>
              <span className="font-semibold">Mentors:</span>
              Eager to share their expertise and guide aspiring entrepreneurs
            </p>
          </li>
          <li>
            <p>
              <span className="font-semibold">Incubators & Accelerators:</span>
              Organizations passionate about ecosystem growth and startup success.
            </p>
          </li>
          <li>
            <p>
              <span className="font-semibold">Service Providers:</span>
              Businesses offering tools and resources that contribute to startup growth.
            </p>
          </li>
          <li>
            <p>
              <span className="font-semibold">Entrepreneurial Events:</span>
              Interested in collaborating to create engaging, educational experiences for the startup community.
            </p>
          </li>
        </ul>
        <p className="pt-8">
        Together, we can drive forward the future of innovation in India. Reach out to us at <span className="font-semibold">contact@visey.co.in</span> or call us at<span className="font-semibold">+91 78275 86754</span> to explore how we can create meaningful change together.
        </p>
      </div>
<PartnerForm />
    </div>
  )
};

export default page;
