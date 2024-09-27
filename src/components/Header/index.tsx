'use client'

import React from "react";

import { usePathname } from "next/navigation";

const routes: Record<string, string> = {
    '/': 'Visão Geral',
    '/configuracao': 'Configurar Disciplinas',
    '/simulacao': 'Simule sua Matrícula',
    '/documentacao': 'Visualização da Documentação',
}

export default function Header() {
    const pathname = usePathname();
    console.log(pathname)
  return (
    <header className="w-full bg-gray p-4 flex items-center justify-between shadow-md">
        {}
      <div className="text-2xl">
        <span className="font-semibold text-[#A0AEC0]">GMC</span>
        <span className="font-normal text-black ml-2 mr-2">/</span>
        <span className="font-normal text-black">{routes[pathname]}</span>
      </div>
    </header>
  );
}
