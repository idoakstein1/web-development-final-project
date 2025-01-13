import axios from 'axios';

let axiosInstance: Axios.AxiosInstance;

export const getAxios = () => {
    if (axiosInstance) {
        return axiosInstance;
    }

    axiosInstance = axios.create({
        baseURL: 'http://localhost:8080',
    });

    return axiosInstance;
};
