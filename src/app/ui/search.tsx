"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { getAddr } from "@roninbuilders/rns";
import { isValidRNS, isValidRoninAddress } from "~/app/utils";

export const Search = () => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

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
      setInputValue(value);
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
      className="relative flex w-[600px] max-w-full items-center justify-between rounded-xl border border-gray-600 bg-gray-800"
    >
      <input
        ref={inputRef}
        value={inputValue}
        onChange={handleChange}
        type="text"
        placeholder="Search player battles from RNS or ronin address"
        className="w-full bg-transparent pl-4 text-sm text-[#EDEDED] placeholder:font-light placeholder:italic focus:outline-none"
      />
      <button
        className="rounded-br-xl rounded-tr-xl bg-gray-950 px-4 py-2"
        type="submit"
        disabled={isLoading}
      >
        <Image
          className="duration-400 transition-transform ease-in group-hover:scale-125"
          src={`/magnifying-glass.svg`}
          width={18}
          height={18}
          alt="opponent"
        />
      </button>
      {isLoading && (
        <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs italic text-gray-400">
          resolving RNS...
        </span>
      )}
      {error && (
        <span className="absolute -bottom-4 left-2 text-xs italic text-red-100">
          {error}
        </span>
      )}
    </form>
  );
};
