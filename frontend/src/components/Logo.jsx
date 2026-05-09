import React from "react";

// Bold red/black/white wordmark — premium streetwear feel.
// Uses display font "Anton" loaded globally, plus a hand-script flourish.
export const Logo = ({ size = "md", className = "", monochrome = false }) => {
  const sizes = {
    sm: { txt: "text-xl", sub: "text-[9px]", dot: "w-2 h-2" },
    md: { txt: "text-3xl", sub: "text-[10px]", dot: "w-2.5 h-2.5" },
    lg: { txt: "text-5xl", sub: "text-xs", dot: "w-3 h-3" },
  };
  const s = sizes[size] || sizes.md;
  const red = monochrome ? "text-foreground" : "text-[hsl(var(--primary))]";
  return (
    <div className={`inline-flex items-end gap-2 leading-none ${className}`} data-testid="brand-logo">
      <div className="relative">
        <span className={`font-display ${s.txt} tracking-tight text-foreground`}>JULIAN</span>
        <span className={`font-display ${s.txt} tracking-tight ${red}`}>TEES</span>
        <span className={`absolute -top-1 -right-3 ${s.dot} rounded-full bg-[hsl(var(--primary))]`}></span>
      </div>
      <span className={`font-script ${s.sub} text-muted-foreground -mb-1 hidden sm:inline`}>
        wear your vibe™
      </span>
    </div>
  );
};

export default Logo;
