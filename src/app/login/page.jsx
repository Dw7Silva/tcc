"use client";
import React, { useState } from 'react';
import styles from './Login.module.css';
import Link from 'next/link';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Email:', email, 'Senha:', senha);
    // Add login logic here
  };

const Logo = "https://i.ibb.co/23YGGMNM/Logo-Transparente.png";

  return (
    <div className={styles.loginPage}>
      {/* Left Side - Branding */}
      <div className={styles.brandingSection}>
        <div className={styles.logoContainer}>
          <img 
            src={Logo} // Replace with your logo path
            alt="Logo" 
            className={styles.logo}
          />
        </div>
        <div className={styles.welcomeContent}>
          <h1 className={styles.welcomeTitle}>Seja bem-vindo novamente!</h1>
          <p className={styles.welcomeSubtitle}>Acesse sua conta para continuar</p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className={styles.formSection}>
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <h2 className={styles.formTitle}>Login</h2>
          
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.inputLabel}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.formInput}
              placeholder="seu@email.com"
              required
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="senha" className={styles.inputLabel}>Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className={styles.formInput}
              placeholder="••••••••"
              required
            />
          </div>
          
          <div className={styles.formOptions}>
            <div className={styles.rememberMe}>
              <input type="checkbox" id="remember" className={styles.checkbox} />
              <label htmlFor="remember">Lembrar de mim</label>
            </div>
            <Link href="/esqueceu_senha" passHref legacyBehavior>
            <p className={styles.forgotPassword}>Esqueceu a senha?</p>
            </Link>
          </div>
          
          <button type="submit" className={styles.loginButton}>Entrar</button>
          
          <div className={styles.registerPrompt}>
            <p>Não tem uma conta? <a href="#" className={styles.registerLink}>Cadastre-se</a></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;