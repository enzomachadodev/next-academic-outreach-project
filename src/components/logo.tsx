import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

interface LogoProps {
  iconStyle?: string;
  textStyle?: string;
}

export const Logo = ({ iconStyle, textStyle }: LogoProps) => {
  return (
    <Link href="/" className="h-10">
      <div className="inline-flex items-center gap-3">
        <div className={cn("relative size-10", iconStyle)}>
          <Image src="/assets/logo.svg" alt="Entre Connect's Logo" fill />
        </div>
        <h1 className={cn("hidden text-3xl font-bold md:block", textStyle)}>
          LOGO
        </h1>
      </div>
    </Link>
  );
};
