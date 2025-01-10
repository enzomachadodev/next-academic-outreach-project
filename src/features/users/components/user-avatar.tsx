import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  name: string;
  image: string | null;
  className?: string;
}

export const UserAvatar = ({ image, name, className }: UserAvatarProps) => {
  return (
    <Avatar className={cn("size-10", className)}>
      <AvatarImage src={image || ""} alt={name || ""} />
      <AvatarFallback>{name ? name[0] : ""}</AvatarFallback>
    </Avatar>
  );
};
