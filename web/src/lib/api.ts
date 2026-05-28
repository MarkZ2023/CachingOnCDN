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
  personalizedFor?: string;
};

export const apiUrl = process.env.API_URL ?? "http://localhost:3001";
