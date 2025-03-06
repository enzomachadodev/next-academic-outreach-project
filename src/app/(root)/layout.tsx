import { Header } from "@/components/header";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Header />
      <div className="w-full bg-slate-50/50 dark:bg-background">{children}</div>
    </>
  );
};

export default Layout;
