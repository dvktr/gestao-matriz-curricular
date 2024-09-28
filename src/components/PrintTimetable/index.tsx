'use client'

import { DisciplineProvider } from "@/context/DisciplineContext";
import Timetable from "../Timetable";

export default function PrintTimetable() {
  return (
    <DisciplineProvider>
      <div className="bg-timetable-bg bg-cover bg-center h-auto flex flex-col items-center justify-between p-6 gap-4">
        <h1 className="font-condensed text-5xl text-white">
            CONFIRA MINHA GRADE DE HORÁRIOS!
        </h1>
        <div className="rounded-lg w-4/5 h-5/6 bg-black/10 p-4">
          <Timetable isPrint={true}/>
        </div>
      </div>
    </DisciplineProvider>
  );
}
