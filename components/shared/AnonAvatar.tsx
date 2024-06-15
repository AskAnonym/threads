import React from "react";
import Image from "next/image";

function AnonAvatar({ size }: { size: number }) {
  return (
    <Image
      src="/assets/incognito.svg"
      alt="anonym avatar"
      width={size}
      height={size}
      className=" rounded-full bg-primary-500 p-1"
    />
  );
}

export default AnonAvatar;
