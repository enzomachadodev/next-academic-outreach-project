import { Metadata } from "next";
import Image from "next/image";

import { Logo } from "@/components/logo";
import { RegisterForm } from "@/features/auth/components/register-form";

export const metadata: Metadata = {
  title: "Register",
};

const RegisterPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ email: string | undefined }>;
}) => {
  const { email } = await searchParams;
  return (
    <main className="grid min-h-svh lg:grid-cols-2">
      <div className="relative hidden bg-muted lg:block">
        <Image
          src="/register.jpg"
          alt="Register Background Image"
          fill
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Logo />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <RegisterForm leadEmail={email} />
        </div>
      </div>
    </main>
  );
};

export default RegisterPage;
