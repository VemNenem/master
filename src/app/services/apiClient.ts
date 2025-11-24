import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from "axios";
import { toast } from "react-toastify";

interface ErrorResponse {
    error?: string;
    message?: string;
    detail?: string;
}

export const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "https://api.vemnenem.app.br/api",
    timeout: 10000,
});

apiClient.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        const accessToken = await localStorage.getItem("token");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        if (config.data !== undefined && !config.headers["Content-Type"]) {
            config.headers["Content-Type"] = "application/json";
        }

        return config;
    },
    (error: AxiosError) => Promise.reject(error)
);

apiClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError<ErrorResponse>) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
            localStorage.removeItem("token");
            localStorage.removeItem("refresh");

            const errorData = error.response?.data;
            const errorMessage =
                errorData?.error ||
                errorData?.message ||
                errorData?.detail;

            toast.error(errorMessage || "Sessão expirada. Faça login novamente.");

            // Redireciona para a tela de login
            if (typeof window !== "undefined") {
                window.location.href = "/login-admin";
            }
        }

        return Promise.reject(error);
    }
);

export default apiClient;
