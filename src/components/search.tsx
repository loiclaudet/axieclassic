"use client";
import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { getAddr } from "@roninbuilders/rns";
import { isValidRNS, isValidRoninAddress } from "~/lib/utils";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { HiMiniMagnifyingGlass as MagnifyingGlassIcon } from "react-icons/hi2";
import { LuLoader as LoaderIcon } from "react-icons/lu";

export const Search = () => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const resolveRNS = useCallback(async (rnsName: string) => {
    setIsLoading(true);
    setError("");

    try {
      const address = (await getAddr(rnsName)) as Promise<string>;

      setIsLoading(false);
      return address;
    } catch (error) {
      setError("Failed to resolve RNS name");
      setIsLoading(false);
      return "";
    }
  }, []);

  const handleSubmit = useCallback<React.FormEventHandler<HTMLFormElement>>(
    async (e) => {
      e.preventDefault();

      if (isValidRNS(inputValue)) {
        const address = await resolveRNS(inputValue);
        if (isValidRoninAddress(address)) {
          router.push(`/profile/${address}`);
        } else {
          setError("Invalid RNS name or failed to resolve");
        }

        return;
      }

      setError("Invalid input");
    },
    [inputValue, router, resolveRNS],
  );

  const handleChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      const value = e.target.value;
      setInputValue(value.toLocaleLowerCase());
      setError("");

      if (isValidRoninAddress(value)) {
        router.push(`/profile/${value}`);
      }
    },
    [router],
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex max-w-96 flex-1 items-center gap-1.5"
    >
      <Input
        ref={inputRef}
        value={inputValue}
        onChange={handleChange}
        type="text"
        placeholder="Search player battles from RNS or ronin address"
        className="h-[35px] flex-1 rounded-md border-neutral-separator-dark bg-neutral-aside-dark text-xs text-neutral-100 placeholder:font-light placeholder:text-neutral-icon-dark focus-visible:border-neutral-400 focus-visible:shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 md:text-sm"
      />
      <Button
        type="submit"
        size="icon"
        aria-label="search"
        disabled={isLoading}
        className="flex-shrink-0 -translate-y-px rounded-md bg-neutral-aside-dark"
      >
        <MagnifyingGlassIcon className="h-5 w-5" />
      </Button>
      {isLoading && (
        <span className="absolute right-11 top-1/2 -translate-y-1/2 text-xs text-neutral-100">
          <LoaderIcon className="h-4 w-4 animate-spin" />
        </span>
      )}
      {error && (
        <span className="absolute -bottom-4 left-2 text-xs font-medium italic text-salmon-600 md:-bottom-1">
          {error}
        </span>
      )}
    </form>
  );
};
