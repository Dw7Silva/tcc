"use client";
import Carousel from "./carrosel";
import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./home.module.css";
import Footer from "@/components/footer/footer";
import { HiOutlineMenu } from "react-icons/hi";

const Logo = "https://i.ibb.co/23YGGMNM/Logo-Transparente.png";

export default function Home() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth <= 600);
      if (!isSmallScreen) setMenuAberto(false);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const Carroselimages = [
    "https://www.gestaosolution.com.br/wp-content/uploads/2023/05/maquinario-agricola.jpg",
    "https://www.myfarm.com.br/wp-content/uploads/2020/07/991159.jpeg",
    "https://images.ecycle.com.br/wp-content/uploads/2022/06/17143248/james-baltz-jAt6cN6zl8M-unsplash-scaled.jpg.webp",
    "https://www.cm-silves.pt/util/imgLoader.ashx?w=1280&img=/upload_files/client_id_1/website_id_1/Noticias/Ultimas/2021/agricultura.jpg",
    "https://www.maxcrocante.com.br/imagens/categorias/fabrica-amendoim-japones-grande-sao-paulo-01.webp",
    "https://www.maxcrocante.com.br/imagens/categorias/fabrica-amendoim-atacado-04.webp",
  ];

  return (
    <div className={styles.tudo}>
      <div className={styles.navbr}>
        <img src={Logo} className={styles.logo} alt="Logo" />
        <div className={styles.info}>
          <span className={styles.infospan}>Início</span>
          <span className={styles.infospan}>Como Ajudamos</span>
          <span className={styles.infospan}>Como Funciona</span>
          <span className={styles.infospan}>Sobre Nós</span>
          <span className={styles.infospan}>Contato</span>
        </div>
        <div className={styles.ec}>
          <div className={styles.entrar}>
            <Link href="/login" className={styles.tirar}>
              <span className={styles.login}>Entrar</span>
            </Link>
          </div>
          <div className={styles.cadastrar}>
            <Link href="/cadastro" className={styles.tirar}>
              <span>Cadastrar</span>
            </Link>
          </div>
        </div>
        <HiOutlineMenu onClick={() => setMenuAberto(!menuAberto)} className={styles.menuIcon} />
      </div>

      {menuAberto && (
        <div className={styles.menuMobile}>
          <Link href="#inicio" onClick={() => setMenuAberto(false)}>Inicio</Link>
          <Link href="#Ajuda" onClick={() => setMenuAberto(false)}>Como Ajudamos</Link>
          <Link href="#Como Funciona" onClick={() => setMenuAberto(false)}>Como Funciona</Link>
          <Link href="#Sobre Nos" onClick={() => setMenuAberto(false)}>Sobre Nos</Link>
          <Link href="#Contato" onClick={() => setMenuAberto(false)}>Contato</Link>
        </div>
      )}

      <section id="inicio">
        <div className={styles.carouselContainer}>
          <Carousel images={Carroselimages} />
        </div>
      </section>

      <section id="Ajuda">
        <div className={styles.fundocpa}>
          <div className={styles.ajuda}>
            <h1>Como podemos ajudar</h1>
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
      </section>

      <section id="Como Funciona">
        <div className={styles.comofun}>
          <div className={styles.comoh1}>
            <h1>Como Funciona</h1>
          </div>
          <div className={styles.containerPassos}>
            {[
              { num: "1", titulo: "Cadastre-se", texto: "Crie sua conta como produtor ou empresa compradora." },
              { num: "2", titulo: "Anuncie ou Busque", texto: "Publique sua produção ou encontre amendoim disponível." },
              { num: "3", titulo: "Negocie", texto: "Converse diretamente e estabeleça os melhores termos." },
              { num: "4", titulo: "Conclua", texto: "Finalize a transação com segurança através da nossa plataforma." }
            ].map((passo, i) => (
              <div key={i} className={styles.espaço}>
                <div className={styles.passo}><h1>{passo.num}</h1></div>
                <div className={styles.fazer}><h1>{passo.titulo}</h1></div>
                <div className={i === 0 ? styles.conta : i === 1 ? styles.publique : i === 2 ? styles.conta3 : styles.conta4}>
                  <p>{passo.texto}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="Sobre Nos">
        <div className={styles.rev}>
          <h1>A ponte entre agricultores e empresas compradoras de amendoim.</h1>
          <p>Facilitamos toda a negociação, conectando produtores diretamente a empresas interessadas,garantindo segurança,</p>
          <p>transparência e agilidade em cada etapa da compra e venda de amendoim.</p>
          <div className={styles.botao}>
            <Link href="/cadastro" className={styles.tirar}>
              <span className={styles.faleconos}>Cadastre-se Gratuitamente</span>
            </Link>
            <Link href="/login" className={styles.tirar}>
              <span className={styles.cadasgra}>Entrar</span>
            </Link>
          </div>
        </div>
      </section>

      <section id="Contato"><Footer /></section>
    </div>
  );
}