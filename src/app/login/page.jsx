"use client";
import React, { useState } from 'react';
import styles from './Login.module.css'; // Importe o CSS com o nome correto

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Email:', email, 'Senha:', senha);
    // Adicione aqui a lógica de login
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginContainer}>
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <h2>LOGIN</h2>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>
          <a href="#" className={styles.forgotPassword}>Esqueceu a senha?</a>
          <div className={styles.formButtons}>
            <button type="button">Cadastrar</button>
            <button type="submit" className={styles.loginButton}>Entrar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;