"use client";
import { GoHomeFill } from "react-icons/go";
import { FaSearch, FaUser } from "react-icons/fa";
import { MdSupportAgent } from "react-icons/md";
import { HiOutlineMenu } from "react-icons/hi";
import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./navbar.module.css";

export default function BarraNvg() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [tipoUsuario, setTipoUsuario] = useState(null);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth <= 600);
    };
    

    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    console.log("👤 TIPO DO USUÁRIO:", usuarioLogado?.tipo);
    setTipoUsuario(usuarioLogado?.tipo);
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const toggleMenu = () => setMenuAberto(!menuAberto);

  const itensBase = [
    { label: "Demandas", href: "/demanda" },
    { label: "Ofertas", href: "/ofertas" }
  ];

  const itensPorTipo = {

    2: [
      { label: "Minhas Ofertas", href: "/minhas_ofertas" }
    ],

    3: [
      { label: "Minhas Demandas", href: "/minhas_demandas" }
    ]
  };

  // Itens do mobile (apenas em telas pequenas)
  const itensMobile = isSmallScreen ? [
    { label: "Início", href: "/" },
    { label: "Suporte", href: "/suporte" },
    { label: "Perfil", href: "/perfil" }
  ] : [];

  // Montar menu final baseado no tipo de usuário
  const menuItems = [
    // Itens do mobile PRIMEIRO
    ...itensMobile,
    
    // Itens base (sempre disponíveis)
    ...itensBase,
    
    // Itens específicos por tipo de usuário
    ...(itensPorTipo[tipoUsuario] || []),
    
    // Sair SEMPRE por último
    { 
      label: (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          Sair
          <img src="/sairsem.gif" alt="Sair" width="20" height="30" />
        </div>
      ), 
      href: "/home"
    }
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
            <Link href="/inicio" className={styles.navIcon}>
              <GoHomeFill />
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