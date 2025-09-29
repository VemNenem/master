export interface RedefinirSenhaPayload {
    currentPassword: string;
    password: string;
    passwordConfirmation: string;
}

export async function redefinirSenha(
    data: RedefinirSenhaPayload
): Promise<{ success: boolean; message: string }> {
    try {
        const token = localStorage.getItem("token");

        const response = await fetch("https://api.vemnenem.app.br/api/auth/change-password", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
            return {
                success: false,
                message: result?.error?.message || "Erro ao redefinir a senha.",
            };
        }

        return {
            success: true,
            message: "Senha alterada com sucesso!",
        };
    } catch (error) {
        console.error("Erro na requisição:", error);
        return {
            success: false,
            message: "Erro de conexão. Tente novamente.",
        };
    }
}
