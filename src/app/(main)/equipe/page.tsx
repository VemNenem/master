"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, X } from "lucide-react";
import {
  Usuario,
  FormData,
  carregarUsuarios,
  criarUsuario,
  deletarUsuario,
} from "./equipeService";

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    handleCarregarUsuarios();
  }, []);

  const handleCarregarUsuarios = async () => {
    setLoading(true);
    const data = await carregarUsuarios();
    setUsuarios(data);
    setLoading(false);
  };


  const handleDeletarUsuario = async (documentId: string) => {
    setDeleting(documentId);
    const success = await deletarUsuario(documentId);

    if (success) {
      setUsuarios((prev) => prev.filter((u) => u.documentId !== documentId));
    }

    setDeleting(null);
  };


  const handleCriarUsuario = async () => {
    setLoading(true);
    const result = await criarUsuario(formData);

    if (result.success) {
      await handleCarregarUsuarios();
      setShowModal(false);
      setFormData({ name: "", email: "", password: "" });
      alert(result.message || "Usuário cadastrado com sucesso!");
    } else {
      alert(result.message || "Erro ao criar usuário");
    }

    setLoading(false);
  };


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const containerStyle: React.CSSProperties = {
    padding: '24px',
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '24px'
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '24px',
    fontWeight: '600',
    color: '#1f2937',
    margin: 0
  };

  const addButtonStyle: React.CSSProperties = {
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  };

  const tableStyle: React.CSSProperties = {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    border: '1px solid #e5e7eb',
    overflow: 'hidden'
  };

  const tableHeaderStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr auto',
    gap: '16px',
    padding: '16px',
    backgroundColor: '#f9fafb',
    borderBottom: '1px solid #e5e7eb',
    fontSize: '14px',
    fontWeight: '500',
    color: '#6b7280'
  };

  const tableRowStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr auto',
    gap: '16px',
    padding: '16px',
    borderBottom: '1px solid #e5e7eb',
    alignItems: 'center'
  };

  const deleteButtonStyle: React.CSSProperties = {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#ef4444',
    cursor: 'pointer',
    padding: '4px',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const modalBackdropStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  };

  const modalContentStyle: React.CSSProperties = {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '24px',
    width: '100%',
    maxWidth: '400px',
    margin: '16px'
  };

  const modalHeaderStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '16px'
  };

  const modalTitleStyle: React.CSSProperties = {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1f2937',
    margin: 0
  };

  const closeButtonStyle: React.CSSProperties = {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#6b7280',
    cursor: 'pointer',
    padding: '4px',
    borderRadius: '4px'
  };

  const inputGroupStyle: React.CSSProperties = {
    marginBottom: '16px'
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '14px',
    fontWeight: '500',
    color: '#374151',
    marginBottom: '4px'
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '8px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box'
  };

  const buttonRowStyle: React.CSSProperties = {
    display: 'flex',
    gap: '12px',
    marginTop: '24px'
  };

  const cancelButtonStyle: React.CSSProperties = {
    flex: 1,
    padding: '8px 16px',
    backgroundColor: '#f3f4f6',
    color: '#374151',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px'
  };

  const submitButtonStyle: React.CSSProperties = {
    flex: 1,
    padding: '8px 16px',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const spinnerStyle: React.CSSProperties = {
    width: '16px',
    height: '16px',
    border: '2px solid white',
    borderTop: '2px solid transparent',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  };

  return (
    <>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>

      <div style={containerStyle}>
        {/* Header */}
        <div style={headerStyle}>
          <h1 style={titleStyle}>Equipe</h1>
          <button
            style={addButtonStyle}
            onClick={() => setShowModal(true)}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#2563eb';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#3b82f6';
            }}
          >
            <Plus size={20} />
          </button>
        </div>

        {/* Tabela */}
        <div style={tableStyle}>
          {/* Header da tabela */}
          <div style={tableHeaderStyle}>
            <div>Nome</div>
            <div>Email</div>
            <div style={{ textAlign: 'center' }}>Ação</div>
          </div>

          {/* Loading state */}
          {loading && usuarios.length === 0 && (
            <div style={{ padding: '32px', textAlign: 'center', color: '#6b7280' }}>
              Carregando usuários...
            </div>
          )}

          {/* Lista vazia */}
          {!loading && usuarios.length === 0 && (
            <div style={{ padding: '32px', textAlign: 'center', color: '#6b7280' }}>
              Nenhum usuário encontrado
            </div>
          )}

          {/* Usuários */}
          {Array.isArray(usuarios) && usuarios.map((usuario) => (
            <div
              key={usuario.documentId || usuario.email}
              style={tableRowStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f9fafb';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <div style={{ color: '#1f2937', fontWeight: '500' }}>
                {usuario.username || 'Nome não informado'}
              </div>
              <div style={{ color: '#6b7280' }}>
                {usuario.email}
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button
                  style={deleteButtonStyle}
                  onClick={() => handleDeletarUsuario(usuario.documentId)}
                  disabled={deleting === usuario.documentId}
                  onMouseEnter={(e) => {
                    if (!e.currentTarget.disabled) {
                      e.currentTarget.style.backgroundColor = '#fee2e2';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  {deleting === usuario.documentId ? (
                    <div style={spinnerStyle}></div>
                  ) : (
                    <Trash2 size={16} />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {showModal && (
          <div style={modalBackdropStyle}>
            <div style={modalContentStyle}>
              <div style={modalHeaderStyle}>
                <h2 style={modalTitleStyle}>Adicionar Usuário</h2>
                <button
                  style={closeButtonStyle}
                  onClick={() => setShowModal(false)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f3f4f6';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <X size={20} />
                </button>
              </div>

              <div style={inputGroupStyle}>
                <label style={labelStyle}>Nome</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  style={inputStyle}
                  placeholder="Digite o nome"
                />
              </div>

              <div style={inputGroupStyle}>
                <label style={labelStyle}>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  style={inputStyle}
                  placeholder="Digite o email"
                />
              </div>

              <div style={inputGroupStyle}>
                <label style={labelStyle}>Senha</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  style={inputStyle}
                  placeholder="Digite a senha"
                />
              </div>

              <div style={buttonRowStyle}>
                <button
                  style={cancelButtonStyle}
                  onClick={() => setShowModal(false)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#e5e7eb';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#f3f4f6';
                  }}
                >
                  Cancelar
                </button>
                <button
                  style={{
                    ...submitButtonStyle,
                    backgroundColor: loading || !formData.name || !formData.email || !formData.password ? '#9ca3af' : '#3b82f6',
                    cursor: loading || !formData.name || !formData.email || !formData.password ? 'not-allowed' : 'pointer'
                  }}
                  onClick={handleCriarUsuario}
                  disabled={loading || !formData.name || !formData.email || !formData.password}
                  onMouseEnter={(e) => {
                    if (!e.currentTarget.disabled) {
                      e.currentTarget.style.backgroundColor = '#2563eb';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!e.currentTarget.disabled) {
                      e.currentTarget.style.backgroundColor = '#3b82f6';
                    }
                  }}
                >
                  {loading ? (
                    <div style={spinnerStyle}></div>
                  ) : (
                    'Adicionar'
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}