"use client";

import React, { useState } from "react";
import styles from "./esqueceu1.module.css";
import BarraNvg from "@/components/navbar/navbar";

export default function EsqueceuSenh()  {
  const [email, setEmail] = useState("");
  const [codigo, setCodigo] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [etapa, setEtapa] = useState(1); // 1: Email, 2: Código, 3: Nova senha
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState({ texto: "", tipo: "" });

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulação de envio de código
    setTimeout(() => {
      setMensagem({ texto: `Código enviado para ${email}`, tipo: "sucesso" });
      setEtapa(2);
      setLoading(false);
    }, 1500);
  };

  const handleSubmitCodigo = async (e) => {
    e.preventDefault();
    if (codigo.length !== 6) {
      setMensagem({ texto: "O código deve ter 6 dígitos", tipo: "erro" });
      return;
    }
    setEtapa(3);
  };

  const handleSubmitNovaSenha = async (e) => {
    e.preventDefault();
    if (novaSenha !== confirmarSenha) {
      setMensagem({ texto: "As senhas não coincidem", tipo: "erro" });
      return;
    }
    if (novaSenha.length < 6) {
      setMensagem({ texto: "A senha deve ter pelo menos 6 caracteres", tipo: "erro" });
      return;
    }
    
    setLoading(true);
    // Simulação de atualização de senha
    setTimeout(() => {
      setMensagem({ texto: "Senha alterada com sucesso!", tipo: "sucesso" });
      setLoading(false);
    }, 1500);
  };
     
  const Logo = "https://i.ibb.co/23YGGMNM/Logo-Transparente.png";
  return (
    <div className={styles.pageContainer}>
      <div className={styles.container}>
        <div className={styles.twoColumnLayout}>
         
          <div className={styles.leftColumn}>
            <div className={styles.logoContainer}>
          <img 
            src={Logo} 
            className={styles.logo}
          />
        </div>
            <div className={styles.illustrationContainer}>
              <h2 className={styles.welcomeTitle}>Redefinição de Senha</h2>
              <p className={styles.welcomeText}>
                {etapa === 1 && "Digite seu email cadastrado para receber o código de verificação"}
                {etapa === 2 && "Verifique sua caixa de entrada e informe o código recebido"}
                {etapa === 3 && "Crie uma nova senha segura para sua conta"}
              </p>
              <div className={styles.illustration}>
                {/* Substitua por sua ilustração preferida */}
                <div className={styles.iconContainer}>
                  {etapa === 1 && <span className={styles.icon}>✉️</span>}
                  {etapa === 2 && <span className={styles.icon}>🔒</span>}
                  {etapa === 3 && <span className={styles.icon}>🔑</span>}
                </div>
              </div>
            </div>
          </div>
          
          {/* Coluna Direita - Formulário */}
          <div className={styles.rightColumn}>
            
            <div className={styles.formCard}>
              {mensagem.texto && (
                <div className={`${styles.mensagem} ${styles[mensagem.tipo]}`}>
                  {mensagem.texto}
                </div>
              )}
              
              {etapa === 1 && (
                <form onSubmit={handleSubmitEmail} className={styles.formContainer}>
                  <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.formLabel}>Email cadastrado</label>
                    <input
                      type="email"
                      id="email"
                      placeholder="seu@email.com"
                      className={styles.formInput}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  
                  
                  <button 
                    type="submit" 
                    className={styles.submitButton}
                    disabled={loading}
                  >
                    {loading ? 'Enviando...' : 'Enviar Código'}
                  </button>
                  </div>
                </form>
              )}
              
              {etapa === 2 && (
                <form onSubmit={handleSubmitCodigo} className={styles.formContainer}>
                  <div className={styles.formGroup}>
                    <label htmlFor="codigo" className={styles.formLabel}>Código de verificação</label>
                    <input
                      type="text"
                      id="codigo"
                      placeholder="Digite o código de 6 dígitos"
                      className={styles.formInput}
                      value={codigo}
                      onChange={(e) => setCodigo(e.target.value.replace(/\D/g, ''))}
                      maxLength={6}
                      required
                    />
                  </div>
                  
                  <button 
                    type="submit" 
                    className={styles.submitButton}
                    disabled={loading}
                  >
                    {loading ? 'Verificando...' : 'Verificar Código'}
                  </button>
                </form>
              )}
              
              {etapa === 3 && (
                <form onSubmit={handleSubmitNovaSenha} className={styles.formContainer}>
                  <div className={styles.formGroup}>
                    <label htmlFor="novaSenha" className={styles.formLabel}>Nova Senha</label>
                    <input
                      type="password"
                      id="novaSenha"
                      placeholder="Mínimo 6 caracteres"
                      className={styles.formInput}
                      value={novaSenha}
                      onChange={(e) => setNovaSenha(e.target.value)}
                      minLength={6}
                      required
                    />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label htmlFor="confirmarSenha" className={styles.formLabel}>Confirmar Nova Senha</label>
                    <input
                      type="password"
                      id="confirmarSenha"
                      placeholder="Digite novamente a senha"
                      className={styles.formInput}
                      value={confirmarSenha}
                      onChange={(e) => setConfirmarSenha(e.target.value)}
                      minLength={6}
                      required
                    />
                  </div>
                  
                  <button 
                    type="submit" 
                    className={styles.submitButton}
                    disabled={loading}
                  >
                    {loading ? 'Atualizando...' : 'Atualizar Senha'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

