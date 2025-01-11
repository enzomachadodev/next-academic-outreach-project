import { EyeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

interface EntrepreneursCardProps {
  id: string;
  createdAt: string;
  name: string;
  views: number;
  bussinessName: string;
  bussinessDescription: string;
  image: string;
}

export const EntrepreneursCard = ({
  id,
  name,
  bussinessName,
  bussinessDescription,
  image,
  views,
}: EntrepreneursCardProps) => {
  return (
    <li className="startup-card group">
      <div className="flex-between">
        {/* <p className="startup_card_date">{formatDate(createdAt)}</p> */}
        <div className="flex gap-1.5">
          <EyeIcon className="size-6 text-primary" />
          <span className="text-16-medium">{views}</span>
        </div>
      </div>

      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">
          <Link href={`/user/${id}`}>
            <p className="text-16-medium line-clamp-1">{name}</p>
          </Link>
          <Link href={`/startup/${id}`}>
            <h3 className="text-26-semibold line-clamp-1">{bussinessName}</h3>
          </Link>
        </div>
        <Link href={`/user/${id}`}>
          <Image
            src={image}
            alt={name}
            width={48}
            height={48}
            className="rounded-full"
          />
        </Link>
      </div>

      <Link href={`/startup/${id}`}>
        <p className="startup-card_desc">Description</p>

        <Image src={image} alt="placeholder" className="startup-card_img" />
      </Link>

      <div className="flex-between mt-5 gap-3">
        <Link href={`/?query=${"categoria"}`}>
          <p className="text-16-medium">Categoria</p>
        </Link>
        <Button className="startup-card_btn" asChild>
          <Link href={`/startup/${id}`}>{bussinessDescription}</Link>
        </Button>
      </div>
    </li>
  );
};
