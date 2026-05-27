import { cookies } from "next/headers";

export const AUTH_COOKIE_NAME = "gallery-user";

export async function getAuthUser(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(AUTH_COOKIE_NAME)?.value ?? null;
}
