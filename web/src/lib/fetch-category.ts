import { cookies } from "next/headers";
import { AUTH_COOKIE_NAME } from "@/lib/auth";
import { apiUrl, type CarCategory } from "@/lib/api";

export async function fetchCategory(slug: string): Promise<CarCategory | null> {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get(AUTH_COOKIE_NAME);
  const headers: HeadersInit = authCookie
    ? { Cookie: `${AUTH_COOKIE_NAME}=${encodeURIComponent(authCookie.value)}` }
    : {};

  const response = await fetch(`${apiUrl}/categories/${slug}`, { headers });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} /categories/${slug}`);
  }

  return response.json() as Promise<CarCategory>;
}
