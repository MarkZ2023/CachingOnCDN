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

export const apiUrl = process.env.API_URL ?? "http://localhost:3001";

export async function getCategories(): Promise<CategoryNavItem[]> {
  const response = await fetch(`${apiUrl}/categories`);

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} /categories`);
  }

  return response.json() as Promise<CategoryNavItem[]>;
}
