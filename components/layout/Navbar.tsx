"use client";

import { usePathname } from "next/navigation";
import { Bell, Search, ChevronDown, Menu } from "lucide-react";
import { useState } from "react";

const pageTitles: Record<string, string> = {
  "/": "Business Dashboard",
  "/analytics": "Analytics Dashboard",
  "/orders": "Orders",
  "/customers": "Customers",
  "/vendors": "Vendors",
  "/products": "Products",
  "/billing": "Billing",
  "/user-management": "User Management",
  "/settings": "Settings",
};

interface NavbarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export default function Navbar({ collapsed, onToggle }: NavbarProps) {
  const pathname = usePathname();
  const [profileOpen, setProfileOpen] = useState(false);
  const title = pageTitles[pathname] ?? "Dashboard";

  return (
    <header
      style={{
        height: "var(--navbar-height)",
        background: "var(--bg-surface)",
        borderBottom: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        padding: "0 24px",
        gap: 16,
        position: "sticky",
        top: 0,
        zIndex: 30,
        flexShrink: 0,
      }}
    >
      {/* Sidebar Toggle */}
      <button
        onClick={onToggle}
        className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
        aria-label="Toggle Sidebar"
      >
        <Menu size={20} />
      </button>

      {/* Page Title */}
      <div style={{ flex: 1 }}>
        <h1
          style={{
            fontSize: 16,
            fontWeight: 600,
            color: "var(--text-primary)",
            lineHeight: 1,
          }}
        >
          {title}
        </h1>
      </div>

      {/* Search */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: "var(--bg-elevated)",
          border: "1px solid var(--border)",
          borderRadius: 8,
          padding: "7px 12px",
          width: 260,
          cursor: "text",
          transition: "border-color 0.15s ease",
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = "var(--accent)")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)")}
      >
        <Search size={15} style={{ color: "var(--text-secondary)", flexShrink: 0 }} />
        <input
          placeholder="Search anything..."
          style={{
            border: "none",
            background: "transparent",
            outline: "none",
            fontSize: 13,
            color: "var(--text-primary)",
            width: "100%",
          }}
        />
        <span
          style={{
            fontSize: 11,
            color: "var(--text-secondary)",
            background: "var(--bg-primary)",
            border: "1px solid var(--border)",
            borderRadius: 4,
            padding: "1px 5px",
            whiteSpace: "nowrap",
          }}
        >
          ⌘K
        </span>
      </div>

      {/* Notifications */}
      <button
        style={{
          position: "relative",
          width: 36,
          height: 36,
          borderRadius: 8,
          border: "1px solid var(--border)",
          background: "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: "var(--text-secondary)",
          transition: "background 0.15s ease, color 0.15s ease",
          flexShrink: 0,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = "var(--bg-elevated)";
          (e.currentTarget as HTMLButtonElement).style.color = "var(--text-primary)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = "transparent";
          (e.currentTarget as HTMLButtonElement).style.color = "var(--text-secondary)";
        }}
      >
        <Bell size={17} />
        <span
          style={{
            position: "absolute",
            top: 6,
            right: 6,
            width: 8,
            height: 8,
            background: "var(--danger)",
            borderRadius: "50%",
            border: "2px solid var(--bg-surface)",
          }}
        />
      </button>

      {/* Profile */}
      <div style={{ position: "relative" }}>
        <button
          onClick={() => setProfileOpen((o) => !o)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "5px 10px 5px 5px",
            borderRadius: 8,
            border: "1px solid var(--border)",
            background: profileOpen ? "var(--bg-elevated)" : "transparent",
            cursor: "pointer",
            transition: "background 0.15s ease",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "var(--bg-elevated)")}
          onMouseLeave={(e) => {
            if (!profileOpen) (e.currentTarget as HTMLButtonElement).style.background = "transparent";
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: "var(--accent)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 11,
              fontWeight: 700,
              color: "#fff",
              flexShrink: 0,
            }}
          >
            RK
          </div>
          <span style={{ fontSize: 13, fontWeight: 500, color: "var(--text-primary)" }}>Rajan</span>
          <ChevronDown size={13} style={{ color: "var(--text-secondary)" }} />
        </button>

        {profileOpen && (
          <div
            className="animate-fade-in"
            style={{
              position: "absolute",
              top: "calc(100% + 8px)",
              right: 0,
              width: 200,
              background: "var(--bg-surface)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-sm)",
              boxShadow: "var(--shadow-lg)",
              overflow: "hidden",
              zIndex: 50,
            }}
          >
            {[
              { label: "My Profile", href: "#" },
              { label: "Account Settings", href: "/settings" },
              { label: "Help & Support", href: "#" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setProfileOpen(false)}
                style={{
                  display: "block",
                  padding: "9px 14px",
                  fontSize: 13,
                  color: "var(--text-primary)",
                  textDecoration: "none",
                  transition: "background 0.12s ease",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "var(--bg-elevated)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "transparent")}
              >
                {item.label}
              </a>
            ))}
            <div style={{ height: 1, background: "var(--border)", margin: "4px 0" }} />
            <a
              href="#"
              style={{
                display: "block",
                padding: "9px 14px",
                fontSize: 13,
                color: "var(--danger)",
                textDecoration: "none",
                transition: "background 0.12s ease",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "var(--danger-soft)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "transparent")}
            >
              Sign Out
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
