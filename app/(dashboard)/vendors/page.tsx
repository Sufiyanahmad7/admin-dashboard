"use client";

import { useState } from "react";
import { vendors, VendorStatus } from "@/lib/mock-data";
import Badge from "@/components/ui/Badge";
import Avatar from "@/components/ui/Avatar";
import { Search, Star, Phone, Mail } from "lucide-react";

export default function VendorsPage() {
  const [search, setSearch] = useState("");
  const [activeStatuses, setActiveStatuses] = useState<Record<string, boolean>>(
    Object.fromEntries(vendors.map((v) => [v.id, v.status === "Active"]))
  );

  const filtered = vendors.filter(
    (v) => v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.category.toLowerCase().includes(search.toLowerCase())
  );

  const toggle = (id: string) => setActiveStatuses((s) => ({ ...s, [id]: !s[id] }));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, padding: "24px" }}>
      {/* Header */}
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "8px 12px", flex: 1, maxWidth: 320 }}>
          <Search size={14} style={{ color: "var(--text-secondary)" }} />
          <input
            placeholder="Search vendors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ border: "none", background: "transparent", outline: "none", fontSize: 13, color: "var(--text-primary)", width: "100%" }}
          />
        </div>
      </div>

      {/* Vendor Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
        {filtered.map((vendor) => {
          const isActive = activeStatuses[vendor.id];
          return (
            <div
              key={vendor.id}
              style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                padding: "20px",
                boxShadow: "var(--shadow-sm)",
                transition: "box-shadow 0.2s ease",
                opacity: isActive ? 1 : 0.7,
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.boxShadow = "var(--shadow-md)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.boxShadow = "var(--shadow-sm)")}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Avatar name={vendor.name} size="md" />
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)" }}>{vendor.name}</p>
                    <p style={{ fontSize: 12, color: "var(--text-secondary)" }}>{vendor.category}</p>
                  </div>
                </div>
                {/* Toggle */}
                <button
                  onClick={() => toggle(vendor.id)}
                  style={{
                    width: 40,
                    height: 22,
                    borderRadius: 11,
                    border: "none",
                    background: isActive ? "var(--success)" : "var(--border)",
                    cursor: "pointer",
                    position: "relative",
                    transition: "background 0.2s ease",
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      top: 3,
                      left: isActive ? 21 : 3,
                      width: 16,
                      height: 16,
                      borderRadius: "50%",
                      background: "#fff",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                      transition: "left 0.2s ease",
                    }}
                  />
                </button>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 14, marginLeft: 46 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Phone size={13} style={{ color: "var(--text-secondary)" }} />
                  <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>{vendor.phone}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Mail size={13} style={{ color: "var(--text-secondary)" }} />
                  <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>{vendor.email}</span>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 4, marginLeft: 46 }}>
                  <Star size={13} style={{ color: "var(--warning)", fill: "var(--warning)" }} />
                  <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>{vendor.rating}</span>
                  <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>· {vendor.orders} orders</span>
                </div>
                <Badge variant={isActive ? "success" : "neutral"}>{isActive ? "Active" : "Inactive"}</Badge>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
