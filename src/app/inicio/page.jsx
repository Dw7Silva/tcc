"use client"; 

import styles from "./home.module.css";
import { GoHomeFill } from "react-icons/go";
import { FaSearch, FaUser } from "react-icons/fa";
import { IoChatbox } from "react-icons/io5";
import { MdSupportAgent } from "react-icons/md";
import { HiOutlineMenu } from "react-icons/hi";
import Carousel from "./carrosel";
import { useState } from "react";

export default function Inicio() {
  const [menuAberto, setMenuAberto] = useState(false);

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  const Carroselimages = [
    "https://kuky.com.br/uploads/images/2023/05/beneficios-do-amendoim-descubra-como-ele-pode-ajudar-sua-saude-1684956829.jpg",
    "https://delikatessenbuffet.com.br/storage/app/uploads/w6mebc9mEmReLs043fhhP9TZLMiDc6NPfeIbHAPt.jpg",
    "https://image.tuasaude.com/media/article/wg/xp/beneficios-do-amendoim_17802.jpg",
    "https://feed.continente.pt/media/aaeoih2v/amendoim-beneficios.jpg?center=0.43958293115759167,0.45275669909355631&mode=crop&width=1090&height=467&rnd=133298540351630000&format=webp",
    "https://s2-ge.glbimg.com/fJ1Qo8xVlmVQH5cGcNq16UBgoqk=/0x0:1273x824/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2022/K/z/2SS07CSRe6kf6XQhBjtw/amendoim.jpg",
  ];

  const Logo = "https://i.ibb.co/23YGGMNM/Logo-Transparente.png";

  return (
    <div className={styles.container}>
      {/* Navbar que se adapta automaticamente */}
      <nav className={styles.navbar}>
        <div className={styles.logoContainer}>
          <img src={Logo} alt="Logo" className={styles.logo} />
        </div>

        <div className={styles.searchBar}>
          <input type="text" placeholder="Pesquisar..." />
          <button>
            <FaSearch />
          </button>
        </div>

        {/* Ícones */}
        <div className={styles.navIcons}>
          <GoHomeFill />
          <IoChatbox />
          <MdSupportAgent />
          <FaUser />
          <HiOutlineMenu onClick={toggleMenu} className={styles.menuIcon} />
        </div>

        {/* Menu Mobile */}
        {menuAberto && (
          <div className={styles.menuMobile}>
            <a href="#">Demandas</a>
            <a href="#">Ofertas</a>
            <a href="#">minhas off/dem</a>
            <a href="#">Configuração</a>
            <a href="#">Início</a>
            <a href="#">Chat</a>
            <a href="#">Suporte</a>
            <a href="#">Perfil</a>
            
          </div>
        )}
      </nav>

      {/* Destaques */}
      <div className={styles.destaquescontainer}>
        <h1 className={styles.textdestaques}>Nossos destaques</h1>
      </div>

      {/* Carrossel */}
      <div className={styles.carouselContainer}>
        <Carousel images={Carroselimages}></Carousel>
      </div>

      {/* Principais Produtos */}
      <div className={styles.produtoscontainer}>
        <h1 className={styles.textprodutos}>Principais Produtos</h1>
      </div>

      <div className={styles.produtosGrid}>
        <div className={styles.produtoItem}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-jueBrZJmix2Lzhx3CDl0sTh-3Q-0qiVEfQ&s"
            alt="Produto 1"
            className={styles.produtoImg}
          />
          <h1 className={styles.produtoTitulo}>Amendoim c/ casca</h1>
        </div>
        <div className={styles.produtoItem}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNf7U3GwL5ibmFc0nbody6nqdBAi9af7cbkA&s"
            alt="Produto 2"
            className={styles.produtoImg}
          />
          <h1 className={styles.produtoTitulo}>Amendoim c/ pele</h1>
        </div>
        <div className={styles.produtoItem}>
          <img
            src="https://cdn.awsli.com.br/2500x2500/2777/2777231/produto/309434382/amendoim-torrado-sempele-dtm9zuthq1.jpg"
            alt="Produto 3"
            className={styles.produtoImg}
          />
          <h1 className={styles.produtoTitulo}>Amendoim s/ pele</h1>
        </div>
      </div>
    </div>
  );
}
