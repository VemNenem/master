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
        formats?: any;
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

const API_BASE = "https://api.vemnenem.app.br/api";

const getToken = () => localStorage.getItem("token"); // ou sessionStorage

export async function carregarPosts(): Promise<Post[]> {
    try {
        const response = await fetch(`${API_BASE}/listPostsInMaster`, {
            headers: {
                "Authorization": `Bearer ${getToken()}`,
            },
        });

        if (!response.ok) {
            console.error("Erro ao carregar posts:", response.status);
            return [];
        }

        const data = await response.json();
        return data.posts || [];
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

        const response = await fetch(`${API_BASE}/createPost`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${getToken()}`,
                // NÃO adicione Content-Type para FormData, o navegador define automaticamente
            },
            body: formDataToSend,
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

export async function deletarPost(documentId: string): Promise<boolean> {
    try {
        const response = await fetch(
            `${API_BASE}/deletePostInMaster?postDocumentId=${documentId}`,
            {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${getToken()}`,
                    "Content-Type": "application/json",
                },
            }
        );

        if (!response.ok) {
            console.error("Erro ao deletar post:", response.status);
            return false;
        }

        return true;
    } catch (error) {
        console.error("Erro na requisição:", error);
        return false;
    }
}