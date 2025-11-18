"use client";
import styles from "./chat.module.css";
import { FaUser, FaImage, FaFileAlt, FaPaperPlane } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import BarraNvg from "@/components/navbar/navbar";

export default function Chat() {
  const [conversaAtiva, setConversaAtiva] = useState(0);
  const [novaMensagem, setNovaMensagem] = useState("");
  const [mostrarSidebar, setMostrarSidebar] = useState(true); // NOVO
  const mensagemCorpoRef = useRef(null);

  const conversas = [
    { nome: "Empresa A", msg: "Olá, tudo certo com o envio?" },
    { nome: "Empresa B", msg: "Precisamos revisar o contrato." },
    { nome: "Empresa C", msg: "Agradecemos o contato." },
  ];

  const [mensagensPorConversa, setMensagensPorConversa] = useState([
    [
      { texto: "Oi! Enviamos ontem.", lado: "esquerda" },
      { texto: "Ah sim, obrigado!", lado: "direita" },
    ],
    [
      { texto: "Podemos ajustar o prazo?", lado: "esquerda" },
      { texto: "Claro, sem problemas.", lado: "direita" },
    ],
    [
      { texto: "Estamos disponíveis para novos pedidos.", lado: "esquerda" },
    ],
  ]);

  useEffect(() => {
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

  return (
    <>
      <BarraNvg />
      <div className={styles.container}>
        <div className={styles.chatContainer}>

          {/* SIDEBAR */}
          <aside className={`${styles.sidebar} ${mostrarSidebar ? styles.ativo : ""}`}>
            <div className={styles.sidebarHeader}>
              <h2>Conversas</h2>
              <input className={styles.searchBox} type="text" placeholder="Buscar conversa..." />
            </div>

            <div className={styles.conversasList}>
              {conversas.map((conversa, index) => (
                <div
                  key={index}
                  className={`${styles.conversaItem} ${conversaAtiva === index ? styles.ativo : ""}`}
                  onClick={() => {
                    setConversaAtiva(index);
                    setMostrarSidebar(false); // FECHA SIDEBAR NO CELULAR
                  }}
                >
                  <div className={styles.userAvatar}>
                    <FaUser />
                  </div>
                  <div className={styles.conversaInfo}>
                    <strong>{conversa.nome}</strong>
                    <p>{conversa.msg.length > 30 ? conversa.msg.substring(0, 30) + "..." : conversa.msg}</p>
                  </div>
                  {index === 1 && <span className={styles.unreadBadge}>3</span>}
                </div>
              ))}
            </div>
          </aside>

          {/* ÁREA PRINCIPAL DO CHAT */}
          <main className={styles.mensagemArea}>
            <header className={styles.mensagemHeader}>

              {/* BOTÃO DE VOLTAR — APARECE SÓ NO CELULAR */}
              <button
                className={styles.btnVoltar}
                onClick={() => setMostrarSidebar(true)}
              >
                ←
              </button>

              <div className={styles.userAvatar}>
                <FaUser />
              </div>

              <div className={styles.userInfo}>
                <strong>{conversas[conversaAtiva].nome}</strong>
                <span className={styles.statusOnline}>Online</span>
              </div>
            </header>

            <div className={styles.mensagemCorpo} ref={mensagemCorpoRef}>
              <div className={styles.mensagensContainer}>
                {mensagensPorConversa[conversaAtiva].map((msg, i) => (
                  <div key={i} className={`${styles.mensagem} ${styles[msg.lado]}`}>
                    <span>{msg.texto}</span>
                    <span className={styles.mensagemHora}>10:30</span>
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
      </div>
    </>
  );
}
