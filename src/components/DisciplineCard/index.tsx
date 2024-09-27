'use client'

import { Check } from 'lucide-react';

interface DisciplineCardProps {
  title: string;
  info: string;
  attended: boolean; 
  onActivate: () => void;
}

export default function DisciplineCard({ info, title, attended, onActivate }: DisciplineCardProps) {
  const handleClick = () => {
    onActivate(); // Agora ativa/desativa corretamente
  };

  return (
    <div
      onClick={handleClick}
      className={`flex justify-between items-center p-4 rounded-lg shadow-md cursor-pointer bg-white text-gray-800 max-w-lg`}
    >
      <div>
        <p className="text-sm font-bold text-black">{info}</p>
        <h3 className={`text-lg font-bold text-lightblue`}>{title}</h3>
      </div>
      <div
        className={`flex justify-center items-center min-w-8 min-h-8 w-8 h-8 rounded-xl border-2 transition-all duration-300 ease-in-out border-primary ${attended ? 'bg-primary' : 'bg-white'}`}
      >
        {attended && <Check color='#ffffff'/>}
      </div>
    </div>
  );
};
