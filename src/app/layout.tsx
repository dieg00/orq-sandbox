import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "orq-sandbox",
  description: "Repo de testeo del orquestador",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
