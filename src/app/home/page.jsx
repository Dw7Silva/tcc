"use client";
import styles from "./home.module.css";

const Logo = "https://i.ibb.co/23YGGMNM/Logo-Transparente.png";
export default function Home () {
    return (
    <div>
        <div className={styles.navbr}>
            <div>
                <img src={Logo}  className={styles.logo}></img>
                <div className={styles.info}>
                    <span>Início</span>
                    <span>Como Funciona</span>
                    <span>Sobre Nós</span>
                    <span>Contato</span>
                </div>

                <div className={styles.ec}>
                    <span className={styles.login}>Entrar</span>
                    <span className={styles.cadastrar}>Cadastrar</span>
                </div>
            </div>
        </div>

            <div className={styles.teste}>
                <h1 className={styles.des}>Conectando Produtores de Amendoim e Empresas</h1>
                <span className={styles.sub} >Facilitamos a conexão entre agricultores e empresas para a compra e venda de amendoins, garantindo negociações rápidas e seguras.</span>
            </div>

          {/* Como podemos Ajudar */}

            <div className={styles.ajuda}>
                <h1 > Como podemos ajudar  </h1>
            </div>
      
        <div className={styles.card}>
            <div className={styles.agr}>
              <h3>Agricultor</h3>
              <span>Acesso direto a compradores, melhores preços e visibilidade para sua produção de amendoim.</span>
            </div>

             <div className={styles.empre}>
              <h3>Empresa</h3>
              <span>Encontre produtores confiáveis, negocie diretamente e garanta amendoim de qualidade para seu negócio.</span>
            </div>

             <div className={styles.ts}>
              <h3>Transações Seguras</h3>
              <span>Garantimos a segurança das negociações, com verificação de qualidade e pagamentos protegidos.</span>
            </div>
        </div>
            
    </div>
    )
}