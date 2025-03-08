import { Metadata } from "next";

import { TrendsSidebar } from "@/components/trends-sidebar";
import { Notifications } from "@/features/notifications/components/notifications";

export const metadata: Metadata = {
  title: "Notifications",
};

const NotificationsPage = () => {
  return (
    <main className="wrapper grid w-full grid-cols-1 gap-8 pt-8 lg:grid-cols-3">
      <div className="col-span-1 flex w-full flex-col gap-8 lg:col-span-2">
        <h1 className="page-title">Notifications</h1>
        <Notifications />
      </div>
      <TrendsSidebar />
    </main>
  );
};

export default NotificationsPage;
