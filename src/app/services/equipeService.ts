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

const API_BASE = "https://api.vemnenem.app.br/api";

const getToken = () => localStorage.getItem("token"); // ou sessionStorage

export async function carregarUsuarios(): Promise<Usuario[]> {
    try {
        const response = await fetch(`${API_BASE}/listMasters`, {
            headers: {
                "Authorization": `Bearer ${getToken()}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            console.error("Erro ao carregar usuários:", response.status);
            return [];
        }

        const data = await response.json();
        return data.users || [];
    } catch (error) {
        console.error("Erro na requisição:", error);
        return [];
    }
}


export async function criarUsuario(formData: FormData): Promise<{ success: boolean; message?: string }> {
    try {
        const response = await fetch(`${API_BASE}/createMaster`, {
            method: "POST",
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


export async function deletarUsuario(documentId: string): Promise<boolean> {
    try {
        const response = await fetch(
            `${API_BASE}/deleteMaster?userDocumentId=${documentId}`,
            {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${getToken()}`,
                    "Content-Type": "application/json",
                },
            }
        );

        if (!response.ok) {
            console.error("Erro ao deletar usuário:", response.status);
            return false;
        }

        return true;
    } catch (error) {
        console.error("Erro na requisição:", error);
        return false;
    }
}
