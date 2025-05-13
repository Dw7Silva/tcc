"use client";
import styles from "./chat.module.css";
import { FaUser, FaImage, FaFileAlt, FaPaperPlane } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";

export default function Chat() {
  const [conversaAtiva, setConversaAtiva] = useState(0);
  const [novaMensagem, setNovaMensagem] = useState("");
  const mensagemCorpoRef = useRef(null);
  
  // ... (mantenha o mesmo estado de conversas e mensagensPorConversa)

  useEffect(() => {
    // Rolagem automática para a última mensagem
    if (mensagemCorpoRef.current) {
      mensagemCorpoRef.current.scrollTop = mensagemCorpoRef.current.scrollHeight;
    }
  }, [mensagensPorConversa, conversaAtiva]);

  const enviarMensagem = (e) => {
    e.preventDefault();
    if (novaMensagem.trim() === "") return;

    const novaMensagemObj = { texto: novaMensagem, lado: "direita" };
    const novasMensagens = [...mensagensPorConversa[conversaAtiva], novaMensagemObj];
    
    const novasMensagensPorConversa = [...mensagensPorConversa];
    novasMensagensPorConversa[conversaAtiva] = novasMensagens;

    setMensagensPorConversa(novasMensagensPorConversa);
    setNovaMensagem("");
  };

  const alternarConversa = (index) => {
    setConversaAtiva(index);
  };

  return (
    <div className={styles.chatContainer}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2>Conversas</h2>
          <div className={styles.searchBox}>
            <input type="text" placeholder="Buscar conversa..." />
          </div>
        </div>
        
        <div className={styles.conversasList}>
          {conversas.map((conversa, index) => (
            <div 
              key={index} 
              className={`${styles.conversaItem} ${conversaAtiva === index ? styles.ativo : ''}`} 
              onClick={() => alternarConversa(index)}
            >
              <div className={styles.userAvatar}>
                <FaUser />
              </div>
              <div className={styles.conversaInfo}>
                <strong>{conversa.nome}</strong>
                <p>{conversa.msg.length > 30 ? conversa.msg.substring(0, 30) + '...' : conversa.msg}</p>
              </div>
              {index === 1 && <span className={styles.unreadBadge}>3</span>}
            </div>
          ))}
        </div>
      </aside>

      <main className={styles.mensagemArea}>
        <header className={styles.mensagemHeader}>
          <div className={styles.userAvatar}>
            <FaUser />
          </div>
          <div className={styles.userInfo}>
            <strong>{conversas[conversaAtiva].nome}</strong>
            <span>Online</span>
          </div>
        </header>

        <div className={styles.mensagemCorpo} ref={mensagemCorpoRef}>
          <div className={styles.mensagensContainer}>
            {mensagensPorConversa[conversaAtiva].map((msg, i) => (
              <div key={i} className={`${styles.mensagem} ${styles[msg.lado]}`}>
                {msg.texto}
                <span className={styles.mensagemHora}>10:30 AM</span>
              </div>
            ))}
          </div>
        </div>

        <footer className={styles.mensagemInput}>
          <div className={styles.iconesAnexo}>
            <button type="button"><FaImage /></button>
            <button type="button"><FaFileAlt /></button>
          </div>
          <form onSubmit={enviarMensagem} className={styles.mensagemForm}>
            <input 
              type="text" 
              placeholder="Digite sua mensagem..." 
              value={novaMensagem}
              onChange={(e) => setNovaMensagem(e.target.value)}
            />
            <button type="submit" className={styles.enviarBtn}>
              <FaPaperPlane />
            </button>
          </form>
        </footer>
      </main>
    </div>
  );
}