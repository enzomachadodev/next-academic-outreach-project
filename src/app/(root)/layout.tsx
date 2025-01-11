import { Header } from "@/components/layout/header";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex min-h-screen flex-col bg-muted">
      <Header />
      <div className="wrapper min-h-screen pt-8">{children}</div>
    </div>
  );
};

export default Layout;
