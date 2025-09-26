"use client";
import React, { useState } from "react";
import { Trash2, Plus } from "lucide-react";

export default function Equipe() {
  const [team, setTeam] = useState([
    { id: 1, name: "Julia", email: "julia@gmail.com" },
    { id: 2, name: "Bryan", email: "bryan@gmail.com" },
    { id: 3, name: "Micaela", email: "micaela@gmail.com" },
    { id: 4, name: "Lucas", email: "lucas@gmail.com" },
       { id: 1, name: "Julia", email: "julia@gmail.com" },
    { id: 2, name: "Bryan", email: "bryan@gmail.com" },
    { id: 3, name: "Micaela", email: "micaela@gmail.com" },
    { id: 4, name: "Lucas", email: "lucas@gmail.com" },
  ]);

  const deleteMember = (id: number) => {
    setTeam((prev) => prev.filter((member) => member.id !== id));
  };

  const addMember = () => {
    const name = prompt("Digite o nome:");
    const email = prompt("Digite o email:");
    if (name && email) {
      setTeam((prev) => [
        ...prev,
        { id: Date.now(), name, email },
      ]);
    }
  };

  return (
    <main style={style.container}>
      <section style={style.content}>
        <div style={style.titleRow}>
          <h2 style={style.title}>Equipe</h2>
          <button style={style.addButton} onClick={addMember}>
            <Plus size={18} color="#707070" />
          </button>
        </div>

        <div style={style.header}>
          <span>Nome</span>
          <span>Email</span>
          <span style={{ textAlign: "center" }}>Ação</span>
        </div>

        <div className="scroll-box" style={style.table}>
          {team.map((member) => (
            <div key={member.id} style={style.row}>
              <span>{member.name}</span>
              <span>{member.email}</span>
              <div style={style.actions}>
                <button
                  style={style.trashButton}
                  onClick={() => deleteMember(member.id)}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

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
    width: "20px",
    height: "20px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
  },
} as const;
