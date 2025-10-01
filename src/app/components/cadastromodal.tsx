"use client";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { FormData } from "@/app/services/equipeService"; // ajuste o caminho

interface CadastroModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData) => Promise<{ success: boolean; message?: string }>;
}

export default function CadastroModal({ isOpen, onClose, onSubmit }: CadastroModalProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCadastrar = async () => {
    // Validação básica
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("Todos os campos são obrigatórios");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await onSubmit({ name, email, password });

      if (result.success) {
        // Limpa os campos
        setName("");
        setEmail("");
        setPassword("");
        setShowPassword(false);
        onClose();
      } else {
        setError(result.message || "Erro ao cadastrar usuário");
      }
    } catch (err) {
      setError("Erro ao cadastrar usuário");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setName("");
      setEmail("");
      setPassword("");
      setShowPassword(false);
      setError(null);
      onClose();
    }
  };

  return (
    <div style={styles.overlay} onClick={handleClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>

        {error && (
          <div style={styles.errorMessage}>
            {error}
          </div>
        )}

        <label style={styles.label}>Nome</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Bryan"
          style={styles.input}
          disabled={loading}
        />

        <label style={styles.label}>E-mail</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="usuario@gmail.com"
          style={styles.input}
          disabled={loading}
        />

        <label style={styles.label}>Senha</label>
        <div style={{ position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            style={styles.input}
            disabled={loading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={styles.toggle}
            disabled={loading}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <button
          style={{
            ...styles.primaryButton,
            ...(loading ? styles.buttonDisabled : {})
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
    borderRadius: "12px",
    padding: "24px",
    width: "350px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
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
  },
  input: {
    width: "100%",
    height: "40px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "0 12px",
    backgroundColor: "#ffffff",
    color: "#000000",
    outline: "none",
  },
  toggle: {
    position: "absolute",
    right: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "transparent",
    border: "none",
    cursor: "pointer",
  },
  primaryButton: {
    marginTop: "16px",
    background: "#27d3d6",
    color: "#fff",
    fontWeight: 600,
    border: "none",
    borderRadius: "8px",
    padding: "10px",
    cursor: "pointer",
  },
  secondaryButton: {
    marginTop: "8px",
    background: "transparent",
    color: "#27d3d6",
    fontWeight: 600,
    border: "1px solid #27d3d6",
    borderRadius: "8px",
    padding: "10px",
    cursor: "pointer",
  },
  buttonDisabled: {
    backgroundColor: "#9dd",
    cursor: "not-allowed",
  },
};