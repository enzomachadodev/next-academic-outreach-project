import Image from "next/image";
import Link from "next/link";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Home = () => {
  return (
    <>
      <header className="sticky left-0 top-0 z-10 w-full border-b border-muted bg-background py-4">
        <div className="wrapper flex items-center justify-between">
          <div className="inline-flex items-center gap-4">
            <Logo />
          </div>
          <div className="inline-flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/login">Sign in</Link>
            </Button>
            <Button>
              <Link href="/register">Sign up</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="relative flex h-full flex-col justify-between gap-y-8 pt-20 lg:pt-40">
        <div className="relative z-10 mx-auto flex max-w-screen-lg flex-col items-center gap-y-6 px-8">
          <h1 className="text-center text-[32px] font-medium leading-[40px] lg:text-[64px] lg:leading-[72px]">
            Start monitoring your website like a pro
          </h1>
          <p className="text-center text-muted-foreground lg:text-[18px] lg:leading-7">
            Get a birds eye view with our customizable dashboard. Stay on top of
            things! Revamp your work process with our game-changing feature.
            Boost productivity and efficiency!
          </p>

          <div className="flex max-w-lg items-center gap-1 rounded-full border bg-muted p-2 shadow-sm">
            <Input
              name="q"
              placeholder="Enter your Email..."
              className="no-focus border-none shadow-none"
            />
            <Button>Connect Today!</Button>
          </div>
        </div>
        <div className="absolute bottom-0 z-0 h-full max-h-[50%] w-full overflow-hidden">
          <div className="absolute top-0 z-10 h-[30%] w-full bg-gradient-to-b from-background to-transparent"></div>
          <Image
            alt="Gradient Hero"
            src="/assets/gradient.svg"
            fill
            className="object-cover"
          />
        </div>
      </main>
    </>
  );
};
export default Home;
