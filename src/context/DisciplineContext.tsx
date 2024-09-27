import React, { createContext, useContext, useState, useEffect } from 'react';
import { IDiscipline } from '@/types/discipline';

interface DisciplineContextType {
  selectedDisciplines: IDiscipline[];
  setSelectedDisciplines: React.Dispatch<React.SetStateAction<IDiscipline[]>>;
}

const DisciplineContext = createContext<DisciplineContextType | undefined>(undefined);

export const DisciplineProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedDisciplines, setSelectedDisciplines] = useState<IDiscipline[]>([]);

  useEffect(() => {
    // Garante que o localStorage seja acessado apenas no cliente
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem('selectedDisciplines');
      if (storedData) {
        setSelectedDisciplines(JSON.parse(storedData));
      }
    }
  }, []);

  useEffect(() => {
    // Atualiza o localStorage quando selectedDisciplines mudar
    if (typeof window !== "undefined") {
      localStorage.setItem('selectedDisciplines', JSON.stringify(selectedDisciplines));
    }
  }, [selectedDisciplines]);

  return (
    <DisciplineContext.Provider value={{ selectedDisciplines, setSelectedDisciplines }}>
      {children}
    </DisciplineContext.Provider>
  );
};

export const useDisciplineContext = () => {
  const context = useContext(DisciplineContext);
  if (!context) {
    throw new Error('useDisciplineContext must be used within a DisciplineProvider');
  }
  return context;
};
