"use server";

import { RegisterParams } from "@/lib/types";

export async function registerAction(params: RegisterParams) {
  try {
    const result = await fetch(`${process.env.API_URL}/auth/register`, {
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
