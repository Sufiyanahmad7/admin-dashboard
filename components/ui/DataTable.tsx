"use client";

type Column<T> = {
  key: keyof T | string;
  label: string;
  render?: (row: T) => React.ReactNode;
  align?: "left" | "right" | "center";
};

type DataTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  emptyMessage?: string;
};

export default function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  emptyMessage = "No data available",
}: DataTableProps<T>) {
  return (
    <div
      style={{
        width: "100%",
        overflowX: "auto",
        borderRadius: "var(--radius)",
        border: "1px solid var(--border)",
      }}
    >
      <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 480 }}>
        <thead>
          <tr style={{ background: "var(--bg-elevated)" }}>
            {columns.map((col) => (
              <th
                key={String(col.key)}
                style={{
                  padding: "14px 20px",
                  textAlign: col.align ?? "left",
                  fontSize: 11,
                  fontWeight: 600,
                  color: "var(--text-secondary)",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  borderBottom: "1px solid var(--border)",
                  whiteSpace: "nowrap",
                }}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                style={{
                  padding: "48px 24px",
                  textAlign: "center",
                  color: "var(--text-secondary)",
                  fontSize: 14,
                }}
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr
                key={idx}
                className="group transition-all duration-200 hover:bg-gray-50/80"
                style={{
                  borderBottom: idx < data.length - 1 ? "1px solid #f3f4f6" : "none",
                }}
              >
                {columns.map((col) => (
                  <td
                    key={String(col.key)}
                    style={{
                      padding: "18px 20px",
                      fontSize: 13,
                      color: "var(--text-primary)",
                      textAlign: col.align ?? "left",
                      verticalAlign: "middle",
                      minHeight: 64,
                    }}
                  >
                    {col.render
                      ? col.render(row)
                      : String(row[col.key as keyof T] ?? "—")}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
