import { Header } from "@/components/layout/header";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex min-h-screen flex-col bg-muted dark:bg-background">
      <Header />
      {children}
    </div>
  );
};

export default Layout;
