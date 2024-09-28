"use client";

import SimulationGrid from "@/components/SimulationGrid";
import Timetable from "@/components/Timetable";
import { Button } from "@/components/ui/button";
import { DisciplineProvider } from "@/context/DisciplineContext";
import { Printer } from "lucide-react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { PDFTimetable } from "@/components/PDFTimetable";
import { useEffect, useState } from "react";

export default function Simulacao() {
  const [isClient, setIsClient] = useState(false); // Adicione isso
  useEffect(() => {
    setIsClient(true); // Indica que estamos no cliente
  }, []);
  return (
    <DisciplineProvider>
      <div className="flex md:flex-row flex-col md:justify-around md:p-2 md:overflow-hidden">
        <div className="flex-col items-start">
          {isClient && (
            <PDFDownloadLink
              document={
                // O DisciplineProvider está aqui para garantir que o PDF também tenha acesso ao contexto
                <DisciplineProvider>
                  <PDFTimetable />
                </DisciplineProvider>
              }
              fileName="grade-horarios.pdf"
              className="text-black gap-2 font-bold mb-2 flex items-center"
            >
              {({ loading }) => (
                <Button>
                  <Printer />
                  {loading ? "Gerando PDF..." : "Compartilhar"}
                </Button>
              )}
            </PDFDownloadLink>
          )}

          <Timetable isPrint={false} />
        </div>
        <SimulationGrid />
      </div>
    </DisciplineProvider>
  );
}
