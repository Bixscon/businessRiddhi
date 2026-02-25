import { Suspense } from "react";

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<div className="p-4">Loading search...</div>}>
      {children}
    </Suspense>
  );
}
