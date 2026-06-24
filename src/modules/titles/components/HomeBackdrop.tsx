const BACKDROP_POSTERS = [
  "from-primary/30 via-primary/10 to-transparent",
  "from-secondary/30 via-primary/10 to-transparent",
  "from-accent/25 via-primary/10 to-transparent",
  "from-muted-foreground/20 via-primary/10 to-transparent",
  "from-chart-5/20 via-primary/10 to-transparent",
];

export function HomeBackdrop() {
  return (
    <div aria-hidden="true" className="home-backdrop pointer-events-none">
      <div className="home-backdrop__wash" />
      <div className="home-backdrop__posters">
        {BACKDROP_POSTERS.map((className, index) => (
          <div
            key={className}
            className={`home-backdrop__poster bg-gradient-to-b ${className}`}
            style={{ "--i": index } as React.CSSProperties}
          />
        ))}
      </div>
      <div className="home-backdrop__beam" />
      <div className="home-backdrop__vignette" />
    </div>
  );
}
