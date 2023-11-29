export interface ITrainingPlanComparison {
    Discipline: string,
    Plan1: {
        TotalLaborHours: number,
        PracticeHours: number,
        LectureHours: number,
        LaboratoryHours: number,
    },
    Plan2: {
        TotalLaborHours: number,
        PracticeHours: number,
        LectureHours: number,
        LaboratoryHours: number,
    },
}