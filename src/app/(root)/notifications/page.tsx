import { Metadata } from "next";

import { PageContainer } from "@/components/page-container";
import { Notifications } from "@/features/notifications/components/notifications";

export const metadata: Metadata = {
  title: "Notifications",
};

const NotificationsPage = () => {
  return (
    <PageContainer>
      <h1 className="page-title">Notifications</h1>
      <Notifications />
    </PageContainer>
  );
};

export default NotificationsPage;
