"use client";
import React, { useState } from "react";
import Sidebar from "../../components/sidebar"; 
import { Trash2 } from "lucide-react";

export default function ListagemUsuarios() {
  const [users, setUsers] = useState([
    { id: 1, name: "Julia", email: "***********@gmail.com", active: true },
    { id: 2, name: "Bryan", email: "***********@gmail.com", active: true },
    { id: 3, name: "Micaela", email: "***********@gmail.com", active: true },
    { id: 4, name: "Lucas", email: "***********@gmail.com", active: true },
    { id: 1, name: "Julia", email: "***********@gmail.com", active: true },
    { id: 2, name: "Bryan", email: "***********@gmail.com", active: true },
    { id: 3, name: "Micaela", email: "***********@gmail.com", active: true },
    { id: 4, name: "Lucas", email: "***********@gmail.com", active: true },
  ]);

  const toggleActive = (id: number) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, active: !user.active } : user
      )
    );
  };

  const deleteUser = (id: number) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  return (
    <main style={style.container}>
      <section style={style.content}>
        <h2 style={style.title}>Listagem de usuários</h2>
        <div style={style.header}>
          <span>Nome</span>
          <span>Email</span>
          <span style={{ textAlign: "center" }}>Ação</span>
        </div>

        <div className="scroll-box" style={style.table}>
          {users.map((user) => (
            <div key={user.id} style={style.row}>
              <span>{user.name}</span>
              <span>{user.email}</span>
              <div style={style.switchContainer}>
                <div
                  style={style.switch(user.active)}
                  onClick={() => toggleActive(user.id)}
                >
                  <div style={style.switchBall(user.active)}></div>
                </div>
                <button
                  style={style.trashButton}
                  onClick={() => deleteUser(user.id)}
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
  title: {
    fontSize: "22px",
    fontWeight: "bold" as const,
    marginBottom: "30px",
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
} as const;
