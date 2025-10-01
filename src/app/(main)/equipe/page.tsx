"use client";
import React, { useState, useEffect } from "react";
import { Trash2, Plus } from "lucide-react";
import CadastroModal from "./../../components/cadastromodal";
import { carregarUsuarios, criarUsuario, deletarUsuario, Usuario, FormData } from "@/app/services/equipeService";

export default function Equipe() {
  const [team, setTeam] = useState<Usuario[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Carregar usuários ao montar o componente
  useEffect(() => {
    loadTeamMembers();
  }, []);

  const loadTeamMembers = async () => {
    setLoading(true);
    setError(null);
    try {
      const usuarios = await carregarUsuarios();
      setTeam(usuarios);
    } catch (err) {
      setError("Erro ao carregar equipe");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteMember = async (documentId: string) => {
    if (!confirm("Tem certeza que deseja remover este membro?")) return;

    try {
      const success = await deletarUsuario(documentId);
      if (success) {
        setTeam((prev) => prev.filter((member) => member.documentId !== documentId));
      } else {
        alert("Erro ao deletar usuário. Tente novamente.");
      }
    } catch (err) {
      console.error("Erro ao deletar:", err);
      alert("Erro ao deletar usuário.");
    }
  };

  const addMember = async (formData: FormData) => {
    try {
      const result = await criarUsuario(formData);

      if (result.success) {
        // Recarrega a lista após adicionar
        await loadTeamMembers();
        setShowModal(false);
        return { success: true };
      } else {
        return { success: false, message: result.message };
      }
    } catch (err) {
      console.error("Erro ao adicionar:", err);
      return { success: false, message: "Erro ao criar usuário." };
    }
  };

  if (loading) {
    return (
      <main style={style.container}>
        <section style={style.content}>
          <p>Carregando equipe...</p>
        </section>
      </main>
    );
  }

  return (
    <main style={style.container}>
      <section style={style.content}>
        <div style={style.titleRow}>
          <h2 style={style.title}>Equipe</h2>
          <button style={style.addButton} onClick={() => setShowModal(true)}>
            <Plus size={18} color="#707070" />
          </button>
        </div>

        {error && (
          <div style={style.errorBanner}>
            {error}
            <button onClick={loadTeamMembers} style={style.retryButton}>
              Tentar novamente
            </button>
          </div>
        )}

        <div style={style.header}>
          <span>Nome</span>
          <span>Email</span>
          <span style={{ textAlign: "center" }}>Ação</span>
        </div>

        <div className="scroll-box" style={style.table}>
          {team.length === 0 ? (
            <div style={style.emptyState}>
              <p>Nenhum membro cadastrado ainda.</p>
            </div>
          ) : (
            team.map((member) => (
              <div key={member.documentId} style={style.row}>
                <span>{member.username}</span>
                <span>{member.email}</span>
                <div style={style.actions}>
                  <button
                    style={style.trashButton}
                    onClick={() => deleteMember(member.documentId)}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <CadastroModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={addMember}
      />
    </main>
  );
}

const style = {
  container: {
    display: "flex",
    minHeight: "100%",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#F9F9F9",
  },
  content: {
    flex: 1,
    padding: "40px 40px",
    color: "#707070",
  },
  titleRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
  },
  title: {
    fontSize: "22px",
    fontWeight: "bold" as const,
  },
  addButton: {
    border: "1px solid #707070",
    background: "transparent",
    borderRadius: "50%",
    width: "30px",
    height: "30px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s",
  },
  header: {
    display: "grid",
    gridTemplateColumns: "1fr 2fr 100px",
    fontWeight: "bold" as const,
    padding: "0 20px",
    marginBottom: "10px",
  },
  table: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "15px",
  },
  row: {
    display: "grid",
    gridTemplateColumns: "1fr 2fr 100px",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: "14px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    padding: "15px 20px",
  },
  actions: {
    display: "flex",
    justifyContent: "center",
  },
  trashButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#999",
    transition: "color 0.2s",
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
  emptyState: {
    textAlign: "center" as const,
    padding: "40px 20px",
    color: "#999",
  },
} as const;