"use client";
import { useState } from "react";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { LuMenu as MenuIcon } from "react-icons/lu";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Navigation } from "~/components/navigation";
import { ContactAndSupport } from "~/components/contact-and-support";

export const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <MenuIcon role="button" className="h-6 w-6 text-neutral-icon-dark" />
      </DialogTrigger>
      <DialogContent
        className="inset-0 transform-none text-2xl transition-none data-[state=closed]:slide-out-to-right-1/2 data-[state=open]:slide-in-from-right-1/2 md:hidden"
        closeIconClassName="opacity-100 cursor-pointer font-semibold text-neutral-icon-dark focus:outline-none ring:0"
        closeIconSize={30}
      >
        <VisuallyHidden.Root>
          <DialogTitle />
        </VisuallyHidden.Root>
        <Navigation
          buttonSize="xl"
          centered
          onNavigate={() => setIsOpen((s) => !s)}
        />
        <ContactAndSupport />
      </DialogContent>
    </Dialog>
  );
};
