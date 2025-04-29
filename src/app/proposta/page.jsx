"use client";

import { useState, useEffect } from "react";
import styles from './proposta.module.css';
import { GoHomeFill } from "react-icons/go";
import { FaSearch, FaUser } from "react-icons/fa";
import { IoChatbox } from "react-icons/io5";
import { MdSupportAgent } from "react-icons/md";
import { HiOutlineMenu } from "react-icons/hi";

export default function Proposta() {
  // Estados do menu/navbar
  const [menuAberto, setMenuAberto] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Estados do formulário
  const [proposta, setProposta] = useState({
    preco: "",
    quantidade: "",
    observacoes: ""
  });
  
  const [statusEnvio, setStatusEnvio] = useState({
    enviando: false,
    sucesso: false,
    erro: false,
    mensagem: ""
  });

  // Efeito para responsividade
  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth <= 600);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Função para enviar os dados
  const enviarProposta = async (dados) => {
    try {
      setStatusEnvio({ enviando: true, sucesso: false, erro: false, mensagem: "" });
      
      // Simulação de envio - substitua pela sua API real
      console.log("Dados enviados:", dados);
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simula delay de rede
      
      setStatusEnvio({
        enviando: false,
        sucesso: true,
        erro: false,
        mensagem: "Proposta enviada com sucesso!",
      });
      
      // Limpa o formulário após 3 segundos
      setTimeout(() => {
        setProposta({ preco: "", quantidade: "", observacoes: "" });
        setStatusEnvio({ enviando: false, sucesso: false, erro: false, mensagem: "" });
      }, 3000);

    } catch (error) {
      setStatusEnvio({
        enviando: false,
        sucesso: false,
        erro: true,
        mensagem: error.message || "Erro ao enviar proposta",
      });
    }
  };

  // Handlers
  const toggleMenu = () => setMenuAberto(!menuAberto);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProposta(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    enviarProposta({
      ...proposta,
      dataEnvio: new Date().toISOString(),
    });
  };

  const Logo = "https://i.ibb.co/23YGGMNM/Logo-Transparente.png";

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
            <a href="#">Config</a>
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
        {/* COLUNA ESQUERDA - PROPOSTA ORIGINAL (SÓ LEITURA) */}
        <div className={styles.caract_off}>
          <h2 className={styles.titulo}>Proposta Original</h2>
          
          <div className={styles.infoGroup}>
            <label>Agricultor</label>
            <p className={styles.infoValue}>João Silva</p>
          </div>
          
          <div className={styles.infoGroup}>
            <label>Email</label>
            <p className={styles.infoValue}>joao@fazenda.com</p>
          </div>
          
          <div className={styles.infoGroup}>
            <label>Preço Original</label>
            <p className={styles.infoValue}>R$ 200/saca</p>
          </div>
          
          <div className={styles.infoGroup}>
            <label>Quantidade Original</label>
            <p className={styles.infoValue}>21 sacas</p>
          </div>
          
          <div className={styles.infoGroup}>
            <label>Contato</label>
            <p className={styles.infoValue}>(31) 99999-9999</p>
          </div>
          
          <div className={styles.infoGroup}>
            <label>Descrição</label>
            <p className={styles.infoValue}>Amendolm e/casco - colheita 2023</p>
          </div>
        </div>

        {/* COLUNA DIREITA - CONTRAPROPOSTA (EDITÁVEL) */}
        <div className={styles.caract_prop}>
          <form onSubmit={handleSubmit} className={styles.propostaForm}>
            <h2 className={styles.titulo}>Faça sua Contraproposta</h2>
            
            <div className={styles.formGroup}>
              <label>Novo Preço (R$/saca)</label>
              <input 
                type="number" 
                name="preco"
                value={proposta.preco}
                onChange={handleChange}
                className={styles.inputField}
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label>Quantidade Desejada</label>
              <input 
                type="number" 
                name="quantidade"
                value={proposta.quantidade}
                onChange={handleChange}
                className={styles.inputField}
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label>Observações</label>
              <textarea 
                name="observacoes"
                value={proposta.observacoes}
                onChange={handleChange}
                className={styles.textareaField} 
                rows="4"
              />
            </div>
            
            <div className={styles.formGroup}>
              <label>Empresa</label>
              <p className={styles.infoValue}>Fofo Agroindustrial</p>
            </div>
            
            <button 
              type="submit" 
              disabled={statusEnvio.enviando}
              className={styles.enviarButton}
            >
              {statusEnvio.enviando ? "Enviando..." : "Enviar Contraproposta"}
            </button>

            {/* Feedback para o usuário */}
            {statusEnvio.mensagem && (
              <div className={`${styles.feedback} ${
                statusEnvio.sucesso ? styles.sucesso : styles.erro
              }`}>
                {statusEnvio.mensagem}
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
}