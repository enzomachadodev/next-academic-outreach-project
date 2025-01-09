"use server";

import { Company } from "@prisma/client";

import { db } from "@/db";
import { idSchema } from "@/lib/validation";
import { ActionResponse } from "@/types";

export const getCompanyByUser = async (
  userId: string,
): Promise<ActionResponse<Company | null>> => {
  try {
    const validId = idSchema.parse(userId);

    const company = await db.company.findUnique({
      where: {
        userId: validId,
      },
    });

    return {
      success: true,
      data: company,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "Algo inesperado aconteceu!",
    };
  }
};
