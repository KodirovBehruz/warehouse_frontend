import axios, {AxiosInstance} from "axios";

export class ApiConnector {
    connector: AxiosInstance
    constructor(baseUrl: string) {
        this.connector = axios.create({
            baseURL: baseUrl,
            withCredentials: true
        })
    }
}