const BACKDROP_POSTERS = [
  "from-primary/35 via-primary/10 to-transparent",
  "from-sky-500/20 via-primary/10 to-transparent",
  "from-rose-500/20 via-primary/10 to-transparent",
  "from-violet-500/20 via-primary/10 to-transparent",
  "from-emerald-400/15 via-primary/10 to-transparent",
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
