"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

export const Search = () => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = useCallback<React.FormEventHandler<HTMLFormElement>>(
    (e) => {
      e.preventDefault();

      if (isValidRoninAddress(inputValue)) {
        router.push(`/profile/${inputValue}`);
      } else {
        setError("Invalid Ronin address");
      }
    },
    [inputValue, router],
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
        placeholder="Snap search player battles from ronin address"
        className="w-full bg-transparent pl-4 text-[#EDEDED] placeholder:font-light  placeholder:italic focus:outline-none"
      />
      <button
        className="rounded-br-xl rounded-tr-xl bg-gray-950 px-4 py-2"
        type="submit"
      >
        <Image
          className="duration-400 transition-transform ease-in group-hover:scale-125"
          src={`/magnifying-glass.svg`}
          width={18}
          height={18}
          alt="opponent"
        />
      </button>
      <span className="absolute -bottom-4 left-2 text-xs italic text-red-100">
        {error}
      </span>
    </form>
  );
};

const isValidRoninAddress = (roninAddress: string) =>
  /^0x[a-fA-F0-9]{40}$/.test(roninAddress);
