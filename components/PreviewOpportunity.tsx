'use client';

import React from 'react';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import Image from 'next/image';
import InteractiveButton from '@/components/InteractiveButton';
import { getImageKitUrl } from '@/lib/image-utils';
import DeadlineCountdown from '@/components/DeadlineCountdown';
import ShareOpportunity from '@/components/ShareOpportunity';

// Extend the inferred type to include the bannerUrl property
type OpportunityWithBanner = z.infer<typeof fundingOpportunitySchema> & {
  id?: string; // Made optional to support form previews
  bannerUrl?: string | null;
};

const PreviewOpportunity = ({
  opportunity,
  business,
}: {
  opportunity: OpportunityWithBanner;
  business: Business;
}) => {
  const date = new Date(opportunity.endDate);
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  const handleExternalLink = (url: string) => {
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section className="max-w-screen-md mx-auto rounded-lg overflow-hidden">
      <div className="h-44 bg-neutral-400 relative overflow-hidden">
        {opportunity.bannerUrl ? (
          <Image
            src={getImageKitUrl(opportunity.bannerUrl)}
            alt="Opportunity Banner"
            fill
            className="object-cover"
            priority
          />
        ) : opportunity.imageUrl ? (
          <Image
            src={getImageKitUrl(opportunity.imageUrl)}
            alt="Opportunity Banner"
            fill
            className="object-cover"
            priority
          />
        ) : (
          <Image
            src="/img/funding-opportunity-placeholder.png"
            alt="Default Opportunity Banner"
            fill
            className="object-cover"
            priority
          />
        )}
      </div>
      <div className="p-4 space-y-2">
        <div className="flex gap-x-6 justify-between items-start">
          <h2 className="font-semibold text-xl md:text-2xl">
            {opportunity.title}
          </h2>
          {/* Promoted tag commented out for now */}
          {/* <p className="text-sm px-4 py-0.5 bg-secondary-200 rounded-full">
            Promoted
          </p> */}
        </div>
        <div className="flex gap-x-2 items-center">
          <Avatar className="w-8 h-8 rounded-full overflow-hidden">
            <AvatarImage src={getImageKitUrl(business?.image)} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p className="text-sm">{business?.name}</p>
        </div>
        <div className="py-4 space-y-3">
          {/* Deadline Countdown with full date */}
          <DeadlineCountdown 
            endDate={opportunity.endDate} 
            showFullDate={true}
            size="md"
          />
          <div className="flex gap-x-1 items-center">
            <MapPin />
            <span>{business?.location}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-x-3">
          {opportunity.targetIndustry && (
            <Button
              variant="outline"
              size="sm"
              className="rounded-full shadow-none"
            >
              {opportunity.targetIndustry}
            </Button>
          )}
          {opportunity.targetSector && (
            <Button
              variant="outline"
              size="sm"
              className="rounded-full shadow-none"
            >
              {opportunity.targetSector}
            </Button>
          )}
          {opportunity.targetProductStageList && opportunity.targetProductStageList.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              className="rounded-full shadow-none"
            >
              {opportunity.targetProductStageList[0]}
            </Button>
          )}
        </div>
        <Separator />
        <div className="py-3 sm:flex justify-between items-center">
          <div className="flex items-center justify-between  sm:justify-normal sm:gap-x-4">
            <ContactOverlay
              email={business?.email || ''}
              contactNumber={business?.contactNumber || ''}
              websiteUrl={business?.websiteUrl || ''}
            />

            <Button variant="ghost" size="icon">
              <HeartStraight size={24} />
            </Button>

            {opportunity.id ? (
              <ShareOpportunity 
                opportunityId={opportunity.id} 
                opportunityTitle={opportunity.title}
              />
            ) : (
              <Button variant="ghost" size="icon">
                <ShareFat size={24} />
              </Button>
            )}
          </div>
          <div className="flex justify-center pt-2 sm:pt-0">
            {opportunity.registrationFormLink ? (
              <Button onClick={() => handleExternalLink(opportunity.registrationFormLink || '')}>
                Apply
              </Button>
            ) : opportunity.registration === 'visey' ? (
              <Button>Apply on Visey</Button>
            ) : (
              <Button disabled>Apply</Button>
            )}
          </div>
        </div>
        <Separator />

        <div className="sm:flex sm:space-y-0 space-y-4 gap-12 py-3 ">
          <div className="flex items-center gap-x-4">
            <div className="inline-block p-2 rounded-full border">
              <ClockCountdown size={24} />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold">Time until Deadline</span>
              <DeadlineCountdown 
                endDate={opportunity.endDate} 
                size="sm"
                className="mt-1"
              />
            </div>
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
            <p>{opportunity.description}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Opportunity type</h2>
            <p>{opportunity.type}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Opportunity Sub-type</h2>
            <p>{opportunity.subtype}</p>
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
          <p>{opportunity.eligibilityCriteria}</p>

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
            {opportunity.targetIndustry ? (
              <ul className="list-disc list-inside">
                <li>{opportunity.targetIndustry}</li>
              </ul>
            ) : (
              <p>No specific industry preference specified</p>
            )}
          </div>
          <div>
            <h2 className="font-semibold text-lg">Preferred Sectors</h2>
            {opportunity.targetSector ? (
              <ul className="list-disc list-inside">
                <li>{opportunity.targetSector}</li>
              </ul>
            ) : (
              <p>No specific sector preference specified</p>
            )}
          </div>
        </div>
        <Separator />

        <div className="py-3 space-y-2">
          <h1 className="text-xl md:text-2xl font-semibold">Website</h1>
          {business?.websiteUrl ? (
            <InteractiveButton url={business.websiteUrl}>
              {business.websiteUrl}
            </InteractiveButton>
          ) : (
            <p>No website available</p>
          )}
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
          </div>
        </div>

        <Separator />

        <div className="py-6 flex justify-center">
          {opportunity.registrationFormLink ? (
            <Button onClick={() => handleExternalLink(opportunity.registrationFormLink || '')}>
              Apply
            </Button>
          ) : opportunity.registration === 'visey' ? (
            <Button>Apply on Visey</Button>
          ) : (
            <Button disabled>Apply</Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default PreviewOpportunity;
