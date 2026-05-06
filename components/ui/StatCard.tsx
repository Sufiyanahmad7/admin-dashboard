"use client";

import { TrendingUp, TrendingDown, Wallet, ShoppingCart, Users, Clock } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import { formatCurrency, formatNumber } from "@/lib/utils";
import ChartWrapper from "./ChartWrapper";

type StatCardProps = {
  title: string;
  value: number;
  change: number;
  trend: "up" | "down";
  color: "accent" | "success" | "info" | "warning";
  prefix?: string;
  sparkline: number[];
};

const themeMap = {
  accent: {
    glow: "before:bg-violet-200/20",
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
    stroke: "#8b5cf6", // violet-500
  },
  success: {
    glow: "before:bg-emerald-200/20",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    stroke: "#10b981", // emerald-500
  },
  info: {
    glow: "before:bg-rose-200/20",
    iconBg: "bg-rose-100",
    iconColor: "text-rose-600",
    stroke: "#f43f5e", // rose-500
  },
  warning: {
    glow: "before:bg-amber-200/20",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    stroke: "#f59e0b", // amber-500
  },
};

const iconMap = {
  accent: Wallet,
  success: ShoppingCart,
  info: Users,
  warning: Clock,
};

export default function StatCard({ title, value, change, trend, color, prefix, sparkline }: StatCardProps) {
  const sparkData = sparkline.map((v) => ({ v }));
  const isPositive = trend === "up";
  const theme = themeMap[color];
  const Icon = iconMap[color];

  return (
    <div
      className={`relative h-full flex flex-col p-5 rounded-2xl bg-white/60 backdrop-blur-xl border border-white/40 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-default overflow-hidden before:absolute before:inset-0 ${theme.glow} before:blur-2xl before:-z-10 after:absolute after:inset-0 after:bg-gradient-to-tr after:from-white/40 after:to-transparent after:opacity-30 after:pointer-events-none`}
    >
      {/* Top Row: Title & Icon */}
      <div className="flex justify-between items-start z-10 mb-3">
        <p className="text-sm font-semibold text-gray-500 uppercase tracking-tight">
          {title}
        </p>
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${theme.iconBg} shrink-0`}>
          <Icon size={20} className={theme.iconColor} />
        </div>
      </div>

      {/* Middle Row: Large Value */}
      <div className="z-10 mb-4">
        <h3 className="text-3xl font-bold tracking-tight text-gray-900 leading-none">
          {prefix === "$" ? formatCurrency(value) : formatNumber(value)}
        </h3>
      </div>

      {/* Sparkline Chart */}
      <div className="-mx-1 z-10 mt-[18px] drop-shadow-[0_0_8px_rgba(0,0,0,0.1)]">
        <ChartWrapper height={52}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={sparkData} margin={{ top: 5, right: 2, bottom: 5, left: 2 }}>
              <Area
                type="monotone"
                dataKey="v"
                stroke={theme.stroke}
                strokeWidth={2.5}
                fill="transparent"
                dot={false}
                isAnimationActive={true}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartWrapper>
      </div>

      {/* Bottom Row: Trend */}
      <div className="flex items-center gap-2 z-10 mt-auto pt-3 border-t border-gray-50/50">
        <span
          className={`flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-lg ${
            isPositive ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
          }`}
        >
          {isPositive ? <TrendingUp size={12} strokeWidth={2.5} /> : <TrendingDown size={12} strokeWidth={2.5} />}
          {Math.abs(change)}%
        </span>
        <span className="text-[11px] font-medium text-gray-400">
          vs last month
        </span>
      </div>
    </div>
  );
}
