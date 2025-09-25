import React from 'react';

interface ErrorPopupProps {
  message: string;
  onClose: () => void;
}

export default function ErrorPopup({ message, onClose }: ErrorPopupProps) {
  const style = {
    overlay: {
      position: 'fixed' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    },
    popup: {
      backgroundColor: '#fff',
      borderRadius: '14px',
      padding: '30px',
      maxWidth: '400px',
      width: '90%',
      textAlign: 'center' as const,
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
      border: '2px solid #ff6b6b',
    },
    icon: {
      fontSize: '48px',
      color: '#ff6b6b',
      marginBottom: '15px',
    },
    title: {
      fontSize: '18px',
      fontWeight: 'bold' as const,
      color: '#333',
      marginBottom: '10px',
    },
    message: {
      fontSize: '14px',
      color: '#666',
      marginBottom: '20px',
      lineHeight: '1.4',
    },
    button: {
      padding: '10px 20px',
      borderRadius: '5px',
      border: 'none',
      backgroundColor: '#ff6b6b',
      color: '#fff',
      fontSize: '14px',
      fontWeight: 'bold' as const,
      cursor: 'pointer' as const,
      transition: 'background-color 0.3s ease',
    },
    buttonHover: {
      backgroundColor: '#ff5252',
    }
  };

  return (
    <div style={style.overlay} onClick={onClose}>
      <div style={style.popup} onClick={(e) => e.stopPropagation()}>
        <div style={style.icon}>❌</div>
        <h3 style={style.title}>Erro</h3>
        <p style={style.message}>{message}</p>
        <button
          style={style.button}
          onClick={onClose}
          onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = style.buttonHover.backgroundColor}
          onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = style.button.backgroundColor}
        >
          Fechar
        </button>
      </div>
    </div>
  );
}