"use client";
import { useEffect, useState, useRef } from "react";

export default function SuccessPopup({ message, showBackground = true, trigger }) {
  const [isOpen, setIsOpen] = useState(false);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    if (!message) return;

    setIsOpen(true);
    const timer = setTimeout(() => setIsOpen(false), 2000);
    return () => clearTimeout(timer);
  }, [trigger, message]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        ...style.overlay,
        backgroundColor: showBackground ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0)",
      }}
    >
      <div style={style.popup}>
        <div style={style.header}>
          <div style={style.icon}>✔</div>
          <h2 style={style.title}>Sucesso!</h2>
        </div>
        <p style={style.message}>{message}</p>
      </div>
    </div>
  );
}

const style = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  popup: {
    background: "#fff",
    borderRadius: "16px",
    padding: "30px",
    textAlign: "center",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    minWidth: "314px",
    minHeight: "314px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "12px",
  },
  icon: {
    fontSize: "24px",
    color: "#28a745",
  },
  title: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#28a745",
    margin: 0,
  },
  message: {
    fontSize: "14px",
    color: "#000",
  },
};
