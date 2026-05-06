import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BuildBoard Admin",
  description: "Modern SaaS Admin Dashboard for Construction Business Management",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
