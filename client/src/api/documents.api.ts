import { AxiosResponse } from "axios";
import { axiosInstance } from "./axios";
import { IEducationalProgramItem } from "../interfaces/educationalProgramItem.interface";
import { ITrainingPlanListItem } from "../interfaces/trainingPlanListItem.interface";
import { ITrainingPlanStatItem } from "../interfaces/ITrainingPlanStatItem.interface";
import { IEducationalProgramStat } from "../interfaces/EducationalProgramStat.interface";
import { ITrainingPlanComparison } from "../interfaces/ITrainingPlanComparison.interface";
import { ICommonDisciplines } from "../interfaces/ICommonDisciplines.interface";

export class DocumentsAPIs {

    static async getAllTrainingPlans(): Promise<AxiosResponse<ITrainingPlanListItem[]>> {
        return axiosInstance.get('/trainingPlans');
    }

    static async getTrainingPlanStats(): Promise<AxiosResponse<ITrainingPlanStatItem[]>> {
        return axiosInstance.get('/TrainingPlansStats');
    }

    static async getAllEducationalPrograms(): Promise<AxiosResponse<IEducationalProgramItem[]>> {
        return axiosInstance.get('/EducationalPrograms');
    }

    static async getEducationalProgramStats(EdName: string): Promise<AxiosResponse<IEducationalProgramStat[]>> {
        return axiosInstance.get(`/EducationalProgramStats/${EdName}`);
    }
    
    static async getPlanComparison(plan1: string, plan2: string): Promise<AxiosResponse<ITrainingPlanComparison[]>> {
        return axiosInstance.get(`/TrainingPlanComparison/${plan1}/${plan2}`);
    }

    static async getCommonAndDifferentDisciplines(plan1: string, plan2: string): Promise<AxiosResponse<ICommonDisciplines[]>> {
        return axiosInstance.get(`/CommonDisciplines/${plan1}/${plan2}`);
    }

    static async changeEducationalProgram(ProgramName: string, stats: IEducationalProgramStat) {
        return axiosInstance.put(`/ChangeEducationalProgram/${ProgramName}`, stats);
    }

    static async createEducationalProgram(info: Object) {
        return axiosInstance.post(`/CreateEducationalProgram`, info);
    }

    static async createTrainingPlan(info: Object) {
        return axiosInstance.post(`/CreateTrainingPlan`, info);
    }

}