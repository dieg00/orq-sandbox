import type { Metadata } from "next";
import { Pie } from "@/components/Pie";
import { scriptTema } from "@/lib/tema";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "orq-sandbox", template: "%s · orq-sandbox" },
  description: "Repo de testeo del orquestador",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" data-tema="claro" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: scriptTema }} />
      </head>
      <body className="min-h-screen antialiased">{children}<Pie /></body>
    </html>
  );
}
