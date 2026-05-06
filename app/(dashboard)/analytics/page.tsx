"use client";

import { useState } from "react";
import { monthlyBarData, trafficData, revenueBreakdown, growthTrends, topProducts } from "@/lib/mock-data";
import ChartCard from "@/components/ui/ChartCard";
import DataTable from "@/components/ui/DataTable";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend, PieChart, Pie, Cell,
} from "recharts";
import ChartWrapper from "@/components/ui/ChartWrapper";
import { formatCurrency } from "@/lib/utils";

const summaryCards = [
  { label: "Avg. Order Value", value: "$3,240", change: "+6.1%", up: true },
  { label: "Conversion Rate", value: "4.8%", change: "+0.3%", up: true },
  { label: "Return Rate", value: "2.1%", change: "-0.5%", up: false },
  { label: "Monthly Growth", value: "11.4%", change: "+2.2%", up: true },
];

export default function AnalyticsPage() {
  const [activeFilter, setActiveFilter] = useState("30D");
  const filters = ["7D", "30D", "3M", "1Y"];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, padding: "12px 24px 24px 24px" }}>
      {/* Page Header & Time Filter */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: -12 }}>
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
          padding: 4,
          background: "var(--bg-surface)",
          border: "1px solid var(--border)",
          borderRadius: 999,
          boxShadow: "var(--shadow-sm)"
        }}>
          {filters.map((range) => {
            const isActive = activeFilter === range;
            return (
              <button
                key={range}
                onClick={() => setActiveFilter(range)}
                style={{
                  padding: "6px 16px",
                  fontSize: 13,
                  fontWeight: isActive ? 600 : 500,
                  borderRadius: 999,
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                  background: isActive ? "var(--accent)" : "transparent",
                  color: isActive ? "#fff" : "var(--text-secondary)",
                  boxShadow: isActive ? "0 2px 6px color-mix(in srgb, var(--accent) 30%, transparent)" : "none",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = "color-mix(in srgb, var(--accent) 8%, transparent)";
                    e.currentTarget.style.color = "var(--accent)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "var(--text-secondary)";
                  }
                }}
              >
                {range}
              </button>
            );
          })}
        </div>
      </div>

      {/* Summary */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
        {summaryCards.map((c) => (
          <div
            key={c.label}
            style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              padding: "18px 20px",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <p style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 6, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em" }}>{c.label}</p>
            <p style={{ fontSize: 24, fontWeight: 700, color: "var(--text-primary)" }}>{c.value}</p>
            <p style={{ fontSize: 12, fontWeight: 600, color: c.up ? "var(--success)" : "var(--danger)", marginTop: 4 }}>{c.change} vs last month</p>
          </div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Monthly Sales vs Target */}
          <ChartCard
            title="Monthly Sales vs Target"
            subtitle="Units sold compared to set targets"
            legend={[
              { label: "Sales", color: "var(--accent)" },
              { label: "Target", color: "var(--warning)" },
            ]}
          >
            <ChartWrapper height={300}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyBarData} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: "var(--text-secondary)" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: "var(--text-secondary)" }} axisLine={false} tickLine={false} width={32} />
                  <Tooltip
                    contentStyle={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 13 }}
                    labelStyle={{ color: "var(--text-primary)", fontWeight: 600 }}
                  />
                  <Bar dataKey="sales" fill="var(--accent)" radius={[4, 4, 0, 0]} name="Sales" />
                  <Bar dataKey="target" fill="var(--warning)" radius={[4, 4, 0, 0]} opacity={0.5} name="Target" />
                </BarChart>
              </ResponsiveContainer>
            </ChartWrapper>
          </ChartCard>
        </div>
        <div className="lg:col-span-1 h-full">
          {/* Revenue Breakdown */}
          <ChartCard title="Revenue Breakdown" subtitle="By product category">
            <div className="flex flex-col h-[300px]">
              <div className="flex-1 min-h-0">
                <ChartWrapper height="100%">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                      <Pie
                        data={revenueBreakdown}
                        innerRadius="60%"
                        outerRadius="90%"
                        paddingAngle={2}
                        dataKey="value"
                        stroke="none"
                      >
                        {revenueBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value: any) => formatCurrency(value)}
                        contentStyle={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 13 }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartWrapper>
              </div>
              <div className="flex flex-col gap-2 mt-2">
                {revenueBreakdown.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                      <span className="text-[13px] font-medium text-gray-600 truncate">{item.name}</span>
                    </div>
                    <span className="text-[13px] font-bold text-gray-900 shrink-0">{formatCurrency(item.value)}</span>
                  </div>
                ))}
              </div>
            </div>
          </ChartCard>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic Sources */}
        <ChartCard
          title="Traffic by Source"
          subtitle="Weekly visitors by acquisition channel"
          legend={[
            { label: "Direct", color: "var(--accent)" },
            { label: "Organic", color: "var(--success)" },
            { label: "Referral", color: "var(--warning)" },
          ]}
        >
          <ChartWrapper height={280}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trafficData} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="week" tick={{ fontSize: 12, fill: "var(--text-secondary)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "var(--text-secondary)" }} axisLine={false} tickLine={false} width={44} />
                <Tooltip
                  contentStyle={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 13 }}
                  labelStyle={{ color: "var(--text-primary)", fontWeight: 600 }}
                />
                <Line type="monotone" dataKey="direct" stroke="var(--accent)" strokeWidth={2} dot={false} name="Direct" />
                <Line type="monotone" dataKey="organic" stroke="var(--success)" strokeWidth={2} dot={false} name="Organic" />
                <Line type="monotone" dataKey="referral" stroke="var(--warning)" strokeWidth={2} dot={false} name="Referral" />
              </LineChart>
            </ResponsiveContainer>
          </ChartWrapper>
        </ChartCard>

        {/* Growth Trends */}
        <ChartCard
          title="Customer Growth"
          subtitle="New signups vs revenue growth %"
          legend={[
            { label: "Customers", color: "var(--accent)" },
            { label: "Growth %", color: "var(--success)" },
          ]}
        >
          <ChartWrapper height={280}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={growthTrends} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "var(--text-secondary)" }} axisLine={false} tickLine={false} />
                <YAxis yAxisId="left" tick={{ fontSize: 12, fill: "var(--text-secondary)" }} axisLine={false} tickLine={false} width={32} />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12, fill: "var(--text-secondary)" }} axisLine={false} tickLine={false} width={36} tickFormatter={(v) => `${v}%`} />
                <Tooltip
                  contentStyle={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 13 }}
                  labelStyle={{ color: "var(--text-primary)", fontWeight: 600 }}
                />
                <Line yAxisId="left" type="monotone" dataKey="customers" stroke="var(--accent)" strokeWidth={2} dot={false} name="Customers" />
                <Line yAxisId="right" type="monotone" dataKey="revenueGrowth" stroke="var(--success)" strokeWidth={2} dot={false} name="Growth %" />
              </LineChart>
            </ResponsiveContainer>
          </ChartWrapper>
        </ChartCard>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <ChartCard title="Conversion Funnel" subtitle="Visitors to customers" className="h-full">
            <div className="flex flex-col gap-3 mt-4 h-full">
              <div className="relative h-14 bg-gray-50 rounded-xl flex items-center justify-between px-5 overflow-hidden border border-gray-100">
                <div className="absolute left-0 top-0 bottom-0 bg-violet-100/50 transition-all duration-500" style={{ width: '100%' }} />
                <span className="relative z-10 text-sm font-semibold text-gray-700">Visitors</span>
                <span className="relative z-10 text-lg font-bold text-gray-900">24,500</span>
              </div>
              <div className="relative h-14 bg-gray-50 rounded-xl flex items-center justify-between px-5 overflow-hidden border border-gray-100 mx-4">
                <div className="absolute left-0 top-0 bottom-0 bg-violet-200/50 transition-all duration-500" style={{ width: '45%' }} />
                <span className="relative z-10 text-sm font-semibold text-gray-700">Leads</span>
                <span className="relative z-10 text-lg font-bold text-gray-900">11,025</span>
              </div>
              <div className="relative h-14 bg-gray-50 rounded-xl flex items-center justify-between px-5 overflow-hidden border border-emerald-100 mx-8">
                <div className="absolute left-0 top-0 bottom-0 bg-emerald-100 transition-all duration-500" style={{ width: '22%' }} />
                <span className="relative z-10 text-sm font-semibold text-emerald-800">Customers</span>
                <span className="relative z-10 text-lg font-bold text-emerald-700">2,425</span>
              </div>
              <div className="flex items-center justify-center mt-auto pt-4 border-t border-gray-100">
                <p className="text-sm font-medium text-gray-500">Overall Conversion: <span className="text-emerald-600 font-bold ml-1">9.8%</span></p>
              </div>
            </div>
          </ChartCard>
        </div>
        <div className="lg:col-span-2">
          <ChartCard title="Top Performing Products" subtitle="Sales volume vs revenue">
            <DataTable
              data={topProducts}
              columns={[
                { key: "name", label: "Product", render: (r) => <span className="text-sm font-medium text-gray-900">{r.name}</span> },
                { key: "sales", label: "Units Sold", render: (r) => <span className="text-sm text-gray-500">{r.sales}</span> },
                { key: "revenue", label: "Revenue", align: "right", render: (r) => <span className="text-sm font-bold text-gray-900">{formatCurrency(r.revenue)}</span> },
              ]}
            />
          </ChartCard>
        </div>
      </div>
    </div>
  );
}
