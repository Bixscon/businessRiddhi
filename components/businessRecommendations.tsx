"use client";

import { useEffect, useState } from "react";
import { getRecommendations } from "@/actions/get-recommendations";
import { BusinessCard } from "@/components/cards/business-card";
import { Button } from "@/components/ui/button";

const BusinessRecommendations = ({ data }: { data: any }) => {
  const [recommendedBusinesses, setRecommendedBusinesses] = useState<
    any[] | null
  >(null);
  const [error, setError] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchRecommendedBusinesses = async () => {
      setRecommendedBusinesses(null); // Show skeleton immediately
      setError(null);

      try {
        const res = await getRecommendations(data);

        if (res.error) {
          console.error("Recommendations error:", res.error);
          console.error("Error details:", res.details);
          console.error("Input data:", data);
          setError(res.error);
          setRecommendedBusinesses([]); // Avoid null state lingering
          return;
        }

        // Fetch details for each recommended business
        const businessDetails = await Promise.all(
          res.content.map(async (businessId: string) => {
            try {
              const res = await fetch(
                `/api/get-business-details?businessId=${businessId}`,
              );
              const data = await res.json();
              return data.error ? null : data;
            } catch (error) {
              console.error("Failed to fetch business details:", error);
              return null;
            }
          }),
        );

        setRecommendedBusinesses(businessDetails.filter(Boolean));
      } catch (error) {
        console.error("Failed to fetch recommendations:", error);
        setError("An error occurred while fetching recommendations.");
        setRecommendedBusinesses([]); // Ensure UI updates
      }
    };

    fetchRecommendedBusinesses();
  }, [data]);

  return (
    <div>
      <h2>Recommended Businesses</h2>
      <ul className="flex flex-wrap gap-5">
        {recommendedBusinesses === null ? (
          // Skeleton loaders (show immediately)
          Array(4)
            .fill(null)
            .map((_, index) => (
              <li
                key={index}
                className="min-w-[300px] h-[310px] bg-gray-300 rounded-lg animate-pulse"
              ></li>
            ))
        ) : recommendedBusinesses.length > 0 ? (
          (showAll
            ? recommendedBusinesses
            : recommendedBusinesses.slice(0, 4)
          ).map((business, index) => (
            <li key={index} className="min-w-[300px] min-h-[310px]">
              <BusinessCard business={business} />
            </li>
          ))
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <p>No recommendations available.</p>
        )}
      </ul>

      {/* Show "View All" button only if more than 3 recommendations exist */}
      {recommendedBusinesses && recommendedBusinesses.length > 4 && (
        <span className="block text-center mt-4">
          <Button
            variant="link"
            className=""
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Show Less" : "View All"}
          </Button>
        </span>
      )}
    </div>
  );
};

export default BusinessRecommendations;
