import Link from "next/link";
import { SiteNav } from "@/components/site-nav";

export default function NotFound() {
  return (
    <>
      <SiteNav />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-start gap-4 px-6 py-20">
        <h1 className="text-3xl font-semibold">Category not found</h1>
        <p className="text-muted-foreground">
          That car category does not exist in the API.
        </p>
        <Link
          href="/sedans"
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          Back to Sedans
        </Link>
      </main>
    </>
  );
}
