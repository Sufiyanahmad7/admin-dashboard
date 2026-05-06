"use client";

import { useState } from "react";
import { customers, CustomerStatus } from "@/lib/mock-data";
import DataTable from "@/components/ui/DataTable";
import Badge from "@/components/ui/Badge";
import Avatar from "@/components/ui/Avatar";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Search, UserPlus } from "lucide-react";

const statusVariant: Record<CustomerStatus, "success" | "neutral" | "accent"> = {
  Active: "success",
  Inactive: "neutral",
  New: "accent",
};

export default function CustomersPage() {
  const [search, setSearch] = useState("");

  const filtered = customers.filter(
    (c) => c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, padding: "24px" }}>
      {/* Header */}
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "8px 12px", flex: 1, maxWidth: 320 }}>
          <Search size={14} style={{ color: "var(--text-secondary)", flexShrink: 0 }} />
          <input
            placeholder="Search customers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ border: "none", background: "transparent", outline: "none", fontSize: 13, color: "var(--text-primary)", width: "100%" }}
          />
        </div>
        <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: "var(--radius-sm)", border: "none", background: "var(--accent)", color: "#fff", fontSize: 13, cursor: "pointer", fontWeight: 500 }}>
          <UserPlus size={14} /> Add Customer
        </button>
      </div>

      {/* Stats row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
        {[
          { label: "Total Customers", value: customers.length, color: "var(--accent)" },
          { label: "Active", value: customers.filter(c => c.status === "Active").length, color: "var(--success)" },
          { label: "Inactive", value: customers.filter(c => c.status === "Inactive").length, color: "var(--text-secondary)" },
        ].map((s) => (
          <div key={s.label} style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "14px 18px", boxShadow: "var(--shadow-sm)" }}>
            <p style={{ fontSize: 11, color: "var(--text-secondary)", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 500 }}>{s.label}</p>
            <p style={{ fontSize: 22, fontWeight: 700, color: s.color }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", boxShadow: "var(--shadow-sm)" }}>
        <DataTable
          data={filtered}
          emptyMessage="No customers found."
          columns={[
            { key: "name", label: "Customer", render: (r) => (
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Avatar name={r.name} size="md" />
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>{r.name}</p>
                  <p style={{ fontSize: 12, color: "var(--text-secondary)" }}>{r.email}</p>
                </div>
              </div>
            )},
            { key: "phone", label: "Phone", render: (r) => <span style={{ color: "var(--text-secondary)", fontSize: 13 }}>{r.phone}</span> },
            { key: "city", label: "City" },
            { key: "orders", label: "Orders", align: "center" },
            { key: "totalSpend", label: "Total Spend", align: "right", render: (r) => <span style={{ fontWeight: 600 }}>{formatCurrency(r.totalSpend)}</span> },
            { key: "joined", label: "Joined", render: (r) => <span style={{ color: "var(--text-secondary)" }}>{formatDate(r.joined)}</span> },
            { key: "status", label: "Status", render: (r) => <Badge variant={statusVariant[r.status]}>{r.status}</Badge> },
          ]}
        />
      </div>
    </div>
  );
}
