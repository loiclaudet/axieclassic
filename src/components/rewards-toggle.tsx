import Image from "next/image";
import { Button } from "~/components/ui/button";
import { RewardsToggleClient } from "./rewards-toggle-client";

export function RewardsToggle() {
  return (
    <>
      <RewardsToggleClient
        fallback={
          <Button variant="default" size="sm" className="text-xs md:text-sm">
            <span>show</span>
            <Image src="/axs.png" alt="AXS" width={16} height={16} />
          </Button>
        }
      />
    </>
  );
}
