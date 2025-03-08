import { notFound } from "next/navigation";

import { TrendsSidebar } from "@/components/trends-sidebar";
import { getSession } from "@/features/auth/lib/actions";
import { UserPosts } from "@/features/users/components/user-posts";
import { UserProfileCard } from "@/features/users/components/user-profile-card";
import { getUser } from "@/features/users/lib/actions";

interface PageProps {
  params: Promise<{ username: string }>;
}

export const generateMetadata = async ({ params }: PageProps) => {
  const { username } = await params;

  const user = await getUser(username);

  if (!user) return {};

  return {
    title: `${user.name} ${user.company ? "| " + user.company.name : ""}`,
  };
};

const Profile = async ({ params }: PageProps) => {
  const { username } = await params;

  const session = await getSession();

  const user = await getUser(username, session?.user.id);

  if (!user) return notFound();

  return (
    <main className="wrapper grid w-full grid-cols-1 gap-8 pt-8 lg:grid-cols-3">
      <div className="col-span-1 flex w-full flex-col gap-8 lg:col-span-2">
        <UserProfileCard user={user} loggedUserId={session?.user.id} />
        <h1 className="page-title">{`${user.name.split(" ")[0]}'s posts`}</h1>
        <UserPosts userId={user.id} />
      </div>
      <TrendsSidebar />
    </main>
  );
};

export default Profile;
