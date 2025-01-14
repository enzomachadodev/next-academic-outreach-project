import { HandCoins, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { UserData } from "../lib/types";
import { EditProfileButton } from "./edit-profile-button";
import { UserAvatar } from "./user-avatar";

interface UserProfileProps {
  user: UserData;
  loggedUserId?: string;
}

export const UserProfile = ({ user, loggedUserId }: UserProfileProps) => {
  return (
    <>
      <Card className="relative flex w-full flex-col overflow-hidden border-b px-0 shadow-sm">
        {user.id === loggedUserId && <EditProfileButton user={user} />}
        <div className="h-28 w-full bg-primary md:h-40" />
        <div className="w-full bg-card">
          <div className="relative flex flex-col gap-y-4 p-6 sm:pt-12 md:p-8 md:pt-20">
            <div className="absolute top-0 size-fit -translate-y-2/3 rounded-full bg-background p-1">
              <UserAvatar
                image={user.image}
                name={user.name}
                className="size-28 md:size-40"
              />
            </div>
            <div className="space-y-1">
              <h3 className="text-3xl font-semibold">{user.name}</h3>
              <p className="max-w-lg">
                Desenvolvedor Full Stack | TypeScript | React | Node.js | React
                Native | Python | Django
              </p>
              <p className="text-sm text-muted-foreground">
                Viçosa, Minas Gerais, Brasil
              </p>
            </div>
            <div className="flex items-center gap-4">
              <p>
                Conexões: <b>{0}</b>
              </p>
              <p>
                Publicações: <b>{user._count.posts}</b>
              </p>
            </div>

            <div className="flex w-full flex-col gap-4 md:flex-row md:items-center">
              {user.id !== loggedUserId && (
                <Button>
                  Conectar
                  <Plus />
                </Button>
              )}
              <Button variant="outline">
                Apoiar Empreendedor <HandCoins />
              </Button>
              <Button variant="link" className="h-fit px-0 py-0">
                Informações de Contato
              </Button>
            </div>
          </div>
        </div>
      </Card>
      {user.bio && (
        <Card>
          <CardHeader>
            <CardTitle>Sobre Mim</CardTitle>
          </CardHeader>
          <CardContent className="overflow-hidden whitespace-pre-line break-words">
            {user.bio}
          </CardContent>
        </Card>
      )}
    </>
  );
};
