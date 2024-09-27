'use client'

import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface SemesterProgressLineProps {
  semesters: { semester: string; completedHours: number; totalHours: number }[];
}

const SemesterProgressLine: React.FC<SemesterProgressLineProps> = ({ semesters }) => {
  const data = {
    labels: semesters.map(s => s.semester),
    datasets: [
      {
        label: 'Horas concluídas',
        data: semesters.map(s => s.completedHours),
        borderColor: '#4CAF50',
        backgroundColor: '#4CAF50',
      },
      {
        label: 'Total de horas',
        data: semesters.map(s => s.totalHours),
        borderColor: '#ddd',
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
      <Line data={data} options={options} />
    </div>
  );
};

export default SemesterProgressLine;
