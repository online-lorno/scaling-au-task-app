"use server";

import { RegisterParams } from "@/lib/types";

export async function registerAction(params: RegisterParams) {
  try {
    const result = await fetch("http://localhost:3001/auth/register", {
      method: "POST",
      body: JSON.stringify(params),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!result.ok) {
      throw new Error();
    }

    return { success: true };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "There was a problem registering the account",
    };
  }
}
