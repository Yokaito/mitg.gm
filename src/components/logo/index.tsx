"use client";

import { useTheme } from "next-themes";
import Image from "next/image";

export const Logo = () => {
  const theme = useTheme();

  const actualTheme = theme.resolvedTheme === "dark" ? "dark" : "light";

  if (typeof window === "undefined") {
    return (
      <div className="hidden md:flex w-10 h-10 bg-gray-200 dark:bg-gray-800 rounded-full items-center justify-center" />
    );
  }

  return (
    <Image
      className="hidden md:block"
      src={`/logo/logo-${actualTheme}.png`}
      alt="logo"
      width={40}
      height={40}
    />
  );
};
