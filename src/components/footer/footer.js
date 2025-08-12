import React from "react";
import styles from "./footer.module.css";

export default function Footer() {
  const Logo = "https://i.ibb.co/23YGGMNM/Logo-Transparente.png";

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        
        {/* Coluna Logo */}
        <div className={styles.footerCol}>
          <img src={Logo} alt="Logo do site" className={styles.logo} />
       
        </div>

        {/* Coluna 1 */}
        <div className={styles.footerCol}>
          <h3>Institucional</h3>
          <a href="/">Sobre Nós</a>
          <a href="/">Missão & Visão</a>
          <a href="/">Nossa História</a>
          <a href="/">Trabalhe Conosco</a>
        </div>

        {/* Coluna 2 */}
        <div className={styles.footerCol}>
          <h3>Serviços</h3>
          <a href="/">Consultoria</a>
          <a href="/">Suporte Técnico</a>
          <a href="/">Treinamentos</a>
          <a href="/">Parcerias</a>
        </div>

        {/* Coluna 3 */}
        <div className={styles.footerCol}>
          <h3>Ajuda</h3>
          <a href="/">Central de Ajuda</a>
          <a href="/">FAQ</a>
          <a href="/">Política de Privacidade</a>
          <a href="/">Termos de Uso</a>
        </div>

        <div className={styles.footerCol}>
          <h3>Contato</h3>
          <a href="/">Email</a>
          <a href="/">Telefone</a>
          <a href="/">Rede social</a>

        </div>

          <div className={styles.footerCol}>
          <h3>Membros</h3>
          <a href="/">Marcos Daniel</a>
          <a href="/">Derick Willson</a>
          <a href="/">Fabrício Mansano</a>
          <a href="/">Calebe Sanches</a>
          <a href="/">Giovanny Martins</a>


        </div>


      </div>

      {/* Barra inferior */}
      <div className={styles.footerCopy}>
        <p>© {new Date().getFullYear()} - Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
