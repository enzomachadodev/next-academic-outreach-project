import { PlusCircle } from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const CompanySuggestions = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sugestões de Empresas</CardTitle>
      </CardHeader>
      <CardContent>
        <ul>
          <li className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-medium">Google Fonts</h4>
                <span className="text-xs text-muted-foreground">
                  759 Apoiadores
                </span>
              </div>
            </div>
            <button className="flex flex-col items-center px-0 text-foreground">
              <PlusCircle className="size-5" />
              Visitar
            </button>
          </li>
        </ul>
      </CardContent>
      <CardFooter>
        <Button variant="link" className="px-0" asChild>
          <Link href="/empresas">Ver mais...</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
