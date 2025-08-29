"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "./assets/logo.png";
import heroImg from "./assets/header.png";

export default function Home() {
  return (
    <main style={styles.container}>
      {/* Navbar */}
      <header style={styles.navbar}>
        <div style={styles.logoContainer}>
          <Image src={logo} alt="Logo" width={40} height={40} />
        </div>
        <nav style={styles.nav}>
          <Link href="/shop" style={styles.ctaShop}>
            Entrar
          </Link>
        </nav>
      </header>

      {/* Hero */}
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
      </section>

      {/* Features */}
      <section id="features" style={styles.features}>
        <h2 style={styles.sectionTitle}>Aqui tem as funcionalidades</h2>
        <div style={styles.featureCardsContainer}>
          <div style={styles.featureCard}>
            <h3 style={styles.featureTitle}>Funcionalidade 1</h3>
            <p style={styles.featureDescription}>Descrição da funcionalidade 1.</p>
          </div>
          <div style={styles.featureCard}>
            <h3 style={styles.featureTitle}>Funcionalidade 2</h3>
            <p style={styles.featureDescription}>Descrição da funcionalidade 2.</p>
          </div>
          <div style={styles.featureCard}>
            <h3 style={styles.featureTitle}>Funcionalidade 3</h3>
            <p style={styles.featureDescription}>Descrição da funcionalidade 3.</p>
          </div>
        </div>
      </section>

      {/* Download App Section */}
      <section style={styles.downloadSection}>
        <h2 style={styles.sectionTitle}>Baixe nosso app nas lojas</h2>
        <p style={styles.downloadText}>Disponível na App Store e Google Play.</p>
      </section>

      {/* Footer */}
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
  nav: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
  },
  ctaShop: {
    backgroundColor: "#42cfe0",
    color: "white",
    padding: "10px 20px",
    borderRadius: "10px",
    fontWeight: "bold",
    textDecoration: "none",
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
    marginBottom: "40px",
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
  featureTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "15px",
  },
  featureDescription: {
    fontSize: "14px",
    color: "#555",
  },
  downloadSection: {
    padding: "80px 50px",
    textAlign: "center",
    backgroundColor: "#ffffff",
  },
  downloadText: {
    fontSize: "16px",
    marginTop: "20px",
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
