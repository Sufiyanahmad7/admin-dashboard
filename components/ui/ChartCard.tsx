"use client";

type ChartCardProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  legend?: { label: string; color: string }[];
  action?: React.ReactNode;
  className?: string;
};

export default function ChartCard({ title, subtitle, children, legend, action, className }: ChartCardProps) {
  return (
    <div 
      className={`w-full flex flex-col gap-5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 ${className || ""}`}
      style={{ padding: "24px" }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-gray-900 leading-tight">
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
          )}
        </div>
        <div className="flex items-center gap-3">
          {legend && (
            <div className="flex gap-4">
              {legend.map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <div
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ background: item.color }}
                  />
                  <span className="text-xs font-medium text-gray-500">{item.label}</span>
                </div>
              ))}
            </div>
          )}
          {action && action}
        </div>
      </div>

      {/* Chart slot */}
      <div className="flex-1">{children}</div>
    </div>
  );
}
