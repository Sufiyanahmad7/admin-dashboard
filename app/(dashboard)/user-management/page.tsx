"use client";

import { useState } from "react";
import { users, UserRole, UserStatus } from "@/lib/mock-data";
import DataTable from "@/components/ui/DataTable";
import Badge from "@/components/ui/Badge";
import Avatar from "@/components/ui/Avatar";
import { formatDate } from "@/lib/utils";
import { UserPlus, Search } from "lucide-react";

const roleVariant: Record<UserRole, "accent" | "success" | "neutral"> = {
  Admin: "accent",
  Manager: "success",
  Viewer: "neutral",
};

const statusVariant: Record<UserStatus, "success" | "neutral" | "warning"> = {
  Active: "success",
  Inactive: "neutral",
  Pending: "warning",
};

export default function UserManagementPage() {
  const [search, setSearch] = useState("");

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, padding: "24px" }}>
      {/* Header */}
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <div
          style={{
            display: "flex", alignItems: "center", gap: 8,
            background: "var(--bg-surface)", border: "1px solid var(--border)",
            borderRadius: "var(--radius-sm)", padding: "8px 12px", flex: 1, maxWidth: 320,
          }}
        >
          <Search size={14} style={{ color: "var(--text-secondary)", flexShrink: 0 }} />
          <input
            placeholder="Search users..."
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
          <UserPlus size={14} /> Invite User
        </button>
      </div>

      {/* Role Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
        {(["Admin", "Manager", "Viewer"] as UserRole[]).map((role) => (
          <div
            key={role}
            style={{
              background: "var(--bg-surface)", border: "1px solid var(--border)",
              borderRadius: "var(--radius)", padding: "12px 16px", boxShadow: "var(--shadow-sm)",
            }}
          >
            <div style={{ marginBottom: 6 }}>
              <Badge variant={roleVariant[role]}>{role}</Badge>
            </div>
            <p style={{ fontSize: 22, fontWeight: 700, color: "var(--text-primary)" }}>
              {users.filter((u) => u.role === role).length}
            </p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", boxShadow: "var(--shadow-sm)" }}>
        <DataTable
          data={filtered}
          emptyMessage="No users found."
          columns={[
            {
              key: "name", label: "User", render: (r) => (
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Avatar name={r.name} size="md" />
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>{r.name}</p>
                    <p style={{ fontSize: 12, color: "var(--text-secondary)" }}>{r.email}</p>
                  </div>
                </div>
              ),
            },
            { key: "role", label: "Role", render: (r) => <Badge variant={roleVariant[r.role]}>{r.role}</Badge> },
            { key: "status", label: "Status", render: (r) => <Badge variant={statusVariant[r.status]}>{r.status}</Badge> },
            {
              key: "lastActive", label: "Last Active", render: (r) => (
                <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>
                  {r.lastActive === "—" ? "—" : formatDate(r.lastActive)}
                </span>
              ),
            },
            {
              key: "actions", label: "Actions", render: (r) => (
                <div style={{ display: "flex", gap: 6 }}>
                  <button style={{ fontSize: 12, color: "var(--accent)", background: "var(--accent-soft)", border: "none", borderRadius: 4, padding: "3px 8px", cursor: "pointer", fontWeight: 500 }}>Edit</button>
                  <button style={{ fontSize: 12, color: "var(--danger)", background: "var(--danger-soft)", border: "none", borderRadius: 4, padding: "3px 8px", cursor: "pointer", fontWeight: 500 }}>Remove</button>
                </div>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
}
