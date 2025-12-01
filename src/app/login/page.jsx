"use client";
import React, { useState, useEffect } from 'react';
import styles from './Login.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import api from '@/services/api';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('2'); // 🔥 Alterado: 2=Agricultor (padrão)
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState({ texto: "", tipo: "" });
  const [lembrarDeMim, setLembrarDeMim] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const router = useRouter();

  // Carregar dados salvos quando o componente montar
  useEffect(() => {
    const credenciaisSalvas = localStorage.getItem('credenciaisSalvas');
    if (credenciaisSalvas) {
      try {
        const { email: emailSalvo, tipoUsuario: tipoSalvo } = JSON.parse(credenciaisSalvas);
        setEmail(emailSalvo || '');
        // Garantir que o tipo salvo seja válido (2 ou 3)
        setTipoUsuario(tipoSalvo === '2' || tipoSalvo === '3' ? tipoSalvo : '2');
        setLembrarDeMim(true);
      } catch (error) {
        console.error('Erro ao carregar credenciais salvas:', error);
        localStorage.removeItem('credenciaisSalvas');
      }
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMensagem({ texto: "", tipo: "" });

    // Validações
    if (!email || !senha) {
      setMensagem({ texto: "Preencha todos os campos", tipo: "erro" });
      setLoading(false);
      return;
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMensagem({ texto: "Digite um email válido", tipo: "erro" });
      setLoading(false);
      return;
    }

    // Validação de senha
    if (senha.length < 6) {
      setMensagem({ texto: "A senha deve ter pelo menos 6 caracteres", tipo: "erro" });
      setLoading(false);
      return;
    }

    try {
      const loginData = {
        email: email.trim().toLowerCase(),
        senha: senha,
        tipo: tipoUsuario // 🔥 Agora correto: 2=Agricultor, 3=Empresa
      };

      console.log('📤 Enviando dados de login:', loginData);

      const response = await api.post('/usuarios/login', loginData);

      console.log('📥 Resposta do login:', response.data);

      if (response.data.sucesso) {
        setMensagem({ texto: "✅ Login realizado com sucesso!", tipo: "sucesso" });

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
          agri_id: response.data.dados.agri_id || null,
          emp_id: response.data.dados.emp_id || null,
          imagem: response.data.dados.imagem || null,
          email: response.data.dados.email || email,
          documento: response.data.dados.documento || null,
          telefone: response.data.dados.telefone || null,
          endereco: response.data.dados.endereco || null
        };

        localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
        localStorage.setItem("token", Date.now().toString());

        console.log("💾 Usuário logado salvo:", usuario);

        // Redirecionar baseado no tipo de usuário
        setTimeout(() => {
          // Você pode personalizar o redirecionamento por tipo se quiser
          router.push('/inicio');
        }, 1000);

      } else {
        setMensagem({ 
          texto: response.data.mensagem || "❌ Credenciais inválidas", 
          tipo: "erro" 
        });
      }

    } catch (error) {
      console.error('💥 Erro no login:', error);
      
      let erroMensagem = "Erro inesperado. Tente novamente.";
      
      if (error.response) {
        // Erro do servidor com resposta
        if (error.response.status === 401 || error.response.status === 404) {
          erroMensagem = "Email ou senha incorretos.";
        } else if (error.response.status === 400) {
          erroMensagem = "Dados inválidos. Verifique as informações.";
        } else {
          erroMensagem = error.response.data.mensagem || 
                        error.response.data.dados || 
                        "Erro no servidor.";
        }
        
      } else if (error.request) {
        // Erro de conexão
        erroMensagem = "Erro de conexão. Verifique sua internet.";
      }
      
      setMensagem({ 
        texto: erroMensagem, 
        tipo: "erro" 
      });
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
            alt="Logo PeanutDrop" 
            className={styles.logo}
          />
          
        </div>
        <div className={styles.welcomeContent}>
          <h1 className={styles.welcomeTitle}>Bem-vindo de volta!</h1>
          <p className={styles.welcomeSubtitle}>
            Acesse sua conta para gerenciar suas ofertas e demandas
          </p>
          
        </div>
      </div>

      <div className={styles.formSection}>
        <div className={styles.formCard}>
          <form className={styles.loginForm} onSubmit={handleSubmit}>
            <div className={styles.formHeader}>
              <h2 className={styles.formTitle}>Login</h2>
            
            </div>
            
            {mensagem.texto && (
              <div className={`${styles.mensagem} ${styles[mensagem.tipo]}`}>
                {mensagem.texto}
              </div>
            )}
            
            <div className={styles.formGroup}>
              <label htmlFor="tipoUsuario" className={styles.inputLabel}>
                <span className={styles.labelIcon}>👤</span>
                Tipo de Usuário
              </label>
              <select
                id="tipoUsuario"
                name="tipoUsuario"
                value={tipoUsuario}
                onChange={(e) => setTipoUsuario(e.target.value)}
                className={styles.formSelect}
                required
              >
                <option value="2">🌱 Agricultor</option>
                <option value="3">🏢 Empresa</option>
                <option value="1" disabled>🔧 Administrador</option>
              </select>
              <p className={styles.selectHelp}>
                {tipoUsuario === '2' 
                  ? ' '
                  : ''}
              </p>
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.inputLabel}>
                <span className={styles.labelIcon}>📧</span>
                Email
              </label>
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
              <label htmlFor="senha" className={styles.inputLabel}>
                <span className={styles.labelIcon}>🔒</span>
                Senha
              </label>
              <div className={styles.senhaContainer}>
                <input
                  type={mostrarSenha ? "text" : "password"}
                  id="senha"
                  name="senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className={styles.formInput}
                  placeholder="Digite sua senha"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  className={styles.mostrarSenhaBtn}
                  onClick={toggleMostrarSenha}
                  title={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
                >
                  {mostrarSenha ? '🙈' : '👁️ '}
                </button>
              </div>
              <div className={styles.passwordStrength}>
                {senha.length > 0 && (
                  <div className={styles.strengthMeter}>
                    <div 
                      className={`${styles.strengthBar} ${
                        senha.length < 6 ? styles.weak :
                        senha.length < 8 ? styles.medium : styles.strong
                      }`}
                      style={{ width: `${Math.min(senha.length * 8, 100)}%` }}
                    ></div>
                  </div>
                )}
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
                <label htmlFor="remember" className={styles.checkboxLabel}>
                  Lembrar de mim neste dispositivo
                </label>
              </div>
              <Link href="/esqueceu_senha" className={styles.forgotPassword}>
                Esqueceu a senha?
              </Link>
            </div>
            
            <button 
              type="submit" 
              className={`${styles.loginButton} ${loading ? styles.loading : ''}`}
              disabled={loading || !email || !senha}
            >
              {loading ? (
                <>
                  <span className={styles.spinner}></span>
                  Entrando...
                </>
              ) : 'Entrar na plataforma'}
            </button>
            
            <div className={styles.registerPrompt}>
              <p className={styles.registerText}>
                Novo na plataforma?  
                <Link href="/cadastro" className={styles.registerLink}>
                  Crie sua conta
                </Link>
              </p>
              
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;