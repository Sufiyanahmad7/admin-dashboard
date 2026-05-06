"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";

type SidebarItemProps = {
  href: string;
  icon: LucideIcon;
  label: string;
  collapsed: boolean;
};

export default function SidebarItem({
  href,
  icon: Icon,
  label,
  collapsed,
}: SidebarItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      title={collapsed ? label : undefined}
      style={{
        display: "flex",
        alignItems: "center",
        gap: collapsed ? 0 : "0.85rem",
        padding: collapsed ? "10px 0" : "9px 14px",
        borderRadius: "8px",
        textDecoration: "none",
        position: "relative",
        transition: "background 0.18s ease, color 0.18s ease",
        justifyContent: collapsed ? "center" : "flex-start",
        background: isActive ? "var(--sidebar-active-bg)" : "transparent",
        color: isActive ? "var(--sidebar-active-text)" : "var(--sidebar-text)",
        fontWeight: isActive ? 600 : 400,
        fontSize: "0.9375rem",
        whiteSpace: "nowrap",
        overflow: "hidden",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        if (!isActive) {
          const el = e.currentTarget as HTMLAnchorElement;
          el.style.background = "var(--sidebar-hover-bg)";
          el.style.color = "var(--sidebar-hover-text)";
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          const el = e.currentTarget as HTMLAnchorElement;
          el.style.background = "transparent";
          el.style.color = "var(--sidebar-text)";
        }
      }}
    >
      {/* Active left accent bar — hidden when collapsed */}
      {isActive && !collapsed && (
        <span
          aria-hidden
          style={{
            position: "absolute",
            left: 0,
            top: "50%",
            transform: "translateY(-50%)",
            width: "3px",
            height: "18px",
            borderRadius: "0 3px 3px 0",
            background: "var(--sidebar-active-border)",
          }}
        />
      )}

      {/* Icon — accent color when active */}
      <Icon
        size={20}
        strokeWidth={isActive ? 2.2 : 1.8}
        style={{
          flexShrink: 0,
          color: isActive ? "var(--sidebar-accent)" : "inherit",
          transition: "color 0.18s ease",
        }}
      />

      {/* Label */}
      {!collapsed && (
        <span
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            lineHeight: 1.4,
          }}
        >
          {label}
        </span>
      )}
    </Link>
  );
}
