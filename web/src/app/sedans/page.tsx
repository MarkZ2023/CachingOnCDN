import Link from "next/link";
import { notFound } from "next/navigation";
import { CacheBadge } from "@/components/cache-badge";
import { CacheStrategyExplainer } from "@/components/cache-strategy-explainer";
import { CategoryApiNote } from "@/components/category-api-note";
import { PageSourceLink } from "@/components/page-source-link";
import { PhotoGrid } from "@/components/photo-grid";
import { UserAuth } from "@/components/user-auth";
import { getAuthUser } from "@/lib/auth";
import { fetchCategory } from "@/lib/fetch-category";
import { cn } from "@/lib/utils";

const navItems = [
  { slug: "sedans", title: "Sedans" },
  { slug: "suvs", title: "SUVs" },
  { slug: "electric", title: "Electric" },
  { slug: "sports", title: "Sports Cars" },
];

export async function generateMetadata() {
  const category = await fetchCategory("sedans");

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
    "Cache-Control": "public, s-maxage=15",
  };
}

export const dynamic = "force-static";

export default async function SedansPage() {
  const [category, user] = await Promise.all([
    fetchCategory("sedans"),
    getAuthUser(),
  ]);

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
                  item.slug === "sedans"
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground",
                )}
              >
                {item.title}
              </Link>
            ))}
            </nav>
            <UserAuth returnTo="/sedans" />
          </div>
        </div>
      </header>
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-6 py-10">
        <section className="space-y-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <h1 className="text-4xl font-semibold tracking-tight">
                  {category.title}
                </h1>
                <PageSourceLink slug="sedans" />
              </div>
              <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
                {category.description}
              </p>
              <CategoryApiNote category={category} />
              <CacheStrategyExplainer
                cdnHeaderCode={`export async function headers() {
  return {
    "Cache-Control": "public, s-maxage=15",
  };
}`}
                buildConfig="force-static"
                buildConfigCode={`export const dynamic = "force-static";`}
                cookieFetchNote="Yes — fetchCategory(), getAuthUser(), and UserAuth all read cookies(). Same helper on every route (lib/fetch-category.ts)."
                cdnHeaderResult="Ignored — prerender serves Next.js defaults (often max-age=0, must-revalidate) instead of your s-maxage=15."
                buildResult="Static (○) — force-static wins over cookies() and headers() in code. HTML baked at build with no request cookie."
                outcome="Cookie does not change car list at runtime — build-time fetch had no cookie, so full gallery is frozen until redeploy."
              />
            </div>
            <CacheBadge
              cacheMode="cdn"
              revalidateSeconds={15}
              generatedAt={new Date().toISOString()}
              viewer={user ?? "anonymous"}
            />
          </div>
        </section>
        <PhotoGrid photos={category.photos} />
      </main>
    </>
  );
}
