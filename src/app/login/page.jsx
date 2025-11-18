"use client";
import React, { useState } from 'react';
import styles from './Login.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('1'); // 1 = Agricultor, 2 = Empresa
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState({ texto: "", tipo: "" });
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMensagem({ texto: "", tipo: "" });

    // Validações básicas
    if (!email || !senha) {
      setMensagem({ texto: "Preencha todos os campos", tipo: "erro" });
      setLoading(false);
      return;
    }

    try {
      // Dados para enviar ao backend
      const loginData = {
        email: email,
        senha: senha,
        tipo: tipoUsuario // 1 ou 2
      };

      console.log('Enviando dados de login:', loginData);

      // Chamada para a API de login
      const response = await fetch('http://localhost:3333/usuarios/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData)
      });

      const resultado = await response.json();

      if (resultado.sucesso) {
        setMensagem({ texto: "Login realizado com sucesso!", tipo: "sucesso" });
        
        // Salvar dados do usuário no localStorage
        localStorage.setItem('usuario', JSON.stringify(resultado.dados));
        localStorage.setItem('token', Date.now().toString()); // Simulação de token
        
        console.log('Usuário logado:', resultado.dados);
        
        // Redirecionar para a tela "inicio"
        setTimeout(() => {
          router.push('/inicio'); // ✅ Redireciona para a tela inicio
        }, 1000);
        
      } else {
        setMensagem({ texto: resultado.mensagem || "Erro no login", tipo: "erro" });
      }

    } catch (error) {
      console.error('Erro:', error);
      setMensagem({ texto: "Erro ao conectar com o servidor", tipo: "erro" });
    } finally {
      setLoading(false);
    }
  };

  const Logo = "https://i.ibb.co/23YGGMNM/Logo-Transparente.png";

  return (
    <div className={styles.loginPage}>
      {/* Left Side - Branding */}
      <div className={styles.brandingSection}>
        <div className={styles.logoContainer}>
          <img 
            src={Logo}
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
          
          {mensagem.texto && (
            <div className={`${styles.mensagem} ${styles[mensagem.tipo]}`}>
              {mensagem.texto}
            </div>
          )}
          
          <div className={styles.formGroup}>
            <label htmlFor="tipoUsuario" className={styles.inputLabel}>Tipo de Usuário</label>
            <select
              id="tipoUsuario"
              name="tipoUsuario"
              value={tipoUsuario}
              onChange={(e) => setTipoUsuario(e.target.value)}
              className={styles.formSelect}
              required
            >
              <option value="1">Agricultor</option>
              <option value="2">Empresa</option>
            </select>
          </div>
          
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
          
          <button 
            type="submit" 
            className={styles.loginButton}
            disabled={loading}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
          
          <div className={styles.registerPrompt}>
            <p>Não tem uma conta? 
              <Link href="/cadastro" className={styles.registerLink}>
                Cadastre-se
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;