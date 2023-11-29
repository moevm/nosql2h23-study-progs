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


    // static async getAllEducationalPrograms() {

    // }
}