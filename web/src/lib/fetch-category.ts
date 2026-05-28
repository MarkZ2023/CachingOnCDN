import { cookies } from "next/headers";
import { AUTH_COOKIE_NAME } from "@/lib/auth";
import { apiUrl, type CarCategory } from "@/lib/api";

type FetchCategoryOptions = {
  /** Forward gallery-user to the API fetch. Page code should not call cookies() separately. */
  forwardAuthCookie?: boolean;
};

async function fetchCategoryFromApi(
  slug: string,
  forwardAuthCookie: boolean,
): Promise<CarCategory | null> {
  const headers: HeadersInit = {};

  if (forwardAuthCookie) {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get(AUTH_COOKIE_NAME);
    if (authCookie) {
      headers.Cookie = `${AUTH_COOKIE_NAME}=${encodeURIComponent(authCookie.value)}`;
    }
  }

  const response = await fetch(`${apiUrl}/categories/${slug}`, { headers });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} /categories/${slug}`);
  }

  return response.json() as Promise<CarCategory>;
}

export async function fetchCategory(
  slug: string,
  options: FetchCategoryOptions = {},
): Promise<CarCategory | null> {
  const { forwardAuthCookie = true } = options;
  return fetchCategoryFromApi(slug, forwardAuthCookie);
}

/** No cookies() — safe for ISR/static routes. */
export async function fetchCategoryPublic(
  slug: string,
): Promise<CarCategory | null> {
  return fetchCategoryFromApi(slug, false);
}
