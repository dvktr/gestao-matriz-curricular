import { IDiscipline } from "@/types/discipline";
import DisciplineCard from "../DisciplineCard";

interface DisciplineGridProps {
  disciplines: IDiscipline[];
  handleActivate: (index: number) => void;
}

export default function DisciplineGrid({
  disciplines,
  handleActivate,
}: DisciplineGridProps) {
  // Agrupar disciplinas por semestre
  const groupedBySemester = disciplines.reduce((acc, discipline) => {
    const { semester } = discipline;
    if (!acc[semester]) {
      acc[semester] = [];
    }
    acc[semester].push(discipline);
    return acc;
  }, {} as Record<number, IDiscipline[]>);

  return (
    <div className="space-y-8">
      {Object.keys(groupedBySemester).map((semester) => (
        <div key={semester}>
          <h2 className="text-xl font-semibold mt-8">{semester}º Semestre</h2>
          <hr className="border-gray-300 my-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {groupedBySemester[semester].map((discipline) => {
              // Usar o índice real do array original
              const originalIndex = disciplines.findIndex(d => d.code === discipline.code);

              return (
                <DisciplineCard
                  info={`${discipline.semester}º SEMESTRE - ${discipline.workload}H - ${discipline.code}`}
                  title={discipline.name}
                  key={discipline.code} // Usar código como chave
                  attended={discipline.attended}
                  onActivate={() => handleActivate(originalIndex)} // Passar o índice real
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
