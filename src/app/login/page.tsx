"use client";

import { useState } from "react";
import background from "../assets/background.png";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt:", { email, password });
  };

  return (
    <div
      style={{
        ...styles.page,
        backgroundImage: `url(${background.src})`,
      }}
    >
      <div style={styles.content}>
        <div style={styles.side}>
          <div style={styles.loginCard}>
            <form onSubmit={handleLogin} style={styles.loginForm}>
              <div style={{ marginTop: 0 }}>
                <label htmlFor="email" style={styles.label}>
                  E-mail
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@gmail.com"
                  style={styles.input}
                />
              </div>

              <div style={styles.inputGroup}>
                <label htmlFor="password" style={styles.label}>
                  Senha
                </label>
                <div style={styles.passwordInput}>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    style={styles.input}
                  />
                  <button
                    type="button"
                    style={styles.toggle}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div style={styles.noteRow}>
                <label style={styles.remember}>
                  <input type="checkbox" /> Lembrar-me
                </label>
                {/* Se quiser, depois pode fazer um Link para /esqueceusenha */}
              </div>

              <button type="submit" style={styles.loginButton}>
                ENTRAR
              </button>
            </form>
          </div>
        </div>
        <div style={styles.side}>
          {/* aqui pode entrar logo ou imagem */}
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    minWidth: "100vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Arial, sans-serif",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  content: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    maxWidth: "1200px",
    width: "100%",
    height: "100vh",
    padding: "0 32px",
  },
  side: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  loginCard: {
    background: "#ffffff",
    borderRadius: "20px",
    boxShadow: "0 12px 30px rgba(0,0,0,0.10)",
    width: "100%",
    maxWidth: "420px",
    padding: "24px 24px 20px",
  },
  loginForm: {
    display: "flex",
    flexDirection: "column",
  },
  inputGroup: {
    marginTop: "14px",
  },
  label: {
    fontSize: "13px",
    color: "#4b5563",
    marginBottom: "8px",
  },
  input: {
    width: "100%",
    height: "44px",
    border: "1px solid #e5e7eb",
    borderRadius: "10px",
    padding: "0 14px",
    fontSize: "14px",
  },
  passwordInput: {
    position: "relative",
  },
  toggle: {
    position: "absolute",
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "transparent",
    border: "none",
    cursor: "pointer",
  },
  noteRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "10px",
    padding: "0 2px",
    fontSize: "12px",
    color: "#6b7280",
  },
  remember: {
    display: "inline-flex",
    gap: "8px",
    alignItems: "center",
  },
  loginButton: {
    marginTop: "14px",
    height: "44px",
    border: "none",
    borderRadius: "10px",
    background: "#27d3d6",
    color: "#fff",
    fontWeight: 700,
    cursor: "pointer",
  },
};
