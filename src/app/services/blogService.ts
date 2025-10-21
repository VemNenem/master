import apiClient from "./apiClient";
import { AxiosError } from "axios";

export interface Post {
    documentId: string;
    title: string;
    text: string;
    author: string;
    image?: {
        id: number;
        documentId: string;
        name: string;
        alternativeText?: string | null;
        url: string;
        formats?: Record<string, unknown>;
        width?: number;
        height?: number;
    };
    id: number;
    createdAt: string;
    updatedAt: string;
}

export interface PostFormData {
    title: string;
    text: string;
    author: string;
    image?: File | null;
}

interface ErrorResponse {
    error?: {
        message?: string;
    };
}

export async function carregarPosts(): Promise<Post[]> {
    try {
        const response = await apiClient.get<{ posts: Post[] }>("/listPostsInMaster");
        return response.data.posts || [];
    } catch (error) {
        console.error("Erro na requisição:", error);
        return [];
    }
}

export async function criarPost(formData: PostFormData): Promise<{ success: boolean; message?: string }> {
    try {
        const formDataToSend = new FormData();
        formDataToSend.append("title", formData.title);
        formDataToSend.append("text", formData.text);
        formDataToSend.append("author", formData.author);

        if (formData.image) {
            formDataToSend.append("image", formData.image);
        }

        await apiClient.post("/createPost", formDataToSend, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return { success: true };
    } catch (error) {
        console.error("Erro na requisição:", error);
        const axiosError = error as AxiosError<ErrorResponse>;
        const errorMessage = axiosError?.response?.data?.error?.message || "Erro de rede ou servidor indisponível.";
        return { success: false, message: errorMessage };
    }
}

export async function deletarPost(documentId: string): Promise<boolean> {
    try {
        await apiClient.delete(`/deletePostInMaster?postDocumentId=${documentId}`);
        return true;
    } catch (error) {
        console.error("Erro na requisição:", error);
        return false;
    }
}