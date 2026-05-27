import {
  getCacheControlHeader,
  getCachePolicy,
} from "@/lib/cache-policies";

export type CarPhoto = {
  id: string;
  url: string;
  alt: string;
  caption: string;
};

export type CarCategory = {
  slug: string;
  title: string;
  description: string;
  photos: CarPhoto[];
};

export type CategoryNavItem = {
  slug: string;
  title: string;
};

const apiUrl = process.env.API_URL ?? "http://localhost:3001";

async function fetchFromApi<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(`${apiUrl}${path}`, {
    cache: "no-store",
    ...init,
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${path}`);
  }

  return response.json() as Promise<T>;
}

export function getCategories(): Promise<CategoryNavItem[]> {
  return fetchFromApi<CategoryNavItem[]>("/categories");
}

export function getCategory(slug: string): Promise<CarCategory | null> {
  return fetch(`${apiUrl}/categories/${slug}`, { cache: "no-store" }).then(
    (response) => {
      if (response.status === 404) {
        return null;
      }

      if (!response.ok) {
        throw new Error(
          `API request failed: ${response.status} /categories/${slug}`,
        );
      }

      return response.json() as Promise<CarCategory>;
    },
  );
}

export function getPageCacheControl(slug: string): string {
  return getCacheControlHeader(getCachePolicy(slug));
}
