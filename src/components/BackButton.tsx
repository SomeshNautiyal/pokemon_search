"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <span
      onClick={() => router.back()}
      className="absolute top-4 left-4 text-[#47d0b7] cursor-pointer flex items-center"
    >
      <span className="mr-2">{"<"}</span>
      <span className="font-bold">Back</span>
    </span>
  );
}
