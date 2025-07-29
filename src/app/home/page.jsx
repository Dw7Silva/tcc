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
      <div className={styles.comofun}>
        <h1>Como Funciona</h1>
        <div className={styles.containerPassos}>
       
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

          <div className={styles.espaço3}>
            <div className={styles.passo3}>
              <h1>3</h1>
            </div>
            <div className={styles.fazer3}>
              <h1>Negocie</h1>
            </div>
            <div className={styles.conta3}>
              <p>Converse diretamente e estabeleça os melhores termos.</p>
            </div>
          </div>

          <div className={styles.espaço4}>
            <div className={styles.passo4}>
              <h1>4</h1>
            </div>
            <div className={styles.fazer4}>
              <h1>Conclua</h1>
            </div>
            <div className={styles.conta4}>
              <p>Finalize a transação com segurança através da nossa plataforma.</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.rev}>
        <h1>Pronto para Revolucionar seu Negócio de Amendoim?</h1>
        <p>Junte-se a centenas de agricultores e empresas que já estão </p> 
        <p>economizando tempo e aumentando seus lucros com nossa plataforma.</p>
        <div className={styles.botao}>
          <span className={styles.faleconos}>Cadastra-se Gratuitamente</span>
          <span className={styles.cadasgra}>Fale Conosco</span>
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.peanuth}>
          <img src={Logo} className={styles.logo2} alt="Logo" />
          <div className={styles.textopeanut}>
            <h1 >PeanutDrop</h1>
         </div>
         <div className={styles.texth3}>
           <h3 >Conectando o campo à indústria, simplificando o comércio de amendoim em todo o Brasil.</h3>
         </div>
        </div>
        <div className={styles.linkra}> 
        <h1>Links Rapido</h1>
        <h3>Inicio</h3>
        <h3>Como Funciona</h3>
        <h3>Para Agricultores</h3>
        <h3>Para Eempresas</h3>
       </div>
      </div>
    </div>
  );
}
