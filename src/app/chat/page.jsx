"use client";

import React, { useState, useRef, useEffect } from 'react';
import styles from './chat.module.css';
import { FaPaperclip, FaThumbsUp } from 'react-icons/fa';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      setMessages([...messages, { text: newMessage, sender: 'user' }]);
      setNewMessage('');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.chatContainer} ref={chatContainerRef}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`${styles.message} ${message.sender === 'user' ? styles.userMessage : styles.otherMessage}`}
          >
            {message.text}
            {message.sender === 'user' && <FaThumbsUp className={styles.likeIcon} />}
          </div>
        ))}
      </div>
      <div className={styles.inputContainer}>
        <div className={styles.inputWrapper}>
          <FaPaperclip className={styles.attachmentIcon} />
          <input
            type="text"
            placeholder="Digite sua mensagem aqui"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>
        <button onClick={handleSendMessage}>Enviar</button>
      </div>
    </div>
  );
}