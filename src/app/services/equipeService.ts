import apiClient from "./apiClient";
import { AxiosError } from "axios";

export interface Usuario {
    documentId: string;
    username: string;
    email: string;
    id: number;
}

export interface FormData {
    name: string;
    email: string;
    password: string;
}

interface ErrorResponse {
    error?: {
        message?: string;
    };
}

export async function carregarUsuarios(): Promise<Usuario[]> {
    try {
        const response = await apiClient.get<{ users: Usuario[] }>("/listMasters");
        return response.data.users || [];
    } catch (error) {
        console.error("Erro na requisição:", error);
        return [];
    }
}


export async function criarUsuario(formData: FormData): Promise<{ success: boolean; message?: string }> {
    try {
        await apiClient.post("/createMaster", formData);
        return { success: true };
    } catch (error) {
        console.error("Erro na requisição:", error);
        const axiosError = error as AxiosError<ErrorResponse>;
        const errorMessage = axiosError?.response?.data?.error?.message || "Erro de rede ou servidor indisponível.";
        return { success: false, message: errorMessage };
    }
}


export async function deletarUsuario(documentId: string): Promise<boolean> {
    try {
        await apiClient.delete(`/deleteMaster?userDocumentId=${documentId}`);
        return true;
    } catch (error) {
        console.error("Erro na requisição:", error);
        return false;
    }
}
