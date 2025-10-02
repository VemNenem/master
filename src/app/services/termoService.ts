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

const API_BASE = "https://api.vemnenem.app.br/api";

const getToken = () => localStorage.getItem("token"); // ou sessionStorage

/**
 * Lista os termos por tipo
 * @param type - "privacy" para políticas de privacidade ou "use" para termos de uso
 */
export async function listarTermos(type: TermoType): Promise<Termo | null> {
    try {
        const response = await fetch(`${API_BASE}/listTerms?type=${type}`, {
            headers: {
                "Authorization": `Bearer ${getToken()}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            console.error("Erro ao carregar termos:", response.status);
            return null;
        }

        const data = await response.json();
        return data || null;
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
        const response = await fetch(`${API_BASE}/updateTerms?type=${type}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${getToken()}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            let errorMessage = `Erro ${response.status}`;
            try {
                const errorData = await response.json();
                errorMessage = errorData?.error?.message || errorMessage;
            } catch {
                // se não conseguir parsear o json, fica só o status
            }

            return { success: false, message: errorMessage };
        }

        return { success: true };
    } catch (error) {
        console.error("Erro na requisição:", error);
        return { success: false, message: "Erro de rede ou servidor indisponível." };
    }
}