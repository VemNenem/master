"use client";

import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import background from "../assets/background.png";
import logo from "../assets/logo.png";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [bgLoaded, setBgLoaded] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  useEffect(() => {
    setBgLoaded(true);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      const API_URL =
        process.env.NEXT_PUBLIC_STRAPI_API_URL || "https://api.vemnenem.app.br";
      const response = await fetch(`${API_URL}/api/auth/local`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: email, password, role: 3 }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data?.error?.message?.includes("Invalid identifier")) {
          setErrors({ email: "Email inválido", password: "Senha inválida" });
        } else {
          setErrors({ email: "Erro no login. Verifique suas credenciais.", password: "Erro no login. Verifique suas credenciais.", });
        }
        throw new Error(data.error?.message || "Erro ao fazer login");
      }

      localStorage.setItem("token", data.jwt);
      localStorage.setItem("user", JSON.stringify(data.user));

      setTimeout(() => router.push("/usuarios"), 500);
    } catch (error) {
      console.error("Erro no login:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        ...styles.page,
        backgroundImage: bgLoaded ? `url(${background.src})` : undefined,
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
                  style={{
                    ...styles.input,
                    backgroundColor: "#fff",
                    color: "#000",
                    borderColor: errors.email ? "#F67173" : "#e5e7eb",
                  }}
                  disabled={isLoading}
                />
                {errors.email && (
                  <span style={styles.errorText}>{errors.email}</span>
                )}
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
                    style={{
                      ...styles.input,
                      backgroundColor: "#fff",
                      color: "#000",
                      borderColor: errors.password ? "#F67173" : "#e5e7eb",
                    }}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    style={styles.toggle}
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <span style={styles.errorText}>{errors.password}</span>
                )}
              </div>

              <button
                type="submit"
                style={{
                  ...styles.loginButton,
                  backgroundColor: isLoading ? "#00a0a3" : "#27d3d6",
                  cursor: isLoading ? "not-allowed" : "pointer",
                }}
                disabled={isLoading}
              >
                {isLoading ? "ENTRANDO..." : "ENTRAR"}
              </button>
            </form>
          </div>
        </div>

        <div style={styles.side}>
          <div style={styles.logoContainer}>
            <Image
              src={logo}
              alt="Logo Vem Nenem Master"
              width={450}
              height={450}
              style={styles.logoImage}
              priority
            />
          </div>
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
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  content: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    width: "100%",
    height: "100vh",
  },
  side: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  loginCard: {
    background: "#fff",
    borderRadius: "20px",
    boxShadow: "0 12px 30px rgba(0,0,0,0.10)",
    maxWidth: "420px",
    padding: "32px",
    width: "100%",
  },
  loginForm: { display: "flex", flexDirection: "column" },
  inputGroup: { marginTop: "16px" },
  label: {
    fontSize: "14px",
    fontWeight: 500,
    marginBottom: "8px",
    color: "#000",
  },
  input: {
    width: "100%",
    height: "48px",
    border: "1px solid #e5e7eb",
    borderRadius: "10px",
    padding: "0 16px",
    fontSize: "14px",
  },
  passwordInput: { position: "relative" },
  toggle: {
    position: "absolute",
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "transparent",
    border: "none",
    cursor: "pointer",
  },
  loginButton: {
    marginTop: "24px",
    height: "48px",
    border: "none",
    borderRadius: "10px",
    fontWeight: 700,
    fontSize: "16px",
    color: "#fff",
    transition: "0.2s",
  },
  errorText: {
    fontSize: "12px",
    color: "#F67173",
    marginTop: "4px",
    display: "block",
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  logoImage: {
    width: "450px",
    height: "auto",
    objectFit: "contain",
  },
};
