'use client'

import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface DisciplineBarChartProps {
  disciplines: { name: string; completedHours: number; totalHours: number }[];
}

const DisciplineBar: React.FC<DisciplineBarChartProps> = ({ disciplines }) => {
  const data = {
    labels: disciplines.map(d => d.name),
    datasets: [
      {
        label: 'Concluídas',
        data: disciplines.map(d => d.completedHours),
        backgroundColor: '#00E1A5',
      },
      {
        label: 'Total',
        data: disciplines.map(d => d.totalHours),
        backgroundColor: '#ddd',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-md">
      <div className="text-black font-bold text-2xl">Disciplinas por semestre</div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default DisciplineBar;
