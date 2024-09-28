'use client'

import { useEffect } from "react";
import { IDiscipline } from "@/types/discipline";
import { useDisciplineContext } from "@/context/DisciplineContext";
import { Printer } from "lucide-react";
import { Button } from "../ui/button";

const dayMap: { [key: string]: number } = {
  "SEG": 1,
  "TER": 2,
  "QUA": 3,
  "QUI": 4,
  "SEX": 5
};

const timeSlotMap: { [key: string]: string } = {
  "AB-M": "07:40~09:40",
  "CD-M": "10:00~12:00",
  "AB-T": "13:30~15:30",
  "CD-T": "15:50~17:50",
  "AB-N": "18:20~20:20",
  "CD-N": "20:40~22:40"
};

const daysOfWeek = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"];

interface TimetableProps {
  isPrint: boolean;
}

export default function Timetable({ isPrint }: TimetableProps) {
  const { selectedDisciplines } = useDisciplineContext();

  const getTimetableForCell = (dayIndex: number, timeSlot: string) => {
    for (const discipline of selectedDisciplines) {
      const days = discipline.timetable.days.split(" ");
      const hours = discipline.timetable.hours.split(" ");

      for (let i = 0; i < days.length; i++) {
        const day = days[i];
        const hour = hours[i];

        if (dayMap[day] === dayIndex + 1 && timeSlotMap[hour] === timeSlot) {
          return discipline;
        }
      }
    }
    return null;
  };

  return (
    <div className="flex-grow w-full mr-5 md:py-0 p-5">
      <div id="timetable-table" className="overflow-auto">
        <table className={`w-full ${isPrint ? 'text-white' : 'text-black'} table-auto border-collapse border border-gray-300`}>
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Horário</th>
              {daysOfWeek.map((day, index) => (
                <th key={index} className="border border-gray-300 p-2">{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.values(timeSlotMap).map((timeSlot, index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-2">{timeSlot}</td>
                {daysOfWeek.map((_, dayIndex) => {
                  const disciplineAtThisTime = getTimetableForCell(dayIndex, timeSlot);
                  return (
                    <td key={dayIndex} className="border border-gray-300 p-2 text-center">
                      {disciplineAtThisTime ? (
                        <>
                          <div>{disciplineAtThisTime.name}</div>
                          <div>{disciplineAtThisTime.code}</div>
                        </>
                      ) : null}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
