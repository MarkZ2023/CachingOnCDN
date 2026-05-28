import Link from "next/link";
import { notFound } from "next/navigation";
import { CacheBadge } from "@/components/cache-badge";
import { CacheStrategyExplainer } from "@/components/cache-strategy-explainer";
import { CategoryApiNote } from "@/components/category-api-note";
import { PhotoGrid } from "@/components/photo-grid";
import { fetchCategory } from "@/lib/fetch-category";
import { cn } from "@/lib/utils";

const navItems = [
  { slug: "sedans", title: "Sedans" },
  { slug: "suvs", title: "SUVs" },
  { slug: "electric", title: "Electric" },
  { slug: "sports", title: "Sports Cars" },
];

export async function generateMetadata() {
  const category = await fetchCategory("suvs");

  if (!category) {
    return { title: "Category not found" };
  }

  return {
    title: `${category.title} | Car Gallery`,
    description: category.description,
  };
}

// CDN cache: set Cache-Control on the HTML response via headers().
export async function headers() {
  return {
    "Cache-Control": "public, max-age=30, s-maxage=30",
  };
}

export default async function SuvsPage() {
  const category = await fetchCategory("suvs");

  if (!category) {
    notFound();
  }

  return (
    <>
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="mx-auto flex min-h-16 max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-3">
          <Link
            href="/sedans"
            prefetch={false}
            className="text-lg font-semibold tracking-tight"
          >
            Car Gallery
          </Link>
          <div className="flex flex-wrap items-center gap-4">
            <nav className="flex flex-wrap items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.slug}
                href={`/${item.slug}`}
                prefetch={false}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                  item.slug === "suvs"
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground",
                )}
              >
                {item.title}
              </Link>
            ))}
            </nav>
          </div>
        </div>
      </header>
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
              <CategoryApiNote category={category} />
              <CacheStrategyExplainer
                cdnConfig="Page headers(): public, max-age=30, s-maxage=30 (browser + CDN TTL 30s)."
                buildTimeDecision="Static prerender when possible — no force-dynamic; HTML generated at build/deploy."
                cookiesInRoute="fetchCategory reads cookies(), but proxy.ts strips Cookie on /suvs before render."
                expectedBehavior={[
                  "Browser may send Cookie in Request Headers; Response Headers show x-cookie-stripped: true.",
                  "Page never sees the cookie — API always gets the anonymous full gallery.",
                  "Shared CDN HTML for all visitors; sign in on Sports to compare.",
                  "Look for X-Vercel-Cache: HIT/MISS and Age increasing within 30s on repeat loads.",
                ]}
              />
            </div>
            <CacheBadge
              cacheMode="cdn"
              revalidateSeconds={30}
              generatedAt={new Date().toISOString()}
              viewer="anonymous (cookie stripped by proxy)"
            />
          </div>
        </section>
        <PhotoGrid photos={category.photos} />
      </main>
    </>
  );
}
