"use client";
import { GoHomeFill } from "react-icons/go";
import { FaSearch, FaUser } from "react-icons/fa";
import { IoChatbox } from "react-icons/io5";
import { MdSupportAgent } from "react-icons/md";
import { HiOutlineMenu } from "react-icons/hi";
import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./navbar.module.css";

export default function BarraNvg() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth <= 600);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const toggleMenu = () => setMenuAberto(!menuAberto);

  const menuItems = [
    { label: "Demandas",href: "/demanda" }, // Corrigido
    { label: "Ofertas", href: "/ofertas" },
    { label: "Minhas Demandas", href: "/minhas_demandas" },
    { label: "Minhas Ofertas", href: "/minhas_ofertas" },
    { label: "Config", href: "/config" },
    ...(isSmallScreen ? [
      { label: "Início", href: "/" },
      { label: "Chat", href: "/chat" },
      { label: "Suporte", href: "/suporte" },
      { label: "Perfil", href: "/perfil" }
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
            <Link href="/" className={styles.navIcon}>
              <GoHomeFill />
            </Link>
            <Link href="/chat" className={styles.navIcon}>
              <IoChatbox />
            </Link>
            <Link href="/suporte" className={styles.navIcon}>
              <MdSupportAgent />
            </Link>
            <Link href="/perfil" className={styles.navIcon}>
              <FaUser />
            </Link>
         
            
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
            <Link key={index} href={item.href} onClick={toggleMenu} className={styles.menuLink}>
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}