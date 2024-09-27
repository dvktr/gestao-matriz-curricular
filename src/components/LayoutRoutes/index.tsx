'use client'

import { usePathname } from "next/navigation";
import { Box, House, Settings } from "lucide-react";
import Link from "next/link";

export default function LayoutRoutes() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col space-y-4 w-full">
      <Link href="/" legacyBehavior>
        <a className={`flex items-center p-2 rounded-lg ${pathname === "/" ? "bg-[#15CA9A]" : ""}`}>
          <div className="w-10 h-10 bg-white rounded-lg flex justify-center items-center">
            <House size={28} strokeWidth={2} color="#00e1a5" />
          </div>
          <div className="font-bold text-lg ml-2">Visão Geral</div>
        </a>
      </Link>
      <Link href="/configuracao" legacyBehavior>
        <a className={`flex items-center p-2 rounded-lg ${pathname === "/configuracao" ? "bg-[#15CA9A]" : ""}`}>
          <div className="w-10 h-10 bg-white rounded-lg flex justify-center items-center">
            <Settings size={28} strokeWidth={2} color="#00e1a5" />
          </div>
          <div className="font-bold text-lg ml-2">Configurar</div>
        </a>
      </Link>
      <Link href="/simulacao" legacyBehavior>
        <a className={`flex items-center p-2 rounded-lg ${pathname === "/simulacao" ? "bg-[#15CA9A]" : ""}`}>
          <div className="w-10 h-10 bg-white rounded-lg flex justify-center items-center">
            <Box size={28} strokeWidth={2} color="#00e1a5" />
          </div>
          <div className="font-bold text-lg ml-2">Simulação</div>
        </a>
      </Link>
    </div>
  );
}
