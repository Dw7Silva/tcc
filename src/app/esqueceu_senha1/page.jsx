"use client";

import React, { useState } from "react";
import styles from "./esqueceu1.module.css";

const EsqueceuSenha = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Código enviado para o email: ${email}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h1 className={styles.title}>Esqueceu sua senha?</h1>
        <p className={styles.description}>Redefina a senha em duas etapas.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className={styles.input}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className={styles.button}>Enviar código</button>
        </form>
      </div>
    </div>
  );
};

export default EsqueceuSenha;
