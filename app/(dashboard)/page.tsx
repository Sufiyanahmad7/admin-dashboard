"use client";

import { useState } from "react";
import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, AreaChart, Area
} from "recharts";
import ChartWrapper from "@/components/ui/ChartWrapper";
import {
  profitTrends, topCustomers, salesByProduct, currentUsersData,
} from "@/lib/mock-data";
import { MoreVertical, Search, ChevronDown, Smile } from "lucide-react";

// ── Mono palette ──────────────────────────────────────────────────────────────
const M = {
  pink:   "#fd5190", green:  "#0acb8e", purple: "#9e6de0",
  blue:   "#6493fa", yellow: "#fec400", dark:   "#31343d",
  muted:  "#8a909d", border: "#e5e9f2", bg:     "#f5f6fa",
};

// ── Stat cards config — each with a visually unique sparkline pattern ────────
const STAT_CARDS = [
  { label: "Sales Of This Year",   value: "$18,699", pct: "45%", up: true,  color: M.pink,
    data: [42, 55, 48, 62, 52, 70, 60, 75, 65, 80, 72, 85] },   // smooth upward wave
  { label: "Expense Of This Year", value: "$14,500", pct: "50%", up: false, color: M.green,
    data: [68, 48, 74, 52, 70, 45, 78, 55, 72, 48, 65, 50] },   // fluctuating finance
  { label: "Profit Of This Year",  value: "$4,199",  pct: "20%", up: false, color: M.purple,
    data: [30, 58, 35, 78, 40, 72, 50, 88, 45, 80, 55, 90] },   // dynamic peaks
  { label: "Revenue Of This Year", value: "$20,199", pct: "35%", up: true,  color: M.blue,
    data: [28, 36, 45, 40, 58, 62, 58, 72, 68, 78, 74, 88] },   // smooth elegant rise
];

// ── Inventory rows ─────────────────────────────────────────────────────────────
const INVENTORY = [
  { emoji: "⌚", name: "Coach Swagger",    id:"24541", qty:27, var:1, com:2, sold:4,  stock:18, active:false },
  { emoji: "🎧", name: "Toddler Shoes",    id:"24542", qty:18, var:7, com:5, sold:1,  stock:14, active:false },
  { emoji: "👜", name: "Hat Black Suits",  id:"24543", qty:20, var:3, com:7, sold:6,  stock:26, active:true  },
  { emoji: "🎒", name: "Backpack Gents",   id:"24544", qty:37, var:8, com:3, sold:6,  stock:7,  active:false },
  { emoji: "📱", name: "Speed 500 Ignite", id:"24545", qty:8,  var:3, com:4, sold:8,  stock:42, active:false },
];

// ── Top customers (Mono-style names + values) ─────────────────────────────────
const TOP_CUSTOMERS = [
  { name: "Gunter Reich",   income: "$2,560" },
  { name: "Anke Kirsch",    income: "$1,720" },
  { name: "Karolina Beer",  income: "$1,230" },
  { name: "Lucia Christ",   income: "$875"   },
  { name: "Hans Müller",    income: "$640"   },
  { name: "Stefan Weber",   income: "$590"   },
  { name: "Petra Schmidt",  income: "$450"   },
];

// ── Chat messages ─────────────────────────────────────────────────────────────
const CHAT = [
  { me: false, text: "Hello my name is anna.",               time: "5 mins ago", av: "SW" },
  { me: true,  text: "Hello i am Riman.",                    time: "4 mins ago", av: "RK" },
  { me: true,  text: "I want to know about yourself",        time: "3 mins ago", av: "RK" },
  { me: false, text: "Its bad resolving otherwise she seoining.", time: "2 mins ago", av: "SW" },
];

// ── Shared helpers ────────────────────────────────────────────────────────────
const TT = {
  contentStyle: { background:"#fff", border:`1px solid ${M.border}`, borderRadius:8, fontSize:12 },
  labelStyle: { color:M.dark, fontWeight:600 },
};
const ax = { fontSize:11, fill:M.muted };

function Card({ children, style={} }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ background:"#fff", border:`1px solid ${M.border}`, borderRadius:8, boxShadow:"0 1px 4px rgba(0,0,0,0.06)", ...style }}>
      {children}
    </div>
  );
}

function SparkBars({ color }: { color: string }) {
  const h = [3,6,4,8,5,9,7,6,8];
  return (
    <div style={{ display:"flex", alignItems:"flex-end", gap:2, height:28 }}>
      {h.map((v,i) => <div key={i} style={{ width:4, height:`${v*11}%`, background:color, borderRadius:2, opacity:0.75 }} />)}
    </div>
  );
}

function RechartsSparkline({ data, color }: { data: number[], color: string }) {
  const chartData = data.map((v, i) => ({ x: i, v }));
  
  return (
    <ChartWrapper height="100%">
      <ResponsiveContainer width="100%" height="100%" minWidth={0}>
        <AreaChart data={chartData} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id={`grad-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fff" stopOpacity={0.30} />
            <stop offset="100%" stopColor="#fff" stopOpacity={0.04} />
          </linearGradient>
        </defs>
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div style={{
                  background: "#1d1f26",
                  color: "#fff",
                  padding: "4px 10px",
                  borderRadius: "6px",
                  fontSize: "12px",
                  fontWeight: 600,
                  boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
                  border: "none"
                }}>
                  {payload[0].value}
                </div>
              );
            }
            return null;
          }}
          cursor={{ stroke: 'rgba(255,255,255,0.25)', strokeWidth: 1, strokeDasharray: '4 4' }}
        />
        <Area
          type="monotone"
          dataKey="v"
          stroke="rgba(255,255,255,0.95)"
          strokeWidth={2.5}
          fill={`url(#grad-${color.replace('#', '')})`}
          activeDot={{ r: 5, fill: "#fff", stroke: color, strokeWidth: 2 }}
          animationDuration={1000}
        />
      </AreaChart>
    </ResponsiveContainer>
    </ChartWrapper>
  );
}


// ── Recent Orders static data ─────────────────────────────────────────────────
const RECENT_ORDERS = [
  { id:"ORD-7841", customer:"Arjun Mehta",   product:"TMT Steel Bar 12mm",       status:"Completed",  amount:4250,  date:"01 May 2026" },
  { id:"ORD-7840", customer:"Priya Sharma",  product:"OPC 53 Grade Cement",     status:"Pending",    amount:1800,  date:"01 May 2026" },
  { id:"ORD-7839", customer:"Rohit Kumar",   product:"Ceramic Floor Tile 600",  status:"Processing", amount:9600,  date:"30 Apr 2026" },
  { id:"ORD-7838", customer:"Anita Desai",   product:"Copper Wire 2.5mm",       status:"Completed",  amount:3100,  date:"30 Apr 2026" },
  { id:"ORD-7837", customer:"Vikram Singh",  product:"Teak Wood Plank",         status:"Cancelled",  amount:14200, date:"29 Apr 2026" },
  { id:"ORD-7836", customer:"Neha Patel",    product:"Corrugated GI Sheet 8ft", status:"Completed",  amount:6750,  date:"29 Apr 2026" },
  { id:"ORD-7835", customer:"Suresh Reddy",  product:"HDPE Pipe 75mm",          status:"Pending",    amount:2890,  date:"28 Apr 2026" },
];

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  Completed:  { bg:"#e6faf4", color:"#0acb8e" },
  Pending:    { bg:"#fff7e0", color:"#d49000" },
  Processing: { bg:"#edf2ff", color:"#6493fa" },
  Cancelled:  { bg:"#ffe9ed", color:"#fd5190" },
};

// ── Page ──────────────────────────────────────────────────────────────────────
export default function BusinessDashboard() {
  const [search, setSearch] = useState("");
  const [chatMsg, setChatMsg] = useState("");
  const [page, setPage] = useState(1);

  const filtered = INVENTORY.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:24, padding: "24px" }}>

      {/* ── Row 1: 4 Stat Cards ─────────────────────────────────────────── */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:20 }}>
        {STAT_CARDS.map((s,i) => (
          <Card key={s.label}>
            {/* White top */}
            <div style={{ padding:"18px 20px 12px", display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
              <div>
                <p style={{ fontSize:"1.625rem", fontWeight:700, color:M.dark, margin:0, lineHeight:1 }}>{s.value}</p>
                <div style={{ display:"flex", alignItems:"center", gap:6, marginTop:7 }}>
                  <span style={{ fontSize:"0.8rem", color:M.muted }}>{s.label}</span>
                  <span style={{ fontSize:"0.75rem", fontWeight:600, color:M.muted }}>|</span>
                  <span style={{ fontSize:"0.75rem", fontWeight:600, color:s.color }}>{s.pct}</span>
                  <span style={{ fontSize:"1rem", color: s.up ? M.green : M.pink }}>{s.up ? "↑" : "↓"}</span>
                </div>
              </div>
              <button style={{ background:"none", border:"none", cursor:"pointer", color:M.muted, padding:0 }}>
                <MoreVertical size={16} />
              </button>
            </div>
            {/* Colored chart bottom — interactive Recharts version */}
            <div style={{ height:115, background:`linear-gradient(155deg, ${s.color} 0%, ${s.color}bb 100%)`, borderRadius:"0 0 8px 8px", overflow:"hidden" }}>
              <RechartsSparkline data={s.data} color={s.color} />
            </div>
          </Card>
        ))}
      </div>

      {/* ── Row 2: Income & Expenses + Current Users ────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Income & Expenses — ComposedChart */}
        <div className="lg:col-span-2">
          <Card style={{ height:"100%" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"20px 24px 8px" }}>
              <h3 style={{ fontSize:"1rem", fontWeight:700, color:M.dark, margin:0 }}>Income And Expenses</h3>
              <div style={{ display:"flex", alignItems:"center", gap:16 }}>
                {[{l:"Income",c:M.purple},{l:"Expenses",c:M.pink},{l:"profit",c:M.yellow}].map(x=>(
                  <div key={x.l} style={{ display:"flex", alignItems:"center", gap:5 }}>
                    <div style={{ width:22, height:3, background:x.c, borderRadius:2 }} />
                    <span style={{ fontSize:"0.75rem", color:M.muted }}>{x.l}</span>
                  </div>
                ))}
                <button style={{ background:"none", border:"none", cursor:"pointer", color:M.muted }}><MoreVertical size={16}/></button>
              </div>
            </div>
            <div style={{ padding:"4px 16px 20px" }}>
              <ChartWrapper height={280}>
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={profitTrends} margin={{top:8,right:4,bottom:0,left:0}} barGap={2} barCategoryGap="25%">
                    <CartesianGrid strokeDasharray="3 3" stroke={M.border} vertical={false} />
                    <XAxis dataKey="month" tick={ax} axisLine={false} tickLine={false} />
                    <YAxis tick={ax} axisLine={false} tickLine={false} width={36} />
                    <Tooltip {...TT} />
                    <Bar dataKey="revenue"  fill={M.purple} radius={[3,3,0,0]} name="Income"   opacity={0.85} />
                    <Bar dataKey="expenses" fill={M.pink}   radius={[3,3,0,0]} name="Expenses" opacity={0.75} />
                    <Line type="monotone" dataKey="profit" stroke={M.yellow} strokeWidth={2.5} dot={false} name="profit" />
                  </ComposedChart>
                </ResponsiveContainer>
              </ChartWrapper>
            </div>
          </Card>
        </div>

        {/* Current Users */}
        <div className="lg:col-span-1">
          <Card style={{ height:"100%", display:"flex", flexDirection:"column" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"20px 24px 4px" }}>
              <h3 style={{ fontSize:"1rem", fontWeight:700, color:M.dark, margin:0 }}>Current Users</h3>
              <span style={{ fontSize:"0.75rem", color:M.muted }}>Realtime</span>
            </div>
            <div style={{ padding:"12px 24px 4px" }}>
              <p style={{ fontSize:"1.75rem", fontWeight:700, color:M.purple, margin:0 }}>20%</p>
              <p style={{ fontSize:"0.8rem", color:M.muted, margin:"4px 0 0" }}>Ave Page views per minute</p>
            </div>
            <div style={{ flex:1, padding:"8px 12px 8px" }}>
              <ChartWrapper height={190}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={currentUsersData} margin={{top:4,right:4,bottom:0,left:0}} barSize={14}>
                    <CartesianGrid strokeDasharray="3 3" stroke={M.border} vertical={false} />
                    <XAxis dataKey="t" tick={ax} axisLine={false} tickLine={false} />
                    <YAxis tick={ax} axisLine={false} tickLine={false} width={44} />
                    <Tooltip {...TT} />
                    <Bar dataKey="v" fill={M.purple} radius={[3,3,0,0]} name="Users" opacity={0.85} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartWrapper>
            </div>
            <div style={{ padding:"8px 24px 16px", borderTop:`1px solid ${M.border}` }}>
              <a href="#" style={{ fontSize:"0.75rem", fontWeight:700, color:M.purple, textDecoration:"none", letterSpacing:"0.5px", textTransform:"uppercase" }}>
                Current Users Overview
              </a>
            </div>
          </Card>
        </div>
      </div>

      {/* ── Row 3: Products Inventory ────────────────────────────────────── */}
      <Card>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"20px 24px 16px", flexWrap:"wrap", gap:12 }}>
          <h3 style={{ fontSize:"1rem", fontWeight:700, color:M.dark, margin:0 }}>Products Inventory</h3>
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <button style={{ display:"flex", alignItems:"center", gap:6, padding:"7px 14px", border:`1px solid ${M.border}`, borderRadius:6, background:"#fff", cursor:"pointer", fontSize:"0.8125rem", color:M.muted }}>
              Yearly Chart <ChevronDown size={14} />
            </button>
          </div>
        </div>

        {/* Search */}
        <div style={{ padding:"0 24px 14px" }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, border:`1px solid ${M.border}`, borderRadius:6, padding:"7px 12px", width:220 }}>
            <Search size={14} style={{ color:M.muted, flexShrink:0 }} />
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search..." style={{ border:"none", outline:"none", fontSize:"0.8125rem", color:M.dark, background:"transparent", width:"100%" }} />
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX:"auto" }}>
          <table style={{ width:"100%", borderCollapse:"collapse" }}>
            <thead>
              <tr style={{ borderTop:`1px solid ${M.border}`, borderBottom:`1px solid ${M.border}` }}>
                {["PRODUCT NAME","ID","QTY","VARIANTS","COMMITTED","DAILY SALE","SOLD","IN STOCK",""].map(h=>(
                  <th key={h} style={{ padding:"10px 16px", textAlign:"left", fontSize:"0.6875rem", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.6px", color:M.muted, whiteSpace:"nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p,i) => (
                <tr key={p.id} style={{ background: p.active ? M.purple : "transparent", transition:"background 0.15s", borderBottom: i < filtered.length-1 ? `1px solid ${M.border}` : "none" }}
                  onMouseEnter={e=>{ if(!p.active)(e.currentTarget as HTMLTableRowElement).style.background = M.bg; }}
                  onMouseLeave={e=>{ if(!p.active)(e.currentTarget as HTMLTableRowElement).style.background = "transparent"; }}
                >
                  <td style={{ padding:"13px 16px" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                      <div style={{ width:36, height:36, borderRadius:8, background: p.active ? "rgba(255,255,255,0.2)" : M.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.125rem", flexShrink:0 }}>{p.emoji}</div>
                      <span style={{ fontSize:"0.875rem", fontWeight: p.active ? 700 : 500, color: p.active ? "#fff" : M.dark, whiteSpace:"nowrap" }}>{p.name}</span>
                    </div>
                  </td>
                  {[p.id, p.qty, p.var, p.com].map((val,vi) => (
                    <td key={vi} style={{ padding:"13px 16px", fontSize:"0.875rem", color: p.active ? "#fff" : M.dark }}>{val}</td>
                  ))}
                  <td style={{ padding:"13px 16px" }}><SparkBars color={p.active ? "#fff" : M.pink} /></td>
                  {[p.sold, p.stock].map((val,vi) => (
                    <td key={vi} style={{ padding:"13px 16px", fontSize:"0.875rem", color: p.active ? "#fff" : M.dark }}>{val}</td>
                  ))}
                  <td style={{ padding:"13px 16px" }}>
                    <button style={{ background:"none", border:"none", cursor:"pointer", color: p.active ? "#fff" : M.muted }}><MoreVertical size={16}/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div style={{ display:"flex", justifyContent:"flex-end", alignItems:"center", gap:6, padding:"14px 24px 16px" }}>
          {["Previous","1","2","3","Next"].map((p,i) => (
            <button key={p} onClick={()=>{ if(!isNaN(Number(p))) setPage(Number(p)); }}
              style={{ padding:"6px 14px", borderRadius:6, border:`1px solid ${M.border}`, background: String(page)===p ? M.purple : "#fff", color: String(page)===p ? "#fff" : M.muted, cursor:"pointer", fontSize:"0.8125rem", fontWeight: String(page)===p ? 600 : 400 }}>
              {p}
            </button>
          ))}
        </div>
      </Card>

      {/* ── Row 4: Top Customers + Sales By Product ──────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

        {/* Top Customers */}
        <div className="lg:col-span-2">
          <Card style={{ height:"100%" }}>
            <div style={{ padding:"20px 24px 12px" }}>
              <h3 style={{ fontSize:"1rem", fontWeight:700, color:M.dark, margin:0 }}>Top Customers</h3>
            </div>
            <div style={{ padding:"0 24px 4px", display:"flex", justifyContent:"space-between" }}>
              <span style={{ fontSize:"0.6875rem", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.6px", color:M.muted }}>Name</span>
              <span style={{ fontSize:"0.6875rem", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.6px", color:M.muted }}>Income</span>
            </div>
            <div>
              {TOP_CUSTOMERS.map((c,i) => (
                <div key={c.name}
                  style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"13px 24px", borderTop:`1px solid ${M.border}`, cursor:"default", transition:"background 0.15s" }}
                  onMouseEnter={e=>{(e.currentTarget as HTMLDivElement).style.background=M.bg;}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLDivElement).style.background="transparent";}}
                >
                  <span style={{ fontSize:"0.9375rem", color:M.dark }}>{c.name}</span>
                  <span style={{ fontSize:"0.9375rem", fontWeight:600, color:M.muted }}>{c.income}</span>
                </div>
              ))}
            </div>
            <div style={{ padding:"12px 24px 16px", borderTop:`1px solid ${M.border}` }}>
              <a href="/customers" style={{ fontSize:"0.8125rem", fontWeight:700, color:M.purple, textDecoration:"none", letterSpacing:"0.5px" }}>SEE ALL</a>
            </div>
          </Card>
        </div>

        {/* Sales By Product */}
        <div className="lg:col-span-3">
          <Card style={{ height:"100%" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"20px 24px 12px" }}>
              <h3 style={{ fontSize:"1rem", fontWeight:700, color:M.dark, margin:0 }}>Sales By Product</h3>
              <button style={{ padding:"8px 20px", background:M.purple, color:"#fff", border:"none", borderRadius:20, cursor:"pointer", fontSize:"0.8125rem", fontWeight:600 }}>
                ADD STOCK
              </button>
            </div>
            <div style={{ overflowX:"auto" }}>
              <table style={{ width:"100%", borderCollapse:"collapse" }}>
                <thead>
                  <tr style={{ borderTop:`1px solid ${M.border}`, borderBottom:`1px solid ${M.border}` }}>
                    {["PRODUCT NAME","UNIT","AMOUNT","%SOLD",""].map(h=>(
                      <th key={h} style={{ padding:"10px 16px 10px 24px", textAlign:"left", fontSize:"0.6875rem", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.6px", color:M.muted, whiteSpace:"nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {salesByProduct.map((p,i) => (
                    <tr key={p.name}
                      style={{ borderBottom: i < salesByProduct.length-1 ? `1px solid ${M.border}` : "none", transition:"background 0.15s" }}
                      onMouseEnter={e=>{(e.currentTarget as HTMLTableRowElement).style.background=M.bg;}}
                      onMouseLeave={e=>{(e.currentTarget as HTMLTableRowElement).style.background="transparent";}}
                    >
                      <td style={{ padding:"12px 16px 12px 24px", fontSize:"0.875rem", color:M.dark }}>{p.name}</td>
                      <td style={{ padding:"12px 16px", fontSize:"0.875rem", color:M.muted }}>{p.unit}</td>
                      <td style={{ padding:"12px 16px", fontSize:"0.875rem", color:M.muted }}>${p.amount.toLocaleString()}</td>
                      <td style={{ padding:"12px 16px", minWidth:160 }}>
                        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                          <span style={{ fontSize:"0.8rem", color:M.muted, width:44, flexShrink:0 }}>{p.pct.toFixed(2)}%</span>
                          <div style={{ flex:1, height:6, borderRadius:3, background:M.border }}>
                            <div style={{ height:"100%", borderRadius:3, background:M.purple, width:`${Math.min(p.pct, 100)}%` }} />
                          </div>
                        </div>
                      </td>
                      <td style={{ padding:"12px 16px" }}>
                        <button style={{ background:"none", border:"none", cursor:"pointer", color:M.muted }}><MoreVertical size={15}/></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>

      {/* ── Row 5: Recent Orders + Chat Widget ───────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* Recent Orders — 2/3 width */}
        <div className="lg:col-span-2">
          <Card style={{ height:"100%" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"20px 24px 16px" }}>
              <div>
                <h3 style={{ fontSize:"1rem", fontWeight:700, color:M.dark, margin:0 }}>Recent Orders</h3>
                <p style={{ fontSize:"0.8rem", color:M.muted, margin:"3px 0 0" }}>Latest customer transactions</p>
              </div>
              <a href="/orders" style={{ fontSize:"0.8rem", fontWeight:700, color:M.purple, textDecoration:"none", letterSpacing:"0.4px" }}>SEE ALL</a>
            </div>
            <div style={{ overflowX:"auto" }}>
              <table style={{ width:"100%", borderCollapse:"collapse" }}>
                <thead>
                  <tr style={{ borderTop:`1px solid ${M.border}`, borderBottom:`1px solid ${M.border}` }}>
                    {["ORDER ID","CUSTOMER","PRODUCT","STATUS","AMOUNT","DATE"].map(h => (
                      <th key={h} style={{ padding:"10px 14px 10px 20px", textAlign:"left", fontSize:"0.6875rem", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.6px", color:M.muted, whiteSpace:"nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {RECENT_ORDERS.map((o, i) => {
                    const s = STATUS_STYLE[o.status];
                    return (
                      <tr key={o.id}
                        style={{ borderBottom: i < RECENT_ORDERS.length-1 ? `1px solid ${M.border}` : "none", transition:"background 0.15s" }}
                        onMouseEnter={e => { (e.currentTarget as HTMLTableRowElement).style.background = M.bg; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLTableRowElement).style.background = "transparent"; }}
                      >
                        <td style={{ padding:"13px 14px 13px 20px" }}>
                          <span style={{ fontSize:"0.8125rem", fontWeight:700, color:M.purple, fontFamily:"monospace" }}>{o.id}</span>
                        </td>
                        <td style={{ padding:"13px 14px", fontSize:"0.875rem", color:M.dark, whiteSpace:"nowrap" }}>{o.customer}</td>
                        <td style={{ padding:"13px 14px", fontSize:"0.875rem", color:M.muted, maxWidth:160, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{o.product}</td>
                        <td style={{ padding:"13px 14px" }}>
                          <span style={{ display:"inline-flex", alignItems:"center", padding:"3px 10px", borderRadius:20, fontSize:"0.6875rem", fontWeight:700, background:s.bg, color:s.color }}>{o.status}</span>
                        </td>
                        <td style={{ padding:"13px 14px", fontSize:"0.875rem", fontWeight:700, color:M.dark, whiteSpace:"nowrap" }}>${o.amount.toLocaleString()}</td>
                        <td style={{ padding:"13px 14px", fontSize:"0.8rem", color:M.muted, whiteSpace:"nowrap" }}>{o.date}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Chat Widget — 1/3 width */}
        <div className="lg:col-span-1">
          <Card style={{ display:"flex", flexDirection:"column", height:"100%" }}>
            {/* Header */}
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"16px 20px", borderBottom:`1px solid ${M.border}` }}>
              <span style={{ fontSize:"0.9375rem", fontWeight:700, color:M.dark }}>Selena Wagner</span>
              <div style={{ width:34, height:34, borderRadius:"50%", background:M.purple, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <span style={{ fontSize:"0.75rem", fontWeight:700, color:"#fff" }}>SW</span>
              </div>
            </div>
            {/* Messages */}
            <div style={{ padding:"16px 20px", display:"flex", flexDirection:"column", gap:14, flex:1 }}>
              {CHAT.map((m,i) => (
                <div key={i} style={{ display:"flex", gap:10, flexDirection: m.me ? "row-reverse" : "row", alignItems:"flex-start" }}>
                  <div style={{ width:32, height:32, borderRadius:"50%", background: m.me ? M.muted : M.purple, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <span style={{ fontSize:"0.6875rem", fontWeight:700, color:"#fff" }}>{m.av}</span>
                  </div>
                  <div style={{ maxWidth:"70%" }}>
                    <div style={{ background: m.me ? "#fff" : M.purple, border: m.me ? `1px solid ${M.border}` : "none", color: m.me ? M.dark : "#fff", padding:"10px 14px", borderRadius: m.me ? "12px 12px 0 12px" : "12px 12px 12px 0", fontSize:"0.8125rem", lineHeight:1.5 }}>
                      {m.text}
                    </div>
                    <p style={{ fontSize:"0.6875rem", color:M.muted, margin:"4px 0 0", textAlign: m.me ? "right" : "left" }}>{m.time}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* Input */}
            <div style={{ padding:"12px 16px", borderTop:`1px solid ${M.border}`, display:"flex", alignItems:"center", gap:10 }}>
              <button style={{ background:"none", border:"none", cursor:"pointer", color:M.muted, flexShrink:0 }}><Smile size={18}/></button>
              <input value={chatMsg} onChange={e=>setChatMsg(e.target.value)} placeholder="Type a message…" style={{ flex:1, border:"none", outline:"none", fontSize:"0.8125rem", color:M.dark, background:"transparent" }} />
              <button onClick={()=>setChatMsg("")}
                style={{ padding:"7px 16px", background:M.purple, color:"#fff", border:"none", borderRadius:6, cursor:"pointer", fontSize:"0.8125rem", fontWeight:600, flexShrink:0 }}>
                Send
              </button>
            </div>
          </Card>
        </div>

      </div>

    </div>
  );
}
