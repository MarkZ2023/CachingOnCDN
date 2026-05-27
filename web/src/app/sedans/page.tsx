import { notFound } from "next/navigation";
import { CacheBadge } from "@/components/cache-badge";
import { PhotoGrid } from "@/components/photo-grid";
import { SiteNav } from "@/components/site-nav";
import { apiUrl, type CarCategory } from "@/lib/api";

async function fetchCategory(): Promise<CarCategory | null> {
  const response = await fetch(`${apiUrl}/categories/sedans`);

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} /categories/sedans`);
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

// CDN cache: set Cache-Control on the HTML response via headers().
// Also configured in next.config.ts for /sedans.
export async function headers() {
  return {
    "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
  };
}

export default async function SedansPage() {
  const category = await fetchCategory();

  if (!category) {
    notFound();
  }

  return (
    <>
      <SiteNav activeSlug="sedans" />
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
              cacheMode="cdn"
              revalidateSeconds={60}
              generatedAt={new Date().toISOString()}
            />
          </div>
        </section>
        <PhotoGrid photos={category.photos} />
      </main>
    </>
  );
}
