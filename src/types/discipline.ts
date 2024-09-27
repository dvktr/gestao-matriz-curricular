export interface IDiscipline {
  name: string
  code: string
  attended: boolean;
  semester: number
  workload: number
  type: 'OBG' | 'OPT'
  timetables: Timetable[]
  pre_requiriments: string[]
}

export interface Timetable {
  days: string
  hours: string
}
