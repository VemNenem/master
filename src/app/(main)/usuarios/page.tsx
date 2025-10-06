"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { usuariosService, User } from "../../services/usuariosService";

export default function ListagemUsuarios() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;

  const loadUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await usuariosService.listUsers(currentPage, pageSize);
      setUsers(response.users);
      setTotalPages(response.pagination.totalPages);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar usuários");
      console.error("Erro ao carregar usuários:", err);
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  // Carrega usuários ao montar o componente
  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const toggleActive = async (user: User) => {
    try {
      const newBlockedStatus = !user.blocked;
      await usuariosService.toggleBlockUser(user.documentId, newBlockedStatus);

      // Atualiza o estado local
      setUsers((prev) =>
        prev.map((u) =>
          u.documentId === user.documentId ? { ...u, blocked: newBlockedStatus } : u
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao atualizar usuário");
      console.error("Erro ao atualizar usuário:", err);
    }
  };

  const deleteUser = async (user: User) => {
    if (!confirm(`Deseja realmente excluir o usuário ${user.username}?`)) {
      return;
    }

    try {
      await usuariosService.deleteUser(user.documentId);

      // Remove do estado local
      setUsers((prev) => prev.filter((u) => u.documentId !== user.documentId));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao deletar usuário");
      console.error("Erro ao deletar usuário:", err);
    }
  };

  return (
    <main style={style.container}>
      <section style={style.content}>
        <h2 style={style.title}>Listagem de usuários</h2>

        {error && (
          <div style={style.errorMessage}>
            {error}
          </div>
        )}

        <div style={style.header}>
          <span>Nome</span>
          <span>Email</span>
          <span style={{ textAlign: "center" }}>Ação</span>
        </div>

        {loading ? (
          <div style={style.loadingContainer}>
            <Loader2 size={40} style={{ animation: "spin 1s linear infinite" }} />
            <p>Carregando usuários...</p>
          </div>
        ) : (
          <>
            <div className="scroll-box" style={style.table}>
              {users.length === 0 ? (
                <div style={style.emptyState}>
                  <p>Nenhum usuário encontrado</p>
                </div>
              ) : (
                users.map((user) => (
                  <div key={user.documentId} style={style.row}>
                    <span>{user.username}</span>
                    <span>{user.email}</span>
                    <div style={style.switchContainer}>
                      <div
                        style={style.switch(!user.blocked)}
                        onClick={() => toggleActive(user)}
                        title={user.blocked ? "Usuário bloqueado" : "Usuário ativo"}
                      >
                        <div style={style.switchBall(!user.blocked)}></div>
                      </div>
                      <button
                        style={style.trashButton}
                        onClick={() => deleteUser(user)}
                        title="Excluir usuário"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {totalPages > 1 && (
              <div style={style.pagination}>
                <button
                  style={style.paginationButton}
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  Anterior
                </button>
                <span style={style.paginationInfo}>
                  Página {currentPage} de {totalPages}
                </span>
                <button
                  style={style.paginationButton}
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  Próxima
                </button>
              </div>
            )}
          </>
        )}
      </section>

      <style jsx>{`
        .scroll-box {
          max-height: 70%;
          overflow-y: auto;
          padding-right: 10px;
        }
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
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
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
  title: {
    fontSize: "22px",
    fontWeight: "bold" as const,
    marginBottom: "30px",
  },
  errorMessage: {
    backgroundColor: "#fee",
    color: "#c33",
    padding: "12px 20px",
    borderRadius: "8px",
    marginBottom: "20px",
    border: "1px solid #fcc",
  },
  table: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "15px",
  },
  header: {
    display: "grid",
    gridTemplateColumns: "1fr 2fr 100px",
    fontWeight: "bold" as const,
    padding: "0 20px",
    marginBottom: "10px",
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
  switchContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
  },
  switch: (active: boolean) => ({
    width: "40px",
    height: "20px",
    borderRadius: "20px",
    backgroundColor: active ? "#42CFEA" : "#ccc",
    position: "relative" as const,
    cursor: "pointer" as const,
    transition: "all 0.3s ease",
  }),
  switchBall: (active: boolean) => ({
    position: "absolute" as const,
    top: "2px",
    left: active ? "22px" : "2px",
    width: "16px",
    height: "16px",
    backgroundColor: "white",
    borderRadius: "50%",
    transition: "all 0.3s ease",
  }),
  trashButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#999",
  },
  loadingContainer: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    padding: "60px 20px",
    color: "#00c5b5",
  },
  emptyState: {
    textAlign: "center" as const,
    padding: "60px 20px",
    color: "#999",
  },
  pagination: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "20px",
    marginTop: "30px",
  },
  paginationButton: {
    padding: "8px 16px",
    backgroundColor: "#42CFEA",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "all 0.3s ease",
  },
  paginationInfo: {
    color: "#707070",
    fontSize: "14px",
  },
} as const;