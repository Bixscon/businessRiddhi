"use client";

import React from "react";
import { Button } from "@/components/ui/button"; // Import your updated Button

interface InteractiveButtonProps {
  url: string;
  children: React.ReactNode;
  variant?: React.ComponentProps<typeof Button>["variant"];
  size?: React.ComponentProps<typeof Button>["size"];
}

export default function InteractiveButton({
  url,
  children,
  variant = "default",
  size = "lg",
}: InteractiveButtonProps) {
  const handleExternalLink = React.useCallback(() => {
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  }, [url]);

  return (
    <Button onClick={handleExternalLink} variant={variant} size={size}>
      {children}
    </Button>
  );
}
