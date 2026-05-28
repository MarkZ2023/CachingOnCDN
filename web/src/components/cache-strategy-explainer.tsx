type CacheStrategyExplainerProps = {
  cdnConfig: string;
  buildTimeDecision: string;
  cookiesInRoute: string;
  expectedBehavior: string[];
};

export function CacheStrategyExplainer({
  cdnConfig,
  buildTimeDecision,
  cookiesInRoute,
  expectedBehavior,
}: CacheStrategyExplainerProps) {
  return (
    <section className="rounded-lg border border-border bg-muted/30 px-4 py-4 text-sm">
      <h2 className="font-semibold tracking-tight">Cache strategy</h2>
      <dl className="mt-3 space-y-3">
        <div>
          <dt className="font-medium text-foreground">CDN config</dt>
          <dd className="mt-0.5 text-muted-foreground">{cdnConfig}</dd>
        </div>
        <div>
          <dt className="font-medium text-foreground">Build-time decision</dt>
          <dd className="mt-0.5 text-muted-foreground">{buildTimeDecision}</dd>
        </div>
        <div>
          <dt className="font-medium text-foreground">Cookies in route?</dt>
          <dd className="mt-0.5 text-muted-foreground">{cookiesInRoute}</dd>
        </div>
        <div>
          <dt className="font-medium text-foreground">Behavior to expect</dt>
          <dd className="mt-0.5">
            <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
              {expectedBehavior.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </dd>
        </div>
      </dl>
    </section>
  );
}
