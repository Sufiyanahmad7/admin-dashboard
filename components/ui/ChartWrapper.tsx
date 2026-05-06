"use client";

import { useEffect, useState, cloneElement, isValidElement } from "react";

interface ChartWrapperProps {
  children: React.ReactNode;
  height?: number | string;
  aspect?: number;
  layoutKey?: string | boolean; // for sidebar toggle re-render
}

export default function ChartWrapper({
  children,
  height = 280,
  aspect,
  layoutKey,
}: ChartWrapperProps) {
  // ✅ Delay render to avoid Recharts measuring unstable layout
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Optional skeleton while waiting (prevents layout jump)
  if (!ready) {
    return (
      <div
        style={{
          width: "100%",
          height: aspect ? undefined : height,
        }}
        className="animate-pulse rounded-lg bg-zinc-100 dark:bg-zinc-800/50"
      />
    );
  }

  // ✅ Inject stability props into ResponsiveContainer
  const child = isValidElement(children)
    ? cloneElement(children as React.ReactElement<any>, {
      debounce: 100, // prevents rapid resize glitches
      key: layoutKey ? String(layoutKey) : "stable-chart", // forces recalculation on layout change
    })
    : children;

  // ✅ FINAL STABLE WRAPPER (no flex-1, no shrinking issues)
  return (
    <div
      className="w-full min-w-0"
      style={{
        height: aspect ? "auto" : height,
        overflow: "hidden", // prevents flicker during resize
      }}
    >
      <div className="w-full h-full min-w-0">
        {child}
      </div>
    </div>
  );
}