import axios, { AxiosError, AxiosInstance } from "axios";

export abstract class BaseAPI {
    protected baseUrl: string;
    private axiosInstance: AxiosInstance | any = null;

    constructor(baseUrl?: string) {
        this.baseUrl = baseUrl ?? process.env.REACT_APP_API_BASE_URL ?? "/";
        this.axiosInstance = axios.create({});
        // this.enableInterceptors();
    }

    private enableInterceptors() {
        this.axiosInstance?.interceptors.response.use(
            this.getSuccessResponseHandler(),
            this.getErrorResponseHandler()
        )
    }

    private getSuccessResponseHandler() {
        return (response: any) => {
            return response;
        }
    }
    
    private getErrorResponseHandler() {
        return async (error: any) => {
            // const axiosError = error as AxiosError;
            
            return Promise.reject({...error});
        }
    }
}