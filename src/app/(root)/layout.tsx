import { Header } from "@/components/layout/header";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Header />
      <div className="wrapper flex flex-grow pt-8">{children}</div>
    </>
  );
};

export default Layout;
