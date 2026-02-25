"use client";

import React, { useEffect, useState } from "react";
import BusinessProfilePublic from "@/components/profile/BusinessProfilePublic";
import Modal from "@/components/ui/modal";

interface BusinessPageClientProps {
  business: any;
}

export default function BusinessPageClient({ business }: BusinessPageClientProps) {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    try {
      const viewedProfiles = parseInt(localStorage.getItem("viewedProfiles") || "0", 10);
      if (viewedProfiles >= 5) {
        setShowModal(true);
      } else {
        localStorage.setItem("viewedProfiles", (viewedProfiles + 1).toString());
      }
    } catch (e) {
      // ignore storage errors
    }
  }, []);

  const userBusinessProps = {
    business: business,
    services: business.services,
    opportunities: business.opportunities,
    gallery: business.gallery,
    achievements: business.achievements,
  };

  return (
    <div>
      <div className="mt-10 max-w-[1200px] mx-auto mb-20">
        <BusinessProfilePublic user={userBusinessProps} />
      </div>
      {showModal && (
        <Modal
          title="Sign Up or Log In"
          onClose={() => setShowModal(false)}
          onConfirm={() => {
            window.location.href = "/login";
          }}
        >
          <p>You have viewed 5 profiles. Please log in to continue exploring more profiles.</p>
        </Modal>
      )}
    </div>
  );
}
