"use server";

import { db } from "@/db";
import { getSession } from "@/features/auth/actions/get-session";
import { getErrorMessage } from "@/lib/handle-error";

import { UpsertCompanySchema, upsertCompanySchema } from "../lib/validation";

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

      if (companyExists.userId !== session.userId) {
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
        userId: session.userId,
      },
    });

    return { success: "Parabens! Sua empresa foi registrada com sucesso!" };
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
};
