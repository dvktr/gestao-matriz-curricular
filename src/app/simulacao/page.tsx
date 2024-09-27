"use client";

import SimulationGrid from "@/components/SimulationGrid";
import Timetable from "@/components/Timetable";
import { DisciplineProvider } from "@/context/DisciplineContext"; // Importe o contexto

export default function Simulacao() {
  return (
    <DisciplineProvider>
      <div className="flex justify-around p-2 overflow-hidden">
        <Timetable />
        <SimulationGrid />
      </div>
    </DisciplineProvider>
  );
}
