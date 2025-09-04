"use client";
import { useState } from "react";
import SuccessPopup from "../../components/sucessPopup";

export default function TermoPage() {
  const [popupTrigger, setPopupTrigger] = useState(0);

  const handleCadastrar = () => {
    setPopupTrigger(prev => prev + 1); 
  };

  return (
    <main style={style.container}>
      <h2 style={style.title}>Termo de uso</h2>

      <div style={style.cards}>
        <div style={style.column}>
          <h3 style={style.cardTitle}>Termo de uso</h3>
          <div style={style.card} className="scroll-box">
            <p style={style.text}>
              Aceitação dos Termos
              Ao utilizar este serviço, você concorda com estes Termos de Uso.

              Cadastro
              É necessário criar uma conta para acessar algumas funcionalidades. Forneça informações verdadeiras.

              Uso do Serviço
              O serviço deve ser usado apenas para fins legais e pessoais.

              Propriedade Intelectual
              Todo conteúdo do serviço é protegido por direitos autorais e marcas registradas.

              Conteúdo do Usuário
              Você é responsável pelo conteúdo que envia, publica ou compartilha.

              Proibições
              Não é permitido transmitir vírus, spam ou conteúdos ilegais.

              Modificações do Serviço
              O serviço pode ser alterado, suspenso ou descontinuado a qualquer momento.

              Privacidade
              O uso do serviço está sujeito à Política de Privacidade.

              Rescisão
              Podemos encerrar ou suspender contas que violem os termos.

              Limitação de Responsabilidade
              O serviço não se responsabiliza por danos diretos ou indiretos decorrentes do uso.

              Indenização
              Você concorda em indenizar o serviço por quaisquer reclamações decorrentes do seu uso.

              Legislação Aplicável
              Estes termos são regidos pelas leis do país de operação do serviço.
            </p>
          </div>
          <button style={style.button} onClick={handleCadastrar}>
            CADASTRAR
          </button>
        </div>

        <div style={style.column}>
          <h3 style={style.cardTitle}>Política de privacidade</h3>
          <div style={style.card} className="scroll-box">
            <p style={style.text}>
              Coleta de Dados
              Podemos coletar dados pessoais e de uso para fornecer e melhorar o serviço.

              Tipos de Dados
              Coletamos nome, e-mail, preferências, histórico de acesso e informações técnicas do dispositivo.

              Uso de Dados
              Os dados são usados para personalizar a experiência e enviar informações relevantes.

              Compartilhamento de Dados
              Não compartilhamos seus dados com terceiros sem consentimento, exceto por obrigação legal.

              Segurança
              Implementamos medidas de proteção para evitar acesso não autorizado ou perda de dados.

              Armazenamento
              Seus dados são armazenados de forma segura pelos períodos necessários para prestação do serviço.

              Cookies
              Usamos cookies e tecnologias semelhantes para melhorar a navegação e analisar tendências.

              Marketing e Comunicação
              Podemos enviar e-mails ou notificações com informações sobre o serviço ou promoções.

              Direitos do Usuário
              Você pode acessar, corrigir ou solicitar a exclusão de seus dados pessoais.

              Menores de Idade
              O serviço não é destinado a menores sem consentimento dos responsáveis.

              Alterações na Política
              Esta política pode ser atualizada periodicamente; recomendamos revisão regular.

              Contato
              Para dúvidas sobre a política de privacidade, entre em contato com nosso suporte.
            </p>
          </div>
          <button style={style.button} onClick={handleCadastrar}>
            CADASTRAR
          </button>
        </div>
      </div>

      <SuccessPopup 
        message="Cadastro realizado com sucesso!" 
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
  card: {
    flex: 1,
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "20px",
    overflowY: "auto",
    marginBottom: "15px",
    maxHeight: "400px",
  },
  text: {
    fontSize: "14px",
    color: "#707070",
    lineHeight: "1.6",
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
  },
};
