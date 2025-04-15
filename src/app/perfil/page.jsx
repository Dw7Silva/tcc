"use client";

import styles from "./perfil.module.css";
import { GoHomeFill } from "react-icons/go";
import { FaSearch, FaUser } from "react-icons/fa";
import { IoChatbox } from "react-icons/io5";
import { MdSupportAgent } from "react-icons/md";
import { HiOutlineMenu } from "react-icons/hi";
import { useState, useEffect, useRef } from "react"; // Importamos o useRef!

export default function Inicio() {
  const fotoPerfil = "https://i.ibb.co/zHcKbby/perfil-usuario.png";
  const [menuAberto, setMenuAberto] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null); // Para guardar a imagem selecionada
  const imageInputRef = useRef(null); // Referência para o input de arquivo

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 600);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  const handleImageClick = () => {
    imageInputRef.current.click(); // Aciona o clique no input de arquivo
  };

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  const Logo = "https://i.ibb.co/23YGGMNM/Logo-Transparente.png";

  return (
    <>
    <div className="tudo">
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
        <GoHomeFill className={!isSmallScreen ? styles.navIconVisible : styles.navIconHidden} />
        <IoChatbox className={!isSmallScreen ? styles.navIconVisible : styles.navIconHidden} />
        <MdSupportAgent className={!isSmallScreen ? styles.navIconVisible : styles.navIconHidden} />
        <FaUser className={!isSmallScreen ? styles.navIconVisible : styles.navIconHidden} />
        <HiOutlineMenu onClick={toggleMenu} className={styles.menuIcon} />
        </div>

        {menuAberto && (
          <div className={styles.menuMobile}>
            <a href="#">Demandas</a>
            <a href="#">Ofertas</a>
            <a href="#">Minhas O/D</a>
            <a href="#">config</a>
            {isSmallScreen && (
              <>
                <a href="#">Início</a>
                <a href="#">Chat</a>
                <a href="#">Suporte</a>
                <a href="#">Perfil</a>
              </>
            )}
          </div>
        )}

      </nav>
      </div> 
      <div className={styles.container}>
      <div className={styles.profileCard}>
        <div className={styles.profileImage} onClick={handleImageClick} style={{ cursor: 'pointer' }}> {/* Adicionei onClick e cursor */}
          <img
            src={selectedImage || fotoPerfil} // Use a imagem selecionada ou a padrão
            alt="Foto de Perfil"
            className={styles.perfilImg}
          />
          {/* Aqui você precisa ter o seu input type="file" */}
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            onChange={handleImageChange}
            ref={imageInputRef}
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
          <input type="text" placeholder="CEP" className={styles.infoInput} />
        </div>

        <textarea
          className={styles.description}
          placeholder="Descrição (Opcional)"
        ></textarea>
      </div>
        
        
       
      </div>

      </>
    );
  }