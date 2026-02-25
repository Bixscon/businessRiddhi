import BusinessProfilePublic from "@/components/profile/BusinessProfilePublic";
import { getBusinessById } from "@/actions/get-business-by-id";
import { Achievement, Business, Opportunity, Services } from "@prisma/client";
import { auth } from "@/auth";
import { useState, useEffect } from "react";
import Modal from "@/components/ui/modal";

interface FullBusiness extends Business {
  services: Services[];
  achievements: Achievement[];
  opportunities: Opportunity[];
}

async function Page({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;

  const response = await getBusinessById(id);

  const [viewCount, setViewCount] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const viewedProfiles = parseInt(localStorage.getItem("viewedProfiles") || "0", 10);
    if (viewedProfiles >= 5) {
      setShowModal(true);
    } else {
      localStorage.setItem("viewedProfiles", (viewedProfiles + 1).toString());
    }
  }, []);

  if (response?.error) {
    return (
      <div className="mt-10 max-w-[1200px] mx-auto mb-20">
        <div className="text-red-500">Error: {response.error}</div>
      </div>
    );
  }

  if (!response?.success || !response.business) {
    return (
      <div className="mt-10 max-w-[1200px] mx-auto mb-20">
        <div>Business not found</div>
      </div>
    );
  }

  const business = response.business as FullBusiness;

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

export default Page;
