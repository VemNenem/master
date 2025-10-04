const API_BASE = "https://api.vemnenem.app.br/api";

const getToken = () => localStorage.getItem("token");

export interface User {
    username: string;
    id: number;
    documentId: string;
    email: string;
    provider: string;
    password: string;
    resetPasswordToken: string | null;
    confirmationToken: string | null;
    confirmed: boolean;
    blocked: boolean;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string | null;
}

export interface ListUsersResponse {
    users: User[];
    pagination: {
        total: number;
        totalPages: number;
        currentPage: number;
        pageSize: number;
    };
}

export const usuariosService = {
    /**
     * Lista usuários com paginação
     */
    async listUsers(page: number = 1, pageSize: number = 10): Promise<ListUsersResponse> {
        const token = getToken();

        if (!token) {
            throw new Error("Token não encontrado");
        }

        const response = await fetch(
            `${API_BASE}/listUsersInMaster?page=${page}&pageSize=${pageSize}`,
            {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        if (!response.ok) {
            throw new Error(`Erro ao listar usuários: ${response.statusText}`);
        }

        return await response.json();
    },

    /**
     * Deleta um usuário pelo documentId
     */
    async deleteUser(userDocumentId: string): Promise<void> {
        const token = getToken();

        if (!token) {
            throw new Error("Token não encontrado");
        }

        const response = await fetch(
            `${API_BASE}/deleteUserInMaster?userDocumentId=${userDocumentId}`,
            {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        if (!response.ok) {
            throw new Error(`Erro ao deletar usuário: ${response.statusText}`);
        }
    },

    /**
     * Bloqueia ou desbloqueia um usuário
     */
    async toggleBlockUser(userDocumentId: string, blocked: boolean): Promise<void> {
        const token = getToken();

        if (!token) {
            throw new Error("Token não encontrado");
        }

        const response = await fetch(
            `${API_BASE}/blockAndUnblockUser?userDocumentId=${userDocumentId}`,
            {
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ blocked }),
            }
        );

        if (!response.ok) {
            throw new Error(`Erro ao atualizar status do usuário: ${response.statusText}`);
        }
    },
};