import Link from "next/link";

import { ActionField } from "@/components/action-field";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

const HomePage = () => {
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

      <main className="relative flex h-full flex-col justify-between pt-20 lg:pt-40">
        <div className="mx-auto flex max-w-screen-lg flex-col items-center gap-y-6 px-8">
          <h2 className="text-center text-3xl font-semibold leading-[40px] lg:text-[64px] lg:leading-[72px]">
            Connect, Grow, Thrive with GrowLink
          </h2>
          <p className="text-center text-muted-foreground lg:text-[18px] lg:leading-7">
            Join a vibrant community of entrepreneurs. Network with peers, reach
            customers, and access resources to boost your business—all in one
            place.
          </p>
          <ActionField />
        </div>
        <div className="relative w-full bg-[url('/assets/gradient.svg')] bg-cover bg-top">
          <div className="absolute left-0 top-0 h-28 w-full bg-gradient-to-b from-background to-transparent" />
          <div className="relative z-10 mx-auto mb-40 mt-16 w-full max-w-screen-xl px-8">
            <div className="relative aspect-video w-full overflow-hidden rounded-3xl border bg-blue-500 shadow-2xl"></div>
          </div>
        </div>
      </main>
    </>
  );
};
export default HomePage;
