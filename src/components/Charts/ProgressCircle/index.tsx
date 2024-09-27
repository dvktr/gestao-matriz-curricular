'use client'

import { ArcElement, Chart as ChartJS, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface ProgressCircleProps {
  title: string;
  completedHours: number;
  totalHours: number;
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({ title, completedHours, totalHours }) => {
  const percentage = Math.round((completedHours / totalHours) * 100);

  const data = {
    datasets: [
      {
        data: [completedHours, totalHours - completedHours],
        backgroundColor: ['#00E1A5', '#ddd'],
        borderColor: ['#00E1A5', '#ddd'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="flex flex-col items-center md:w-full p-4 bg-white rounded-lg shadow-md">
      <div className="text-2xl text-black font-bold">{title}</div>
      <Doughnut data={data} />
      <p className="mt-2 text-xl font-semibold text-gray-700">
        {percentage}% concluído
      </p>
      <p className="text-sm text-gray-500">
        {completedHours}h de {totalHours}h
      </p>
    </div>
  );
};

export default ProgressCircle;