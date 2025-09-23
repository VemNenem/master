// "use client";

// import { useState } from "react";
// import background from "../assets/background.png";
// import logo from "../assets/logo.png"; 
// import { Eye, EyeOff } from "lucide-react";
// import { useRouter } from "next/navigation"; 
// import Image from "next/image"; 

// export default function Login() {
//   const router = useRouter();
//   const [email, setEmail] = useState(""); 
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false); 

//   const handleLogin = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log("Login attempt:", { email, password });

//     router.push("/usuarios");
//   };

//   return (
//     <div
//       style={{
//         ...styles.page,
//         backgroundImage: `url(${background.src})`,
//       }}
//     >
//       <div style={styles.content}>
//         <div style={styles.side}>
//           <div style={styles.loginCard}>
//             <div style={styles.logoMobile}>
//               <Image 
//                 src={logo} 
//                 alt="Logo" 
//                 width={150} 
//                 height={60}
//                 style={styles.logoImage}
//               />
//             </div>

//             <form onSubmit={handleLogin} style={styles.loginForm}>
//               <div style={{ marginTop: 0 }}>
//                 <label htmlFor="email" style={styles.label}>
//                   E-mail
//                 </label>
//                 <input
//                   id="email"
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                   placeholder="admin@gmail.com"
//                   style={styles.input}
//                 />
//               </div>

//               <div style={styles.inputGroup}>
//                 <label htmlFor="password" style={styles.label}>
//                   Senha
//                 </label>
//                 <div style={styles.passwordInput}>
//                   <input
//                     id="password"
//                     type={showPassword ? "text" : "password"}
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                     placeholder="••••••••"
//                     style={styles.input}
//                   />
//                   <button
//                     type="button"
//                     style={styles.toggle}
//                     onClick={() => setShowPassword(!showPassword)}
//                   >
//                     {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                   </button>
//                 </div>
//               </div>

//               <div style={styles.noteRow}>
//                 <label style={styles.remember}>
//                   <input type="checkbox" /> Lembrar-me
//                 </label>
//                 <a href="#" style={styles.forgotPassword}>
//                   Esqueci minha senha
//                 </a>
//               </div>

//               <button type="submit" style={styles.loginButton}>
//                 ENTRAR
//               </button>
//             </form>
//           </div>
//         </div>

//         <div style={styles.side}>
//           <div style={styles.logoContainer}>
//             <Image 
//               src={logo} 
//               alt="Logo Vem Nenem Master" 
//               width={500}
//               height={500}
//               style={styles.logoImage}
//               priority
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// const styles: Record<string, React.CSSProperties> = {
//   page: {
//     minHeight: "100vh",
//     minWidth: "100vw",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     fontFamily: "Arial, sans-serif",
//     backgroundSize: "cover",
//     backgroundPosition: "center",
//     backgroundColor: "#f8fafc",
//   },
//   content: {
//     display: "grid",
//     gridTemplateColumns: "1fr 1fr",
//     maxWidth: "1200px",
//     width: "100%",
//     height: "100vh",
//     padding: "0 32px",
//     alignItems: "center",
//   },
//   side: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: "20px",
//   },
//   loginCard: {
//     background: "#ffffff",
//     borderRadius: "20px",
//     boxShadow: "0 12px 30px rgba(0,0,0,0.10)",
//     width: "100%",
//     maxWidth: "420px",
//     padding: "32px",
//   },
//   logoMobile: {
//     display: "none",
//     marginBottom: "20px",
//     textAlign: "center",
//   },
//   title: {
//     fontSize: "24px",
//     fontWeight: "bold",
//     color: "#1f2937",
//     textAlign: "center",
//     marginBottom: "24px",
//   },
//   loginForm: {
//     display: "flex",
//     flexDirection: "column",
//   },
//   inputGroup: {
//     marginTop: "16px",
//   },
//   label: {
//     fontSize: "14px",
//     color: "#4b5563",
//     marginBottom: "8px",
//     fontWeight: "500",
//   },
//   input: {
//     width: "100%",
//     height: "48px",
//     border: "1px solid #e5e7eb",
//     borderRadius: "10px",
//     padding: "0 16px",
//     fontSize: "14px",
//     backgroundColor: "#fff",
//     transition: "border-color 0.2s",
//     color: "#1f2937",
//   },
//   inputFocus: {
//     borderColor: "#27d3d6",
//     outline: "none",
//   },
//   passwordInput: {
//     position: "relative",
//   },
//   toggle: {
//     position: "absolute",
//     right: "12px",
//     top: "50%",
//     transform: "translateY(-50%)",
//     background: "transparent",
//     border: "none",
//     cursor: "pointer",
//     color: "#6b7280",
//   },
//   noteRow: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginTop: "16px",
//     fontSize: "14px",
//     color: "#6b7280",
//   },
//   remember: {
//     display: "inline-flex",
//     gap: "8px",
//     alignItems: "center",
//     cursor: "pointer",
//   },
//   forgotPassword: {
//     color: "#27d3d6",
//     textDecoration: "none",
//     fontSize: "14px",
//   },
//   loginButton: {
//     marginTop: "24px",
//     height: "48px",
//     border: "none",
//     borderRadius: "10px",
//     background: "#27d3d6",
//     color: "#fff",
//     fontWeight: 700,
//     cursor: "pointer",
//     fontSize: "16px",
//     transition: "background-color 0.2s",
//   },
//   loginButtonHover: {
//     backgroundColor: "#1fb4b7",
//   },
//   logoContainer: {
//     textAlign: "center",
//     padding: "40px",
//   },
//   logoImage: {
//     objectFit: "contain",
//     marginBottom: "20px",
//   },
//   welcomeText: {
//     fontSize: "18px",
//     color: "#374151",
//     fontWeight: "500",
//     marginTop: "16px",
//   },
// };


"use client";

import { useState } from "react";
import background from "../assets/background.png";
import logo from "../assets/logo.png";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const role = 3;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("Tentativa de login:", { email, password, role });

      // Substitua esta URL pela URL da sua API Strapi
      //const API_URL = "http://localhost:1337"; // ou sua URL de produção
      const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
      console.log(`${API_URL}/api/auth/local`);
      const response = await fetch(`http://api.vemnenem.app.br/api/auth/local`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: email,
          password: password,
          role: role
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "Erro ao fazer login");
      }

      console.log("Login bem-sucedido:", data);

      // Salvar o token JWT no localStorage (ou sessionStorage)
      localStorage.setItem("token", data.jwt);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirecionar para a página de usuários
      setTimeout(() => {
        router.push("/usuarios");
      }, 2000);

    } catch (error: any) {
      console.error("Erro no login:", error);
      alert(`Erro no login: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
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
            <div style={styles.logoMobile}>
              <Image
                src={logo}
                alt="Logo"
                width={150}
                height={60}
                style={styles.logoImage}
              />
            </div>

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
                  disabled={isLoading}
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
              </div>

              <div style={styles.noteRow}>
                <label style={styles.remember}>
                  <input type="checkbox" disabled={isLoading} /> Lembrar-me
                </label>
                <a href="#" style={styles.forgotPassword}>
                  Esqueci minha senha
                </a>
              </div>

              <button
                type="submit"
                style={{
                  ...styles.loginButton,
                  backgroundColor: isLoading ? "#94a3b8" : "#27d3d6",
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
              width={500}
              height={500}
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
    fontFamily: "Arial, sans-serif",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundColor: "#f8fafc",
  },
  content: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    maxWidth: "1200px",
    width: "100%",
    height: "100vh",
    padding: "0 32px",
    alignItems: "center",
  },
  side: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },
  loginCard: {
    background: "#ffffff",
    borderRadius: "20px",
    boxShadow: "0 12px 30px rgba(0,0,0,0.10)",
    width: "100%",
    maxWidth: "420px",
    padding: "32px",
  },
  logoMobile: {
    display: "none",
    marginBottom: "20px",
    textAlign: "center",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#1f2937",
    textAlign: "center",
    marginBottom: "24px",
  },
  loginForm: {
    display: "flex",
    flexDirection: "column",
  },
  inputGroup: {
    marginTop: "16px",
  },
  label: {
    fontSize: "14px",
    color: "#4b5563",
    marginBottom: "8px",
    fontWeight: "500",
  },
  input: {
    width: "100%",
    height: "48px",
    border: "1px solid #e5e7eb",
    borderRadius: "10px",
    padding: "0 16px",
    fontSize: "14px",
    backgroundColor: "#fff",
    transition: "border-color 0.2s",
    color: "#1f2937",
  },
  inputFocus: {
    borderColor: "#27d3d6",
    outline: "none",
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
    color: "#6b7280",
  },
  noteRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "16px",
    fontSize: "14px",
    color: "#6b7280",
  },
  remember: {
    display: "inline-flex",
    gap: "8px",
    alignItems: "center",
    cursor: "pointer",
  },
  forgotPassword: {
    color: "#27d3d6",
    textDecoration: "none",
    fontSize: "14px",
  },
  loginButton: {
    marginTop: "24px",
    height: "48px",
    border: "none",
    borderRadius: "10px",
    background: "#27d3d6",
    color: "#fff",
    fontWeight: 700,
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.2s",
  },
  loginButtonHover: {
    backgroundColor: "#1fb4b7",
  },
  logoContainer: {
    textAlign: "center",
    padding: "40px",
  },
  logoImage: {
    objectFit: "contain",
    marginBottom: "20px",
  },
  welcomeText: {
    fontSize: "18px",
    color: "#374151",
    fontWeight: "500",
    marginTop: "16px",
  },
};