"use client";
import styles from "./navbar.module.css";
import { GoHomeFill } from "react-icons/go";
import { FaSearch, FaUser } from "react-icons/fa";
import { IoChatbox } from "react-icons/io5";
import { MdSupportAgent } from "react-icons/md";
import { HiOutlineMenu } from "react-icons/hi";
import { useState, useEffect, useRef } from "react";

// Custom hook moved to the top


export default function BarraNvg() {

  const [menuAberto, setMenuAberto] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width: 600px)");

  // Hook personalizado para detectar tamanho de tela
  function useMediaQuery(query) {
    const [matches, setMatches] = useState(false);
    
    useEffect(() => {
      const media = window.matchMedia(query);
      if (media.matches !== matches) setMatches(media.matches);
      
      const listener = () => setMatches(media.matches);
      media.addListener(listener);
      
      return () => media.removeListener(listener);
    }, [matches, query]);
    
    return matches;
  }

  const toggleMenu = () => setMenuAberto(!menuAberto);

  const menuItems = [
    { label: "Demandas", href: "#" },
    { label: "Ofertas", href: "#" },
    { label: "Minhas O/D", href: "#" },
    { label: "Config", href: "#" },
    ...(isSmallScreen ? [
      { label: "Início", href: "#" },
      { label: "Chat", href: "#" },
      { label: "Suporte", href: "#" },
      { label: "Perfil", href: "#" }
    ] : [])
  ];

  const Logo = "https://i.ibb.co/23YGGMNM/Logo-Transparente.png";

  return (
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
            {!isSmallScreen && (
              <>
                <GoHomeFill />
                <IoChatbox />
                <MdSupportAgent />
                <FaUser />
              </>
            )}
            <HiOutlineMenu 
              onClick={toggleMenu} 
              className={styles.menuIcon} 
            />
          </div>

          {menuAberto && (
            <div className={styles.menuMobile}>
              {menuItems.map((item, index) => (
                <a key={index} href={item.href} onClick={toggleMenu}>
                  {item.label}
                </a>
              ))}
            </div>
          )}
        </nav>

  );
}