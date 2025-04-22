"use client";

import styles from "./perfil.module.css";
import { GoHomeFill } from "react-icons/go"; // Importa o ícone de home do pacote 'react-icons/go'
import { FaSearch, FaUser } from "react-icons/fa"; // Importa os ícones de pesquisa e usuário do pacote 'react-icons/fa'
import { IoChatbox } from "react-icons/io5"; // Importa o ícone de chatbox do pacote 'react-icons/io5'
import { MdSupportAgent } from "react-icons/md"; // Importa o ícone de agente de suporte do pacote 'react-icons/md'
import { HiOutlineMenu } from "react-icons/hi"; // Importa o ícone de menu de contorno do pacote 'react-icons/hi'
import { useState, useEffect, useRef } from "react"; // Importa hooks do React: useState (para gerenciar estados), useEffect (para efeitos colaterais), useRef (para referências a elementos)

export default function Perfil() {
  const fotoPerfil = "https://i.ibb.co/zHcKbby/perfil-usuario.png";
  const [menuAberto, setMenuAberto] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const imageInputRef = useRef(null);
  const [cpfCnpj, setCpfCnpj] = useState('');
  const [cep, setCep] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [cepError, setCepError] = useState('');
  const [hasCepError, setHasCepError] = useState(false);

  const formatCpfCnpj = (value) => { /* Formata CPF/CNPJ */
    const formattedValue = value.replace(/\D/g, '');
    return formattedValue.length <= 11 ? formattedValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4') : formattedValue.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  };

  const buscarEndereco = async (cepValue) => { /* Busca endereço por CEP na API ViaCEP */
    if (!cepValue) { setCep(''); setCepError(''); limparEndereco(); setHasCepError(false); return; }
    const cepLimpo = cepValue.replace(/\D/g, '');
    setCep(cepLimpo);
    if (cepLimpo.length !== 8) { setCep('CEP inválido'); setCepError('invalid'); limparEndereco(); setHasCepError(true); return; }
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await response.json();
      if (data.erro) { setCep('CEP não encontrado'); setCepError('notfound'); limparEndereco(); setHasCepError(true); return; }
      setCidade(data.localidade); setEstado(data.uf); setCepError(''); setHasCepError(false);
    } catch (error) { setCep('Erro ao buscar CEP'); setCepError('error'); limparEndereco(); setHasCepError(true); console.error(error); }
  };

  const limparEndereco = () => { /* Limpa os estados de cidade e estado */
    setCidade(''); setEstado('');
  };

  const handleCepFocus = () => { /* Limpa o campo CEP ao receber foco se houve erro */
    if (hasCepError) { setCep(''); setCepError(''); setHasCepError(false); }
  };

  useEffect(() => { /* Verifica tamanho da tela para responsividade */
    const handleResize = () => setIsSmallScreen(window.innerWidth <= 600);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => setMenuAberto(!menuAberto); /* Alterna a visibilidade do menu mobile */
  const editar_foto_perfil = () => imageInputRef.current.click(); /* Aciona clique no input de arquivo da foto de perfil */
  const mudar_foto_perfil = (event) => { /* Atualiza a imagem de perfil selecionada */
    if (event.target.files && event.target.files[0]) setSelectedImage(URL.createObjectURL(event.target.files[0]));
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
        <div className={styles.profileImage} onClick={editar_foto_perfil} style={{ cursor: 'pointer' }}>
          <img
            src={selectedImage || fotoPerfil}
            alt="Foto de Perfil"
            className={styles.perfilImg}
          />
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            onChange={mudar_foto_perfil}
            ref={imageInputRef}
            readOnly
          />
        </div>

        <div className={styles.infoGrid}>
          <input type="text"
            placeholder="Nome"
            className={styles.infoInput}
            readOnly
          />
          <input
            type="number"
            placeholder="Telefone: (14)123456789"
            className={styles.infoInput}
            id="telefone"
            readOnly
          />
          <input
            type="email"
            placeholder="Ex: Enois@gmail.com"
            className={styles.infoInput}
            id="email"
            readOnly
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
            readOnly
          />
          <input
            type="text"
            placeholder="Nome da propriedade"
            className={styles.infoInput}
            id="Nome da Propriedade"
          />
          <div>
            <input
              type="text"
              placeholder="CEP (apenas números)"
              name="cep"
              id="cep"
              className={`${styles.infoInput} ${cepError === 'invalid' ? styles.cepErrorInvalid : ''} ${cepError === 'notfound' ? styles.cepErrorNotFound : ''} ${cepError === 'error' ? styles.cepError : ''}`}
              value={cep}
              onChange={(e) => setCep(e.target.value)}
              onBlur={(e) => buscarEndereco(e.target.value)}
              onFocus={handleCepFocus}
              maxLength={8}
            />
          </div>

          <input
            type="text"
            placeholder="Cidade"
            className={styles.infoInput}
            id="cidade"
            value={cidade}
            readOnly
          />

          <input
            type="text"
            placeholder="Estado"
            className={styles.infoInput}
            id="estado"
            value={estado}
            readOnly
          />
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