import Link from "next/link";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserAvatar } from "@/features/auth/components/user-avatar";
import { formatRelativeDate } from "@/lib/utils";

import { PostData } from "../lib/types";

interface PostCardProps {
  post: PostData;
}

export const PostCard = ({ post }: PostCardProps) => {
  const { content } = post;

  return (
    <article className="w-full">
      <Card>
        <CardHeader className="flex-row items-center gap-4">
          <Link href={`/profile/${post.user.name}`}>
            <UserAvatar
              name={post.user.name}
              image={post.user.image || ""}
              className="size-12"
            />
          </Link>
          <div className="">
            <Link href={`/users/${post.user.name}`}>
              <CardTitle className="hover:underline">
                {post.user.name}
              </CardTitle>
            </Link>
            <Link
              href={`/posts/${post.id}`}
              className="block text-sm text-muted-foreground hover:underline"
              suppressHydrationWarning
            >
              {formatRelativeDate(post.createdAt)}
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <article>{content}</article>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </article>
  );
};
