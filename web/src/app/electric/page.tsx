import Link from "next/link";
import { notFound } from "next/navigation";
import { CacheBadge } from "@/components/cache-badge";
import { CacheStrategyExplainer } from "@/components/cache-strategy-explainer";
import { CategoryApiNote } from "@/components/category-api-note";
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
  const [category, user] = await Promise.all([
    fetchCategory("electric"),
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
                  item.slug === "electric"
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground",
                )}
              >
                {item.title}
              </Link>
            ))}
            </nav>
            <UserAuth returnTo="/electric" />
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
                cdnConfig="export const revalidate = 60 — ISR: Next.js revalidates static HTML every 60s."
                buildTimeDecision="Intended ISR at build + periodic revalidation — but cookies() opts the route into dynamic rendering."
                cookiesInRoute="Yes — getAuthUser(), fetchCategory(), and UserAuth all read cookies()."
                expectedBehavior={[
                  "ISR is overridden: route renders dynamically (ƒ), not true 60s ISR while cookies remain.",
                  "Cache-Control: private, no-store from Next.js — not ISR cache headers in DevTools.",
                  "When signed in, server fetch forwards cookie — API returns 1 photo.",
                  "Fresh timestamp on each request; viewer name updates after sign-in.",
                ]}
              />
            </div>
            <CacheBadge
              cacheMode="isr"
              revalidateSeconds={revalidateSeconds}
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
