"use client";

import { invoices, InvoiceStatus } from "@/lib/mock-data";
import DataTable from "@/components/ui/DataTable";
import Badge from "@/components/ui/Badge";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Download, FileText, TrendingUp, AlertCircle, Clock } from "lucide-react";

const statusVariant: Record<InvoiceStatus, "success" | "warning" | "danger" | "neutral"> = {
  Paid: "success",
  Pending: "warning",
  Overdue: "danger",
  Draft: "neutral",
};

const totalPaid = invoices.filter(i => i.status === "Paid").reduce((a, i) => a + i.amount, 0);
const totalPending = invoices.filter(i => i.status === "Pending").reduce((a, i) => a + i.amount, 0);
const totalOverdue = invoices.filter(i => i.status === "Overdue").reduce((a, i) => a + i.amount, 0);

export default function BillingPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, padding: "24px" }}>
      {/* Payment Summary */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
        {[
          { label: "Total Paid", value: formatCurrency(totalPaid), icon: <TrendingUp size={16} />, color: "var(--success)", soft: "var(--success-soft)" },
          { label: "Pending", value: formatCurrency(totalPending), icon: <Clock size={16} />, color: "var(--warning)", soft: "var(--warning-soft)" },
          { label: "Overdue", value: formatCurrency(totalOverdue), icon: <AlertCircle size={16} />, color: "var(--danger)", soft: "var(--danger-soft)" },
          { label: "Total Invoices", value: invoices.length.toString(), icon: <FileText size={16} />, color: "var(--accent)", soft: "var(--accent-soft)" },
        ].map((s) => (
          <div
            key={s.label}
            style={{
              background: "var(--bg-surface)", border: "1px solid var(--border)",
              borderRadius: "var(--radius)", padding: "18px 20px", boxShadow: "var(--shadow-sm)",
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}
          >
            <div>
              <p style={{ fontSize: 11, color: "var(--text-secondary)", marginBottom: 5, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.label}</p>
              <p style={{ fontSize: 22, fontWeight: 700, color: "var(--text-primary)" }}>{s.value}</p>
            </div>
            <div style={{ width: 40, height: 40, borderRadius: "var(--radius-sm)", background: s.soft, display: "flex", alignItems: "center", justifyContent: "center", color: s.color }}>
              {s.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Invoice Table */}
      <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", boxShadow: "var(--shadow-sm)" }}>
        <div style={{ padding: "16px 20px 14px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h3 style={{ fontSize: 15, fontWeight: 600, color: "var(--text-primary)" }}>Invoice History</h3>
            <p style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 2 }}>{invoices.length} invoices total</p>
          </div>
          <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)", background: "transparent", color: "var(--text-primary)", fontSize: 13, cursor: "pointer", fontWeight: 500 }}>
            <Download size={14} /> Export
          </button>
        </div>
        <DataTable
          data={invoices}
          columns={[
            { key: "id", label: "Invoice #", render: (r) => (
              <span style={{ fontWeight: 600, fontSize: 12, fontFamily: "monospace", color: "var(--accent)" }}>{r.id}</span>
            )},
            { key: "client", label: "Client", render: (r) => <span style={{ fontWeight: 500 }}>{r.client}</span> },
            { key: "date", label: "Issue Date", render: (r) => <span style={{ color: "var(--text-secondary)" }}>{formatDate(r.date)}</span> },
            { key: "due", label: "Due Date", render: (r) => (
              <span style={{ color: r.status === "Overdue" ? "var(--danger)" : "var(--text-secondary)" }}>{formatDate(r.due)}</span>
            )},
            { key: "amount", label: "Amount", align: "right", render: (r) => <span style={{ fontWeight: 700, fontSize: 14 }}>{formatCurrency(r.amount)}</span> },
            { key: "status", label: "Status", render: (r) => <Badge variant={statusVariant[r.status]}>{r.status}</Badge> },
            { key: "actions", label: "", render: () => (
              <button
                style={{
                  display: "flex", alignItems: "center", gap: 5, padding: "4px 10px",
                  borderRadius: 6, border: "1px solid var(--border)",
                  background: "transparent", color: "var(--text-secondary)", cursor: "pointer", fontSize: 12,
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "var(--bg-elevated)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "transparent")}
              >
                <Download size={12} /> PDF
              </button>
            )},
          ]}
        />
      </div>
    </div>
  );
}
