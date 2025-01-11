import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Hero = () => {
  return (
    <section className="flex h-full flex-col gap-y-8 pt-20 lg:pt-40">
      <div className="mx-auto flex max-w-screen-lg flex-col items-center gap-y-6 px-8">
        <h1 className="text-center text-[32px] font-medium leading-[40px] lg:text-[64px] lg:leading-[72px]">
          Start monitoring your website like a pro
        </h1>
        <p className="text-center text-muted-foreground lg:text-[18px] lg:leading-7">
          Get a birds eye view with our customizable dashboard. Stay on top of
          things! Revamp your work process with our game-changing feature. Boost
          productivity and efficiency!
        </p>

        <div className="flex max-w-lg items-center gap-1 rounded-lg border bg-muted p-2 shadow-sm">
          <Input
            name="q"
            placeholder="Insira seu Email..."
            className="no-focus border-none shadow-none"
          />
          <Button size="lg">Registre-se Agora!</Button>
        </div>
      </div>

      <div className="flex h-full w-full justify-center bg-[url('/assets/gradient.svg')] bg-cover">
        <div className="size-full bg-gradient-to-b from-background from-5% to-transparent to-15%"></div>
      </div>
    </section>
  );
};
