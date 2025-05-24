"use client";

import React, { useState } from "react";
import styles from "./suporte.module.css"; // Importa os estilos do CSS
import { MdSupportAgent } from "react-icons/md"; // Importa ícone de suporte
import BarraNvg from "@/components/navbar/navbar";



const Suporte = () => {
  

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
      <>
              <BarraNvg></BarraNvg>
        <div className={styles.container}>
            {/* Navbar */}
      

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
                            {msg.text} 
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

      </>  
    );
};


export default Suporte; // Exporta o componente Suporte