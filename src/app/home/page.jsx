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

    if (!isSmallScreen) {
      setMenuAberto(false);
    } 
  
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

  const toggleMenu = () => setMenuAberto(!menuAberto);

  const menuItems = [
    { label: "Inicio", href: "#inicio" },
    { label: "Como Ajudamos", href: "#Ajuda" },
    { label: "Como Funciona", href: "#Como Funciona" },
    { label: "Sobre Nos", href: "#Sobre Nos" },
    { label: "Contato", href: "#Contato" },

  
  ];

  return (
    <div className={styles.body}>
      {/* NAVBAR */}
      <div className={styles.navbr}>
        <img src={Logo} className={styles.logo} alt="Logo" />

        <div className={styles.info}>
          <span className={styles.infospan}>Início</span>
          <span className={styles.infospan}>Como Ajudamos</span>
          <span className={styles.infospan}>Como Funciona</span>
          <span className={styles.infospan}>Sobre Nós</span>
          <span className={styles.infospan}>Contato</span>
        </div>

        {/* Entrar e Cadastrar SEMPRE visíveis */}
        <div className={styles.ec}>
        <div className={styles.entrar}>
          <Link href={"/login"}  className={styles.tirar}>
          <span className={styles.login}>Entrar</span>
          </Link>
          </div>

           <div className={styles.cadastrar}>
           <Link href={"/cadastro"} className={styles.tirar}>    
          <span >Cadastrar</span>
          </Link>  
        </div>
        </div>

        {/* Menu Hamburguer */}
        <HiOutlineMenu onClick={toggleMenu} className={styles.menuIcon} />
      </div>

      {/* MENU MOBILE */}
      {menuAberto && (
        <div className={styles.menuMobile}>
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              onClick={toggleMenu}
              className={styles.menuLink}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
      <selection id="inicio">
      <div className={styles.carouselContainer}>
            <Carousel images={Carroselimages}></Carousel>
      </div>
      </selection>
      {/* Como podemos Ajudar */}
      <selection id="Ajuda">
      <div className={styles.fundocpa}>
          
        <div className={styles.ajuda}>
          <h1> Como podemos ajudar </h1>
        </div>
        
        <div className={styles.card}>
          <div className={styles.agr}>
            <h3>Agricultor</h3>
            <span>
              Acesso direto a compradores, melhores preços e visibilidade para
              sua produção de amendoim.
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
              Garantimos a segurança das negociações, com verificação de
              qualidade e pagamentos protegidos.
            </span>
          </div>
        </div>
      </div>
    </selection>
      {/* Como Funciona */}
      <selection id="Como Funciona">
      <div className={styles.comofun}>
        <div className={styles.comoh1}>
          <h1>Como Funciona</h1>
        </div>
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
              <p>
                Finalize a transação com segurança através da nossa plataforma.
              </p>
            </div>
          </div>
        </div>
      </div>
    </selection>
      
      {/* Chamada final */}
      <selection id ="Sobre Nos">
      <div className={styles.rev}>
        <h1>A ponte entre agricultores e empresas compradoras de amendoim.</h1>
        <p>
          Facilitamos toda a negociação, conectando produtores diretamente a empresas interessadas,garantindo segurança,
        </p>
        <p>
           transparência e agilidade em cada etapa da compra e venda de amendoim."
        </p>
        <div className={styles.botao}>
           <Link href={"/cadastro"} className={styles.tirar}>    
          <span className={styles.faleconos}>Cadastre-se Gratuitamente</span>
          </Link>
           <Link href={"/login"}  className={styles.tirar}>
          <span className={styles.cadasgra}>Entrar</span>
          </Link>
        </div>
      </div>
</selection>
    <selection id="Contato">
      <Footer />
      </selection>
    </div>
  );
}
