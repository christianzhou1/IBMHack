import React from "react";

export function TypingDots() {
  return (
    <span className="inline-flex gap-1 items-center justify-center text-muted-foreground text-sm">
      <span className="animate-bounce delay-0">.</span>
      <span className="animate-bounce delay-100">.</span>
      <span className="animate-bounce delay-200">.</span>
    </span>
  );
}
