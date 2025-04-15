"use client";

import styles from "./perfil.module.css";
import { GoHomeFill } from "react-icons/go";
import { FaSearch } from "react-icons/fa";
import { IoChatbox } from "react-icons/io5";
import { MdSupportAgent } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { HiOutlineMenu } from "react-icons/hi";

export default function Perfil() {
  const Logo = "https://i.ibb.co/23YGGMNM/Logo-Transparente.png";
  const fotoPerfil = "https://i.ibb.co/zHcKbby/perfil-usuario.png"; // imagem padrão de perfil

  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <div className={styles.logoContainer}>
          <img src={Logo} alt="Logo" className={styles.logo} />
        </div>

        <div className={styles.searchBar}>
          <input type="text" placeholder="Pesquise seu produto" />
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

      <div className={styles.profileCard}>
        <div className={styles.profileImage}>
          <img
            src={fotoPerfil}
            alt="Foto de Perfil"
            className={styles.perfilImg}
          />
        </div>

        <div className={styles.infoGrid}>
          <input type="text" placeholder="Nome" className={styles.infoInput} />
          <input
            type="tel"
            placeholder="Telefone: 40022922"
            className={styles.infoInput}
          />
          <input
            type="email"
            placeholder="Email: Enois@gmail.com"
            className={styles.infoInput}
          />
          <input
            type="text"
            placeholder="CNPJ ou CPF"
            className={styles.infoInput}
          />
          <input
            type="text"
            placeholder="Nome da propriedade"
            className={styles.infoInput}
          />
          <input
            type="text"
            placeholder="CEP"
            className={styles.infoInput}
          />
        </div>

        <textarea
          className={styles.description}
          placeholder="Descrição (Opcional)"
        ></textarea>
      </div>
    </div>
  );
}
