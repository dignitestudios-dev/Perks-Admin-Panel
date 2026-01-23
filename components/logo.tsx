import Image from "next/image";
import * as React from "react";

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export function Logo({ size = 24, className }: LogoProps) {
  return (
    <Image
      src="/images/white-logo.png"
      alt="Perks Logo"
      width={size}
      height={size}
      className={className}
    />
  );
}
