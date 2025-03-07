import { notFound } from "next/navigation";

import { getSession } from "@/features/auth/lib/actions";
import { UserPosts } from "@/features/users/components/user-posts";
import { UserProfile } from "@/features/users/components/user-profile";
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
    <main className="wrapper flex w-full flex-col gap-4 pt-8 md:gap-8">
      <UserProfile user={user} loggedUserId={session?.user.id} />
      <h2 className="text-3xl font-semibold">{`${user.name.split(" ")[0]}'s posts`}</h2>
      <UserPosts userId={user.id} />
    </main>
  );
};

export default Profile;
