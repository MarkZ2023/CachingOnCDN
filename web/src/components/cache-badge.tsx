import { cn } from "@/lib/utils";

type CacheBadgeProps = {
  cacheMode: "cdn" | "no-store";
  generatedAt: string;
};

export function CacheBadge({ cacheMode, generatedAt }: CacheBadgeProps) {
  const isCdn = cacheMode === "cdn";

  return (
    <div
      className={cn(
        "rounded-lg border px-4 py-3 text-sm",
        isCdn
          ? "border-emerald-200 bg-emerald-50 text-emerald-950"
          : "border-amber-200 bg-amber-50 text-amber-950",
      )}
    >
      <p className="font-medium">
        {isCdn ? "Page CDN cacheable" : "Page not CDN cached"}
      </p>
      <p className="mt-1 text-muted-foreground">
        Data fetched at{" "}
        <time dateTime={generatedAt}>{generatedAt}</time>
      </p>
    </div>
  );
}
