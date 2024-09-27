"use client";

import { useEffect, useState } from "react";
import DisciplineBar from "../Charts/DisciplineBar";
import ProgressCircle from "../Charts/ProgressCircle";
import { IDiscipline } from "@/types/discipline";

export default function DisciplineChart() {
  const [disciplines, setDisciplines] = useState<IDiscipline[]>([]);
  const [completedHours, setCompletedHours] = useState(0);
  const [completedHoursOpt, setCompletedHoursOpt] = useState(0);
  const [totalHours, setTotalHours] = useState(0);

  useEffect(() => {
    // Recuperando disciplinas do localStorage
    const storedDisciplines = localStorage.getItem("disciplines");
    if (storedDisciplines) {
      const parsedDisciplines: IDiscipline[] = JSON.parse(storedDisciplines);
      setDisciplines(parsedDisciplines);

      // Calculando as horas concluídas e totais
      let completed = 0;
      let total = 0;
      let completedOpt = 0;

      // Agrupando disciplinas por código ou nome
      const uniqueDisciplines = parsedDisciplines.reduce((acc, discipline) => {
        const key = discipline.code; // ou discipline.name, dependendo do que você quiser usar como identificador
        if (!acc[key]) {
          acc[key] = {
            ...discipline,
            workload: 0,
            attended: false,
          };
        }
        acc[key].workload += discipline.workload;
        if (discipline.attended) {
          acc[key].attended = true; // Se qualquer uma das instâncias da disciplina foi atendida, marque como atendida
        }
        return acc;
      }, {} as Record<string, IDiscipline>);

      const finalDisciplines = Object.values(uniqueDisciplines);

      // Calculando horas
      finalDisciplines.forEach((discipline) => {
        total += discipline.workload;
        if (discipline.attended) {
          completed += discipline.workload;

          if (discipline.type == "OPT") {
            completedOpt += discipline.workload;
          }
        }
      });

      setCompletedHours(completed);
      setTotalHours(total);
      setDisciplines(finalDisciplines);
      setCompletedHoursOpt(completedOpt);
    }
  }, []);
  const countDisciplinesPerSemester: { total: number; completed: number }[] =
    [];

  disciplines.map((disciplines) => {
    if (!countDisciplinesPerSemester[disciplines.semester]) {
      countDisciplinesPerSemester[disciplines.semester] = {
        total: 0,
        completed: 0,
      };
    }
    if (disciplines.type == "OBG") {
      const actualDiscipline =
        countDisciplinesPerSemester[disciplines.semester];
      countDisciplinesPerSemester[disciplines.semester] = {
        total: (actualDiscipline.total += disciplines.workload),
        completed: disciplines.attended
          ? (actualDiscipline.completed += disciplines.workload)
          : actualDiscipline.completed,
      };
    }
  });

  return (
    <div className="md:w-11/12 md:py-2 md:px-0 px-4">
      <div className="flex md:flex-row flex-col gap-8 items-start justify-between mb-4">
        <ProgressCircle
          title="Progresso Geral do Curso"
          completedHours={completedHours}
          totalHours={totalHours}
        />
        <ProgressCircle
          title="Horas em Disciplinas Optativas"
          completedHours={completedHoursOpt}
          totalHours={400}
        />
      </div>
      <div className="md:py-0 py-4">
        <DisciplineBar
          disciplines={countDisciplinesPerSemester
            .filter((_, i) => i !== 0)
            .map((discipline, i) => ({
              name: `${i + 1}º`,
              completedHours: discipline.completed,
              totalHours: discipline.total,
            }))}
        />
      </div>
    </div>
  );
}
