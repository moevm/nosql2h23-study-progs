import { axiosInstance } from "./axios";

export class DocumentsAPIs {

    static async getAllTrainingPlans() {
        return axiosInstance.get('/trainingPlans');
    }

    static async getAllEducationalPrograms() {
        return axiosInstance.get('/EducationalPrograms');
    }

    static async getEducationalProgramStats(EdName: string) {
        return axiosInstance.get(`/EducationalProgramStats/${EdName}`);
    }
    
    static async getPlanComparison(plan1: string, plan2: string) {
        return axiosInstance.get(`/TrainingPlanComparison/${plan1}/${plan2}`);
    }

    static async getCommonAndDifferentDisciplines(plan1: string, plan2: string) {
        return axiosInstance.get(`/CommonDisciplines/${plan1}/${plan2}`);
    }
    // static async getAllEducationalPrograms() {

    // }
}