"use client";

import { useState } from "react";
import { Bell, Shield, Palette, User, Save } from "lucide-react";

const tabs = [
  { id: "general", label: "General", icon: User },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
];

function SectionCard({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "24px", boxShadow: "var(--shadow-sm)", marginBottom: 16 }}>
      <div style={{ marginBottom: 20 }}>
        <h3 style={{ fontSize: 15, fontWeight: 600, color: "var(--text-primary)" }}>{title}</h3>
        {description && <p style={{ fontSize: 13, color: "var(--text-secondary)", marginTop: 3 }}>{description}</p>}
      </div>
      {children}
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 16, alignItems: "flex-start", paddingBottom: 16, borderBottom: "1px solid var(--border)", marginBottom: 16 }}>
      <div>
        <p style={{ fontSize: 13, fontWeight: 500, color: "var(--text-primary)" }}>{label}</p>
        {hint && <p style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 2 }}>{hint}</p>}
      </div>
      <div>{children}</div>
    </div>
  );
}

function Input({ defaultValue, placeholder, type = "text" }: { defaultValue?: string; placeholder?: string; type?: string }) {
  return (
    <input
      defaultValue={defaultValue}
      placeholder={placeholder}
      type={type}
      style={{
        width: "100%", maxWidth: 360, padding: "8px 12px",
        border: "1px solid var(--border)", borderRadius: "var(--radius-sm)",
        background: "var(--bg-elevated)", color: "var(--text-primary)",
        fontSize: 13, outline: "none", boxSizing: "border-box",
        transition: "border-color 0.15s ease",
      }}
      onFocus={(e) => ((e.target as HTMLInputElement).style.borderColor = "var(--accent)")}
      onBlur={(e) => ((e.target as HTMLInputElement).style.borderColor = "var(--border)")}
    />
  );
}

function Toggle({ defaultChecked = false, label }: { defaultChecked?: boolean; label: string }) {
  const [on, setOn] = useState(defaultChecked);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <button
        onClick={() => setOn((v) => !v)}
        style={{
          width: 40, height: 22, borderRadius: 11, border: "none",
          background: on ? "var(--accent)" : "var(--border)",
          cursor: "pointer", position: "relative", transition: "background 0.2s ease", flexShrink: 0,
        }}
      >
        <span style={{
          position: "absolute", top: 3, left: on ? 21 : 3,
          width: 16, height: 16, borderRadius: "50%", background: "#fff",
          boxShadow: "0 1px 3px rgba(0,0,0,0.2)", transition: "left 0.2s ease",
        }} />
      </button>
      <span style={{ fontSize: 13, color: "var(--text-primary)" }}>{label}</span>
    </div>
  );
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [theme, setTheme] = useState<"light" | "dark">("light");

  return (
    <div style={{ display: "flex", gap: 24, alignItems: "flex-start", padding: "24px" }}>
      {/* Tab sidebar */}
      <div style={{ width: 200, flexShrink: 0 }}>
        <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: "flex", alignItems: "center", gap: 8, padding: "9px 12px",
                  borderRadius: 8, border: "none", textAlign: "left",
                  background: isActive ? "var(--accent-soft)" : "transparent",
                  color: isActive ? "var(--accent)" : "var(--text-secondary)",
                  fontSize: 13, fontWeight: isActive ? 600 : 400, cursor: "pointer",
                  transition: "background 0.15s ease, color 0.15s ease",
                }}
                onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = "var(--bg-elevated)"; }}
                onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
              >
                <Icon size={15} /> {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Content */}
      <div style={{ flex: 1 }}>
        {activeTab === "general" && (
          <>
            <SectionCard title="Profile Information" description="Update your personal and business details.">
              <Field label="Full Name"><Input defaultValue="Rajan Kapoor" /></Field>
              <Field label="Email Address"><Input defaultValue="rajan.kapoor@buildboard.com" type="email" /></Field>
              <Field label="Company Name"><Input defaultValue="BuildBoard Pvt. Ltd." /></Field>
              <Field label="Phone" hint="Used for 2FA and alerts"><Input defaultValue="+91 98001 00001" type="tel" /></Field>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 18px", borderRadius: "var(--radius-sm)", border: "none", background: "var(--accent)", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                  <Save size={14} /> Save Changes
                </button>
              </div>
            </SectionCard>
          </>
        )}

        {activeTab === "appearance" && (
          <SectionCard title="Appearance" description="Customize how the dashboard looks for you.">
            <Field label="Theme" hint="Choose your preferred color mode">
              <div style={{ display: "flex", gap: 10 }}>
                {(["light", "dark"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTheme(t)}
                    style={{
                      padding: "8px 20px", borderRadius: "var(--radius-sm)", cursor: "pointer",
                      border: `2px solid ${theme === t ? "var(--accent)" : "var(--border)"}`,
                      background: theme === t ? "var(--accent-soft)" : "var(--bg-elevated)",
                      color: theme === t ? "var(--accent)" : "var(--text-secondary)",
                      fontSize: 13, fontWeight: theme === t ? 600 : 400, textTransform: "capitalize",
                      transition: "all 0.15s ease",
                    }}
                  >
                    {t === "light" ? "☀️ Light" : "🌙 Dark"}
                  </button>
                ))}
              </div>
            </Field>
            <Field label="Compact Mode" hint="Reduce spacing for more data-dense views">
              <Toggle label="Enable compact sidebar" />
            </Field>
            <Field label="Accent Color" hint="Primary brand color">
              <div style={{ display: "flex", gap: 8 }}>
                {["#6366F1", "#8B5CF6", "#EC4899", "#10B981", "#3B82F6", "#F59E0B"].map((c) => (
                  <button key={c} style={{ width: 28, height: 28, borderRadius: "50%", background: c, border: "3px solid transparent", cursor: "pointer", outline: c === "#6366F1" ? `2px solid ${c}` : "none", outlineOffset: 2 }} />
                ))}
              </div>
            </Field>
          </SectionCard>
        )}

        {activeTab === "notifications" && (
          <SectionCard title="Notification Preferences" description="Choose what you want to be notified about.">
            {[
              { label: "New orders", hint: "Notify when a new order is placed", defaultChecked: true },
              { label: "Invoice paid", hint: "Notify when an invoice is marked as paid", defaultChecked: true },
              { label: "Low stock alerts", hint: "Notify when product stock falls below threshold", defaultChecked: true },
              { label: "New customer signup", hint: "Notify when a new customer registers", defaultChecked: false },
              { label: "Overdue invoices", hint: "Daily digest of overdue invoices", defaultChecked: true },
              { label: "Vendor status changes", hint: "Notify when vendor is activated or deactivated", defaultChecked: false },
            ].map((n) => (
              <Field key={n.label} label={n.label} hint={n.hint}>
                <Toggle defaultChecked={n.defaultChecked} label={n.defaultChecked ? "Enabled" : "Disabled"} />
              </Field>
            ))}
          </SectionCard>
        )}

        {activeTab === "security" && (
          <SectionCard title="Security" description="Manage your password and account security.">
            <Field label="Current Password"><Input type="password" placeholder="••••••••" /></Field>
            <Field label="New Password"><Input type="password" placeholder="••••••••" /></Field>
            <Field label="Confirm Password"><Input type="password" placeholder="••••••••" /></Field>
            <Field label="Two-Factor Auth" hint="Adds an extra layer of security"><Toggle defaultChecked label="Enabled via SMS" /></Field>
            <Field label="Active Sessions" hint="Devices currently logged in">
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  { device: "Chrome on Windows 11", location: "Mumbai, India", current: true },
                  { device: "Safari on iPhone 15", location: "Delhi, India", current: false },
                ].map((s) => (
                  <div key={s.device} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 12px", background: "var(--bg-elevated)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)" }}>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 500, color: "var(--text-primary)" }}>{s.device}</p>
                      <p style={{ fontSize: 12, color: "var(--text-secondary)" }}>{s.location}</p>
                    </div>
                    {s.current
                      ? <span style={{ fontSize: 11, fontWeight: 600, color: "var(--success)", background: "var(--success-soft)", padding: "2px 8px", borderRadius: 4 }}>Current</span>
                      : <button style={{ fontSize: 12, color: "var(--danger)", background: "var(--danger-soft)", border: "none", borderRadius: 4, padding: "3px 8px", cursor: "pointer", fontWeight: 500 }}>Revoke</button>
                    }
                  </div>
                ))}
              </div>
            </Field>
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 4 }}>
              <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 18px", borderRadius: "var(--radius-sm)", border: "none", background: "var(--accent)", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                <Save size={14} /> Update Password
              </button>
            </div>
          </SectionCard>
        )}
      </div>
    </div>
  );
}
