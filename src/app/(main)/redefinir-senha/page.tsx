"use client";

import React, { useState } from 'react';
import SuccessPopup from "../../components/sucessPopup";

export default function RedefinirSenha() {
  const [popupTrigger, setPopupTrigger] = useState(0);

  const handleCadastrar = () => {
    setPopupTrigger(prev => prev + 1); 
  };

  return (
    <main style={style.container}>
      <h2 style={style.title}>Redefinir senha</h2>

      <div style={style.formContainer}>
        <label style={style.label}>Senha atual</label>
        <input type="password" placeholder="*******" style={style.input} />

        <label style={style.label}>Digite a nova senha</label>
        <input type="password" placeholder="*******" style={style.input} />
        <ul style={style.rules}>
          <li>Use pelo menos 8 caracteres</li>
          <li>Inclua pelo menos 1 letra minúscula, 1 maiúscula e 1 caractere especial, como "-!*</li>
          <li>Certifique-se de usar uma senha forte</li>
        </ul>

        <label style={style.label}>Confirmar nova senha</label>
        <input type="password" placeholder="*******" style={style.input} />

        <button style={style.button} onClick={handleCadastrar}>ALTERAR SENHA</button>
      </div>

      <SuccessPopup 
        message="Senha atualizada com sucesso!" 
        trigger={popupTrigger} 
      />
    </main>
  );
}

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
