import axios from "axios";
import { axiosInstance } from "./axios";
import IUserProfile from "../interfaces/IUserProfile.interface";

export class AuthorizationAPIs {

    static async getID(email: string, password: string): Promise<{ data: string; status: number } | undefined> {

        //return { data: "id", status: 200 };
        return axiosInstance.get(`/getUserId?email=${email}&password=${password}`);
        
        /*return await axiosInstance.post(`/auth/login`, {
            email,
            password,
        })
            .then(({ data, status }: any) => ({ data: data.token, status }))
            .catch((error: unknown) => {
                if (axios.isAxiosError(error)) {
                    if (error.response) {
                        return {
                            data: error.response.data.message,
                            status: error.response.status,
                        };
                    }
                } else {
                    throw new Error();
                }
            });*/
    }

    static async getProfile(): Promise<{
        data: IUserProfile;
        status: number;
    }> {

        const profile: IUserProfile = {
            name: "Vlad P",
            role: "student"
        }

        return { data: profile, status: 200 };

        return await axiosInstance.get('/profile')
            .then(({ data, status }) => {
                if ([200, 201, 204, 304].includes(status)) {
                    return { data, status };
                }
                throw new Error(data.message);
            })
            .catch((error: unknown) => {
                if (axios.isAxiosError(error)) {
                    throw new Error(error.message);
                } else {
                    throw new Error();
                }
            });
    }

}