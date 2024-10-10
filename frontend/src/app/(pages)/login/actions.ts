"use server";

import { cookies } from "next/headers";
import { LoginParams } from "@/lib/types";
import { COOKIE_TOKEN } from "@/lib/constants";

export async function loginAction(params: LoginParams) {
  try {
    const result = await fetch(`${process.env.API_URL}/auth/login`, {
      method: "POST",
      body: JSON.stringify(params),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!result.ok) {
      throw new Error();
    }

    const data = await result.json();
    const token = data.access_token;

    // Set the access token in a secure HTTP-only cookie
    cookies().set({
      name: COOKIE_TOKEN,
      value: token,
      httpOnly: true,
      maxAge: 60 * 60 * 24, // 1 day expiration
      path: "/",
      // secure: process.env.NODE_ENV === 'production',
      sameSite: "strict",
    });

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Email or password is incorrect" };
  }
}

export async function logoutAction() {
  try {
    cookies().delete(COOKIE_TOKEN);
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "There was an error logging out" };
  }
}

// Get token to use as bearer token in RTK Query
export async function getTokenAction() {
  try {
    const token = cookies().get(COOKIE_TOKEN)?.value || null;
    return { success: true, token };
  } catch (error) {
    console.error(error);
    return { success: false, error: "There was an error getting the token" };
  }
}
