import apiClient from "./apiClient";
import { AxiosError } from "axios";

export interface Termo {
    id: number;
    documentId: string;
    description: string;
    type: "privacy" | "use";
    createdAt: string;
    updatedAt: string;
}

export interface TermoFormData {
    description: string;
}

export type TermoType = "privacy" | "use";

interface ErrorResponse {
    error?: {
        message?: string;
    };
}

/**
 * Lista os termos por tipo
 * @param type - "privacy" para políticas de privacidade ou "use" para termos de uso
 */
export async function listarTermos(type: TermoType): Promise<Termo | null> {
    try {
        const response = await apiClient.get<Termo>(`/listTerms?type=${type}`);
        return response.data || null;
    } catch (error) {
        console.error("Erro na requisição:", error);
        return null;
    }
}

/**
 * Atualiza os termos por tipo
 * @param type - "privacy" para políticas de privacidade ou "use" para termos de uso
 * @param formData - Dados do formulário com a descrição
 */
export async function atualizarTermos(
    type: TermoType,
    formData: TermoFormData
): Promise<{ success: boolean; message?: string }> {
    try {
        await apiClient.put(`/updateTerms?type=${type}`, formData);
        return { success: true };
    } catch (error) {
        console.error("Erro na requisição:", error);
        const axiosError = error as AxiosError<ErrorResponse>;
        const errorMessage = axiosError?.response?.data?.error?.message || "Erro de rede ou servidor indisponível.";
        return { success: false, message: errorMessage };
    }
}