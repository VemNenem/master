"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "../assets/logo.png";

export default function Sidebar() {
  const router = useRouter();

  const handleLogout = () => {
    // Limpa os tokens do localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");

    console.log("Usuário deslogado");
    router.push("/");
  };

  return (
    <aside style={style.sidebar}>

      <div style={style.logoContainer}>
        <Image
          src={logo}
          alt="Logo"
          width={100}
          height={100}
          priority
        />
      </div>

      {/* Links */}
      <nav style={style.nav}>
        <button
          style={style.link}
          onClick={() => router.push("/usuarios")}
        >
          Listagem de usuários
        </button>
        <button
          style={style.link}
          onClick={() => router.push("/blog")}
        >
          Blog
        </button>
        <button
          style={style.link}
          onClick={() => router.push("/redefinir-senha")}
        >
          Redefinir senha
        </button>
        <button
          style={style.link}
          onClick={() => router.push("/termo-uso")}
        >
          Termo de uso
        </button>
        <button
          style={style.link}
          onClick={() => router.push("/equipe")}
        >
          Equipe
        </button>
                <button
          style={style.link}
          onClick={() => router.push("/dashboard")}
        >
          Dashboard
        </button>
      </nav>

      <div style={style.footer}>
        <button
          style={style.logout}
          onClick={handleLogout}
        >
          Sair da conta
        </button>
      </div>
    </aside>
  );
}

const style = {
  sidebar: {
    width: "250px",
    height: "100vh",
    backgroundColor: "#42CFE0",
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "space-between",
    padding: "20px 0",
  },
  logoContainer: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: "0 20px 20px 20px",
    marginBottom: "20px",
  },
  nav: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "8px",
    color: "#fff",
    fontWeight: 500,
    flex: 1,
  },
  link: {
    background: "transparent",
    border: "none",
    color: "#fff",
    textAlign: "left" as const,
    cursor: "pointer",
    fontSize: "14px",
    padding: "12px 20px",
    transition: "background-color 0.2s",
    width: "100%",
    fontWeight: 600,
  },
  footer: {
    padding: "20px 20px 0 20px",
    borderTop: "1px solid rgba(255, 255, 255, 0.2)",
  },
  logout: {
    backgroundColor: "#FF6B6B",
    color: "#fff",
    padding: "12px 16px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: "14px",
    width: "100%",
    transition: "background-color 0.2s",
  },
};