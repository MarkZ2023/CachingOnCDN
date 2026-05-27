import { notFound } from "next/navigation";
import { CacheBadge } from "@/components/cache-badge";
import { PhotoGrid } from "@/components/photo-grid";
import { SiteNav } from "@/components/site-nav";
import { apiUrl, type CarCategory } from "@/lib/api";

const revalidateSeconds = 60;

async function fetchCategory(): Promise<CarCategory | null> {
  const response = await fetch(`${apiUrl}/categories/electric`);

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(
      `API request failed: ${response.status} /categories/electric`,
    );
  }

  return response.json() as Promise<CarCategory>;
}

export async function generateMetadata() {
  const category = await fetchCategory();

  if (!category) {
    return { title: "Category not found" };
  }

  return {
    title: `${category.title} | Car Gallery`,
    description: category.description,
  };
}

// ISR: statically generated at build, then revalidated every 60 seconds.
export const revalidate = 60;

export default async function ElectricPage() {
  const category = await fetchCategory();

  if (!category) {
    notFound();
  }

  return (
    <>
      <SiteNav activeSlug="electric" />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-6 py-10">
        <section className="space-y-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold tracking-tight">
                {category.title}
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
                {category.description}
              </p>
            </div>
            <CacheBadge
              cacheMode="isr"
              revalidateSeconds={revalidateSeconds}
              generatedAt={new Date().toISOString()}
            />
          </div>
        </section>
        <PhotoGrid photos={category.photos} />
      </main>
    </>
  );
}
