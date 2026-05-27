import Link from "next/link";
import { getCategories } from "@/lib/api";
import { cn } from "@/lib/utils";

type SiteNavProps = {
  activeSlug?: string;
};

export async function SiteNav({ activeSlug }: SiteNavProps) {
  const categories = await getCategories();

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/sedans" className="text-lg font-semibold tracking-tight">
          Car Gallery
        </Link>
        <nav className="flex flex-wrap items-center gap-1">
          {categories.map((category) => {
            const isActive = category.slug === activeSlug;

            return (
              <Link
                key={category.slug}
                href={`/${category.slug}`}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground",
                )}
              >
                {category.title}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
