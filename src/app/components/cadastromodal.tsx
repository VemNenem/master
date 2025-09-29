"use client";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface CadastroModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CadastroModal({ isOpen, onClose }: CadastroModalProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!isOpen) return null;

  const handleCadastrar = () => {
    // Aqui você pode adicionar lógica para enviar os dados
    console.log("Email:", email, "Senha:", password);

    // Fecha o modal
    onClose();
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>

        <label style={styles.label}>Nome</label>
        <input
          type="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Bryan"
          style={styles.input}
        />

        <label style={styles.label}>E-mail</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="usuario@gmail.com"
          style={styles.input}
        />

        <label style={styles.label}>Senha</label>
        <div style={{ position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            style={styles.input}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={styles.toggle}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <button style={styles.primaryButton} onClick={handleCadastrar}>
          CADASTRAR
        </button>
        <button style={styles.secondaryButton} onClick={onClose}>
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
  label: {
    fontSize: "14px",
    fontWeight: 500,
    color: "#000000", // label preto
  },
  input: {
    width: "100%",
    height: "40px",
    border: "1px solid #ccc", // borda cinza
    borderRadius: "8px",
    padding: "0 12px",
    backgroundColor: "#ffffff", // fundo branco
    color: "#000000", // texto preto
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
};
