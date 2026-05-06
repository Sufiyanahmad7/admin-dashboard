"use client";

import {
  LayoutDashboard,
  BarChart3,
  ShoppingCart,
  Users,
  Store,
  Package,
  CreditCard,
  UserCog,
  Settings,
  Building2,
  LogOut,
} from "lucide-react";
import SidebarItem from "./SidebarItem";

const navSections = [
  {
    label: "MAIN",
    items: [
      { href: "/", icon: LayoutDashboard, label: "Business Dashboard" },
      { href: "/analytics", icon: BarChart3, label: "Analytics" },
    ],
  },
  {
    label: "MANAGEMENT",
    items: [
      { href: "/orders", icon: ShoppingCart, label: "Orders" },
      { href: "/customers", icon: Users, label: "Customers" },
      { href: "/vendors", icon: Store, label: "Vendors" },
      { href: "/products", icon: Package, label: "Products" },
      { href: "/billing", icon: CreditCard, label: "Billing" },
    ],
  },
  {
    label: "SYSTEM",
    items: [
      { href: "/user-management", icon: UserCog, label: "User Management" },
      { href: "/settings", icon: Settings, label: "Settings" },
    ],
  },
];

interface SidebarProps {
  collapsed: boolean;
}

export default function Sidebar({ collapsed }: SidebarProps) {
  return (
    <aside
      style={{
        width: collapsed ? "var(--sidebar-collapsed-width)" : "var(--sidebar-width)",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        position: "sticky",
        top: 0,
        zIndex: 40,
        height: "100vh",
        background: "var(--sidebar-bg)",
        borderRight: "1px solid var(--sidebar-border)",
        transition: "width 0.28s cubic-bezier(0.4, 0, 0.2, 1)",
        overflow: "hidden",
      }}
    >
      {/* ── Logo / App Brand ─────────────────────────────── */}
      <div
        style={{
          height: "var(--navbar-height)",
          display: "flex",
          alignItems: "center",
          flexShrink: 0,
          justifyContent: collapsed ? "center" : "flex-start",
          padding: collapsed ? "0 16px" : "0 20px",
          gap: "12px",
          borderBottom: "1px solid var(--sidebar-border)",
          transition: "padding 0.28s ease, justify-content 0.28s ease",
        }}
      >
        {/* Icon badge */}
        <div
          style={{
            flexShrink: 0,
            width: 36,
            height: 36,
            borderRadius: "10px",
            background: "var(--sidebar-accent)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Building2 size={18} color="#fff" strokeWidth={2} />
        </div>

        {/* Brand name — hidden when collapsed */}
        {!collapsed && (
          <span
            style={{
              color: "#ffffff",
              fontSize: "1.15rem",
              fontWeight: 700,
              letterSpacing: "0.02em",
              whiteSpace: "nowrap",
              lineHeight: 1,
            }}
          >
            BuildBoard
          </span>
        )}
      </div>

      {/* ── Scrollable Navigation ─────────────────────────── */}
      <nav
        style={{
          flex: 1,
          overflowY: "auto",
          overflowX: "hidden",
          padding: "16px 10px",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        }}
      >
        {navSections.map((section, index) => (
          <div key={section.label}>
            {/* Section label — shown only when expanded */}
            {!collapsed ? (
              <p
                style={{
                  padding: index === 0 ? "4px 12px 8px" : "16px 12px 8px",
                  fontSize: "0.6875rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "1.2px",
                  color: "var(--sidebar-text-muted)",
                  whiteSpace: "nowrap",
                  margin: 0,
                }}
              >
                {section.label}
              </p>
            ) : (
              /* Divider between sections in collapsed mode */
              index !== 0 && (
                <div
                  style={{
                    height: "1px",
                    background: "var(--sidebar-border)",
                    margin: "10px 8px",
                  }}
                />
              )
            )}

            {/* Items list */}
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "2px",
              }}
            >
              {section.items.map((item) => (
                <li key={item.href}>
                  <SidebarItem
                    href={item.href}
                    icon={item.icon}
                    label={item.label}
                    collapsed={collapsed}
                  />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* ── Footer / User Profile ─────────────────────────── */}
      <div
        style={{
          borderTop: "1px solid var(--sidebar-border)",
          padding: collapsed ? "12px 10px" : "12px 12px 14px",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: collapsed ? "8px 0" : "10px 10px",
            borderRadius: "10px",
            justifyContent: collapsed ? "center" : "flex-start",
            cursor: "pointer",
            transition: "background 0.18s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.background =
              "var(--sidebar-hover-bg)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.background = "transparent";
          }}
        >
          {/* Avatar */}
          <div
            style={{
              flexShrink: 0,
              width: 34,
              height: 34,
              borderRadius: "50%",
              background: "var(--sidebar-accent)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "11px",
              fontWeight: 700,
              color: "#fff",
              letterSpacing: "0.05em",
            }}
          >
            RK
          </div>

          {/* Name + role — hidden when collapsed */}
          {!collapsed && (
            <>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p
                  style={{
                    fontSize: "0.8125rem",
                    fontWeight: 600,
                    color: "#ffffff",
                    lineHeight: 1.3,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    margin: 0,
                  }}
                >
                  Rajan Kapoor
                </p>
                <p
                  style={{
                    fontSize: "0.6875rem",
                    color: "var(--sidebar-text-muted)",
                    lineHeight: 1.3,
                    margin: 0,
                    marginTop: "1px",
                  }}
                >
                  Administrator
                </p>
              </div>

              {/* Logout icon */}
              <LogOut
                size={14}
                style={{
                  flexShrink: 0,
                  color: "var(--sidebar-text-muted)",
                  cursor: "pointer",
                  transition: "color 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as SVGSVGElement).style.color = "#fe5461";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as SVGSVGElement).style.color =
                    "var(--sidebar-text-muted)";
                }}
              />
            </>
          )}
        </div>
      </div>
    </aside>
  );
}
