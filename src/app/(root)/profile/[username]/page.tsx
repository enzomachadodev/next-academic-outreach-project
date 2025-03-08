import { notFound } from "next/navigation";

import { PageContainer } from "@/components/page-container";
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
    <PageContainer>
      <UserProfileCard user={user} loggedUserId={session?.user.id} />
      <h1 className="page-title">{`${user.name.split(" ")[0]}'s posts`}</h1>
      <UserPosts userId={user.id} />
    </PageContainer>
  );
};

export default Profile;
