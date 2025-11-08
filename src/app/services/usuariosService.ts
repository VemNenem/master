import apiClient from "./apiClient";

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
    client: UserClient;
}

export interface UserClient {
    id: number;
    documentId: string;
    name: string;
    probableDateOfDelivery: string;
    babyGender: string;
    fatherName: string;
    babyName: string;
    acceptTerm: boolean;
    acceptTermDate: string;
    acceptPrivacyPolicies: boolean;
    acceptPrivacyPoliciesDate: string;
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
        const response = await apiClient.get<ListUsersResponse>(
            `/listUsersInMaster?page=${page}&pageSize=${pageSize}`
        );
        return response.data;
    },

    /**
     * Deleta um usuário pelo documentId
     */
    async deleteUser(userDocumentId: string): Promise<void> {
        await apiClient.delete(
            `/deleteUserInMaster?userDocumentId=${userDocumentId}`
        );
    },

    /**
     * Bloqueia ou desbloqueia um usuário
     */
    async toggleBlockUser(userDocumentId: string, blocked: boolean): Promise<void> {
        await apiClient.patch(
            `/blockAndUnblockUser?userDocumentId=${userDocumentId}`,
            { blocked }
        );
    },
};