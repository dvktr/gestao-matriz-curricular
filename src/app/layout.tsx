import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Gestão Matriz Curricular",
  description: "Gerencie sua matriz curricular",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray flex flex-col md:flex-row">
        <Sidebar />
        <main className="flex-grow md:ml-64 md:px-0">
          <Header />
          {children}
        </main>
        <Toaster position="top-right" duration={2 * 1000} />
      </body>
    </html>
  );
}
