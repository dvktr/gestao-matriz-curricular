'use client'

import { Pie } from 'react-chartjs-2';
import { ArcElement, Chart as ChartJS, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface DisciplinePieProps {
  completedHours: number;
  totalHours: number;
}

const DisciplinePie: React.FC<DisciplinePieProps> = ({ completedHours, totalHours }) => {
  const percentage = completedHours >= 400 ? 100 : Math.round((completedHours / 400) * 100);
  const data = {
    labels: ['Concluído', 'Pendente'],
    datasets: [
      {
        data: [completedHours, totalHours],
        backgroundColor: ['#00E1A5', '#ddd'],
        borderColor: ['#00E1A5', '#ddd'],
      },
    ],
  };

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-md flex items-center gap-5 flex-col">
      <div className="text-black text-2xl font-bold">Horas em Disciplinas Optativas</div>
      <Pie data={data} />
      <p className="mt-2 text-xl font-semibold text-gray-700">
        {percentage}% concluído
      </p>
    </div>
  );
};

export default DisciplinePie;
