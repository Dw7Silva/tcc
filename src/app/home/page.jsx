"use client";
import styles from "./home.module.css";

const Logo = "https://i.ibb.co/23YGGMNM/Logo-Transparente.png";

export default function Home() {
  return (
    <div>
      <div className={styles.navbr}>
        <div>
          <img src={Logo} className={styles.logo} alt="Logo" />
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

      {/* Banner */}
      <div className={styles.teste}>
        <div className={styles.texto}>
          <h1 className={styles.des}>
            Conectando Produtores de Amendoim e Empresas
          </h1>
          <span className={styles.sub}>
            Facilitamos a conexão entre agricultores e empresas para a compra
            e venda de amendoins, garantindo negociações rápidas e seguras.
          </span>
        </div>
        <img
          src="https://imgur.com/etVCFjJ.png"
          alt="fundo"
          className={styles.imagem}
        />
      </div>

      {/* Como podemos Ajudar */}
      <div className={styles.ajuda}>
        <h1> Como podemos ajudar </h1>
      </div>

      <div className={styles.card}>
        <div className={styles.agr}>
          <h3>Agricultor</h3>
          <span>
            Acesso direto a compradores, melhores preços e visibilidade para sua
            produção de amendoim.
          </span>
        </div>

        <div className={styles.empre}>
          <h3>Empresa</h3>
          <span>
            Encontre produtores confiáveis, negocie diretamente e garanta
            amendoim de qualidade para seu negócio.
          </span>
        </div>

        <div className={styles.ts}>
          <h3>Transações Seguras</h3>
          <span>
            Garantimos a segurança das negociações, com verificação de qualidade
            e pagamentos protegidos.
          </span>
        </div>
      </div>

      {/* Como Funciona */}
      <div className={styles.rev}>
        <h1>Como Funciona</h1>
        <div className={styles.containerPassos}>
          {/* Passo 1 */}
          <div className={styles.espaço}>
            <div className={styles.passo}>
              <h1>1</h1>
            </div>
            <div className={styles.fazer}>
              <h1>Cadastre-se</h1>
            </div>
            <div className={styles.conta}>
              <p>Crie sua conta como produtor ou empresa compradora.</p>
            </div>
          </div>

          {/* Passo 2 */}
          <div className={styles.espaço2}>
            <div className={styles.passo2}>
              <h1>2</h1>
            </div>
            <div className={styles.fazer2}>
              <h1>Anuncie ou Busque</h1>
            </div>
            <div className={styles.publique}>
              <p>Publique sua produção ou encontre amendoim disponível.</p>
            </div>
          </div>

          
          <div className={styles.espaço}>
            <div className={styles.passo}>
              <h1>3</h1>
            </div>
            <div className={styles.fazer}>
              <h1>Negocie</h1>
            </div>
            <div className={styles.conta}>
              <p>Converse diretamente com produtores ou empresas interessadas.</p>
            </div>
          </div>

          {/* Passo 4 */}
          <div className={styles.espaço}>
            <div className={styles.passo}>
              <h1>4</h1>
            </div>
            <div className={styles.fazer}>
              <h1>Finalize</h1>
            </div>
            <div className={styles.conta}>
              <p>Conclua a transação com segurança e agilidade pela plataforma.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
