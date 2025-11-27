"use client";
import { useState, useEffect } from "react";
import SuccessPopup from "../../components/sucessPopup";
import { listarTermos, atualizarTermos } from "@/app/services/termoService";

export default function TermoPage() {
  const [popupTrigger, setPopupTrigger] = useState(0);
  const [termoUso, setTermoUso] = useState("");
  const [politicaPrivacidade, setPoliticaPrivacidade] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingUse, setLoadingUse] = useState(false);
  const [loadingPrivacy, setLoadingPrivacy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Carregar termos ao montar o componente
  useEffect(() => {
    loadTermos();
  }, []);

  const loadTermos = async () => {
    setLoading(true);
    setError(null);
    try {
      const [termoUseData, termoPrivacyData] = await Promise.all([
        listarTermos("use"),
        listarTermos("privacy"),
      ]);

      setTermoUso(termoUseData?.description || "");
      setPoliticaPrivacidade(termoPrivacyData?.description || "");
    } catch (err) {
      setError("Erro ao carregar termos");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCadastrarUso = async () => {
    if (!termoUso.trim()) {
      alert("O termo de uso não pode estar vazio");
      return;
    }

    setLoadingUse(true);
    try {
      const result = await atualizarTermos("use", { description: termoUso });

      if (result.success) {
        setPopupTrigger(prev => prev + 1);
        await loadTermos(); // Recarrega para garantir dados atualizados
      } else {
        alert(result.message || "Erro ao atualizar termo de uso");
      }
    } catch (err) {
      console.error("Erro ao atualizar:", err);
      alert("Erro ao atualizar termo de uso");
    } finally {
      setLoadingUse(false);
    }
  };

  const handleCadastrarPrivacidade = async () => {
    if (!politicaPrivacidade.trim()) {
      alert("A política de privacidade não pode estar vazia");
      return;
    }

    setLoadingPrivacy(true);
    try {
      const result = await atualizarTermos("privacy", { description: politicaPrivacidade });

      if (result.success) {
        setPopupTrigger(prev => prev + 1);
        await loadTermos(); // Recarrega para garantir dados atualizados
      } else {
        alert(result.message || "Erro ao atualizar política de privacidade");
      }
    } catch (err) {
      console.error("Erro ao atualizar:", err);
      alert("Erro ao atualizar política de privacidade");
    } finally {
      setLoadingPrivacy(false);
    }
  };


  if (loading) {
    return (
      <main style={style.container}>
        <h2 style={style.title}>Termo de uso</h2>
        <p style={{ color: "#707070" }}>Carregando termos...</p>
      </main>
    );
  }

  return (
    <main style={style.container}>
      <h2 style={style.title}>Termo de uso</h2>

      {error && (
        <div style={style.errorBanner}>
          {error}
          <button onClick={loadTermos} style={style.retryButton}>
            Tentar novamente
          </button>
        </div>
      )}

      <div style={style.cards}>
        <div style={style.column}>
          <h3 style={style.cardTitle}>Termo de uso</h3>
          <textarea
            style={style.textarea}
            className="scroll-box"
            value={termoUso}
            onChange={(e) => setTermoUso(e.target.value)}
            placeholder="Digite o termo de uso aqui..."
            disabled={loadingUse}
          />
          <button
            style={{
              ...style.button,
              ...(loadingUse ? style.buttonDisabled : {}),
            }}
            onClick={handleCadastrarUso}
            disabled={loadingUse}
          >
            {loadingUse ? "SALVANDO..." : "SALVAR"}
          </button>
        </div>

        <div style={style.column}>
          <h3 style={style.cardTitle}>Política de privacidade</h3>
          <textarea
            style={style.textarea}
            className="scroll-box"
            value={politicaPrivacidade}
            onChange={(e) => setPoliticaPrivacidade(e.target.value)}
            placeholder="Digite a política de privacidade aqui..."
            disabled={loadingPrivacy}
          />
          <button
            style={{
              ...style.button,
              ...(loadingPrivacy ? style.buttonDisabled : {}),
            }}
            onClick={handleCadastrarPrivacidade}
            disabled={loadingPrivacy}
          >
            {loadingPrivacy ? "SALVANDO..." : "SALVAR"}
          </button>
        </div>
      </div>

      <SuccessPopup
        message="Atualização realizada com sucesso!"
        trigger={popupTrigger}
      />

      <style jsx>{`
        .scroll-box::-webkit-scrollbar {
          width: 8px;
        }
        .scroll-box::-webkit-scrollbar-thumb {
          background: #00c5b5;
          border-radius: 6px;
        }
        .scroll-box::-webkit-scrollbar-thumb:hover {
          background: #009e91;
        }
        .scroll-box::-webkit-scrollbar-track {
          background: #f0f0f0;
          border-radius: 6px;
        }
      `}</style>
    </main>
  );
}

const style: { [key: string]: React.CSSProperties } = {
  container: {
    width: "100%",
    minHeight: "100%",
    padding: "40px",
    backgroundColor: "#f9f9f9",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "30px",
    color: "#707070",
  },
  errorBanner: {
    backgroundColor: "#fee",
    color: "#c33",
    padding: "12px 20px",
    borderRadius: "8px",
    marginBottom: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  retryButton: {
    background: "transparent",
    border: "1px solid #c33",
    color: "#c33",
    padding: "6px 12px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
  },
  cards: {
    display: "flex",
    justifyContent: "space-between",
    gap: "30px",
    flexWrap: "wrap",
  },
  column: {
    flex: 1,
    minWidth: "300px",
    display: "flex",
    flexDirection: "column",
  },
  cardTitle: {
    fontSize: "16px",
    fontWeight: "600",
    marginBottom: "10px",
    color: "#707070",
  },
  textarea: {
    flex: 1,
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "20px",
    overflowY: "auto",
    marginBottom: "15px",
    maxHeight: "400px",
    minHeight: "400px",
    fontSize: "14px",
    color: "#707070",
    lineHeight: "1.6",
    fontFamily: "Arial, sans-serif",
    resize: "vertical",
    outline: "none",
  },
  button: {
    padding: "12px",
    backgroundColor: "#00C5B5",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold",
    cursor: "pointer",
    textTransform: "uppercase",
    width: "300px",
    margin: "0 auto",
    transition: "opacity 0.2s",
  },
  buttonDisabled: {
    backgroundColor: "#80e2d9",
    cursor: "not-allowed",
  },
};
