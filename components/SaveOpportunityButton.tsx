"use client";

import { HeartStraight } from "@phosphor-icons/react/dist/ssr";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import removeSavedOpportunity from "@/actions/removeSavedOpportunity";
import saveOpportunity from "@/actions/save-opportunity";
import { toast } from "sonner";

interface SaveOpportunityButtonProps {
  isSaved: boolean;
  userId: string;
  opportunityId: string;
}

const SaveOpportunityButton = ({ isSaved, userId, opportunityId }: SaveOpportunityButtonProps) => {
  const [isLiked, setIsLiked] = useState(isSaved);
  const [loading, startTransition] = useTransition();

  const handleChangeLike = () => {
    // Toggle immediately (optimistic UI)
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);

    startTransition(async () => {
      try {
        let res;
        if (newLikedState) {
          res = await saveOpportunity(opportunityId, userId);
        } else {
          res = await removeSavedOpportunity(opportunityId, userId);
        }

        if (res?.error) {
          // Revert state on error
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
    <Button
      variant="ghost"
      size="icon"
      onClick={handleChangeLike}
      disabled={loading} // optional: remove if you want always clickable
    >
      {isLiked ? (
        <HeartStraight weight="fill" className="w-6 h-6" />
      ) : (
        <HeartStraight weight="regular" className="w-6 h-6" />
      )}
    </Button>
  );
};

export default SaveOpportunityButton;
