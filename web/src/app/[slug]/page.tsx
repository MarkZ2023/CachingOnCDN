import { connection } from "next/server";
import { notFound } from "next/navigation";
import { CacheBadge } from "@/components/cache-badge";
import { PhotoGrid } from "@/components/photo-grid";
import { SiteNav } from "@/components/site-nav";
import { getCachePolicy } from "@shared/cache-policies";
import { getCategory, getPageCacheControl } from "@/lib/api";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = await getCategory(slug);

  if (!category) {
    return { title: "Category not found" };
  }

  return {
    title: `${category.title} | Car Gallery`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const policy = getCachePolicy(slug);

  if (policy.mode === "no-store") {
    await connection();
  }

  const category = await getCategory(slug);

  if (!category) {
    notFound();
  }

  return (
    <>
      <SiteNav activeSlug={slug} />
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
              cacheMode={category.cacheMode}
              generatedAt={category.generatedAt}
            />
          </div>
        </section>
        <PhotoGrid photos={category.photos} />
      </main>
    </>
  );
}

export async function headers({ params }: CategoryPageProps) {
  const { slug } = await params;

  return {
    "Cache-Control": getPageCacheControl(slug),
  };
}
