export type CacheMode = "cdn" | "no-store";

export type CachePolicy = {
  slug: string;
  mode: CacheMode;
  sMaxAge: number;
};

export const cachePolicies: Record<string, CachePolicy> = {
  sedans: { slug: "sedans", mode: "cdn", sMaxAge: 60 },
  suvs: { slug: "suvs", mode: "cdn", sMaxAge: 60 },
  electric: { slug: "electric", mode: "no-store", sMaxAge: 0 },
  sports: { slug: "sports", mode: "no-store", sMaxAge: 0 },
};

export function getCachePolicy(slug: string): CachePolicy {
  return (
    cachePolicies[slug] ?? {
      slug,
      mode: "no-store",
      sMaxAge: 0,
    }
  );
}

export function getCacheControlHeader(policy: CachePolicy): string {
  if (policy.mode === "cdn") {
    return `public, s-maxage=${policy.sMaxAge}, stale-while-revalidate=300`;
  }

  return "private, no-store, no-cache, must-revalidate";
}

export const cdnCachedSlugs = Object.values(cachePolicies)
  .filter((policy) => policy.mode === "cdn")
  .map((policy) => policy.slug);
