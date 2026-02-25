"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { BusinessCard } from "@/components/cards/business-card";
import dynamic from 'next/dynamic';

// Import FundingCard dynamically to avoid server component issues
const DynamicFundingCard = dynamic(() => 
  import('@/components/cards/funding-card-client').then(mod => ({ default: mod.FundingCardClient })),
  { ssr: false }
);

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams?.get("query") || "";
  const { data: session } = useSession();
  const router = useRouter();
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [opportunities, setOpportunities] = useState<any[]>([]);
  const [similarOpportunities, setSimilarOpportunities] = useState(false);
  const [similarBusinesses, setSimilarBusinesses] = useState(false);
  const [activeTab, setActiveTab] = useState("businesses");
  const [isLoadingBusinesses, setIsLoadingBusinesses] = useState(false);
  const [isLoadingOpportunities, setIsLoadingOpportunities] = useState(false);
    if (!query) return;
  // Fetch businesses when query changes or on initial load
  useEffect(() => {
    if (!query || !session?.user?.id) return;
    
    const fetchBusinesses = async () => {
      setIsLoadingBusinesses(true);
        setBusinesses(data.businesses || []);
        setSimilarBusinesses(data.similar || false);
        const res = await fetch(`/api/search-businesses?query=${query}`);
        const data = await res.json();
        setBusinesses(data);
      } catch (error) {
        console.error("Error fetching businesses:", error);
      } finally {
        setIsLoadingBusinesses(false);
      }
    };
    
    fetchBusinesses();
  }, [query, session?.user?.id]);
    if (!query || activeTab !== "funding") return;
  // Fetch opportunities when switching to funding tab or query changes
  useEffect(() => {
    if (!query || activeTab !== "funding") return;
    const fetchOpportunities = async () => {
      setIsLoadingOpportunities(true);
      try {
        const res = await fetch(`/api/search-opportunities?query=${query}`);
        const data = await res.json();
        setOpportunities(data.opportunities || []);
        setSimilarOpportunities(data.similar || false);
      } catch (error) {
        console.error("Error fetching opportunities:", error);
      } finally {
        setIsLoadingOpportunities(false);
      }
    };
    fetchOpportunities();
  }, [query, activeTab]);
  
  // Handle tab switching
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="p-4 md:p-6">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex flex-col gap-5 sm:flex-row justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">
            Search Results for &#34;{query}&#34;
          </h1>
          <div className="flex space-x-4">
            <Button
              variant={activeTab === "businesses" ? "default" : "outline"}
              onClick={() => handleTabChange("businesses")}
            >
              Businesses
            </Button>
            <Button
              variant={activeTab === "funding" ? "default" : "outline"}
              onClick={() => handleTabChange("funding")}
            >
              Funding Opportunities
            </Button>
          </div>
        </div>

        {activeTab === "businesses" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {isLoadingBusinesses ? (
              // Loading skeleton for businesses
              Array(6)
                .fill(null)
                .map((_, index) => (
                  <div
                    key={index}
                    className="animate-pulse bg-gray-200 rounded-md h-64"
                  ></div>
                ))
            ) : businesses.length > 0 ? (
              businesses.map((business) => (
                <BusinessCard key={business.id} business={business} />
              ))
            ) : (
              <p className="col-span-full text-center py-8">
                No matching businesses found for &#34;{query}&#34;
              </p>
            )}
          </div>
        )}

        {activeTab === "funding" && (
          <div className="flex flex-col gap-4">
            {isLoadingOpportunities ? (
              // Loading skeleton for opportunities
              Array(3)
                .fill(null)
                .map((_, index) => (
                  <div
                    key={index}
                    className="animate-pulse bg-gray-200 rounded-md h-32"
                  ></div>
                ))
            ) : opportunities.length > 0 ? (
              <>
                {similarOpportunities && (
                  <p className="text-center py-4 text-yellow-700 font-semibold">
                    I found these similar to your query:
                  </p>
                )}
                {opportunities.map((opportunity) => (
                  <DynamicFundingCard 
                    key={opportunity.id} 
                    fundingOpportunity={opportunity} 
                    business={opportunity.business || null}
                    isSaved={false}
                    userId={session?.user?.id || ''}
                  />
                ))}
              </>
            ) : (
              <p className="text-center py-8">
                No matching funding opportunities found for &#34;{query}&#34;
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
