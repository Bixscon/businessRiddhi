import React from 'react';
import { notFound } from 'next/navigation';
import PreviewOpportunity from '@/components/PreviewOpportunity';
import { getOpportunityDetails } from '@/actions/get-opportunity-details';
import { getBusinessById } from '@/actions/get-business-by-id';
import { fundingOpportunitySchema } from '@/schemas';
import * as z from 'zod';

// Define the OpportunityWithBanner type to match what PreviewOpportunity expects
type OpportunityWithBanner = z.infer<typeof fundingOpportunitySchema> & {
  id: string;
  bannerUrl?: string | null;
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function OpportunityDetails(props: PageProps) {
  const awaitedParams = await props.params;
  const opportunityId = awaitedParams.id;
  
  if (!opportunityId) {
    notFound();
  }
  
  // Fetch opportunity details
  const opportunityData = await getOpportunityDetails(opportunityId);
  
  if (!opportunityData) {
    notFound();
  }
  
  // Fetch business details that posted this opportunity
  const businessResult = opportunityData.businessId 
    ? await getBusinessById(opportunityData.businessId)
    : null;
  
  const business = businessResult?.business || null;
  
  if (!business) {
    notFound();
  }
  
  // Map the opportunity data to match the expected OpportunityWithBanner type
  const opportunity: OpportunityWithBanner = {
    id: opportunityId,
    imageUrl: opportunityData.imageUrl || '',
    type: opportunityData.type || '',
    subtype: opportunityData.subtype || '',
    title: opportunityData.title || '',
    websiteUrl: opportunityData.websiteUrl || '',
    fundingAmount: opportunityData.fundingAmount || '',
    targetIndustry: opportunityData.targetIndustry || '',
    targetSector: opportunityData.targetSector || '',
    targetWomenFounder: opportunityData.targetWomenFounder || false,
    targetProductStage: '',
    targetFundingStage: '',
    targetProductStageList: opportunityData.targetProductStage || [],
    targetFundingStageList: opportunityData.targetFundingStage || [],
    description: opportunityData.description || '',
    eligibilityCriteria: opportunityData.eligibility || '',
    startDate: opportunityData.startDatetime ? new Date(opportunityData.startDatetime) : undefined,
    endDate: opportunityData.endDatetime ? new Date(opportunityData.endDatetime) : new Date(),
    noOfRegistrationsAllowed: opportunityData.noOfRegistrations || '',
    registration: opportunityData.registration || 'visey',
    registrationFormLink: opportunityData.registrationFormLink || '',
    bannerUrl: opportunityData.imageUrl || null,
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <PreviewOpportunity 
        opportunity={opportunity} 
        business={business} 
      />
    </div>
  );
}