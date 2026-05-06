"use client";

import { useState } from "react";
import { products, ProductStatus } from "@/lib/mock-data";
import DataTable from "@/components/ui/DataTable";
import Badge from "@/components/ui/Badge";
import { formatCurrency } from "@/lib/utils";
import { Search, Plus, Package } from "lucide-react";

const stockVariant: Record<ProductStatus, "success" | "warning" | "danger"> = {
  "In Stock": "success",
  "Low Stock": "warning",
  "Out of Stock": "danger",
};

const categoryColors: Record<string, string> = {
  Steel: "var(--accent)", Cement: "var(--warning)", Blocks: "var(--info)",
  Windows: "var(--success)", Tiles: "var(--danger)", Electrical: "var(--warning)",
  Plumbing: "var(--info)", Timber: "var(--success)", Roofing: "var(--accent)",
  Aggregates: "var(--text-secondary)",
};

export default function ProductsPage() {
  const [search, setSearch] = useState("");

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, padding: "24px" }}>
      {/* Header row */}
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <div
          style={{
            display: "flex", alignItems: "center", gap: 8,
            background: "var(--bg-surface)", border: "1px solid var(--border)",
            borderRadius: "var(--radius-sm)", padding: "8px 12px", flex: 1, maxWidth: 340,
          }}
        >
          <Search size={14} style={{ color: "var(--text-secondary)", flexShrink: 0 }} />
          <input
            placeholder="Search products, SKU, or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ border: "none", background: "transparent", outline: "none", fontSize: 13, color: "var(--text-primary)", width: "100%" }}
          />
        </div>
        <button
          style={{
            display: "flex", alignItems: "center", gap: 6, padding: "8px 16px",
            borderRadius: "var(--radius-sm)", border: "none",
            background: "var(--accent)", color: "#fff", fontSize: 13, cursor: "pointer", fontWeight: 500,
          }}
        >
          <Plus size={14} /> Add Product
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
        {([
          { label: "Total Products", value: products.length, color: "var(--text-primary)" },
          { label: "In Stock", value: products.filter(p => p.status === "In Stock").length, color: "var(--success)" },
          { label: "Low Stock", value: products.filter(p => p.status === "Low Stock").length, color: "var(--warning)" },
          { label: "Out of Stock", value: products.filter(p => p.status === "Out of Stock").length, color: "var(--danger)" },
        ] as { label: string; value: number; color: string }[]).map((s) => (
          <div
            key={s.label}
            style={{
              background: "var(--bg-surface)", border: "1px solid var(--border)",
              borderRadius: "var(--radius)", padding: "14px 18px", boxShadow: "var(--shadow-sm)",
            }}
          >
            <p style={{ fontSize: 11, color: "var(--text-secondary)", marginBottom: 4, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.label}</p>
            <p style={{ fontSize: 22, fontWeight: 700, color: s.color }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", boxShadow: "var(--shadow-sm)" }}>
        <DataTable
          data={filtered}
          emptyMessage="No products match your search."
          columns={[
            {
              key: "name", label: "Product", render: (r) => (
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{
                    width: 34, height: 34, borderRadius: 8,
                    background: `color-mix(in srgb, ${categoryColors[r.category] ?? "var(--accent)"} 15%, transparent)`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: categoryColors[r.category] ?? "var(--accent)", flexShrink: 0,
                  }}>
                    <Package size={15} />
                  </div>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>{r.name}</p>
                    <p style={{ fontSize: 11, color: "var(--text-secondary)", fontFamily: "monospace" }}>{r.sku}</p>
                  </div>
                </div>
              ),
            },
            { key: "category", label: "Category", render: (r) => (
              <span style={{
                fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 4,
                background: `color-mix(in srgb, ${categoryColors[r.category] ?? "var(--accent)"} 15%, transparent)`,
                color: categoryColors[r.category] ?? "var(--accent)",
              }}>{r.category}</span>
            )},
            { key: "price", label: "Price", align: "center", render: (r) => (
              <div style={{ display: "flex", alignItems: "center", width: 130, margin: "0 auto" }}>
                <span style={{ fontWeight: 600, width: 65, textAlign: "right", paddingRight: 6 }}>{formatCurrency(r.price)}</span>
                <span style={{ fontSize: 11, color: "var(--text-secondary)", width: 65, textAlign: "left" }}>{r.unit}</span>
              </div>
            )},
            { key: "stock", label: "Stock", align: "center", render: (r) => (
              <span style={{ fontWeight: 600, color: r.stock === 0 ? "var(--danger)" : r.stock < 50 ? "var(--warning)" : "var(--text-primary)" }}>
                {r.stock.toLocaleString()}
              </span>
            )},
            { key: "status", label: "Status", render: (r) => <Badge variant={stockVariant[r.status]}>{r.status}</Badge> },
            { key: "actions", label: "", render: () => (
              <div style={{ display: "flex", gap: 6 }}>
                <button style={{ fontSize: 12, color: "var(--accent)", background: "var(--accent-soft)", border: "none", borderRadius: 4, padding: "3px 8px", cursor: "pointer", fontWeight: 500 }}>Edit</button>
              </div>
            )},
          ]}
        />
      </div>
    </div>
  );
}
