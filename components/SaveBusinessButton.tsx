"use client";

import { HeartStraight } from "@phosphor-icons/react/dist/ssr";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import saveBusiness from "@/actions/save-business";
import removeSavedBusiness from "@/actions/remove-saved-business";

interface SaveOpportunityButtonProps {
  isSaved: boolean;
  userId: string;
  businessId: string;
}

const SaveOpportunityButton = ({ isSaved, userId, businessId }: SaveOpportunityButtonProps) => {
  const [isLiked, setIsLiked] = useState(isSaved);
  const [loading, startTransition] = useTransition();

  const handleChangeLike = () => {
    // Optimistic UI update: toggle immediately
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);

    // Start async operation
    startTransition(async () => {
      try {
        let res;
        if (newLikedState) {
          res = await saveBusiness(businessId, userId);
        } else {
          res = await removeSavedBusiness(businessId, userId);
        }

        if (res?.error) {
          // Revert if error
          setIsLiked(!newLikedState);
          toast.error(res.error);
        }

        if (res?.success) {
          toast.success(res.success);
        }
      } catch (err) {
        setIsLiked(!newLikedState);
        toast.error("Something went wrong.");
      }
    });
  };

  return (
    <div className="px-4">
      <Button
        variant="ghost"
        size="icon"
        onClick={handleChangeLike}
        disabled={loading} // optional, can be removed if you want clicks always enabled
      >
        {isLiked ? (
          <HeartStraight weight="fill" className="w-6 h-6" />
        ) : (
          <HeartStraight weight="regular" className="w-6 h-6" />
        )}
      </Button>
    </div>
  );
};

export default SaveOpportunityButton;
