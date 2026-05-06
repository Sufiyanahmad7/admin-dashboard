// ─── KPI Stats ────────────────────────────────────────────────────────────────
export const kpiStats = [
  {
    id: "revenue",
    title: "Total Revenue",
    value: 284500,
    change: 12.5,
    trend: "up" as const,
    color: "accent" as const,
    prefix: "$",
    sparkline: [18000, 22000, 19000, 25000, 28000, 24000, 31000, 35000, 29000, 38000, 42000, 37000],
  },
  {
    id: "orders",
    title: "Total Orders",
    value: 3842,
    change: 8.2,
    trend: "up" as const,
    color: "success" as const,
    sparkline: [210, 280, 240, 310, 290, 350, 320, 390, 360, 420, 400, 450],
  },
  {
    id: "customers",
    title: "Customers",
    value: 12480,
    change: 5.1,
    trend: "up" as const,
    color: "info" as const,
    sparkline: [900, 950, 980, 1020, 1050, 1100, 1080, 1120, 1150, 1180, 1200, 1240],
  },
  {
    id: "pending",
    title: "Pending Orders",
    value: 148,
    change: -3.2,
    trend: "down" as const,
    color: "warning" as const,
    sparkline: [80, 95, 110, 130, 120, 140, 155, 160, 150, 145, 152, 148],
  },
];

// ─── Revenue vs Expenses Chart ────────────────────────────────────────────────
export const revenueData = [
  { month: "Jan", revenue: 42000, expenses: 28000 },
  { month: "Feb", revenue: 38000, expenses: 31000 },
  { month: "Mar", revenue: 51000, expenses: 34000 },
  { month: "Apr", revenue: 47000, expenses: 29000 },
  { month: "May", revenue: 63000, expenses: 38000 },
  { month: "Jun", revenue: 58000, expenses: 42000 },
  { month: "Jul", revenue: 72000, expenses: 45000 },
  { month: "Aug", revenue: 69000, expenses: 41000 },
  { month: "Sep", revenue: 81000, expenses: 48000 },
  { month: "Oct", revenue: 77000, expenses: 52000 },
  { month: "Nov", revenue: 93000, expenses: 55000 },
  { month: "Dec", revenue: 88000, expenses: 50000 },
];

// ─── Orders ───────────────────────────────────────────────────────────────────
export type OrderStatus = "Completed" | "Pending" | "Cancelled" | "Processing";

export const orders = [
  { id: "ORD-7841", customer: "Arjun Mehta", date: "2026-05-01", items: 3, amount: 4250, status: "Completed" as OrderStatus },
  { id: "ORD-7840", customer: "Priya Sharma", date: "2026-05-01", items: 1, amount: 1800, status: "Pending" as OrderStatus },
  { id: "ORD-7839", customer: "Rohit Kumar", date: "2026-04-30", items: 5, amount: 9600, status: "Processing" as OrderStatus },
  { id: "ORD-7838", customer: "Anita Desai", date: "2026-04-30", items: 2, amount: 3100, status: "Completed" as OrderStatus },
  { id: "ORD-7837", customer: "Vikram Singh", date: "2026-04-29", items: 7, amount: 14200, status: "Cancelled" as OrderStatus },
  { id: "ORD-7836", customer: "Neha Patel", date: "2026-04-29", items: 4, amount: 6750, status: "Completed" as OrderStatus },
  { id: "ORD-7835", customer: "Suresh Reddy", date: "2026-04-28", items: 2, amount: 2890, status: "Pending" as OrderStatus },
  { id: "ORD-7834", customer: "Kavya Nair", date: "2026-04-28", items: 6, amount: 11500, status: "Processing" as OrderStatus },
  { id: "ORD-7833", customer: "Manish Joshi", date: "2026-04-27", items: 1, amount: 980, status: "Completed" as OrderStatus },
  { id: "ORD-7832", customer: "Deepa Iyer", date: "2026-04-27", items: 3, amount: 5200, status: "Cancelled" as OrderStatus },
  { id: "ORD-7831", customer: "Rajesh Verma", date: "2026-04-26", items: 8, amount: 18700, status: "Completed" as OrderStatus },
  { id: "ORD-7830", customer: "Sunita Gupta", date: "2026-04-26", items: 2, amount: 3400, status: "Pending" as OrderStatus },
  { id: "ORD-7829", customer: "Amit Shah", date: "2026-04-25", items: 4, amount: 6100, status: "Completed" as OrderStatus },
  { id: "ORD-7828", customer: "Karan Mehta", date: "2026-04-25", items: 3, amount: 3750, status: "Completed" as OrderStatus },
  { id: "ORD-7827", customer: "Pooja Singh", date: "2026-04-24", items: 1, amount: 1950, status: "Cancelled" as OrderStatus },
  { id: "ORD-7826", customer: "Rakesh Kumar", date: "2026-04-24", items: 6, amount: 8200, status: "Completed" as OrderStatus },
  { id: "ORD-7825", customer: "Alok Gupta", date: "2026-04-23", items: 3, amount: 4300, status: "Pending" as OrderStatus },
  { id: "ORD-7824", customer: "Meera Nambiar", date: "2026-04-23", items: 5, amount: 7800, status: "Completed" as OrderStatus },
  { id: "ORD-7823", customer: "Harish Bhat", date: "2026-04-22", items: 2, amount: 2650, status: "Processing" as OrderStatus },
  { id: "ORD-7822", customer: "Lalita Menon", date: "2026-04-22", items: 4, amount: 5400, status: "Completed" as OrderStatus },
];

// ─── Customers ────────────────────────────────────────────────────────────────
export type CustomerStatus = "Active" | "Inactive" | "New";

export const customers = [
  { id: "C001", name: "Arjun Mehta", email: "arjun.mehta@email.com", phone: "+91 98765 43210", city: "Mumbai", orders: 24, totalSpend: 89400, status: "Active" as CustomerStatus, joined: "2023-03-15" },
  { id: "C002", name: "Priya Sharma", email: "priya.sharma@email.com", phone: "+91 87654 32109", city: "Delhi", orders: 8, totalSpend: 32100, status: "Active" as CustomerStatus, joined: "2023-07-22" },
  { id: "C003", name: "Rohit Kumar", email: "rohit.k@email.com", phone: "+91 76543 21098", city: "Bangalore", orders: 15, totalSpend: 54600, status: "Active" as CustomerStatus, joined: "2022-11-10" },
  { id: "C004", name: "Anita Desai", email: "anita.desai@email.com", phone: "+91 65432 10987", city: "Pune", orders: 3, totalSpend: 9800, status: "New" as CustomerStatus, joined: "2026-02-01" },
  { id: "C005", name: "Vikram Singh", email: "vikram.s@email.com", phone: "+91 54321 09876", city: "Chennai", orders: 0, totalSpend: 0, status: "Inactive" as CustomerStatus, joined: "2024-06-15" },
  { id: "C006", name: "Neha Patel", email: "neha.patel@email.com", phone: "+91 43210 98765", city: "Ahmedabad", orders: 42, totalSpend: 172500, status: "Active" as CustomerStatus, joined: "2022-04-08" },
  { id: "C007", name: "Suresh Reddy", email: "suresh.r@email.com", phone: "+91 32109 87654", city: "Hyderabad", orders: 11, totalSpend: 41200, status: "Active" as CustomerStatus, joined: "2023-09-30" },
  { id: "C008", name: "Kavya Nair", email: "kavya.nair@email.com", phone: "+91 21098 76543", city: "Kochi", orders: 6, totalSpend: 22900, status: "New" as CustomerStatus, joined: "2025-12-20" },
  { id: "C009", name: "Manish Joshi", email: "manish.j@email.com", phone: "+91 10987 65432", city: "Jaipur", orders: 0, totalSpend: 0, status: "Inactive" as CustomerStatus, joined: "2024-01-18" },
  { id: "C010", name: "Deepa Iyer", email: "deepa.iyer@email.com", phone: "+91 98760 54321", city: "Coimbatore", orders: 19, totalSpend: 68300, status: "Active" as CustomerStatus, joined: "2023-05-02" },
];

// ─── Vendors ──────────────────────────────────────────────────────────────────
export type VendorStatus = "Active" | "Inactive";

export const vendors = [
  { id: "V001", name: "Steel Craft Industries", category: "Steel & Metals", contact: "Ramesh Agarwal", email: "ramesh@steelcraft.com", phone: "+91 98001 11111", rating: 4.8, orders: 128, status: "Active" as VendorStatus },
  { id: "V002", name: "BuildMax Supplies", category: "Construction Materials", contact: "Sunita Kohli", email: "sunita@buildmax.com", phone: "+91 98002 22222", rating: 4.5, orders: 87, status: "Active" as VendorStatus },
  { id: "V003", name: "Cement Plus Co.", category: "Cement & Concrete", contact: "Amit Saxena", email: "amit@cementplus.com", phone: "+91 98003 33333", rating: 4.2, orders: 210, status: "Active" as VendorStatus },
  { id: "V004", name: "WoodCraft Solutions", category: "Timber & Wood", contact: "Geeta Pillai", email: "geeta@woodcraft.com", phone: "+91 98004 44444", rating: 3.9, orders: 55, status: "Inactive" as VendorStatus },
  { id: "V005", name: "ElectroPro Systems", category: "Electrical", contact: "Harish Bhat", email: "harish@electropro.com", phone: "+91 98005 55555", rating: 4.7, orders: 174, status: "Active" as VendorStatus },
  { id: "V006", name: "PlumbTech India", category: "Plumbing", contact: "Lalita Menon", email: "lalita@plumbtech.com", phone: "+91 98006 66666", rating: 4.1, orders: 92, status: "Active" as VendorStatus },
  { id: "V007", name: "SafeRoof Ltd.", category: "Roofing", contact: "Krishna Das", email: "krishna@saferoof.com", phone: "+91 98007 77777", rating: 3.6, orders: 38, status: "Inactive" as VendorStatus },
  { id: "V008", name: "TileKing Corp.", category: "Flooring & Tiles", contact: "Meera Nambiar", email: "meera@tileking.com", phone: "+91 98008 88888", rating: 4.6, orders: 143, status: "Active" as VendorStatus },
];

// ─── Products ─────────────────────────────────────────────────────────────────
export type ProductStatus = "In Stock" | "Low Stock" | "Out of Stock";

export const products = [
  { id: "P001", name: "TMT Steel Bar 12mm", sku: "STL-TMT-12", category: "Steel", price: 7200, stock: 850, unit: "per ton", status: "In Stock" as ProductStatus },
  { id: "P002", name: "OPC 53 Grade Cement", sku: "CEM-OPC-53", category: "Cement", price: 420, stock: 1200, unit: "per bag", status: "In Stock" as ProductStatus },
  { id: "P003", name: "AAC Blocks 600x200x200", sku: "BLK-AAC-01", category: "Blocks", price: 38, stock: 45, unit: "per piece", status: "Low Stock" as ProductStatus },
  { id: "P004", name: "UPVC Window 4x3ft", sku: "WIN-UPV-43", category: "Windows", price: 3800, stock: 0, unit: "per unit", status: "Out of Stock" as ProductStatus },
  { id: "P005", name: "Ceramic Floor Tile 600x600", sku: "TIL-CER-60", category: "Tiles", price: 85, stock: 3200, unit: "per sqft", status: "In Stock" as ProductStatus },
  { id: "P006", name: "Copper Wire 2.5mm", sku: "ELC-COP-25", category: "Electrical", price: 180, stock: 620, unit: "per meter", status: "In Stock" as ProductStatus },
  { id: "P007", name: "HDPE Pipe 75mm", sku: "PLM-HDP-75", category: "Plumbing", price: 145, stock: 30, unit: "per meter", status: "Low Stock" as ProductStatus },
  { id: "P008", name: "Teak Wood Plank 1\" x 6\"", sku: "WOD-TEK-16", category: "Timber", price: 320, stock: 0, unit: "per sqft", status: "Out of Stock" as ProductStatus },
  { id: "P009", name: "Corrugated GI Sheet 8ft", sku: "ROF-GIS-08", category: "Roofing", price: 1250, stock: 180, unit: "per sheet", status: "In Stock" as ProductStatus },
  { id: "P010", name: "River Sand Grade A", sku: "SND-RIV-GA", category: "Aggregates", price: 2100, stock: 500, unit: "per ton", status: "In Stock" as ProductStatus },
];

// ─── Billing ──────────────────────────────────────────────────────────────────
export type InvoiceStatus = "Paid" | "Pending" | "Overdue" | "Draft";

export const invoices = [
  { id: "INV-2026-041", client: "Mehta Constructions", date: "2026-05-01", due: "2026-05-15", amount: 84500, status: "Pending" as InvoiceStatus },
  { id: "INV-2026-040", client: "Sharma Builders", date: "2026-04-28", due: "2026-05-12", amount: 127000, status: "Paid" as InvoiceStatus },
  { id: "INV-2026-039", client: "Reddy Infrastructure", date: "2026-04-22", due: "2026-05-06", amount: 63200, status: "Overdue" as InvoiceStatus },
  { id: "INV-2026-038", client: "Patel Real Estate", date: "2026-04-20", due: "2026-05-04", amount: 215000, status: "Paid" as InvoiceStatus },
  { id: "INV-2026-037", client: "Singh Developers", date: "2026-04-15", due: "2026-04-29", amount: 48700, status: "Overdue" as InvoiceStatus },
  { id: "INV-2026-036", client: "Kumar Projects", date: "2026-04-10", due: "2026-04-24", amount: 92000, status: "Paid" as InvoiceStatus },
  { id: "INV-2026-035", client: "Desai Constructions", date: "2026-04-05", due: "2026-04-19", amount: 31500, status: "Paid" as InvoiceStatus },
  { id: "INV-2026-034", client: "Nair Housing", date: "2026-03-30", due: "2026-04-13", amount: 178000, status: "Paid" as InvoiceStatus },
  { id: "INV-2026-033", client: "Joshi & Associates", date: "2026-03-25", due: "2026-04-08", amount: 54300, status: "Draft" as InvoiceStatus },
];

// ─── Users ────────────────────────────────────────────────────────────────────
export type UserRole = "Admin" | "Manager" | "Viewer";
export type UserStatus = "Active" | "Inactive" | "Pending";

export const users = [
  { id: "U001", name: "Rajan Kapoor", email: "rajan.kapoor@buildboard.com", role: "Admin" as UserRole, status: "Active" as UserStatus, lastActive: "2026-05-04", avatar: "" },
  { id: "U002", name: "Meena Krishnan", email: "meena.k@buildboard.com", role: "Admin" as UserRole, status: "Active" as UserStatus, lastActive: "2026-05-04", avatar: "" },
  { id: "U003", name: "Suraj Tiwari", email: "suraj.t@buildboard.com", role: "Manager" as UserRole, status: "Active" as UserStatus, lastActive: "2026-05-03", avatar: "" },
  { id: "U004", name: "Pooja Bendre", email: "pooja.b@buildboard.com", role: "Manager" as UserRole, status: "Active" as UserStatus, lastActive: "2026-05-02", avatar: "" },
  { id: "U005", name: "Arun Mathew", email: "arun.m@buildboard.com", role: "Viewer" as UserRole, status: "Inactive" as UserStatus, lastActive: "2026-04-10", avatar: "" },
  { id: "U006", name: "Shruti Bose", email: "shruti.b@buildboard.com", role: "Viewer" as UserRole, status: "Active" as UserStatus, lastActive: "2026-05-04", avatar: "" },
  { id: "U007", name: "Nikhil Rao", email: "nikhil.r@buildboard.com", role: "Manager" as UserRole, status: "Pending" as UserStatus, lastActive: "—", avatar: "" },
  { id: "U008", name: "Asha Choudhary", email: "asha.c@buildboard.com", role: "Viewer" as UserRole, status: "Active" as UserStatus, lastActive: "2026-05-01", avatar: "" },
];

// ─── Activity Feed ────────────────────────────────────────────────────────────
export const activityFeed = [
  { id: 1, action: "New order placed", detail: "ORD-7841 by Arjun Mehta", time: "2 min ago", type: "order" },
  { id: 2, action: "Invoice paid", detail: "INV-2026-040 · ₹1,27,000", time: "18 min ago", type: "billing" },
  { id: 3, action: "New customer registered", detail: "Kavya Nair from Kochi", time: "45 min ago", type: "customer" },
  { id: 4, action: "Vendor status updated", detail: "SafeRoof Ltd. → Inactive", time: "1 hr ago", type: "vendor" },
  { id: 5, action: "Product stock alert", detail: "AAC Blocks 600x200x200 — Low Stock", time: "2 hr ago", type: "product" },
  { id: 6, action: "Order cancelled", detail: "ORD-7837 by Vikram Singh", time: "3 hr ago", type: "order" },
  { id: 7, action: "New user invited", detail: "Nikhil Rao · Manager role", time: "5 hr ago", type: "user" },
  { id: 8, action: "Invoice overdue", detail: "INV-2026-039 · ₹63,200", time: "8 hr ago", type: "billing" },
];

// ─── Analytics ────────────────────────────────────────────────────────────────
export const monthlyBarData = [
  { month: "Jan", sales: 42, target: 50 },
  { month: "Feb", sales: 38, target: 50 },
  { month: "Mar", sales: 55, target: 55 },
  { month: "Apr", sales: 48, target: 55 },
  { month: "May", sales: 65, target: 60 },
  { month: "Jun", sales: 60, target: 60 },
  { month: "Jul", sales: 74, target: 65 },
  { month: "Aug", sales: 70, target: 65 },
  { month: "Sep", sales: 83, target: 70 },
  { month: "Oct", sales: 79, target: 70 },
  { month: "Nov", sales: 95, target: 75 },
  { month: "Dec", sales: 88, target: 75 },
];

export const trafficData = [
  { week: "W1", direct: 1200, organic: 2100, referral: 800 },
  { week: "W2", direct: 1400, organic: 2400, referral: 950 },
  { week: "W3", direct: 1100, organic: 2200, referral: 720 },
  { week: "W4", direct: 1600, organic: 2800, referral: 1100 },
  { week: "W5", direct: 1800, organic: 3100, referral: 1250 },
  { week: "W6", direct: 1500, organic: 2900, referral: 990 },
  { week: "W7", direct: 2000, organic: 3400, referral: 1400 },
  { week: "W8", direct: 2200, organic: 3700, referral: 1600 },
];

// ─── Today Overview ───────────────────────────────────────────────────────────
export const todayOverview = {
  revenue: 14250,
  orders: 48,
  newCustomers: 12,
};

// ─── Order Summary ────────────────────────────────────────────────────────────
export const orderSummary = {
  completed: 142,
  pending: 28,
  cancelled: 5,
};

// ─── Alerts & Notifications ───────────────────────────────────────────────────
export const alerts = [
  { id: 1, message: "AAC Blocks 600x200x200 low stock (45 left)", type: "warning" },
  { id: 2, message: "Payment failed for ORD-7835", type: "danger" },
  { id: 3, message: "Mehta Constructions invoice overdue", type: "danger" },
];

// ─── Revenue Breakdown ────────────────────────────────────────────────────────
export const revenueBreakdown = [
  { name: "Steel & Metals", value: 45000, color: "var(--accent)" },
  { name: "Cement", value: 35000, color: "var(--success)" },
  { name: "Electrical", value: 20000, color: "var(--warning)" },
  { name: "Plumbing", value: 15000, color: "var(--danger)" },
];

// ─── Top Products ─────────────────────────────────────────────────────────────
export const topProducts = [
  { id: "P001", name: "TMT Steel Bar 12mm", sales: 1250, revenue: 9000000 },
  { id: "P002", name: "OPC 53 Grade Cement", sales: 850, revenue: 357000 },
  { id: "P005", name: "Ceramic Floor Tile", sales: 620, revenue: 52700 },
  { id: "P009", name: "Corrugated GI Sheet", sales: 410, revenue: 512500 },
];

// ─── Growth Trends ────────────────────────────────────────────────────────────
export const growthTrends = [
  { month: "Jul", customers: 120, revenueGrowth: 4 },
  { month: "Aug", customers: 145, revenueGrowth: 5.2 },
  { month: "Sep", customers: 180, revenueGrowth: 7.1 },
  { month: "Oct", customers: 210, revenueGrowth: 6.8 },
  { month: "Nov", customers: 260, revenueGrowth: 9.5 },
  { month: "Dec", customers: 310, revenueGrowth: 11.2 },
];

// ─── Top Customers ────────────────────────────────────────────────────────────
export const topCustomers = [
  { name: "Neha Patel", city: "Ahmedabad", orders: 42, revenue: 172500, avatar: "NP" },
  { name: "Arjun Mehta", city: "Mumbai", orders: 24, revenue: 89400, avatar: "AM" },
  { name: "Deepa Iyer", city: "Coimbatore", orders: 19, revenue: 68300, avatar: "DI" },
  { name: "Rohit Kumar", city: "Bangalore", orders: 15, revenue: 54600, avatar: "RK" },
  { name: "Suresh Reddy", city: "Hyderabad", orders: 11, revenue: 41200, avatar: "SR" },
  { name: "Priya Sharma", city: "Delhi", orders: 8, revenue: 32100, avatar: "PS" },
];

// ─── Profit Trends ────────────────────────────────────────────────────────────
export const profitTrends = [
  { month: "Jan", revenue: 42000, expenses: 28000, profit: 14000 },
  { month: "Feb", revenue: 38000, expenses: 31000, profit: 7000 },
  { month: "Mar", revenue: 51000, expenses: 34000, profit: 17000 },
  { month: "Apr", revenue: 47000, expenses: 29000, profit: 18000 },
  { month: "May", revenue: 63000, expenses: 38000, profit: 25000 },
  { month: "Jun", revenue: 58000, expenses: 42000, profit: 16000 },
  { month: "Jul", revenue: 72000, expenses: 45000, profit: 27000 },
  { month: "Aug", revenue: 69000, expenses: 41000, profit: 28000 },
  { month: "Sep", revenue: 81000, expenses: 48000, profit: 33000 },
  { month: "Oct", revenue: 77000, expenses: 52000, profit: 25000 },
  { month: "Nov", revenue: 93000, expenses: 55000, profit: 38000 },
  { month: "Dec", revenue: 88000, expenses: 50000, profit: 38000 },
];

// ─── Sales By Product ─────────────────────────────────────────────────────────
export const salesByProduct = [
  { name: "Backpack Gents",       unit: 59,  amount: 1150,  pct: 12.50 },
  { name: "Coach Swagger",        unit: 134, amount: 24541, pct: 35.28 },
  { name: "Earphone & Headphone", unit: 23,  amount: 450,   pct: 2.00  },
  { name: "Gucci Watch",          unit: 32,  amount: 554,   pct: 8.00  },
  { name: "Hat Black Suits",      unit: 101, amount: 17290, pct: 20.25 },
  { name: "Speed 500 Ignite",     unit: 25,  amount: 590,   pct: 2.10  },
  { name: "Toddler Shoes",        unit: 119, amount: 20225, pct: 27.05 },
];

// ─── Current Users Realtime ───────────────────────────────────────────────────
export const currentUsersData = [
  { t: "22:50", v: 600 }, { t: "22:55", v: 700 }, { t: "23:00", v: 750 },
  { t: "23:05", v: 680 }, { t: "23:10", v: 760 }, { t: "23:15", v: 800 },
  { t: "23:20", v: 780 }, { t: "23:25", v: 810 }, { t: "23:30", v: 750 },
];
