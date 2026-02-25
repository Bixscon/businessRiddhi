import { Suspense } from "react";
import Footer from "@/components/navigation/footer";
import HeroNav from "@/components/navigation/hero-nav";

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <HeroNav className="mx-auto max-w-screen-xl" />
      <Suspense fallback={<div className="p-4">Loading search...</div>}>
        {children}
      </Suspense>
      <Footer className="rounded-xl" />
    </div>
  );
}
