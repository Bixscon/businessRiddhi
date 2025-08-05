"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Business, Opportunity } from "@prisma/client";
import OpportunitySheet from "@/components/OpportunitySheet";
import { fundingOpportunitySchema } from "@/schemas";
import { z } from "zod";
import FundingCardActions from "./funding-card-actions";
import { getImageKitUrl } from "../../lib/image-utils";
import DeadlineCountdown from "@/components/DeadlineCountdown";
import ShareOpportunity from "@/components/ShareOpportunity";

// Extended interface to handle both Prisma and zod schema properties
interface ExtendedOpportunity {
  id: string;
  imageUrl: string | null;
  type: string;
  subtype: string | null;
  title: string; 
  websiteUrl: string | null;
  fundingAmount: string | null;
  targetIndustry: string | null;
  targetSector: string | null;
  targetWomenFounder: boolean;
  targetProductStage: string | null;
  targetFundingStage: string | null;
  targetProductStageList: string[] | null;
  targetFundingStageList: string[] | null;
  description: string | null;
  eligibilityCriteria: string | null;
  startDatetime: Date | null;
  endDatetime: Date | null;
  endDate?: Date;  // Add this property explicitly 
  bannerUrl: string | null;  // Corrected type 
  noOfRegistrations: number | null;
  questions: string | null;
  registration: string | null;
  registrationFormLink: string | null;
  businessId: string | null;
  userId: string | null;
  isDraft: boolean;
}

interface FundingCardClientProps {
  fundingOpportunity: ExtendedOpportunity;
  business: Business | null;
  isSaved: boolean;
  userId: string;
}

// Client-side version of the funding card with sheet implementation
export const FundingCardClient = ({
  fundingOpportunity,
  business,
  isSaved,
  userId,
}: FundingCardClientProps) => {
  const date = new Date(
    (fundingOpportunity.endDatetime || fundingOpportunity.endDate || new Date(Date.now())) as Date,
  );

  const formattedDate = `${date.getDate()} ${date.toLocaleString("default", {
    month: "long",
  })}, ${date.getFullYear()}`;

  // Use bannerUrl as the primary image for the card display, fallback to imageUrl or default
  const cardImage = getImageKitUrl(fundingOpportunity.bannerUrl) || getImageKitUrl(fundingOpportunity.imageUrl) || "/img/funding-opportunity-placeholder.png";
  
  // Use imageUrl for the avatar/icon, fallback to businessData image or default
  const avatarImage = getImageKitUrl(business?.image) || getImageKitUrl(fundingOpportunity.imageUrl) || "/img/funding-opportunity-placeholder.png";
  
  // Content part of the card that will be wrapped by the sheet
  const CardContent = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>((props, ref) => (
    <div 
      ref={ref} 
      className="block cursor-pointer" 
      onClick={(e) => e.stopPropagation()}
      {...props}
    >
      <div className="space-y-2 lg:flex gap-6">
        <div className="w-[220px] h-[135px] flex items-center justify-center relative">
          <Image
            src={cardImage}
            alt="Funding Opportunity Banner"
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <div className="space-y-2">
          <div className="flex gap-1">
            <h1 className="text-lg max-w-[300px]">
              {fundingOpportunity.title}
            </h1>
          </div>
          <div className="flex gap-2 items-center">
            <Avatar>
              <AvatarImage src={avatarImage} />
              <AvatarFallback>
                <div>
                  <p>{"B"}</p>
                </div>
              </AvatarFallback>
            </Avatar>
            <p>{business?.name || "Own this opportunity ?"}</p>
          </div>
          
          {/* Deadline Countdown */}
          <DeadlineCountdown 
            endDate={fundingOpportunity.endDatetime || fundingOpportunity.endDate || null} 
            size="sm"
            className="mt-2"
          />
          
          <div className="flex gap-2 items-center">
            <MapPin />
            <p>{business?.location || "No Location Found"}</p>
          </div>
        </div>
      </div>
    </div>
  ));
  
  CardContent.displayName = "CardContent";

  return (
    <div className="flex lg:justify-start flex-col gap-4 lg:flex-row lg:items-center lg:gap-10">
      <div className="w-full">
        <div className="border-2 rounded-xl px-4 py-4 space-y-2 lg:min-w-[700px] hover:shadow-md transition-shadow">
          {/* Wrap the card content with OpportunitySheet, but not the action buttons */}
          {business ? (
            <OpportunitySheet 
              opportunity={fundingOpportunity as unknown as z.infer<typeof fundingOpportunitySchema>} 
              business={business}
            >
              <CardContent />
            </OpportunitySheet>
          ) : (
            <CardContent />
          )}
        </div>
        
        <div className="mt-2 flex items-center justify-between">
          {/* Navigation Link */}
          <Link 
            href={`/opportunity/${fundingOpportunity.id}`} 
            className="text-blue-600 hover:underline"
          >
            View Details
          </Link>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <ShareOpportunity 
              opportunityId={fundingOpportunity.id}
              opportunityTitle={fundingOpportunity.title}
              variant="ghost"
              size="sm"
            />
            <FundingCardActions
              isSaved={isSaved}
              userId={userId}
              opportunityId={fundingOpportunity.id}
              registrationFormLink={fundingOpportunity.registrationFormLink}
            />
          </div>
        </div>
      </div>
    </div>
  );
};