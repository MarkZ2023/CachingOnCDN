import type { ReactNode } from "react";

type BuildConfigKind = "none" | "force-static" | "force-dynamic" | "isr";

export type { BuildConfigKind };

type CacheStrategyExplainerProps = {
  cdnHeaderCode: string;
  buildConfig: BuildConfigKind;
  buildConfigCode?: string;
  cdnHeaderResult: string;
  buildResult: string;
  cookieFetchNote: string;
  outcome: string;
};

const buildConfigLabels: Record<BuildConfigKind, string> = {
  none: "None (Next.js default)",
  "force-static": "force-static",
  "force-dynamic": "force-dynamic",
  isr: "ISR",
};

function ConfigBox({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-lg border border-border bg-muted/30 px-4 py-4 text-sm">
      <h2 className="font-semibold tracking-tight">{title}</h2>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div>
      <p className="font-medium text-foreground">{label}</p>
      <div className="mt-1 text-muted-foreground">{children}</div>
    </div>
  );
}

export function CacheStrategyExplainer({
  cdnHeaderCode,
  buildConfig,
  buildConfigCode,
  cdnHeaderResult,
  buildResult,
  cookieFetchNote,
  outcome,
}: CacheStrategyExplainerProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <ConfigBox title="What was configured">
        <Field label="CDN header config">
          <pre className="overflow-x-auto rounded-md bg-zinc-950 px-3 py-2 text-xs leading-relaxed text-zinc-100">
            <code>{cdnHeaderCode}</code>
          </pre>
        </Field>
        <Field label="Build config">
          <p>{buildConfigLabels[buildConfig]}</p>
          {buildConfigCode ? (
            <pre className="mt-2 overflow-x-auto rounded-md bg-zinc-950 px-3 py-2 text-xs leading-relaxed text-zinc-100">
              <code>{buildConfigCode}</code>
            </pre>
          ) : null}
        </Field>
        <Field label="Cookie fetch on this route">
          <p>{cookieFetchNote}</p>
        </Field>
      </ConfigBox>

      <ConfigBox title="What was built">
        <Field label="CDN header">
          <p>{cdnHeaderResult}</p>
        </Field>
        <Field label="Build config">
          <p>{buildResult}</p>
        </Field>
        <Field label="Outcome">
          <p>{outcome}</p>
        </Field>
      </ConfigBox>
    </div>
  );
}
