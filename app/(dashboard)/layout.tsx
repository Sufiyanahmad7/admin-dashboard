"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900">
      <Sidebar collapsed={collapsed} />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />
        <main
          className="flex-1 p-6 overflow-auto animate-fade-in"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
