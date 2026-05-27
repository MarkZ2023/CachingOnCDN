import Link from "next/link";

export function CdnRouteNote() {
  return (
    <p className="text-xs text-muted-foreground">
      CDN route — cookie stripped by{" "}
      <code className="rounded bg-muted px-1 py-0.5">proxy.ts</code> on /suvs
      only. Sign in on{" "}
      <Link href="/sports" prefetch={false} className="underline underline-offset-2">
        Sports
      </Link>
      .
    </p>
  );
}
