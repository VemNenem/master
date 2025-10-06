"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Trash2, Plus } from "lucide-react";
import PostagemModal from "./../../components/postagemModal"; // ajuste o caminho
import { carregarPosts, criarPost, deletarPost, Post } from "@/app/services/blogService"; // ajuste o caminho

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Carregar posts ao montar o componente
  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const postsData = await carregarPosts();
      setPosts(postsData);
    } catch (err) {
      setError("Erro ao carregar posts");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deletePostHandler = async (documentId: string) => {
    if (!confirm("Tem certeza que deseja deletar este post?")) return;

    try {
      const success = await deletarPost(documentId);
      if (success) {
        setPosts((prev) => prev.filter((post) => post.documentId !== documentId));
      } else {
        alert("Erro ao deletar post. Tente novamente.");
      }
    } catch (err) {
      console.error("Erro ao deletar:", err);
      alert("Erro ao deletar post.");
    }
  };

  const addPost = async (formData: { titulo: string; texto: string; autor: string; imagemCapa?: File | null }) => {
    try {
      const result = await criarPost({
        title: formData.titulo,
        text: formData.texto,
        author: formData.autor,
        image: formData.imagemCapa,
      });

      if (result.success) {
        // Recarrega a lista após adicionar
        await loadPosts();
        setShowModal(false);
        return { success: true };
      } else {
        return { success: false, message: result.message };
      }
    } catch (err) {
      console.error("Erro ao adicionar:", err);
      return { success: false, message: "Erro ao criar post." };
    }
  };

  if (loading) {
    return (
      <main style={styles.content}>
        <p>Carregando posts...</p>
      </main>
    );
  }

  return (
    <main style={styles.content}>
      <div style={styles.header}>
        <h1 style={styles.title}>Blog</h1>
        <button style={styles.addButton} onClick={() => setShowModal(true)}>
          <Plus size={18} color="#707070" />
        </button>
      </div>

      {error && (
        <div style={styles.errorBanner}>
          {error}
          <button onClick={loadPosts} style={styles.retryButton}>
            Tentar novamente
          </button>
        </div>
      )}

      <div className="scroll-box" style={styles.postsContainer}>
        {posts.length === 0 ? (
          <div style={styles.emptyState}>
            <p>Nenhum post cadastrado ainda.</p>
          </div>
        ) : (
          posts.map((post) => (
            <div key={post.documentId} style={styles.postCard}>
              {post.image ? (
                <Image
                  src={post.image.url ? `https://api.vemnenem.app.br${post.image.url}` : ""}
                  alt={post.title}
                  style={styles.postImage}
                  width={post.image.width || 400}
                  height={post.image.height || 300}
                />
              ) : (
                <div style={styles.placeholderImage}>
                  <span>Sem imagem</span>
                </div>
              )}
              <div style={styles.postContent}>
                <h3 style={styles.postTitle}>{post.title}</h3>
                <p style={styles.postAuthor}>
                  Por: <span style={styles.authorName}>{post.author}</span>
                </p>
              </div>
              <button
                style={styles.deleteButton}
                onClick={() => deletePostHandler(post.documentId)}
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))
        )}
      </div>

      <PostagemModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={addPost}
      />

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
      `}</style>
    </main>
  );
}

const styles = {
  content: {
    flex: 1,
    padding: "40px",
    color: "#707070",
    display: "flex",
    flexDirection: "column" as const,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  title: {
    fontSize: "22px",
    fontWeight: "bold" as const,
  },
  addButton: {
    border: "1px solid #707070",
    background: "transparent",
    borderRadius: "50%",
    width: "32px",
    height: "32px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s",
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
  postsContainer: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "15px",
  },
  postCard: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "white",
    border: "1px solid #e5e5e5",
    borderRadius: "12px",
    padding: "20px",
    gap: "20px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
  },
  postImage: {
    borderRadius: "8px",
    objectFit: "cover" as const,
    width: "120px",
    height: "80px",
  },
  placeholderImage: {
    width: "120px",
    height: "80px",
    borderRadius: "8px",
    backgroundColor: "#f0f0f0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#999",
    fontSize: "12px",
  },
  postContent: {
    flex: 1,
  },
  postTitle: {
    fontSize: "18px",
    fontWeight: "500" as const,
    color: "#333",
    margin: "0 0 8px 0",
    lineHeight: "1.4",
  },
  postAuthor: {
    fontSize: "14px",
    color: "#999",
    margin: 0,
  },
  authorName: {
    color: "#666",
  },
  deleteButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#999",
    transition: "color 0.2s",
  },
} as const;
