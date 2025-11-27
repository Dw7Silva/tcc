"use client";
import React, { useState, useEffect } from 'react';
import styles from './Login.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import api from '@/services/api';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('1');
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState({ texto: "", tipo: "" });
  const [lembrarDeMim, setLembrarDeMim] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const router = useRouter();

  // Carregar dados salvos quando o componente montar
  useEffect(() => {
    const credenciaisSalvas = localStorage.getItem('credenciaisSalvas');
    if (credenciaisSalvas) {
      const { email: emailSalvo, tipoUsuario: tipoSalvo } = JSON.parse(credenciaisSalvas);
      setEmail(emailSalvo);
      setTipoUsuario(tipoSalvo);
      setLembrarDeMim(true);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMensagem({ texto: "", tipo: "" });

    if (!email || !senha) {
      setMensagem({ texto: "Preencha todos os campos", tipo: "erro" });
      setLoading(false);
      return;
    }

    try {
      const loginData = {
        email: email,
        senha: senha,
        tipo: tipoUsuario
      };

      console.log('Enviando dados de login:', loginData);

      const response = await api.post('/usuarios/login', loginData);

      console.log('Resposta do login:', response.data);

      if (response.data.sucesso) {
        setMensagem({ texto: "Login realizado com sucesso!", tipo: "sucesso" });

        // Salvar credenciais se "Lembrar de mim" estiver marcado
        if (lembrarDeMim) {
          localStorage.setItem('credenciaisSalvas', JSON.stringify({
            email: email,
            tipoUsuario: tipoUsuario
          }));
        } else {
          // Remover se não estiver marcado
          localStorage.removeItem('credenciaisSalvas');
        }

        // Salvar dados do usuário logado
        const usuario = {
          id: response.data.dados.id,
          nome: response.data.dados.nome,
          tipo: response.data.dados.tipo,
          agri_id: response.data.dados.agri_id ?? null,
          emp_id: response.data.dados.emp_id ?? null,
          imagem: response.data.dados.imagem ?? null
        };

        localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
        localStorage.setItem("token", Date.now().toString());

        console.log("Usuário logado salvo no localStorage:", usuario);

        setTimeout(() => {
          router.push('/inicio');
        }, 1000);

      } else {
        setMensagem({ texto: response.data.mensagem || "Erro no login", tipo: "erro" });
      }

    } catch (error) {
      console.error('Erro no login:', error);
      
      if (error.response) {
        setMensagem({ 
          texto: error.response.data.mensagem || "Erro no servidor", 
          tipo: "erro" 
        });
      } else if (error.request) {
        setMensagem({ 
          texto: "Erro de conexão. Verifique sua internet.", 
          tipo: "erro" 
        });
      } else {
        setMensagem({ 
          texto: "Erro inesperado. Tente novamente.", 
          tipo: "erro" 
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleMostrarSenha = () => {
    setMostrarSenha(!mostrarSenha);
  };

  const Logo = "https://i.ibb.co/23YGGMNM/Logo-Transparente.png";

  return (
    <div className={styles.loginPage}>
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
            <div className={styles.senhaContainer}>
              <input
                type={mostrarSenha ? "text" : "password"}
                id="senha"
                name="senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className={styles.formInput2}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                className={styles.mostrarSenhaBtn}
                onClick={toggleMostrarSenha}
              >
                {mostrarSenha ? '🙈' : '👁️'}
              </button>
            </div>
          </div>
          
          <div className={styles.formOptions}>
            <div className={styles.rememberMe}>
              <input 
                type="checkbox" 
                id="remember" 
                className={styles.checkbox} 
                checked={lembrarDeMim}
                onChange={(e) => setLembrarDeMim(e.target.checked)}
              />
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