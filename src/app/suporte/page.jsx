"use client";

import React, { useState } from "react";
import styles from "./suporte.module.css"; // Importa os estilos do CSS
import { GoHomeFill } from "react-icons/go"; // Importa ícone de home
import { FaSearch } from "react-icons/fa"; // Importa ícone de busca
import { IoChatbox } from "react-icons/io5"; // Importa ícone de chat
import { MdSupportAgent } from "react-icons/md"; // Importa ícone de suporte
import { FaUser } from "react-icons/fa"; // Importa ícone de usuário
import { HiOutlineMenu } from "react-icons/hi"; // Importa ícone de menu

const Suporte = () => {
    // URL do logo
    const Logo = "https://i.ibb.co/23YGGMNM/Logo-Transparente.png";

    // Estado para armazenar as mensagens do chat
    const [messages, setMessages] = useState([
        { text: "Qual seria seu problema?", sender: "support" },
        { text: "OK, iremos resolver!", sender: "support" },
    ]);

    // Estado para armazenar a mensagem digitada pelo usuário
    const [inputMessage, setInputMessage] = useState("");

    // Função para enviar a mensagem
    const handleSendMessage = () => {
        // Verifica se a mensagem não está vazia
        if (inputMessage.trim() !== "") {
            // Adiciona a nova mensagem ao estado
            setMessages([...messages, { text: inputMessage, sender: "user" }]);
            // Limpa o campo de entrada
            setInputMessage("");
        }
    };

    return (
        <div className={styles.container}>
            {/* Navbar */}
            <nav className={styles.navbar}>
                <div className={styles.logoContainer}>
                    {/* Exibe o logo */}
                    <img src={Logo} alt="Logo" className={styles.logo} />
                </div>
                <div className={styles.searchBar}>
                    {/* Campo de busca */}
                    <input type="text" placeholder="Pesquise seu produto" />
                    <button>
                        <FaSearch /> {/* Botão de busca com ícone */}
                    </button>
                </div>
                <div className={styles.navIcons}>
                    {/* Ícones de navegação */}
                    <GoHomeFill />
                    <IoChatbox />
                    <MdSupportAgent />
                    <FaUser />
                    <HiOutlineMenu />
                </div>
            </nav>

            {/* Container do Chat */}
            <div className={styles.chatContainer}>
                {/* Cabeçalho do Chat */}
                <div className={styles.chatHeader}>
                    <MdSupportAgent />   {/* Ícone de suporte */}
                    <span>Suporte</span> {/* Título do chat   */}
                </div>

                {/* Mensagens do Chat */}
                <div className={styles.chatMessages}>
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`${styles.message} ${
                                msg.sender === "support" ? styles.supportMessage : styles.userMessage
                            }`}
                        >
                            {msg.text} /* Exibe o texto da mensagem */
                        </div>
                    ))}
                </div>

                {/* Campo de Digitação */}
                <div className={styles.chatInput}>
                    <input
                        type="text"
                        placeholder="Digite sua mensagem aqui"
                        value={inputMessage} // Valor do campo de entrada
                        onChange={(e) => setInputMessage(e.target.value)} // Atualiza o estado ao digitar
                        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()} // Envia mensagem ao pressionar Enter
                    />
                    <button onClick={handleSendMessage}>Enviar</button> {/* Botão para enviar a mensagem */}
                </div>
            </div>
        </div>
    );
};

export default Suporte; // Exporta o componente Suporte