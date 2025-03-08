import { TrendsSidebar } from "./trends-sidebar";

interface PageContainerProps {
  children: React.ReactNode;
}
export const PageContainer = ({ children }: PageContainerProps) => {
  return (
    <main className="wrapper grid w-full grid-cols-1 gap-8 pt-8 lg:grid-cols-3">
      <div className="col-span-1 flex w-full flex-col gap-8 lg:col-span-2">
        {children}
      </div>
      <TrendsSidebar />
    </main>
  );
};
