import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSession } from "@/features/auth/lib/actions";
import { db } from "@/lib/db";

import { getUserDataSelect } from "../lib/types";
import { UserAvatar } from "./user-avatar";

export const UsersToKnow = async () => {
  const session = await getSession();

  if (!session) return null;

  const users = await db.user.findMany({
    where: {
      NOT: {
        id: session.userId,
      },
    },
    select: getUserDataSelect(session.userId),
    take: 5,
  });

  return (
    <Card className="h-fit w-full">
      <CardHeader>
        <CardTitle>Empreendedores para Conhecer</CardTitle>
      </CardHeader>
      <CardContent>
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between gap-4"
          >
            <Link href={`/profile/${user.username}`}>
              <div className="flex items-center gap-4">
                <UserAvatar
                  name={user.name}
                  image={user.image}
                  className="size-12"
                />

                <div>
                  <p className="line-clamp-1 break-all font-semibold hover:underline">
                    {user.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    @{user.username}
                  </p>
                </div>
              </div>
            </Link>

            <Button size="sm" variant="outline" asChild>
              <Link href={`/profile/${user.username}`}>Visitar</Link>
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
