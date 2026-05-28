import Link from "next/link";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { CacheBadge } from "@/components/cache-badge";
import { PhotoGrid } from "@/components/photo-grid";
import { UserAuth } from "@/components/user-auth";
import { AUTH_COOKIE_NAME, getAuthUser } from "@/lib/auth";
import { apiUrl, type CarCategory } from "@/lib/api";
import { cn } from "@/lib/utils";

const navItems = [
  { slug: "sedans", title: "Sedans" },
  { slug: "suvs", title: "SUVs" },
  { slug: "electric", title: "Electric" },
  { slug: "sports", title: "Sports Cars" },
];

async function fetchCategory(): Promise<CarCategory | null> {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get(AUTH_COOKIE_NAME);
  const headers: HeadersInit = authCookie
    ? { Cookie: `${AUTH_COOKIE_NAME}=${encodeURIComponent(authCookie.value)}` }
    : {};

  const response = await fetch(`${apiUrl}/categories/sedans`, { headers });

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
export async function headers() {
  return {
    "Cache-Control": "public, s-maxage=15",
  };
}

export const dynamic = "force-static";

export default async function SedansPage() {
  const [category, user] = await Promise.all([fetchCategory(), getAuthUser()]);

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
              <h1 className="text-4xl font-semibold tracking-tight">
                {category.title}
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
                {category.description}
              </p>
              <p className="text-sm text-muted-foreground">
                API returned {category.photos.length} photo
                {category.photos.length === 1 ? "" : "s"}
                {category.personalizedFor
                  ? ` (cookie forwarded for ${category.personalizedFor})`
                  : " (no auth cookie forwarded)"}
              </p>
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
