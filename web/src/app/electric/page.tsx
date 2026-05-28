import Link from "next/link";
import { notFound } from "next/navigation";
import { CacheBadge } from "@/components/cache-badge";
import { CacheStrategyExplainer } from "@/components/cache-strategy-explainer";
import { CategoryApiNote } from "@/components/category-api-note";
import { PageSourceLink } from "@/components/page-source-link";
import { PhotoGrid } from "@/components/photo-grid";
import { fetchCategory } from "@/lib/fetch-category";
import { cn } from "@/lib/utils";

const navItems = [
  { slug: "sedans", title: "Sedans" },
  { slug: "suvs", title: "SUVs" },
  { slug: "electric", title: "Electric" },
  { slug: "sports", title: "Sports Cars" },
];

const revalidateSeconds = 60;

export async function generateMetadata() {
  const category = await fetchCategory("electric");

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
  const category = await fetchCategory("electric");

  if (!category) {
    notFound();
  }

  const viewer = category.personalizedFor ?? "anonymous";

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
          <nav className="flex flex-wrap items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.slug}
                href={`/${item.slug}`}
                prefetch={false}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                  item.slug === "electric"
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground",
                )}
              >
                {item.title}
              </Link>
            ))}
          </nav>
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
                <PageSourceLink slug="electric" />
              </div>
              <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
                {category.description}
              </p>
              <p className="text-sm text-muted-foreground">
                Sign in on{" "}
                <Link href="/sports" prefetch={false} className="underline underline-offset-2">
                  Sports
                </Link>{" "}
                to set the cookie — this page has no auth UI; fetchCategory() forwards
                it to the API.
              </p>
              <CategoryApiNote category={category} />
              <CacheStrategyExplainer
                cdnHeaderCode={`// No page headers() — ISR sets cache behavior`}
                buildConfig="isr"
                buildConfigCode={`export const revalidate = 60;`}
                cookieFetchNote="No getAuthUser() or UserAuth. cookies() runs only inside fetchCategory() when forwarding to the API — that still breaks ISR."
                cdnHeaderResult="Ignored — route is dynamic (ƒ), so Next.js emits private, no-store instead of ISR cache headers."
                buildResult="Dynamic (ƒ) — revalidate = 60 is not honored. cookies() inside fetchCategory() opts the route out of ISR at build time."
                outcome="ISR does not work here despite revalidate = 60. Cookie still changes car list (1 photo vs full gallery) because the route renders dynamically per request."
              />
            </div>
            <CacheBadge
              cacheMode="isr"
              revalidateSeconds={revalidateSeconds}
              generatedAt={new Date().toISOString()}
              viewer={viewer}
            />
          </div>
        </section>
        <PhotoGrid photos={category.photos} />
      </main>
    </>
  );
}
