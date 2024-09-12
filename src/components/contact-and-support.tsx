"use client";

import { Button } from "~/components/ui/button";
import { useCopyToClipboard } from "~/hook/copy-to-clipboard"; // Assuming you have this hook
import { LUNACIAN_CODE, X_USERNAME } from "~/lib/constant";
import { LuExternalLink as ExternalLinkIcon } from "react-icons/lu";
import { toast } from "sonner";
import Image from "next/image";

export const ContactAndSupport = () => {
  const [, copyToClipboard] = useCopyToClipboard();

  const handleCopyCode = async () => {
    await copyToClipboard(LUNACIAN_CODE);
    toast(
      <div className="flex w-full items-center gap-4">
        <Image src="/love.webp" alt="thanks" width={40} height={40} />
        <p className="text-2xl font-bold text-neutral-separator-dark">
          thank you!
        </p>
      </div>,
      {
        dismissible: true,
        duration: 2500,
      },
    );
  };

  return (
    <div className="md:bubbled flex flex-col items-center gap-6 md:items-start md:gap-2 md:p-3">
      <div className="flex items-center">
        <div className="flex flex-col items-center md:items-start">
          <p className="text-lg text-neutral-icon-dark md:text-sm">
            any request?
          </p>
          <a
            className="group inline-flex items-center gap-1 transition-colors hover:text-neutral-100 hover:underline"
            href={`https://x.com/${X_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="flex text-xl text-neutral-100 md:text-sm">
              contact me on 𝕏
            </p>
            <ExternalLinkIcon className="h-4 w-4 text-neutral-100 transition-all group-hover:scale-125 md:h-3 md:w-3" />
          </a>
        </div>
      </div>
      <div className="flex flex-col items-center md:items-start">
        <p className="text-lg text-neutral-icon-dark md:text-sm">
          want to support me?
        </p>
        <p className="flex items-center text-xl text-neutral-100 md:text-sm">
          use code{" "}
          <Button
            size="sm"
            className="ml-1.5 px-1.5 py-px text-xl md:text-sm"
            onClick={handleCopyCode}
          >
            {LUNACIAN_CODE}
          </Button>
        </p>
      </div>
    </div>
  );
};
