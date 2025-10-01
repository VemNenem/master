"use client";
import React, { useState } from "react";
import { X } from "lucide-react";

interface PostagemFormData {
    titulo: string;
    texto: string;
    autor: string;
    imagemCapa?: File | null;
}

interface PostagemModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (formData: PostagemFormData) => Promise<{ success: boolean; message?: string }>;
}

export default function PostagemModal({ isOpen, onClose, onSubmit }: PostagemModalProps) {
    const [titulo, setTitulo] = useState("");
    const [texto, setTexto] = useState("");
    const [autor, setAutor] = useState("");
    const [imagemCapa, setImagemCapa] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    if (!isOpen) return null;

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImagemCapa(e.target.files[0]);
        }
    };

    const handleCadastrar = async () => {
        // Validação básica
        if (!titulo.trim() || !texto.trim() || !autor.trim()) {
            setError("Título, texto e autor são obrigatórios");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const result = await onSubmit({
                titulo,
                texto,
                autor,
                imagemCapa,
            });

            if (result.success) {
                // Limpa os campos
                setTitulo("");
                setTexto("");
                setAutor("");
                setImagemCapa(null);
                onClose();
            } else {
                setError(result.message || "Erro ao cadastrar postagem");
            }
        } catch (err) {
            setError("Erro ao cadastrar postagem");
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        if (!loading) {
            setTitulo("");
            setTexto("");
            setAutor("");
            setImagemCapa(null);
            setError(null);
            onClose();
        }
    };

    return (
        <div style={styles.overlay} onClick={handleClose}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div style={styles.header}>
                    <h2 style={styles.headerTitle}>Blog</h2>
                    <button
                        style={styles.closeButton}
                        onClick={handleClose}
                        disabled={loading}
                    >
                        <X size={20} color="#999" />
                    </button>
                </div>

                {error && <div style={styles.errorMessage}>{error}</div>}

                <label style={styles.label}>Título</label>
                <input
                    type="text"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    placeholder="Práticas na maternidade"
                    style={styles.input}
                    disabled={loading}
                />

                <label style={styles.label}>Texto</label>
                <textarea
                    value={texto}
                    onChange={(e) => setTexto(e.target.value)}
                    placeholder="Lorem ipsum dolor sit amet..."
                    style={styles.textarea}
                    disabled={loading}
                    rows={6}
                />

                <label style={styles.label}>Autor</label>
                <input
                    type="text"
                    value={autor}
                    onChange={(e) => setAutor(e.target.value)}
                    placeholder="Bryan Henrique"
                    style={styles.input}
                    disabled={loading}
                />

                <label htmlFor="imagemCapa" style={styles.imageButton}>
                    Imagem de capa
                </label>
                <input
                    id="imagemCapa"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={styles.fileInput}
                    disabled={loading}
                />
                {imagemCapa && (
                    <p style={styles.fileName}>{imagemCapa.name}</p>
                )}

                <button
                    style={{
                        ...styles.primaryButton,
                        ...(loading ? styles.buttonDisabled : {}),
                    }}
                    onClick={handleCadastrar}
                    disabled={loading}
                >
                    {loading ? "CADASTRANDO..." : "CADASTRAR"}
                </button>
                <button
                    style={styles.secondaryButton}
                    onClick={handleClose}
                    disabled={loading}
                >
                    VOLTAR
                </button>
            </div>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
    },
    modal: {
        background: "#fff",
        borderRadius: "16px",
        padding: "32px",
        width: "90%",
        maxWidth: "700px",
        maxHeight: "90vh",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "8px",
    },
    headerTitle: {
        fontSize: "24px",
        fontWeight: 600,
        color: "#333",
        margin: 0,
    },
    closeButton: {
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: "4px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    errorMessage: {
        backgroundColor: "#fee",
        color: "#c33",
        padding: "10px 12px",
        borderRadius: "8px",
        fontSize: "14px",
        marginBottom: "8px",
    },
    label: {
        fontSize: "14px",
        fontWeight: 500,
        color: "#000000",
        marginTop: "8px",
    },
    input: {
        width: "100%",
        height: "48px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "0 16px",
        backgroundColor: "#ffffff",
        color: "#000000",
        fontSize: "14px",
        outline: "none",
    },
    textarea: {
        width: "100%",
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "12px 16px",
        backgroundColor: "#ffffff",
        color: "#000000",
        fontSize: "14px",
        outline: "none",
        resize: "vertical",
        fontFamily: "inherit",
    },
    imageButton: {
        display: "inline-block",
        marginTop: "16px",
        padding: "12px 24px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        backgroundColor: "#fff",
        color: "#666",
        fontSize: "14px",
        fontWeight: 500,
        cursor: "pointer",
        textAlign: "center",
        alignSelf: "center",
    },
    fileInput: {
        display: "none",
    },
    fileName: {
        fontSize: "13px",
        color: "#666",
        textAlign: "center",
        fontStyle: "italic",
    },
    primaryButton: {
        marginTop: "24px",
        background: "#27d3d6",
        color: "#fff",
        fontWeight: 600,
        border: "none",
        borderRadius: "8px",
        padding: "14px",
        cursor: "pointer",
        fontSize: "14px",
    },
    secondaryButton: {
        marginTop: "8px",
        background: "transparent",
        color: "#27d3d6",
        fontWeight: 600,
        border: "1px solid #27d3d6",
        borderRadius: "8px",
        padding: "14px",
        cursor: "pointer",
        fontSize: "14px",
    },
    buttonDisabled: {
        backgroundColor: "#9dd",
        cursor: "not-allowed",
    },
};