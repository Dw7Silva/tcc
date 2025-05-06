"use client";
import styles from "./navbar.module.css";
import { GoHomeFill } from "react-icons/go";
import { FaSearch, FaUser } from "react-icons/fa";
import { IoChatbox } from "react-icons/io5";
import { MdSupportAgent } from "react-icons/md";
import { HiOutlineMenu } from "react-icons/hi";
import { useState, useEffect, useRef } from "react";

// Custom hook moved to the top
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

export default function BarraNvg() {
  const [menuAberto, setMenuAberto] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width: 600px)");
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuAberto(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => setMenuAberto(!menuAberto);

  const menuItems = [
    { label: "Demandas", href: "#" },
    { label: "Ofertas", href: "#" },
    { label: "Minhas O/D", href: "#" },
    { label: "Config", href: "#" },
    ...(isSmallScreen ? [
      { label: "Início", href: "#", icon: <GoHomeFill /> },
      { label: "Chat", href: "#", icon: <IoChatbox /> },
      { label: "Suporte", href: "#", icon: <MdSupportAgent /> },
      { label: "Perfil", href: "#", icon: <FaUser /> }
    ] : [])
  ];

  const Logo = "https://i.ibb.co/23YGGMNM/Logo-Transparente.png";

  return (
    <nav className={styles.navbar} ref={menuRef}>
      <div className={styles.logoContainer}>
        <img src={Logo} alt="Logo" className={styles.logo} />
      </div>

      <div className={styles.searchBar}>
        <input 
          type="text" 
          placeholder="Pesquisar..." 
          aria-label="Pesquisar"
        />
        <button type="button" aria-label="Buscar">
          <FaSearch />
        </button>
      </div>
    
      <div className={styles.navIcons}>
        {!isSmallScreen && (
          <>
            <button type="button" aria-label="Início">
              <GoHomeFill />
            </button>
            <button type="button" aria-label="Chat">
              <IoChatbox />
            </button>
            <button type="button" aria-label="Suporte">
              <MdSupportAgent />
            </button>
            <button type="button" aria-label="Perfil">
              <FaUser />
            </button>
          </>
        )}
        <button 
          type="button"
          onClick={toggleMenu} 
          className={styles.menuIcon}
          aria-label="Menu"
          aria-expanded={menuAberto}
        >
          <HiOutlineMenu />
        </button>
      </div>

      {menuAberto && (
        <div className={styles.menuMobile} role="menu">
          {menuItems.map((item, index) => (
            <a 
              key={index} 
              href={item.href} 
              onClick={toggleMenu}
              role="menuitem"
            >
              {item.icon && <span>{item.icon}</span>}
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}