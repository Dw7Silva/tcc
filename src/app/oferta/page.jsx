"use client";

import React, { useState, useEffect } from 'react'; // Importe useState e useEffect uma única vez
import styles from './oferta.module.css';
import { FaImage } from 'react-icons/fa';
import { GoHomeFill } from "react-icons/go";
import { FaSearch, FaUser } from "react-icons/fa";
import { IoChatbox } from "react-icons/io5";
import { MdSupportAgent } from "react-icons/md";
import { HiOutlineMenu } from "react-icons/hi";

export default function CriarOferta() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isImageInputLarge, setIsImageInputLarge] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);
  const Logo = "https://i.ibb.co/23YGGMNM/Logo-Transparente.png"; // Defina a URL da sua logo aqui

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

  const handleImageChange = ({ target: { files } }) => {
    if (files && files[0]) {
      setSelectedImage(URL.createObjectURL(files[0]));
      setIsImageInputLarge(false);
    }
  };

  const toggleImageInputSize = () => {
    if (selectedImage) {
      setIsImageInputLarge(false);
    } else {
      setIsImageInputLarge(prev => !prev);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedImage) {
      alert("Por favor, selecione uma imagem!");
      return;
    }

    // Aqui você pode processar o formulário
    alert("Oferta criada com sucesso!");
  };

  return (
   <>
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
    <div className={styles.container}>
    

      <div className={styles.card}>
        <div className={styles.textcriar}>
          <h2>Criar oferta</h2>
        </div>

        <form className={styles.formContent} onSubmit={handleSubmit}>
          <div className={`${styles.imageInput} ${isImageInputLarge ? styles.imageInputLarge : ''}`}>
            <label htmlFor="imageUpload" onClick={toggleImageInputSize}>
              <FaImage size={isImageInputLarge ? 100 : 30} />
            </label>
            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              required
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
            {selectedImage && <img src={selectedImage} alt="Imagem selecionada" />}
          </div>

          <div className={styles.formFields}>
            <div className={styles.formGroup}>
              <label htmlFor="tipoAmendoim">Tipo de amendoim</label>
              <select id="tipoAmendoim" required>
                <option value="">Selecione</option>
                <option value="casca">Com Casca</option>
                <option value="pele">Com Pele</option>
                <option value="sem_pele">Sem Pele</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="espécieAmendoim">Espécie amendoim</label>
              <input type="text" id="espécieAmendoim" required />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="precoEstimado">Preço estimado ex: por saca</label>
              <input type="text" id="precoEstimado" required />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="quantidade">Quantidade ex: kilo, saca</label>
              <select id="quantidade" required>
                <option value="">Selecione</option>
                <option value="kilo">Kilo</option>
                <option value="saca">Saca</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="data">Data</label>
              <input type="date" id="data" required />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="colheita">Colheita</label>
              <input type="date" id="colheita" required />
            </div>
          </div>

          <button type="submit" className={styles.criarOferta}>Criar oferta</button>
        </form>
      </div>
    </div>
    </>

  );
}