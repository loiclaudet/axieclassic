"use client";

import { useCopyToClipboard } from "~/hook/copy-to-clipboard";
import { LuCopy as CopyIcon } from "react-icons/lu";
import { LuCopyCheck as CopyCheckIcon } from "react-icons/lu";
import { cn } from "~/lib/utils";

type CopyButtonProps = {
  text: string;
};

export const CopyButton = ({ text }: CopyButtonProps) => {
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
      />
      <CopyCheckIcon
        className={cn(
          "hidden text-neutral-400",
          copiedText === text && "block",
        )}
      />
    </>
  );
};
