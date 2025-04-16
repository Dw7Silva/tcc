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
  const [cpfCnpj, setCpfCnpj] = useState('');
  
     const formatCpfCnpj = (value) => {
        let formattedValue = value.replace(/\D/g, ''); // Remove caracteres não numéricos

    // Formata CPF
        if (formattedValue.length <= 11) {
         formattedValue = formattedValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
       } else { // Formata CNPJ
        formattedValue = formattedValue.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
       }

    return formattedValue; // Retorna o valor formatado
  };




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

  const editar_foto_perfil = () => {
    imageInputRef.current.click(); // Aciona o clique no input de arquivo
  };

  const mudar_foto_perfil = (event) => {
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
        <div className={styles.profileImage} onClick={editar_foto_perfil} style={{ cursor: 'pointer' }}> {/* Adicionei onClick e cursor */}
          <img
            src={selectedImage || fotoPerfil} 
            alt="Foto de Perfil"
            className={styles.perfilImg}
          />
          {/* Aqui você precisa ter o seu input type="file" */}
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            onChange={mudar_foto_perfil}
            ref={imageInputRef}
          />
        </div>

        <div className={styles.infoGrid}>
          <input type="text" placeholder="Nome" className={styles.infoInput} />
          <input
            type="number"
            placeholder="Telefone: (14)123456789"
            className={styles.infoInput}
            id="telefone"
          />
          <input
            type="email"
            placeholder="Ex: Enois@gmail.com"
            className={styles.infoInput}
            id="email"
          />
          <input
           placeholder="CPF ou CNPJ"
           maxLength={15}
           type="text"
           id="cpfCnpj"
           name="cpfCnpj"
           value={cpfCnpj}
           onChange={(e) => setCpfCnpj(formatCpfCnpj(e.target.value))} 
           className={styles.infoInput}
          />
          <input
            type="text"
            placeholder="Nome da propriedade"
            className={styles.infoInput}
            id="Nome da Propriedade"
          />
          <input type="number" placeholder="CEP" className={styles.infoInput } id="cep" />
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