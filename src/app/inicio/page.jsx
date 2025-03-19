"use client";

import styles from "./home.module.css";
import { GoHomeFill } from "react-icons/go";
import { FaSearch } from "react-icons/fa";
import { IoChatbox } from "react-icons/io5";
import { MdSupportAgent } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { HiOutlineMenu } from "react-icons/hi";
import Carousel from "./carrosel";

export default function Inicio() {
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

           {/* icones*/}
        <div className={styles.navIcons}>
          <GoHomeFill />
          <IoChatbox />
          <MdSupportAgent />
          <FaUser />
          <HiOutlineMenu />
        </div>
      </nav>

      {/* Carrossel */}
      <div className={styles.carouselContainer}>
        <Carousel images={Carroselimages} />
      </div>
    </div>
  );
}
