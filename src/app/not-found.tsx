import Link from "next/link";
import { Button } from "~/components/ui/button";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <Image
        src="/olek-fails.png"
        width={200}
        height={200}
        alt="404 - Page not found"
      />
      <h2 className="text-center text-2xl font-semibold">
        404 - Page not found
      </h2>
      <p className="mb-4 text-center text-sm">
        The page you are looking for doesn&apos;t exist.
      </p>
      <Button asChild>
        <Link href="/" prefetch={false}>
          Back Home
        </Link>
      </Button>
    </div>
  );
}
