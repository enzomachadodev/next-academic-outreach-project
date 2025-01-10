import { Prisma } from "@prisma/client";

import { userDataSelect } from "@/features/users/lib/types";

export const postDataInclude = {
  user: {
    select: userDataSelect,
  },
} satisfies Prisma.PostInclude;

export type PostData = Prisma.PostGetPayload<{
  include: typeof postDataInclude;
}>;
