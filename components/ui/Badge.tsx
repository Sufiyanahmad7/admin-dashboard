import { cn } from "@/lib/utils";

type BadgeVariant = "success" | "warning" | "danger" | "info" | "neutral" | "accent";

const variants: Record<BadgeVariant, { bg: string; color: string }> = {
  success: { bg: "var(--success-soft)", color: "var(--success)" },
  warning: { bg: "var(--warning-soft)", color: "var(--warning)" },
  danger:  { bg: "var(--danger-soft)",  color: "var(--danger)"  },
  info:    { bg: "var(--info-soft)",    color: "var(--info)"    },
  neutral: { bg: "var(--bg-elevated)", color: "var(--text-secondary)" },
  accent:  { bg: "var(--accent-soft)", color: "var(--accent)"  },
};

type BadgeProps = {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
};

export default function Badge({ children, variant = "neutral", className }: BadgeProps) {
  const { bg, color } = variants[variant];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-tight uppercase",
        className
      )}
      style={{
        background: bg,
        color,
        whiteSpace: "nowrap",
      }}
    >
      <span
        style={{
          width: 5,
          height: 5,
          borderRadius: "50%",
          background: color,
          flexShrink: 0,
        }}
      />
      {children}
    </span>
  );
}
