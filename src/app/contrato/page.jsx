"use client";
import styles from "./chat.module.css";
import { FaUser } from "react-icons/fa";
import { FaImage, FaFileAlt } from "react-icons/fa";
import { useState } from "react";

export default function Chat() {
  const [conversaAtiva, setConversaAtiva] = useState(0); // Índice da conversa ativa
  const [novaMensagem, setNovaMensagem] = useState("");

  const conversas = [
    { nome: "NIEL", msg: "O amendoim já abaixou" },
    { nome: "Derick W", msg: "Vamo querer trabalhar" },
    { nome: "Giovanny", msg: "Perdi a colheita toda" },
    { nome: "Fabrício", msg: "Vendi todo o amendoim já" },
    { nome: "Gabriel", msg: "Não consigo ganhar uma" },
    { nome: "Thiago", msg: "Só tô perdendo como é possível?" }
  ];

  // Armazenar mensagens por conversa
  const [mensagensPorConversa, setMensagensPorConversa] = useState([
    [
      { texto: "Oi, Niel! Como estão as vendas?", lado: "direita" },
      { texto: "Estão indo bem, obrigado!", lado: "esquerda" },
      { texto: "Ótimo! Se precisar de ajuda, me avise.", lado: "direita" },
    ],
    [
      { texto: "Derick, você já plantou a nova safra?", lado: "direita" },
      { texto: "Sim, já plantei! E você?", lado: "esquerda" },
      { texto: "Estou pensando em plantar na próxima semana.", lado: "direita" },
    ],
    [
      { texto: "Giovanny, como está a colheita?", lado: "direita" },
      { texto: "Perdi a colheita toda, foi um desastre!", lado: "esquerda" },
      { texto: "Sinto muito! Vamos conversar sobre isso.", lado: "direita" },
    ],
    [
      { texto: "Fabrício, como estão as vendas?", lado: "direita" },
      { texto: "Vendi todo o amendoim já!", lado: "esquerda" },
      { texto: "Que bom! Precisamos conversar sobre o próximo lote.", lado: "direita" },
    ],
    [
      { texto: "Gabriel, ainda está tendo dificuldades?", lado: "direita" },
      { texto: "Sim, não consigo ganhar uma.", lado: "esquerda" },
      { texto: "Vamos analisar isso juntos.", lado: "direita" },
    ],
    [
      { texto: "Thiago, como estão suas vendas?", lado: "direita" },
      { texto: "Só tô perdendo, como é possível?", lado: "esquerda" },
      { texto: "Precisamos rever sua estratégia.", lado: "direita" },
    ]
  ]);

  const enviarMensagem = (e) => {
    e.preventDefault();
    if (novaMensagem.trim() === "") return;

    // Adiciona a nova mensagem ao estado das mensagens da conversa ativa
    const novaMensagemObj = { texto: novaMensagem, lado: "direita" };
    const novasMensagens = [...mensagensPorConversa[conversaAtiva], novaMensagemObj];

    // Atualiza o estado das mensagens por conversa
    const novasMensagensPorConversa = [...mensagensPorConversa];
    novasMensagensPorConversa[conversaAtiva] = novasMensagens;

    setMensagensPorConversa(novasMensagensPorConversa);

    // Atualiza a última mensagem da conversa ativa
    const novasConversas = [...conversas];
    novasConversas[conversaAtiva].msg = novaMensagem;
    setNovaMensagem(""); // Limpa o campo de entrada
  };

  const alternarConversa = (index) => {
    setConversaAtiva(index);
    // Não é necessário atualizar o estado de mensagens, pois já está armazenado
  };

  return (
    <div className={styles.chatContainer}>
      <aside className={styles.sidebar}>
        <h2>Conversas</h2>
        {conversas.map((conversa, index) => (
          <div
            key={index}
            className={`${styles.conversaItem} ${conversaAtiva === index ? styles.ativo : ''}`}
            onClick={() => alternarConversa(index)}
          >
            <FaUser />
            <div>
              <strong>{conversa.nome}</strong>
              <p>{conversa.msg}</p>
            </div>
          </div>
        ))}
      </aside>

      <main className={styles.mensagemArea}>
        <header className={styles.mensagemHeader}>
          <FaUser className={styles.userIcon} />
          <span>{conversas[conversaAtiva].nome}</span>
        </header>

        <div className={styles.mensagemCorpo}>
          {mensagensPorConversa[conversaAtiva].map((msg, i) => (
            <div
              key={i}
              className={`${styles.mensagem} ${styles[msg.lado]}`}
            >
              {msg.texto}
            </div>
          ))}
        </div>

        <footer className={styles.mensagemInput}>
          <div className={styles.iconesInput}>
            <FaImage />
            <FaFileAlt />
          </div>
          <form onSubmit={enviarMensagem}>
            <input
              type="text"
              placeholder="Digite sua mensagem aqui"
              value={novaMensagem}
              onChange={(e) => setNovaMensagem(e.target.value)}
            />
            <button type="submit" className={styles.enviarBtn}>
              &#10148;
            </button>
          </form>
        </footer>
      </main>
    </div>
  );
}
