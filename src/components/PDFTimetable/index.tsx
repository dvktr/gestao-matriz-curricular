import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import { IDiscipline } from "@/types/discipline";
import { useDisciplineContext } from "@/context/DisciplineContext";

const dayMap = {
  "SEG": 1,
  "TER": 2,
  "QUA": 3,
  "QUI": 4,
  "SEX": 5
};

const timeSlotMap = {
  "AB-M": "07:40~09:40",
  "CD-M": "10:00~12:00",
  "AB-T": "13:30~15:30",
  "CD-T": "15:50~17:50",
  "AB-N": "18:20~20:20",
  "CD-N": "20:40~22:40"
};

Font.register({
  family: 'Barlow Condensed Medium Italic',
  src: `${process.env.NEXT_PUBLIC_API_URL}fonts/BarlowCondensed-MediumItalic.ttf`, 
});

const daysOfWeek = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"];

const styles = StyleSheet.create({
  page: { 
    padding: 40,
    position: 'relative',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#00E1A5',
    background: 'linear-gradient(180deg, #00E1A5, #0B9890)',
    zIndex: -1
  },
  title: { 
    fontSize: 48,
    color: '#fff',
    fontFamily: 'Barlow Condensed Medium Italic',
    marginBottom: 10, 
    textAlign: 'center' 
  },
  table: { 
    display: 'table',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 10,
    padding: 10,
    width: 'auto', 
    marginTop: 10 
  },
  row: { 
    flexDirection: 'row' 
  },
  cell: {
    color: '#fff',
    padding: 6,
    border: '1px solid white', 
  },
  header: { 
    color: '#fff',
    alignItems: 'center',
    justifyContent: 'center', 
    fontWeight: 'bold' 
  }
});

export const PDFTimetable = () => {
  const { selectedDisciplines } = useDisciplineContext();

  const getTimetableForCell = (dayIndex, timeSlot) => {
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
    <Document>
      <Page size="A4" style={styles.page} orientation='landscape'>
        <Text style={styles.title}>CONFIRA MINHA GRADE DE HORÁRIOS!</Text>
        <View style={styles.table}>
          <View style={[styles.row, styles.header]}>
            <Text style={[styles.cell, { width: '20%' }]}>Horário</Text>
            {daysOfWeek.map((day, index) => (
              <Text key={index} style={[styles.cell, { width: '16%' }]}>{day}</Text>
            ))}
          </View>
          {Object.values(timeSlotMap).map((timeSlot, index) => (
            <View key={index} style={styles.row}>
              <Text style={[styles.cell, { width: '20%' }]}>{timeSlot}</Text>
              {daysOfWeek.map((_, dayIndex) => {
                const disciplineAtThisTime = getTimetableForCell(dayIndex, timeSlot);
                return (
                  <Text key={dayIndex} style={[styles.cell, { width: '16%' }]}>
                    {disciplineAtThisTime ? `${disciplineAtThisTime.name} (${disciplineAtThisTime.code})` : ""}
                  </Text>
                );
              })}
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};
