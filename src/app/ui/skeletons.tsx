import Image from "next/image";
export function TeamSkeleton() {
  return (
    <div className="flex">
      {new Array(3).fill(null).map((_, i) => (
        <Image
          key={i}
          width={150}
          height={100}
          className="object-contain"
          alt={`Axie placeholder`}
          src={`/placeholder.png`}
        />
      ))}
    </div>
  );
}
