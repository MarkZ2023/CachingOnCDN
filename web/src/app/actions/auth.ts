"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AUTH_COOKIE_NAME } from "@/lib/auth";

function getReturnTo(formData: FormData): string {
  const returnTo = formData.get("returnTo")?.toString();
  if (returnTo?.startsWith("/")) {
    return returnTo;
  }

  return "/sedans";
}

export async function signIn(formData: FormData) {
  const username = formData.get("username")?.toString().trim();

  if (!username) {
    return;
  }

  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE_NAME, username, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    secure: process.env.NODE_ENV === "production",
  });

  redirect(getReturnTo(formData));
}

export async function signOut(formData: FormData) {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE_NAME);

  redirect(getReturnTo(formData));
}

export async function continueAsGuest(formData: FormData) {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE_NAME);

  redirect(getReturnTo(formData));
}
