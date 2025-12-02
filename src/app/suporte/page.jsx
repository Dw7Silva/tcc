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

            <iframe
            src="https://peanut-drop-support-517718302694.us-west1.run.app/"
            className={styles.container2}
            title="Peanut Drop Assistant"
            />

      

        </div>

      </>  
      
    );
};


export default Suporte; // Exporta o componente Suporte