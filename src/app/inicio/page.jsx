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
    "https://placehold.co/600x400/EEE/31343C",
    "https://placehold.co/600x400/CCC/41444C",
    "https://placehold.co/600x400/AAA/51545C",
    "https://placehold.co/600x400/888/61646C",
    "https://placehold.co/600x400/666/71747C",
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
