"use client";

import { useState } from "react";
import { orders, OrderStatus } from "@/lib/mock-data";
import DataTable from "@/components/ui/DataTable";
import Badge from "@/components/ui/Badge";
import Avatar from "@/components/ui/Avatar";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Search, Filter } from "lucide-react";

const tabs: (OrderStatus | "All")[] = ["All", "Completed", "Pending", "Processing", "Cancelled"];

const statusVariant: Record<OrderStatus, "success" | "warning" | "danger" | "info"> = {
  Completed: "success",
  Pending: "warning",
  Cancelled: "danger",
  Processing: "info",
};

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState<OrderStatus | "All">("All");
  const [search, setSearch] = useState("");

  const filtered = orders.filter((o) => {
    const matchTab = activeTab === "All" || o.status === activeTab;
    const matchSearch = o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, padding: "24px" }}>
      {/* Top bar */}
      <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
        {/* Search */}
        <div
          style={{
            display: "flex", alignItems: "center", gap: 8,
            background: "var(--bg-surface)", border: "1px solid var(--border)",
            borderRadius: "var(--radius-sm)", padding: "8px 12px", flex: 1, maxWidth: 320,
          }}
        >
          <Search size={14} style={{ color: "var(--text-secondary)", flexShrink: 0 }} />
          <input
            placeholder="Search orders or customers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ border: "none", background: "transparent", outline: "none", fontSize: 13, color: "var(--text-primary)", width: "100%" }}
          />
        </div>
        {/* Filter tabs */}
        <div style={{ display: "flex", gap: 4, background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: 4 }}>
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: "5px 12px", borderRadius: 6, border: "none", cursor: "pointer",
                fontSize: 12, fontWeight: 500, transition: "all 0.15s ease",
                background: activeTab === tab ? "var(--accent)" : "transparent",
                color: activeTab === tab ? "#fff" : "var(--text-secondary)",
              }}
            >
              {tab}
            </button>
          ))}
        </div>
        <button
          style={{
            display: "flex", alignItems: "center", gap: 6, padding: "8px 14px",
            borderRadius: "var(--radius-sm)", border: "1px solid var(--border)",
            background: "var(--bg-surface)", color: "var(--text-secondary)",
            fontSize: 13, cursor: "pointer", fontWeight: 500,
          }}
        >
          <Filter size={14} /> Filter
        </button>
      </div>

      {/* Table */}
      <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", boxShadow: "var(--shadow-sm)" }}>
        <div style={{ padding: "16px 16px 0", borderBottom: "1px solid var(--border)", paddingBottom: 12 }}>
          <span style={{ fontSize: 13, color: "var(--text-secondary)", fontWeight: 500 }}>
            {filtered.length} order{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>
        <DataTable
          data={filtered}
          emptyMessage="No orders match your filters."
          columns={[
            { key: "id", label: "Order ID", render: (r) => (
              <span style={{ fontWeight: 600, color: "var(--accent)", fontSize: 12, fontFamily: "monospace" }}>{r.id}</span>
            )},
            { key: "customer", label: "Customer", render: (r) => (
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Avatar name={r.customer} size="sm" />
                <span>{r.customer}</span>
              </div>
            )},
            { key: "date", label: "Date", render: (r) => <span style={{ color: "var(--text-secondary)" }}>{formatDate(r.date)}</span> },
            { key: "items", label: "Items", align: "center" },
            { key: "amount", label: "Amount", align: "right", render: (r) => <span style={{ fontWeight: 600 }}>{formatCurrency(r.amount)}</span> },
            { key: "status", label: "Status", render: (r) => <Badge variant={statusVariant[r.status]}>{r.status}</Badge> },
            { key: "actions", label: "Actions", render: () => (
              <div style={{ display: "flex", gap: 8 }}>
                <button style={{ fontSize: 12, color: "var(--accent)", background: "var(--accent-soft)", border: "none", borderRadius: 4, padding: "3px 8px", cursor: "pointer", fontWeight: 500 }}>View</button>
                <button style={{ fontSize: 12, color: "var(--text-secondary)", background: "var(--bg-elevated)", border: "none", borderRadius: 4, padding: "3px 8px", cursor: "pointer", fontWeight: 500 }}>Edit</button>
              </div>
            )},
          ]}
        />
      </div>
    </div>
  );
}
