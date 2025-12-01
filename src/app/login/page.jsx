"use client";
import React, { useState, useEffect } from 'react';
import styles from './Login.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import api from '@/services/api';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
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
        const { email: emailSalvo } = JSON.parse(credenciaisSalvas);
        setEmail(emailSalvo || '');
        setLembrarDeMim(true);
      } catch (error) {
        console.error('Erro ao carregar credenciais salvas:', error);
        localStorage.removeItem('credenciaisSalvas');
      }
    }
  }, []);

  // 🔥 NOVA FUNÇÃO: Tentar login em todos os tipos
  const tentarLoginTodosTipos = async (email, senha) => {
    const tipos = ['2', '3', '1']; // Agricultor, Empresa, Admin
    
    for (const tipo of tipos) {
      try {
        console.log(`🔍 Tentando login como tipo ${tipo}...`);
        
        const response = await api.post('/usuarios/login', {
          email: email.trim().toLowerCase(),
          senha: senha,
          tipo: tipo
        });

        if (response.data.sucesso) {
          console.log(`✅ Login bem-sucedido como tipo ${tipo}`);
          return { sucesso: true, data: response.data, tipo: tipo };
        }
      } catch (error) {
        // Continua para o próximo tipo
        console.log(`❌ Falha como tipo ${tipo}:`, error.response?.data?.mensagem || error.message);
        continue;
      }
    }
    
    return { sucesso: false };
  };

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
      setMensagem({ texto: "🔍 Verificando credenciais...", tipo: "info" });

      // 🔥 TENTAR LOGIN EM TODOS OS TIPOS
      const resultado = await tentarLoginTodosTipos(email, senha);
      
      if (resultado.sucesso) {
        const response = resultado.data;
        const tipoDetectado = resultado.tipo;
        
        setMensagem({ texto: "✅ Login realizado com sucesso!", tipo: "sucesso" });

        // Salvar credenciais se "Lembrar de mim" estiver marcado
        if (lembrarDeMim) {
          localStorage.setItem('credenciaisSalvas', JSON.stringify({
            email: email,
            tipoUsuario: tipoDetectado
          }));
        } else {
          localStorage.removeItem('credenciaisSalvas');
        }

        // Salvar dados do usuário logado
        const usuario = {
          id: response.dados.id,
          nome: response.dados.nome,
          tipo: response.dados.tipo,
          agri_id: response.dados.agri_id || null,
          emp_id: response.dados.emp_id || null,
          imagem: response.dados.imagem || null,
          email: response.dados.email || email,
          documento: response.dados.documento || null,
          telefone: response.dados.telefone || null,
          endereco: response.dados.endereco || null,
          tipo_descricao: tipoDetectado === '2' ? 'Agricultor' : 
                         tipoDetectado === '3' ? 'Empresa' : 'Administrador'
        };

        localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
        localStorage.setItem("token", Date.now().toString());

        console.log("💾 Usuário logado salvo:", usuario);

        // Redirecionar após 1 segundo
        setTimeout(() => {
          router.push('/inicio');
        }, 1000);

      } else {
        // 🔥 VERIFICAR SE É EMAIL NÃO CADASTRADO OU SENHA ERRADA
        // Primeiro verificar se o email existe em algum tipo (com senha errada)
        let emailExiste = false;
        const tipos = ['2', '3', '1'];
        
        for (const tipo of tipos) {
          try {
            await api.post('/usuarios/login', {
              email: email.trim().toLowerCase(),
              senha: 'senha_errada_teste',
              tipo: tipo
            });
          } catch (error) {
            // Se o erro for "Usuário não encontrado", email não existe nesse tipo
            // Se o erro for "senha incorreta", email EXISTE nesse tipo
            if (error.response?.data?.mensagem?.includes("senha incorreta") || 
                error.response?.data?.mensagem?.includes("Usuário não encontrado ou senha incorreta")) {
              emailExiste = true;
              break;
            }
          }
        }
        
        if (emailExiste) {
          setMensagem({ 
            texto: "❌ Senha incorreta. Tente novamente.", 
            tipo: "erro" 
          });
        } else {
          setMensagem({ 
            texto: "📧 Email não cadastrado. Verifique ou cadastre-se.", 
            tipo: "erro" 
          });
        }
      }

    } catch (error) {
      console.error('💥 Erro no login:', error);
      
      let erroMensagem = "Erro inesperado. Tente novamente.";
      
      if (error.response) {
        if (error.response.status === 401 || error.response.status === 404) {
          erroMensagem = "Email ou senha incorretos.";
        } else if (error.response.status === 400) {
          erroMensagem = "Dados inválidos. Verifique as informações.";
        } else {
          erroMensagem = error.response.data.mensagem || "Erro no servidor.";
        }
      } else if (error.request) {
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
            Faça login com seu email e senha !!
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
              <label htmlFor="email" className={styles.inputLabel}>
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
                disabled={loading}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="senha" className={styles.inputLabel}>
                Senha
              </label>
              <div className={styles.senhaContainer}>
                <input
                  type={mostrarSenha ? "text" : "password"}
                  id="senha"
                  name="senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className={styles.formInput2}
                  placeholder="Digite sua senha"
                  required
                  minLength={6}
                  disabled={loading}
                />
                <button
                  type="button"
                  className={styles.mostrarSenhaBtn}
                  onClick={toggleMostrarSenha}
                  title={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
                  disabled={loading}
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
                  disabled={loading}
                />
                <label htmlFor="remember" className={styles.checkboxLabel}>
                  Lembrar de mim
                </label>
              </div>
              <Link href="/esqueceu_senha" className={styles.forgotPassword}>
                Esqueceu a senha?
              </Link>
            </div>
            
            <button 
              type="submit" 
              className={styles.loginButton}
              disabled={loading || !email || !senha}
            >
              {loading ? 'Entrando...' : 'Entrar'}
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