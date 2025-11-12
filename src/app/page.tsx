"use client";

import Image from "next/image";
import logo from "./assets/logo.png";
import Blog from "./assets/blogicon.png";
import heroImg from "./assets/header.png";
import mockup from "./assets/mockup.png";
import lojas from "./assets/lojas.png";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter();
  return (
    <main style={styles.container}>

      <section style={{ ...styles.hero, backgroundImage: `url(${heroImg.src})` }}>
        <div style={styles.heroOverlay}>
          <h1 style={styles.heroTitle}>
            Cuide do seu bebê com mais{" "}
            <span style={styles.highlight}>carinho</span> e{" "}
            <span style={styles.highlight}>organização</span>
          </h1>
          <p style={styles.heroSubtitle}>
            Com nosso app você consegue de maneira fácil e intuitiva.
          </p>
        </div>
        <div style={styles.heroOverlay2}>
          <div style={styles.mockup}>
            <Image src={logo} alt="Logo" width={600} height={600} />
          </div>
        </div>
      </section>



      <section id="features" style={styles.features}>
        <h2 style={styles.sectionTitle}>As principais funcionalidades na palma da sua mão</h2>
        <div style={styles.mockup}>
          <Image src={mockup} alt="Mockup" width={400} height={400} />
        </div>
        <div style={styles.featureCardsContainer}>
          <div style={styles.featureCard}>
            <h3 style={styles.featureTitle}>Agenda</h3>
            <p style={styles.featureDescription}>Organize seus compromissos e eventos importantes de forma prática. Receba lembretes, acompanhe datas e nunca perca um momento especial.</p>
          </div>
          <div style={styles.featureCardPlan}>
            <h3 style={styles.featureTitlePlan}>Plano de parto</h3>
            <p style={styles.featureDescriptionPlan}>Monte seu plano de parto personalizado, com tudo que você deseja para esse momento único. Tenha à mão cada detalhe e compartilhe com quem você confiar.</p>
          </div>
          <div style={styles.featureCard}>
            <h3 style={styles.featureTitle}>Minhas listas</h3>
            <p style={styles.featureDescription}>Crie listas de tarefas, compras e preparativos para facilitar sua rotina. Categorize, acompanhe e marque o que já foi feito de forma simples e intuitiva.</p>
          </div>
        </div>
      </section>

      <section style={{ ...styles.hero, backgroundImage: `url(${heroImg.src})` }}>
        <div style={styles.heroOverlay}>
          <h1 style={styles.heroTitle}>
            Faça parte do nosso blog
          </h1>
          <p style={styles.heroSubtitle}>
            Entre em contato conosco e divulgue seus artigos dentro do nosso{" "}
            <strong>blog de autoajuda</strong>. Compartilhe suas experiências,
            ajude outras mães e faça parte da nossa comunidade, por um valor simbólico!
          </p>
          <p style={styles.heroSubtitle}>
            <strong>contato@vemnenem.app.br</strong>
          </p>
        </div>
        <div style={styles.heroOverlay2}>
          <div style={styles.mockup}>
            <Image src={Blog} alt="Blog" width={600} height={600} />
          </div>
        </div>
      </section>

      <section style={styles.downloadSection}>
        <h2 style={styles.sectionTitle2}>Baixe nosso app nas lojas</h2>
        <p style={styles.downloadText}>E conheça mais sobre nosso aplicativo.</p>
        <div style={styles.logoContainer}>
          <Image src={lojas} alt="Loja" width={200} height={200} />
        </div>
      </section>

      <footer id="about" style={styles.footer}>
        <p>©2025 Vem Neném</p>
      </footer>
    </main>
  );
}


const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff",
    color: "#333",
    fontFamily: "sans-serif",
    scrollBehavior: "smooth",
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 50px",
    backgroundColor: "#ffffff",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  ctaShop: {
    width: "200px",
    marginTop: "14px",
    height: "44px",
    border: "none",
    borderRadius: "10px",
    background: "#27d3d6",
    color: "#fff",
    fontWeight: 700,
    cursor: "pointer",
  },
  hero: {
    minHeight: "80vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "80px 50px",
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
  },
  heroOverlay: {
    backgroundColor: "#ffffff",
    padding: "40px",
    borderRadius: "20px",
    textAlign: "center",
    maxWidth: "700px",
  },
  heroTitle: {
    fontSize: "48px",
    fontWeight: "bold",
    lineHeight: "1.2",
    marginBottom: "20px",
  },
  heroSubtitle: {
    color: "#1d2020ff",
    fontSize: "16px",
    fontWeight: "normal",
    marginTop: "20px",
    maxWidth: "500px",
    marginLeft: "auto",
    marginRight: "auto",
    lineHeight: "1.5",
  },
  highlight: {
    color: "#42cfe0",
  },
  features: {
    padding: "80px 50px",
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: "32px",
    fontWeight: "bold",
    color: "0 4px 8px rgba(0,0,0,0.1)",
  },
  sectionTitle2: {
    fontSize: "32px",
    fontWeight: "bold",
    color: "#ffff",
  },
  featureCardsContainer: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  featureCard: {
    backgroundColor: "#f8f8f8",
    padding: "30px",
    borderRadius: "15px",
    maxWidth: "250px",
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
  featureCardPlan: {
    backgroundColor: "#42CFE0",
    padding: "30px",
    borderRadius: "15px",
    maxWidth: "250px",
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
  featureTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "15px",
  },
  featureTitlePlan: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "15px",
    color: "#fff",
  },
  featureDescription: {
    fontSize: "14px",
    color: "#555",
  },
  featureDescriptionPlan: {
    fontSize: "14px",
    color: "#ffffffff",
  },
  downloadSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    padding: '50px',
    margin: '50px auto',
    borderRadius: '15px',
    textAlign: 'center',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    backgroundColor: '#42CFE0',
  },
  downloadText: {
    fontSize: "16px",
    marginTop: "20px",
    color: "#ffffff",
    fontWeight: "bold",
  },
  footer: {
    marginTop: "80px",
    textAlign: "center",
    padding: "20px",
    borderTop: "1px solid #eee",
    color: "#888",
    fontSize: "14px",
  },
};
