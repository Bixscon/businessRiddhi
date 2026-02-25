"use client";

import { MapPin } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import StarRatingConstant from "@/components/StarRatingConstant";
import { useRouter } from "next/navigation";
import { useState, useCallback, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";

interface Business {
  id: string;
  name: string;
  image: string;
  location: string;
  averageRating?: number;
  promoted?: boolean;
  services?: { name: string }[];
}

export function BusinessCard({ business }: { business: Business }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const VIEW_KEY = "anon_business_views";
  const VIEW_THRESHOLD = 6; // after this many opens, require login

  useEffect(() => {
    // clear anonymous count when a user signs in
    try {
      if (session && session.user) {
        localStorage.removeItem(VIEW_KEY);
      }
    } catch (e) {
      // ignore storage errors
    }
  }, [session]);

  const handleCardClick = useCallback(() => {
    if (session && session.user) {
      router.push(`/business/${business.id}`);
      return;
    }

    // Count anonymous views in localStorage
    try {
      const raw = localStorage.getItem(VIEW_KEY) || "0";
      const next = Math.min(Number(raw || 0) + 1, VIEW_THRESHOLD);
      localStorage.setItem(VIEW_KEY, String(next));

      if (next >= VIEW_THRESHOLD) {
        // show modal and prevent navigation
        setShowLoginModal(true);
        return;
      }
    } catch (e) {
      // ignore storage errors and let the user view
    }

    router.push(`/business/${business.id}`);
  }, [business.id, router, session]);

  return (
    <>
    <article 
      className="border rounded-md h-[310px] cursor-pointer hover:border-primary-100 transition-all"
      onClick={handleCardClick}
    >      <div className="relative h-28 m-1 bg-gray-400 rounded-md">
        {/* Promotion feature temporarily disabled
        <p className="absolute text-sm px-2 py-0.5 bg-secondary-200 rounded-full right-3 top-3">
          {business.promoted ? "Promoted" : ""}
        </p>
        */}
      </div>
      <div className="flex flex-col gap-y-2 items-center pb-7">
        <div className="relative -mt-14 h-20 w-20 bg-gray-600 rounded-full border-[3px] border-white mx-auto">
          <Image
            src={business.image}
            alt={business.name}
            layout="fill"
            objectFit="cover"
            className="rounded-full"
          />
        </div>
        <div className="space-y-1.5">
          <h3 className="flex justify-center gap-x-2">
            <span>{business.name}</span>
          </h3>
          <div className="flex justify-center gap-x-3">
            <div className="flex justify-center gap-x-1">
              <StarRatingConstant rating={business.averageRating || 4} />
            </div>
          </div>
          <p className="-translate-x-1.5 flex justify-center items-center gap-x-1">
            <MapPin />
            <span className="text-sm translate-y-0.5">
              {business.location}
            </span>
          </p>

          <div className="flex justify-center pt-3 gap-x-2">
            {business?.services?.map(
              (service: { name: string }, idx: number) => (
                <button
                  key={idx}
                  className="py-0.5 px-2.5 rounded-full border text-sm"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card click when clicking service button
                  }}
                >
                  {service.name}
                </button>
              ),
            )}
          </div>
        </div>
      </div>
    </article>
    {showLoginModal && (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/50" onClick={() => {}} />
        <div className="relative bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
          <h3 className="text-lg font-semibold mb-3">Please sign in to continue</h3>
          <p className="text-sm text-gray-600 mb-5">You have reached the maximum number of free profile views. Create an account or sign in to keep browsing full profiles.</p>
          <div className="flex gap-3 justify-end">
            <button
              className="px-4 py-2 bg-primary-600 text-white rounded"
              onClick={() => signIn()}
            >
              Sign in / Sign up
            </button>
          </div>
        </div>
      </div>
    )}
    </>
  );
}
