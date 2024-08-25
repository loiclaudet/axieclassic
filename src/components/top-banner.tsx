"use client";
import { useState } from "react";
import { IoMdClose as CloseIcon } from "react-icons/io";
import { cn } from "~/lib/utils";

type TopBannerProps = {
  children: React.ReactNode;
  className?: string;
};

export const TopBanner = ({ children, className }: TopBannerProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const handleCloseBanner = () => {
    setIsOpen((s) => !s);
  };

  if (!isOpen) {
    return null;
  }
  return (
    <div
      className={cn(
        "fixed left-0 right-0 top-0 z-50 flex items-center justify-center",
        className,
      )}
    >
      {children}
      <CloseIcon
        role="button"
        onClick={handleCloseBanner}
        className="absolute right-2 top-1/2 h-4 w-4 shrink-0 -translate-y-1/2 cursor-pointer font-semibold text-neutral-100"
      />
    </div>
  );
};
