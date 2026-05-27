import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link
            href="/sedans"
            prefetch={false}
            className="text-lg font-semibold tracking-tight"
          >
            Car Gallery
          </Link>
        </div>
      </header>
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
