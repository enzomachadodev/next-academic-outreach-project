import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="fixed left-0 top-0 w-full">
      <div className="wrapper flex items-center justify-between py-4">
        <Link href="/">
          <Image src="/assets/logo.svg" width={50} height={50} alt="Logo" />
        </Link>
        <div className="flex gap-x-5">
          <Button variant="ghost">Fazer Login</Button>
          <Button>Crie sua Conta</Button>
        </div>
      </div>
    </header>
  );
}
