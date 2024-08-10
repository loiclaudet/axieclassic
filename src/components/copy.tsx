"use client";

import { useCopyToClipboard } from "~/hook/copy-to-clipboard";
import { LuCopy as CopyIcon } from "react-icons/lu";
import { LuCopyCheck as CopyCheckIcon } from "react-icons/lu";
import { cn } from "~/lib/utils";

type CopyButtonProps = {
  text: string;
  size?: number;
};

export const CopyButton = ({ text, size = 14 }: CopyButtonProps) => {
  const [copiedText, copy] = useCopyToClipboard();

  const handleCopy = (text: string) => () => {
    copy(text)
      .then(() => {
        console.log("Copied!", { text });
      })
      .catch((error) => {
        console.error("Failed to copy!", error);
      });
  };

  return (
    <>
      <CopyIcon
        className={cn("text-neutral-400", copiedText === text && "hidden")}
        onClick={handleCopy(text)}
        role="button"
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
      />
      <CopyCheckIcon
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
        className={cn(
          "hidden text-neutral-100",
          copiedText === text && "block",
        )}
      />
    </>
  );
};
