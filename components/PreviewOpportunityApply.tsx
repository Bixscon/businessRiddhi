import React from 'react';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import {
  MapPin,
  HeartStraight,
  ShareFat,
  Eye,
  ClockCountdown,
  Info,
} from '@phosphor-icons/react/dist/ssr';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import ContactOverlay from '@/components/ContactDetails';
import * as z from 'zod';
import { fundingOpportunitySchema } from '@/schemas';
import { Business } from '@prisma/client';
import DeadlineCountdown from '@/components/DeadlineCountdown';

// Extended opportunity interface to handle properties that might come from Prisma model
export interface ExtendedOpportunity {
  id?: string;
  type: string;
  subtype: string;
  title: string;
  fundingAmount: string;
  targetWomenFounder: boolean;
  description: string;
  eligibilityCriteria: string;
  registration: string;
  endDate: Date | string | null;
  startDate?: Date;
  targetProductStage?: string;
  targetFundingStage?: string;
  targetProductStageList?: string[];
  targetFundingStageList?: string[];
  targetIndustry?: string;
  targetSector?: string;
  websiteUrl?: string;
  registrationFormLink?: string;
  noOfRegistrationsAllowed?: string;
  // Add these properties explicitly with correct types
  imageUrl: string | null;
  bannerUrl: string | null;
}

interface PreviewOpportunityApplyProps {
  opportunity: ExtendedOpportunity;
  business: Business;
  isInSheet?: boolean;
}

const PreviewOpportunityApply = ({
  opportunity,
  business,
  isInSheet = false,
}: PreviewOpportunityApplyProps) => {
  const date = opportunity.endDate ? new Date(opportunity.endDate) : new Date();
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Use bannerUrl as the primary image for the card display, fallback to imageUrl or default
  const bannerImage =
    opportunity.bannerUrl ||
    opportunity.imageUrl ||
    '/img/funding-opportunity-placeholder.png';

  // Handle Apply button click
  const handleApply = () => {
    if (opportunity.registrationFormLink) {
      window.open(opportunity.registrationFormLink, '_blank');
    }
  };

  return (
    <section className="max-w-screen-md mx-auto rounded-lg overflow-hidden">
      <div className="h-44 bg-neutral-400 relative">
        <Image
          src={bannerImage}
          alt={opportunity.title || 'Funding Opportunity'}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4 space-y-2">
        <div className="flex gap-x-6 justify-between items-start">
          <h2 className="font-semibold text-xl md:text-2xl">
            {opportunity.title}
          </h2>
          <p className="text-sm px-4 py-0.5 bg-secondary-200 rounded-full">
            {/* Promoted */}
          </p>
        </div>
        <div className="flex gap-x-2 items-center">
          <Avatar className="w-8 h-8 rounded-full overflow-hidden">
            <AvatarImage src={business?.image || 'https://picsum.photos/100'} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p className="text-sm">{business?.name}</p>
        </div>
        <div className="py-4 space-y-3">
          <p className="flex gap-x-2">
            <span>Apply By: </span>
            <span>{formattedDate}</span>
          </p>
          <div className="flex gap-x-1 items-center">
            <MapPin />
            <span>{business?.location}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-x-3">
          {opportunity.targetProductStageList?.map((stage) => (
            <Button
              key={stage}
              variant="outline"
              size="sm"
              className="rounded-full shadow-none"
            >
              {stage}
            </Button>
          ))}
        </div>
        <Separator />
        <div className="py-3 sm:flex justify-between items-center">
          <div className="flex items-center justify-between sm:justify-normal sm:gap-x-4">
            <ContactOverlay
              email={business?.email || ''}
              contactNumber={business?.contactNumber || ''}
              websiteUrl={business?.websiteUrl || ''}
            />

            <Button variant="ghost" size="icon">
              <HeartStraight size={24} />
            </Button>

            <Button variant="ghost" size="icon">
              <ShareFat size={24} />
            </Button>
          </div>
          <div className="flex justify-center pt-2 sm:pt-0">
            <Button
              onClick={handleApply}
              disabled={!opportunity.registrationFormLink}
            >
              Apply
            </Button>
          </div>
        </div>

        <div className="sm:flex sm:space-y-0 space-y-4 gap-12 py-3 ">
          <div className="flex items-center gap-x-4">
            <div className="inline-block p-2 rounded-full border">
              <ClockCountdown size={24} />
            </div>
            <span className="flex flex-col ">
              <span className="font-semibold">Time until Deadline</span>
              {opportunity.endDate ? (
                <DeadlineCountdown 
                  endDate={opportunity.endDate} 
                  size="sm"
                  plainText={true}
                />
              ) : (
                <span>No deadline set</span>
              )}
            </span>
          </div>
          <div className="flex items-center gap-x-4">
            <div className="inline-block p-2 rounded-full border">
              <Eye size={24} />
            </div>
            <span className="flex flex-col ">
              <span className="font-semibold">Number of Views</span>
              <span>10,768</span>
            </span>
          </div>
        </div>

        <Separator />

        <div className="space-y-4 py-3">
          <div>
            <h1 className="font-semibold text-xl md:text-2xl">Description</h1>
            <p>{opportunity.description || 'No description available'}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Opportunity type</h2>
            <p>{opportunity.type}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Opportunity Sub-type</h2>
            <p>{opportunity.subtype || 'N/A'}</p>
          </div>
        </div>

        <Separator />

        <div className="space-y-4 py-3">
          <h1 className="text-xl md:text-2xl font-semibold">
            Eligibility Criteria
          </h1>
          {opportunity.targetWomenFounder && (
            <div className="space-y-4 sm:flex sm:space-y-0 justify-between items-start gap-x-10">
              <p className="shrink-0 border border-neutral-200 rounded-full font-semibold bg-neutrals-100 text-neutrals-900 py-2 px-6 ">
                Women Founders Preferred
              </p>
              <div className="flex gap-x-2 items-start">
                <Info className="shrink-0 text-neutrals-700" size={28} />
                <div className="border p-2 rounded-xl">
                  <p className="text-neutrals-700">
                    This opportunity is an excellent one for the women
                    entrepreneurs in India.
                  </p>
                </div>
              </div>
            </div>
          )}
          <p>
            {opportunity.eligibilityCriteria ||
              'No eligibility criteria available'}
          </p>

          <div>
            <h2 className="font-semibold text-lg">Startup Product Stages</h2>
            {opportunity.targetProductStageList?.map((stage) => (
              <p key={stage}>{stage}</p>
            ))}
          </div>
          <div>
            <h2 className="font-semibold text-lg">Startup Funding Stages</h2>
            {opportunity.targetFundingStageList?.map((stage) => (
              <p key={stage}>{stage}</p>
            ))}
          </div>
          <div>
            <h2 className="font-semibold text-lg">Preferred Industries</h2>
            <p>{opportunity.targetIndustry || 'N/A'}</p>
          </div>
          <div>
            <h2 className="font-semibold text-lg">Preferred Sectors</h2>
            <p>{opportunity.targetSector || 'N/A'}</p>
          </div>
        </div>
        <Separator />

        <div className="py-3 space-y-2">
          <h1 className="text-xl md:text-2xl font-semibold">Website</h1>
          <Link
            href={opportunity.websiteUrl || '#'}
            className="block text-linkBlue"
          >
            {opportunity.websiteUrl || 'N/A'}
          </Link>
        </div>

        <Separator />

        <div className="py-3 space-y-4">
          <h1 className="text-xl md:text-2xl font-semibold">Have Queries?</h1>
          <p>Get in Touch with organizers</p>
          <div className="flex gap-x-2">
            <ContactOverlay
              email={business?.email || ''}
              contactNumber={business?.contactNumber || ''}
              websiteUrl={business?.websiteUrl || ''}
            />
            <Button variant={'secondary'}>Message</Button>
          </div>
        </div>

        <Separator />

        <div className="py-6 flex justify-center">
          <Button
            onClick={handleApply}
            disabled={!opportunity.registrationFormLink}
          >
            Apply
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PreviewOpportunityApply;
