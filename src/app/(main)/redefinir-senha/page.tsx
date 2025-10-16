// "use client";

// import React, { useState } from 'react';
// import SuccessPopup from "../../components/sucessPopup";

// export default function RedefinirSenha() {
//   const [popupTrigger, setPopupTrigger] = useState(0);

//   const handleCadastrar = () => {
//     setPopupTrigger(prev => prev + 1); 
//   };

//   return (
//     <main style={style.container}>
//       <h2 style={style.title}>Redefinir senha</h2>

//       <div style={style.formContainer}>
//         <label style={style.label}>Senha atual</label>
//         <input type="password" placeholder="*******" style={style.input} />

//         <label style={style.label}>Digite a nova senha</label>
//         <input type="password" placeholder="*******" style={style.input} />
//         <ul style={style.rules}>
//           <li>Use pelo menos 8 caracteres</li>
//           <li>Inclua pelo menos 1 letra minúscula, 1 maiúscula e 1 caractere especial, como &quot;-!*&quot;</li>
//           <li>Certifique-se de usar uma senha forte</li>
//         </ul>

//         <label style={style.label}>Confirmar nova senha</label>
//         <input type="password" placeholder="*******" style={style.input} />

//         <button style={style.button} onClick={handleCadastrar}>ALTERAR SENHA</button>
//       </div>

//       <SuccessPopup 
//         message="Senha atualizada com sucesso!" 
//         trigger={popupTrigger} 
//       />
//     </main>
//   );
// }



// "use client";

// import React, { useState } from "react";
// import SuccessPopup from "../../components/sucessPopup";
// import { redefinirSenha } from "./redefinirSenhaService";

// export default function RedefinirSenha() {
//   const [popupTrigger, setPopupTrigger] = useState(0);
//   const [formData, setFormData] = useState({
//     currentPassword: "",
//     password: "",
//     passwordConfirmation: "",
//   });

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleCadastrar = async () => {
//     const result = await redefinirSenha(formData);

//     if (result.success) {
//       setPopupTrigger((prev) => prev + 1); // dispara popup
//       setFormData({ currentPassword: "", password: "", passwordConfirmation: "" }); // limpa form
//     } else {
//       alert(result.message); // erro aparece na hora
//     }
//   };


//   const style = {
//     container: {
//       display: "flex",
//       flexDirection: "column" as const,
//       alignItems: "flex-start" as const,
//       justifyContent: "flex-start" as const,
//       minHeight: "100%",
//       padding: "40px",
//       fontFamily: "Arial, sans-serif",
//       color: "#707070",
//     },
//     title: {
//       fontSize: "24px",
//       fontWeight: "bold" as const,
//       color: "#707070",
//       marginBottom: "20px",
//     },
//     formContainer: {
//       display: "flex",
//       flexDirection: "column" as const,
//       width: "100%",
//       maxWidth: "400px",
//     },
//     label: {
//       fontSize: "14px",
//       color: "#707070",
//       marginBottom: "5px",
//       marginTop: "15px",
//     },
//     input: {
//       padding: "10px",
//       borderRadius: "14px",
//       border: "1px solid #ccc",
//       fontSize: "14px",
//       marginBottom: "10px",
//       backgroundColor: "white",
//       color: "black",
//     },
//     rules: {
//       color: "#2a919eff",
//       fontSize: "12px",
//       marginTop: "0",
//       marginBottom: "10px",
//       paddingLeft: "20px",
//     },
//     button: {
//       marginTop: "20px",
//       padding: "12px",
//       borderRadius: "5px",
//       border: "none" as const,
//       backgroundColor: "#4DD0E1",
//       color: "#fff",
//       fontWeight: "bold" as const,
//       cursor: "pointer" as const,
//     },
//   } as const;



//   return (
//     <main style={style.container}>
//       <h2 style={style.title}>Redefinir senha</h2>

//       <div style={style.formContainer}>
//         <label style={style.label}>Senha atual</label>
//         <input
//           type="password"
//           name="currentPassword"
//           value={formData.currentPassword}
//           onChange={handleInputChange}
//           placeholder="*******"
//           style={style.input}
//         />

//         <label style={style.label}>Digite a nova senha</label>
//         <input
//           type="password"
//           name="password"
//           value={formData.password}
//           onChange={handleInputChange}
//           placeholder="*******"
//           style={style.input}
//         />

//         <ul style={style.rules}>
//           <li>Use pelo menos 8 caracteres</li>
//           <li>
//             Inclua pelo menos 1 letra minúscula, 1 maiúscula e 1 caractere
//             especial, como "-!*"
//           </li>
//           <li>Certifique-se de usar uma senha forte</li>
//         </ul>

//         <label style={style.label}>Confirmar nova senha</label>
//         <input
//           type="password"
//           name="passwordConfirmation"
//           value={formData.passwordConfirmation}
//           onChange={handleInputChange}
//           placeholder="*******"
//           style={style.input}
//         />

//         <button style={style.button} onClick={handleCadastrar}>
//           ALTERAR SENHA
//         </button>
//       </div>

//       <SuccessPopup message="Senha atualizada com sucesso!" trigger={popupTrigger} />
//     </main>
//   );
// }



"use client";
import React, { useState } from "react";
import SuccessPopup from "../../components/sucessPopup";
import ErrorPopup from "../../components/errorPopup";
import { redefinirSenha } from "./../../services/redefinirSenhaService";

export default function RedefinirSenha() {
  const [successTrigger, setSuccessTrigger] = useState(0);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    currentPassword: "",
    password: "",
    passwordConfirmation: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validatePassword = (password: string): boolean => {
    // Pelo menos 8 caracteres
    if (password.length < 8) return false;

    // Pelo menos 1 letra minúscula
    if (!/[a-z]/.test(password)) return false;

    // Pelo menos 1 letra maiúscula
    if (!/[A-Z]/.test(password)) return false;

    // Pelo menos 1 caractere especial
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) return false;

    return true;
  };

  const handleCadastrar = async () => {
    try {
      // Validação da nova senha
      if (!validatePassword(formData.password)) {
        setErrorMessage("A senha deve ter pelo menos 8 caracteres, incluindo 1 letra minúscula, 1 maiúscula e 1 caractere especial.");
        setShowErrorPopup(true);
        return;
      }

      // Validação de confirmação de senha
      if (formData.password !== formData.passwordConfirmation) {
        setErrorMessage("As senhas não coincidem.");
        setShowErrorPopup(true);
        return;
      }

      const result = await redefinirSenha(formData);

      if (result.success) {
        setSuccessTrigger(prev => prev + 1);
        setFormData({ currentPassword: "", password: "", passwordConfirmation: "" });
      } else {
        setErrorMessage(result.message);
        setShowErrorPopup(true);
      }
    } catch {
      setErrorMessage("Erro inesperado. Tente novamente.");
      setShowErrorPopup(true);
    }
  };

  // Remove o useEffect que não é mais necessário

  const style = {
    container: {
      display: "flex",
      flexDirection: "column" as const,
      alignItems: "flex-start" as const,
      justifyContent: "flex-start" as const,
      minHeight: "100%",
      padding: "40px",
      fontFamily: "Arial, sans-serif",
      color: "#707070",
    },
    title: {
      fontSize: "24px",
      fontWeight: "bold" as const,
      color: "#707070",
      marginBottom: "20px",
    },
    formContainer: {
      display: "flex",
      flexDirection: "column" as const,
      width: "100%",
      maxWidth: "400px",
    },
    label: {
      fontSize: "14px",
      color: "#707070",
      marginBottom: "5px",
      marginTop: "15px",
    },
    input: {
      padding: "10px",
      borderRadius: "14px",
      border: "1px solid #ccc",
      fontSize: "14px",
      marginBottom: "10px",
      backgroundColor: "white",
      color: "black",
    },
    rules: {
      color: "#2a919eff",
      fontSize: "12px",
      marginTop: "0",
      marginBottom: "10px",
      paddingLeft: "20px",
    },
    button: {
      marginTop: "20px",
      padding: "12px",
      borderRadius: "5px",
      border: "none" as const,
      backgroundColor: "#4DD0E1",
      color: "#fff",
      fontWeight: "bold" as const,
      cursor: "pointer" as const,
    },
  } as const;

  return (
    <main style={style.container}>
      <h2 style={style.title}>Redefinir senha</h2>
      <div style={style.formContainer}>
        <label style={style.label}>Senha atual</label>
        <input
          type="password"
          name="currentPassword"
          value={formData.currentPassword}
          onChange={handleInputChange}
          placeholder="*******"
          style={style.input}
        />
        <label style={style.label}>Digite a nova senha</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="*******"
          style={style.input}
        />
        <ul style={style.rules}>
          <li>Use pelo menos 8 caracteres</li>
          <li>
            Inclua pelo menos 1 letra minúscula, 1 maiúscula e 1 caractere
            especial, como &quot;-!*&quot;
          </li>
          <li>Certifique-se de usar uma senha forte</li>
        </ul>
        <label style={style.label}>Confirmar nova senha</label>
        <input
          type="password"
          name="passwordConfirmation"
          value={formData.passwordConfirmation}
          onChange={handleInputChange}
          placeholder="*******"
          style={style.input}
        />
        <button style={style.button} onClick={handleCadastrar}>
          ALTERAR SENHA
        </button>
      </div>

      <SuccessPopup
        message="Senha atualizada com sucesso!"
        trigger={successTrigger}
      />

      {showErrorPopup && (
        <ErrorPopup
          message={errorMessage}
          onClose={() => {
            setShowErrorPopup(false);
            setErrorMessage("");
          }}
        />
      )}
    </main>
  );
}