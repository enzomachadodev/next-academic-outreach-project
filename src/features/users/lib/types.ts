import { Prisma } from "@prisma/client";

export const userDataSelect = {
  id: true,
  username: true,
  name: true,
  image: true,
} satisfies Prisma.UserSelect;
