// DisciplineContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { IDiscipline } from '@/types/discipline';

interface DisciplineContextType {
  selectedDisciplines: IDiscipline[];
  setSelectedDisciplines: React.Dispatch<React.SetStateAction<IDiscipline[]>>;
}

const DisciplineContext = createContext<DisciplineContextType | undefined>(undefined);

export const DisciplineProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [selectedDisciplines, setSelectedDisciplines] = useState<IDiscipline[]>(() => {
      const storedData = localStorage.getItem('selectedDisciplines');
      return storedData ? JSON.parse(storedData) : [];
    });
  
    useEffect(() => {
      localStorage.setItem('selectedDisciplines', JSON.stringify(selectedDisciplines));
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
