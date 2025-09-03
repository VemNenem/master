"use client";

export default function TermoPage() {
  return (
    <main style={style.container}>
      <h2 style={style.title}>Termo de uso</h2>

      <div style={style.cards}>

        <div style={style.column}>
          <h3 style={style.cardTitle}>Termo de uso</h3>
          <div style={style.card} className="scroll-box">
            <p style={style.text}>
 1. Coleta de Informações
Coletamos dados pessoais fornecidos pelo usuário durante o cadastro e uso da plataforma, como nome, e-mail e informações de acesso.

2. Uso das Informações
Os dados são utilizados para fornecer e melhorar os serviços, personalizar a experiência e enviar comunicações relevantes.

3. Compartilhamento de Dados
Não compartilhamos informações pessoais com terceiros, exceto quando exigido por lei ou para prestação de serviços essenciais.

4. Segurança
Adotamos medidas técnicas e organizacionais para proteger os dados contra acesso não autorizado, perda ou alteração.

5. Direitos do Usuário
O usuário pode solicitar a exclusão, atualização ou acesso às suas informações a qualquer momento através do suporte.
1. Coleta de Informações
Coletamos dados pessoais fornecidos pelo usuário durante o cadastro e uso da plataforma, como nome, e-mail e informações de acesso.

2. Uso das Informações
Os dados são utilizados para fornecer e melhorar os serviços, personalizar a experiência e enviar comunicações relevantes.

3. Compartilhamento de Dados
Não compartilhamos informações pessoais com terceiros, exceto quando exigido por lei ou para prestação de serviços essenciais.

4. Segurança
Adotamos medidas técnicas e organizacionais para proteger os dados contra acesso não autorizado, perda ou alteração.

5. Direitos do Usuário
O usuário pode solicitar a exclusão, atualização ou acesso às suas informações a qualquer momento através do suporte.

            </p>
          </div>
          <button style={style.button}>CADASTRAR</button>
        </div>

        <div style={style.column}>
          <h3 style={style.cardTitle}>Política de privacidade</h3>
          <div style={style.card} className="scroll-box">
            <p style={style.text}>
              1. Coleta de Informações
Coletamos dados pessoais fornecidos pelo usuário durante o cadastro e uso da plataforma, como nome, e-mail e informações de acesso.

2. Uso das Informações
Os dados são utilizados para fornecer e melhorar os serviços, personalizar a experiência e enviar comunicações relevantes.

3. Compartilhamento de Dados
Não compartilhamos informações pessoais com terceiros, exceto quando exigido por lei ou para prestação de serviços essenciais.

4. Segurança
Adotamos medidas técnicas e organizacionais para proteger os dados contra acesso não autorizado, perda ou alteração.

5. Direitos do Usuário
O usuário pode solicitar a exclusão, atualização ou acesso às suas informações a qualquer momento através do suporte.
1. Coleta de Informações
Coletamos dados pessoais fornecidos pelo usuário durante o cadastro e uso da plataforma, como nome, e-mail e informações de acesso.

2. Uso das Informações
Os dados são utilizados para fornecer e melhorar os serviços, personalizar a experiência e enviar comunicações relevantes.

3. Compartilhamento de Dados
Não compartilhamos informações pessoais com terceiros, exceto quando exigido por lei ou para prestação de serviços essenciais.

4. Segurança
Adotamos medidas técnicas e organizacionais para proteger os dados contra acesso não autorizado, perda ou alteração.

5. Direitos do Usuário
O usuário pode solicitar a exclusão, atualização ou acesso às suas informações a qualquer momento através do suporte.
1. Coleta de Informações
Coletamos dados pessoais fornecidos pelo usuário durante o cadastro e uso da plataforma, como nome, e-mail e informações de acesso.

2. Uso das Informações
Os dados são utilizados para fornecer e melhorar os serviços, personalizar a experiência e enviar comunicações relevantes.

3. Compartilhamento de Dados
Não compartilhamos informações pessoais com terceiros, exceto quando exigido por lei ou para prestação de serviços essenciais.

4. Segurança
Adotamos medidas técnicas e organizacionais para proteger os dados contra acesso não autorizado, perda ou alteração.

5. Direitos do Usuário
O usuário pode solicitar a exclusão, atualização ou acesso às suas informações a qualquer momento através do suporte.
            </p>
          </div>
          <button style={style.button}>CADASTRAR</button>
        </div>
      </div>

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
  },
};
