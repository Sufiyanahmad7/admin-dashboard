import { getInitials } from "@/lib/utils";

type AvatarProps = {
  name: string;
  size?: "sm" | "md" | "lg";
  color?: string;
};

const sizeMap = {
  sm: { width: 28, height: 28, fontSize: 10 },
  md: { width: 36, height: 36, fontSize: 13 },
  lg: { width: 44, height: 44, fontSize: 15 },
};

// Deterministic color from name
function nameToColor(name: string): string {
  const colors = [
    "#6366F1", "#8B5CF6", "#EC4899", "#10B981",
    "#3B82F6", "#F59E0B", "#EF4444", "#06B6D4",
  ];
  const idx = name.split("").reduce((a, c) => a + c.charCodeAt(0), 0) % colors.length;
  return colors[idx];
}

export default function Avatar({ name, size = "md", color }: AvatarProps) {
  const { width, height, fontSize } = sizeMap[size];
  const bg = color ?? nameToColor(name);
  return (
    <div
      style={{
        width,
        height,
        borderRadius: "50%",
        background: bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize,
        fontWeight: 700,
        color: "#fff",
        flexShrink: 0,
        userSelect: "none",
      }}
    >
      {getInitials(name)}
    </div>
  );
}
