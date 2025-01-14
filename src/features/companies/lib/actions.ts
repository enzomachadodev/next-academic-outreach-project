import { Company } from "@prisma/client";

import { getSession } from "@/features/auth/lib/actions";
import { db } from "@/lib/db";
import { getErrorMessage } from "@/lib/handle-error";
import { idSchema } from "@/lib/validation";
import { ActionResponse } from "@/types";

import { UpsertCompanySchema, upsertCompanySchema } from "./validation";

export const upsertCompany = async (input: UpsertCompanySchema) => {
  const session = await getSession();

  if (!session) return { error: "Usuário não autorizado" };

  try {
    const { companyId, ...values } = upsertCompanySchema.parse(input);

    if (companyId) {
      const companyExists = await db.company.findUnique({
        where: {
          id: companyId,
        },
      });

      if (!companyExists) {
        return { error: "Empresa não econtrada" };
      }

      if (companyExists.userId !== session.user.id) {
        return { error: "Usuário não autorizado" };
      }

      await db.company.update({
        where: { id: companyId },
        data: {
          ...values,
        },
      });

      return { success: "Dados atualizados com sucesso!" };
    }
    await db.company.create({
      data: {
        ...values,
        userId: session.user.id,
      },
    });

    return { success: "Parabens! Sua empresa foi registrada com sucesso!" };
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
};

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
