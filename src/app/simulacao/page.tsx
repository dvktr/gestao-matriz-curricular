"use client";

import SimulationGrid from "@/components/SimulationGrid";
import Timetable from "@/components/Timetable";
import { DisciplineProvider } from "@/context/DisciplineContext"; // Importe o contexto

export default function Simulacao() {
  return (
    <DisciplineProvider>
      <div className="flex md:flex-row flex-col md:justify-around md:p-2 md:overflow-hidden">
        <Timetable />
        <SimulationGrid />
      </div>
    </DisciplineProvider>
  );
}
