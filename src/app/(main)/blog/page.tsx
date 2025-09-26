"use client";
import React, { useState } from "react";
import { Trash2, Plus } from "lucide-react";
import Image from "next/image"; // ✅ Import do Image do Next.js
import logo from "@/app/assets/logo.png";

export default function Blog() {
  const [posts, setPosts] = useState([
    { 
      id: 1, 
      title: "Práticas básicas de primeiros socorros", 
      author: "Bryan Henrique",
      image: logo,
    },
    { 
      id: 2, 
      title: "Paternidade", 
      author: "Bryan Henrique",
      image: logo,
    },
    { 
      id: 3, 
      title: "Como fazer sua lista de enxoval", 
      author: "Bryan Henrique",
      image: logo,
    },
    { 
      id: 4, 
      title: "Muita cólica?", 
      author: "Bryan Henrique",
      image: logo,
    },
  ]);

  const deletePost = (id: number) => {
    setPosts((prev) => prev.filter((post) => post.id !== id));
  };

  return (
    <main style={styles.content}>
      <div style={styles.header}>
        <h1 style={styles.title}>Blog</h1>
        <button style={styles.addButton}>
          <Plus size={18} color="#707070" />
        </button>
      </div>

      <div className="scroll-box" style={styles.postsContainer}>
        {posts.map((post) => (
          <div key={post.id} style={styles.postCard}>
            <Image 
              src={post.image} 
              alt={post.title} 
              width={120} 
              height={80} 
              style={styles.postImage} 
            />
            <div style={styles.postContent}>
              <h3 style={styles.postTitle}>{post.title}</h3>
              <p style={styles.postAuthor}>
                Por: <span style={styles.authorName}>{post.author}</span>
              </p>
            </div>
            <button
              style={styles.deleteButton}
              onClick={() => deletePost(post.id)}
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>

      <style jsx>{`
        .scroll-box {
          max-height: 500px; 
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
  },
} as const;
