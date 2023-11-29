import { axiosInstance } from "./axios";

export class DocumentsAPIs {

    static async getAllTrainingPlans() {
        return axiosInstance.get('/trainingPlans');
    }

    static async getAllEducationalPrograms() {
        return axiosInstance.get('/EducationalProgram');
    }



    // static async getAllEducationalPrograms() {

    // }
}