"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { getErrorMessage } from "@/lib/handle-error";

import { auth } from "../lib/auth";

export const logout = async () => {
  try {
    await auth.api.signOut({
      headers: await headers(),
    });

    return redirect("/");
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
};
