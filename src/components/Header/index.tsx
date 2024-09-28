'use client'

import React, { useState } from "react";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu } from "lucide-react";

const routes: Record<string, string> = {
  '/': 'Visão Geral',
  '/configuracao': 'Configurar Disciplinas',
  '/simulacao': 'Simule sua Matrícula',
  '/documentacao': 'Visualização da Documentação',
}

export default function Header() {
  const pathname = usePathname();
  const [openHeader, setOpenHeader] = useState(false)

  function toggleHeaderMobile() {
    if (openHeader === false) {
      setOpenHeader(true)
    } else {
      setOpenHeader(false)
    }
  }

  return (
    <header className="w-full bg-gray p-4 flex items-center justify-between shadow-md">
      { }
      <div className="md:hidden flex flex-col justify-between w-full">
        <div className="flex w-full justify-between">
          <Menu className="md:hidden text-2xl" onClick={toggleHeaderMobile} />
          <span className="font-normal text-black">GMC{"/"}{routes[pathname]}</span>
        </div>
        <ul className={`md:flex md:pt-0 pt-4 md:flex-row w-full md:space-y-0 space-y-8 text-black flex ${openHeader ? "flex-col" : "hidden"} `}>
          <Link onClick={() => setOpenHeader(false)} href={"/"}>
            <li>VISÃO GERAL</li>
          </Link>
          <Link onClick={() => setOpenHeader(false)} href={"/configuracao"}>
            <li>CONFIGURAR</li>
          </Link>
          <Link onClick={() => setOpenHeader(false)} href={"/simulacao"}>
            <li>SIMULACAO</li>
          </Link>
          <Link onClick={() => setOpenHeader(false)} href={"/documentacao"}>
            <li>DOCUMENTAÇÃO</li>
          </Link>
        </ul>
      </div>
      <div className="text-2xl md:block hidden">
        <span className="font-semibold text-[#A0AEC0]">GMC</span>
        <span className="font-normal text-black ml-2 mr-2">/</span>
        <span className="font-normal text-black">{routes[pathname]}</span>
      </div>
    </header>
  );
}
