const githubRepo = "https://github.com/MarkZ2023/CachingOnCDN";

export function pageSourceUrl(slug: string): string {
  return `${githubRepo}/blob/main/web/src/app/${slug}/page.tsx`;
}

export function proxySourceUrl(): string {
  return `${githubRepo}/blob/main/web/src/proxy.ts`;
}

type PageSourceLinkProps = {
  slug: string;
  showProxy?: boolean;
};

export function PageSourceLink({ slug, showProxy = false }: PageSourceLinkProps) {
  return (
    <span className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
      <a
        href={pageSourceUrl(slug)}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
      >
        View on GitHub
      </a>
      {showProxy ? (
        <a
          href={proxySourceUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
        >
          proxy.ts
        </a>
      ) : null}
    </span>
  );
}
