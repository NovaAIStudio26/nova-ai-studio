import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NOVA AI Studio",
  description: "A professional AI-powered movie production studio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
