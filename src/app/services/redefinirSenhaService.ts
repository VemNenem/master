import apiClient from "./apiClient";
import { AxiosError } from "axios";

export interface RedefinirSenhaPayload {
    currentPassword: string;
    password: string;
    passwordConfirmation: string;
}

interface ErrorResponse {
    error?: {
        message?: string;
    };
}

export async function redefinirSenha(
    data: RedefinirSenhaPayload
): Promise<{ success: boolean; message: string }> {
    try {
        await apiClient.post("/auth/change-password", data);

        return {
            success: true,
            message: "Senha alterada com sucesso!",
        };
    } catch (error) {
        console.error("Erro na requisição:", error);
        const axiosError = error as AxiosError<ErrorResponse>;
        const errorMessage = axiosError?.response?.data?.error?.message || "Erro ao redefinir a senha.";
        return {
            success: false,
            message: errorMessage,
        };
    }
}
