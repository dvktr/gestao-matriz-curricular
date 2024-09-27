"use client";

import { useState, useEffect } from "react";
import { IDiscipline, Timetable } from "@/types/discipline";
import { Check } from "lucide-react";
import { toast } from "sonner"; // Importando Sonner
import { useDisciplineContext } from "@/context/DisciplineContext";

const timeSlotMap: { [key: string]: string } = {
  "AB-M": "07:40~09:40",
  "CD-M": "10:00~12:00",
  "AB-T": "13:30~15:30",
  "CD-T": "15:50~17:50",
  "AB-N": "18:20~20:20",
  "CD-N": "20:40~22:40"
};

// Funções de utilidade para localStorage
const loadFromLocalStorage = (key: string) => {
  if (typeof window !== "undefined") {
    const storedData = localStorage.getItem(key);
    if (storedData) {
      return JSON.parse(storedData);
    }
  }
  return null;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const saveToLocalStorage = (key: string, value: any) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export default function SimulationGrid() {
  const [availableDisciplines, setAvailableDisciplines] = useState<IDiscipline[]>([]);
  const { selectedDisciplines, setSelectedDisciplines } = useDisciplineContext();

  useEffect(() => {
    const storedDisciplines = loadFromLocalStorage("disciplines");
    const storedSelected = loadFromLocalStorage("selectedDisciplines") || [];

    if (storedDisciplines) {
      const filteredDisciplines = storedDisciplines.filter((discipline: IDiscipline) => {
        const canTakeDiscipline =
          !discipline.attended &&
          discipline.pre_requiriments.every((req) =>
            storedDisciplines.some((d: IDiscipline) => d.code === req && d.attended)
          );
        return canTakeDiscipline;
      });
      setAvailableDisciplines(
        filteredDisciplines.sort((a: { semester: number }, b: { semester: number }) => a.semester - b.semester)
      );
      setSelectedDisciplines(storedSelected);
    }
  }, []);

  const handleSelectDiscipline = (discipline: IDiscipline, timetable: Timetable) => {
    const existingDisciplineIndex = selectedDisciplines.findIndex(
      (selected) => selected.code === discipline.code && selected.timetable.days === timetable.days
    );

    if (existingDisciplineIndex !== -1) {
      const updatedSelected = selectedDisciplines.filter((_, idx) => idx !== existingDisciplineIndex);
      setSelectedDisciplines(updatedSelected);
      return;
    }

    const hasSameCode = selectedDisciplines.some((selected) => selected.code === discipline.code);
    if (hasSameCode) {
      toast.error(`A disciplina ${discipline.name} já foi selecionada com outro horário.`);
      return;
    }

    const isConflicting = (selected: IDiscipline, newTimetable: Timetable) => {
      const selectedDays = selected.timetable.days.split(" "); // Separar os dias (ex: ["SEG", "QUA"])
      const newDays = newTimetable.days.split(" "); // Separar os dias da nova disciplina

      const selectedHours = selected.timetable.hours.split(" "); // Separar os horários (ex: ["AB-M", "CD-M"])
      const newHours = newTimetable.hours.split(" "); // Separar os horários da nova disciplina

      // Verifica se há algum dia em comum entre a disciplina selecionada e a nova
      for (let i = 0; i < selectedDays.length; i++) {
        const selectedDay = selectedDays[i];
        const selectedHour = selectedHours[i];

        for (let j = 0; j < newDays.length; j++) {
          const newDay = newDays[j];
          const newHour = newHours[j];

          // Se o dia e a hora coincidem, há um conflito
          if (selectedDay === newDay && selectedHour === newHour) {
            return true;
          }
        }
      }

      return false;
    };

    // Verifica se há conflito de horário com as disciplinas já selecionadas
    const conflictDiscipline = selectedDisciplines.find((selected) =>
      isConflicting(selected, timetable)
    );

    if (conflictDiscipline) {
      toast.error(`Conflito com a disciplina ${conflictDiscipline.name} - ${discipline.name}`);
    } else {
      const updatedSelected = [...selectedDisciplines, { ...discipline, timetable }];
      setSelectedDisciplines(updatedSelected);
    }
  };








  const isDisciplineSelected = (discipline: IDiscipline, timetable: Timetable) => {
    return selectedDisciplines.some(
      (selected) => selected.code === discipline.code && selected.timetable.days === timetable.days
    );
  };

  return (
    <div className="flex flex-col items-center justify-start bg-white p-3 rounded-xl h-[85vh] overflow-hidden">
      <h2 className="text-lg font-bold text-black mb-4">SELECIONAR DISCIPLINAS</h2>
      <div className="flex flex-col gap-4 w-full h-full overflow-y-auto">
        {availableDisciplines.map((discipline, index) => (
          discipline.timetables.length > 0 ? (
            discipline.timetables.map((timetable, tIndex) => (
              <div
                key={`${discipline.code}-${tIndex}-${timetable}`}
                className={`flex justify-between items-center p-4 rounded-lg shadow-md cursor-pointer bg-white text-gray-800 w-full`}
                onClick={() => handleSelectDiscipline(discipline, timetable)}
              >
                <div>
                  <p className="text-xs font-normal text-[#A0AEC0]">
                    {discipline.semester}º S - {discipline.workload}H - {timetable.days} - {timetable.hours}
                  </p>
                  <h3 className={`text-lg font-bold text-lightblue`}>{discipline.name}</h3>
                </div>
                <div
                  className={`flex justify-center items-center min-w-8 min-h-8 w-8 h-8 rounded-xl border-2 transition-all duration-300 ease-in-out border-primary ${isDisciplineSelected(discipline, timetable) ? "bg-primary" : "bg-white"
                    }`}
                >
                  {isDisciplineSelected(discipline, timetable) && <Check color="#ffffff" />}
                </div>
              </div>
            ))
          ) : (
            <div
              key={index}
              className={`flex justify-between items-center p-4 rounded-lg shadow-md cursor-pointer bg-white text-gray-800 w-full`}
              onClick={() => handleSelectDiscipline(discipline, { days: "N/A", hours: "N/A" })}
            >
              <div>
                <p className="text-xs font-normal text-[#A0AEC0]">
                  {discipline.semester}º SEMESTRE - {discipline.workload}H
                </p>
                <h3 className={`text-lg font-bold text-lightblue`}>{discipline.name}</h3>
              </div>
              <div
                className={`flex justify-center items-center min-w-8 min-h-8 w-8 h-8 rounded-xl border-2 transition-all duration-300 ease-in-out border-primary ${isDisciplineSelected(discipline, { days: "N/A", hours: "N/A" }) ? "bg-primary" : "bg-white"
                  }`}
              >
                {isDisciplineSelected(discipline, { days: "N/A", hours: "N/A" }) && <Check color="#ffffff" />}
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
}
