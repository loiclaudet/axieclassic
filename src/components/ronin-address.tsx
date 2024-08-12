import Image from "next/image";
import { getName } from "@roninbuilders/rns";
import { shortenHash } from "~/lib/utils";
import { CopyButton } from "~/components/copy";
import type { ClientID } from "~/lib/definitions";

type RoninAddressProps = {
  address: ClientID;
  size?: number;
};

export const RoninAddress = async ({
  address,
  size = 14,
}: RoninAddressProps) => {
  const rnsName = (await getName(address)) as string | undefined;

  return (
    <div
      className="flex items-center gap-1"
      style={{
        fontSize: `${size}px`,
      }}
    >
      <Image
        src={`/ronin.svg`}
        width={size - 2}
        height={size - 2}
        alt="ronin"
      />
      <span
        style={{
          fontSize: `${size}px`,
        }}
      >
        {rnsName ?? shortenHash(address)}
      </span>
      <CopyButton text={rnsName ?? address} size={size} />
    </div>
  );
};
