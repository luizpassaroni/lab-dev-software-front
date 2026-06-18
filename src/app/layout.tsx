import "@/shared/styles/globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { QueryProvider } from "@/shared/providers/QueryProvider";
import { Header } from "@/shared/components/layout/Header";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const font = Inter({
  variable: "--font-inter",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Plot Twist",
    template: "%s | Plot Twist",
  },
  description:
    "Busque sua série ou seu filme favorito. Encontre informações detalhadas e avalie da forma que deseja.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${font.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <NuqsAdapter>
          <QueryProvider>
            <Header />
            {children}
          </QueryProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
