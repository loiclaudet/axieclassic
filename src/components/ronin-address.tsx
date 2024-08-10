import Image from "next/image";
import { shortenHash } from "~/lib/utils";
import { CopyButton } from "~/components/copy";
import { ClientID } from "~/lib/definitions";

type RoninAddressProps = {
  address: ClientID;
  size?: number;
};

export const RoninAddress = ({ address, size = 14 }: RoninAddressProps) => (
  <div className="flex items-center gap-1">
    <Image src={`/ronin.svg`} width={size - 2} height={size - 2} alt="ronin" />
    <span
      style={{
        fontSize: `${size}px`,
      }}
    >
      {shortenHash(address)}
    </span>
    <CopyButton text={address} size={size} />
  </div>
);
