'use client'

import { useState, useEffect } from "react";
import { IDiscipline } from "@/types/discipline";
import { mockDisciplines } from "../../../mock/discipline";
import DisciplineGrid from "@/components/DisciplineGrid";
import Search from "@/components/Search";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const saveToLocalStorage = (key: string, value: any) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

const loadFromLocalStorage = (key: string) => {
  if (typeof window !== "undefined") {
    const storedData = localStorage.getItem(key);
    if (storedData) {
      return JSON.parse(storedData);
    }
  }
  return null;
};

export default function Configuracao() {
  const [disciplines, setDisciplines] = useState<IDiscipline[]>([]);
  const [filteredDisciplines, setFilteredDisciplines] = useState<IDiscipline[]>([]);

  useEffect(() => {
    const storedDisciplines = loadFromLocalStorage("disciplines");

    if (!storedDisciplines) {
      saveToLocalStorage("disciplines", mockDisciplines);
      setDisciplines(mockDisciplines);
      setFilteredDisciplines(mockDisciplines); // Set initially filtered disciplines
    } else {
      setDisciplines(storedDisciplines);
      setFilteredDisciplines(storedDisciplines); // Set initially filtered disciplines
    }
  }, []);

  const handleActivate = (index: number) => {
    const updatedDisciplines = [...disciplines];
    updatedDisciplines[index].attended = !updatedDisciplines[index].attended;

    setDisciplines(updatedDisciplines);
    setFilteredDisciplines(updatedDisciplines);
    saveToLocalStorage("disciplines", updatedDisciplines);
    saveToLocalStorage("selectedDisciplines", []);
  };

  const handleSearch = (query: string) => {
    const normalizeText = (text: string) => {
      return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };

    if (!query) {
      setFilteredDisciplines(disciplines);
    } else {
      const normalizedQuery = normalizeText(query.toLowerCase());
      const filtered = disciplines.filter((discipline) =>
        normalizeText(discipline.name.toLowerCase()).includes(normalizedQuery)
      );
      setFilteredDisciplines(filtered);
    }
  };

  const resetDisciplines = () => {
    saveToLocalStorage("disciplines", mockDisciplines);
    setDisciplines(mockDisciplines);
    setFilteredDisciplines(mockDisciplines);
    window.location.reload();
  }

  return (
    <div className="px-5 py-2">
      <div className="flex flex-row gap-4">
        <Search onSearch={handleSearch} />
        <Button onClick={resetDisciplines} className="text-black font-bold text-md">
          <RotateCcw size={22} className="mr-2 text-black" /> Resetar
        </Button>
      </div>
      
      <DisciplineGrid disciplines={filteredDisciplines} handleActivate={handleActivate} />
    </div>
  );
}
