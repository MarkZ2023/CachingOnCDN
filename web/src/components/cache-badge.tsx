export type CacheMode = "cdn" | "isr" | "no-store";

type CacheBadgeProps = {
  cacheMode: CacheMode;
  revalidateSeconds: number;
  generatedAt: string;
};

const labels: Record<CacheMode, string> = {
  cdn: "Page CDN cacheable",
  isr: "ISR page",
  "no-store": "Page not CDN cached",
};

export function CacheBadge({
  cacheMode,
  revalidateSeconds,
  generatedAt,
}: CacheBadgeProps) {
  const isCached = cacheMode === "cdn" || cacheMode === "isr";

  return (
    <div
      className={
        isCached
          ? "rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-950"
          : "rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950"
      }
    >
      <p className="font-medium">
        {labels[cacheMode]}
        {revalidateSeconds > 0 ? ` (${revalidateSeconds}s)` : ""}
      </p>
      <p className="mt-1 text-muted-foreground">
        Data fetched at{" "}
        <time dateTime={generatedAt}>{generatedAt}</time>
      </p>
    </div>
  );
}
