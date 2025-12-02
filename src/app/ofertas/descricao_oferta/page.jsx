// src/components/OfertaDescricao.jsx
"use client";
import React, { useState, useEffect } from "react";
import styles from "./descoferta.module.css";
import BarraNvg from "@/components/navbar/navbar";
import api from "@/services/api";

export default function OfertaDescricao({ oferta }) {
  const [showConfirmacao, setShowConfirmacao] = useState(false);
  const [etapa, setEtapa] = useState(1); // 1=Enviar, 2=Aguardando, 3=Finalizada
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [usuarioLogado, setUsuarioLogado] = useState(null);

  // Carregar usuário do localStorage quando o componente montar
  useEffect(() => {
    const carregarUsuario = () => {
      try {
        const usuarioJSON = localStorage.getItem('usuarioLogado');
        if (usuarioJSON) {
          const usuario = JSON.parse(usuarioJSON);
          setUsuarioLogado(usuario);
          console.log("Usuário logado:", usuario);
        }
      } catch (error) {
        console.error("Erro ao carregar usuário:", error);
      }
    };
    
    carregarUsuario();
  }, []);

  if (!oferta) {
    return (
      <>
        <BarraNvg />
        <div className={styles.container}>
          <div className={styles.demandaContainer}>
            <h2>Oferta não encontrada</h2>
          </div>
        </div>
      </>
    );
  }

  const agricultor = oferta.agri_nome;
  const variedade = oferta.amen_variedade;
  const quantidade = oferta.oferta_quantidade;
  const preco = oferta.oferta_preco;
  const informacoes = oferta.oferta_outras_informacoes;
  const dataColheita = oferta.oferta_data_colheita;
  const data_publicacao = oferta.oferta_data_publicacao; 
  const imagemOferta = oferta.oferta_img;

  // Função para verificar se a oferta é do próprio agricultor logado
  const isProprioAgricultor = () => {
    if (!usuarioLogado) return false;
    return usuarioLogado.tipo === 2 && usuarioLogado.agri_id === oferta.agri_id;
  };

  // Função para verificar se o usuário é empresa (tipo 3)
  const isEmpresa = () => {
    return usuarioLogado && usuarioLogado.tipo === 3;
  };

  // Função para iniciar negociação
  const iniciarNegociacao = async () => {
    setLoading(true);
    
    try {
      // 1. Verificar se usuário está logado
      if (!usuarioLogado) {
        setMensagem("Faça login para iniciar uma negociação");
        setLoading(false);
        return;
      }

      // 2. Verificar se é empresa (tipo 3)
      if (!isEmpresa()) {
        setMensagem("Apenas empresas podem iniciar negociações com ofertas");
        setLoading(false);
        return;
      }

      // 3. Verificar se tem emp_id
      if (!usuarioLogado.emp_id) {
        setMensagem("Empresa não identificada. Faça login novamente");
        setLoading(false);
        return;
      }

      // 4. Verificar se oferta existe
      if (!oferta || !oferta.oferta_id) {
        setMensagem("Oferta não encontrada");
        setLoading(false);
        return;
      }

      // 5. Iniciar negociação na API
      const response = await api.post('/negociacoes/iniciar-oferta', {
        oferta_id: oferta.oferta_id,
        emp_id: usuarioLogado.emp_id
      });

      // 6. Processar resposta da API
      if (response.data.sucesso) {
        setEtapa(2); // Move para etapa 2 (Aguardando confirmação)
        setMensagem("Negociação enviada! Aguardando confirmação do agricultor.");
        
        // Aguardar 3 segundos e finalizar (simulação)
        setTimeout(() => {
          setEtapa(3);
          setMensagem("Negociação finalizada com sucesso!");
        }, 3000);
      } else {
        setMensagem(response.data.mensagem || "Não foi possível iniciar a negociação");
      }

    } catch (error) {
      console.error('Erro ao iniciar negociação:', error);
      
      // Tratamento específico para diferentes tipos de erro
      if (error.response) {
        if (error.response.status === 401) {
          setMensagem("Sessão expirada. Faça login novamente");
          localStorage.removeItem('usuarioLogado');
          setUsuarioLogado(null);
        } else if (error.response.status === 400) {
          setMensagem(error.response.data.mensagem || "Dados inválidos para iniciar negociação");
        } else {
          setMensagem("Erro no servidor. Tente novamente mais tarde.");
        }
      } else if (error.request) {
        setMensagem("Erro de conexão. Verifique sua internet.");
      } else {
        setMensagem("Erro ao configurar a solicitação.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleIniciarNegociacao = () => {
    // Verificar se está logado
    if (!usuarioLogado) {
      setMensagem("Faça login para iniciar uma negociação");
      return;
    }

    // Verificar se é a própria oferta do agricultor
    if (isProprioAgricultor()) {
      setMensagem("Você não pode negociar com sua própria oferta");
      return;
    }

    // Verificar se é empresa
    if (!isEmpresa()) {
      setMensagem("Apenas empresas podem iniciar negociações com ofertas");
      return;
    }

    setShowConfirmacao(true);
    setEtapa(1);
    setMensagem("");
  };

  const handleConfirmar = () => {
    iniciarNegociacao();
  };

  const handleFechar = () => {
    setShowConfirmacao(false);
    setEtapa(1);
    setMensagem("");
  };

  return (
    <>
      <BarraNvg />

      <div className={styles.container}>
        <div className={styles.demandaContainer}>
          <div className={styles.demandaHeader}>
            <div>
              <p className={styles.productTitle}>{agricultor}</p>
              <p className={styles.productSubtitle}>Agricultor</p>
            </div>

            <div className={styles.imageContainer}>
              <img
                src={imagemOferta}
                className={styles.productImage}
                loading="lazy"
                alt={`Oferta de ${variedade}`}
                onError={(e) => {
                  e.target.src = "/imagens/default-produto.jpg";
                }}
              />
            </div>
          </div>

          <div className={styles.demandaContent}>
            <div className={styles.infoBox}>
              <h2>Detalhes da Oferta</h2>

              <div className={styles.infoGrid}>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Preço:</span>
                  <span className={styles.infoValue}>R$ {preco}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Quantidade:</span>
                  <span className={styles.infoValue}>{quantidade} kg</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Data de colheita:</span>
                  <span className={styles.infoValue}>
                    {new Date(dataColheita).toLocaleDateString('pt-BR')}
                  </span>
                </div>
                
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Variedade:</span>
                  <span className={styles.infoValue}>{variedade}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Publicado em:</span>
                  <span className={styles.infoValue}>
                    {new Date(data_publicacao).toLocaleDateString('pt-BR')}
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.editorSection}>
              <h2>Observações</h2>
              <div className={styles.editorPlaceholder}>
                <p>{informacoes || "Sem observações adicionais."}</p>
              </div>
            </div>
          </div>

          <div className={styles.actionButtons}>
            <button 
              onClick={handleIniciarNegociacao}
              className={styles.primaryButton}
              disabled={loading || isProprioAgricultor() || !isEmpresa()}
            >
              {loading ? "Enviando..." : "Iniciar Negociação"}
            </button>
            
            {!usuarioLogado && (
              <div className={styles.avisoLogin}>
                Faça login como empresa para negociar
              </div>
            )}
            
            {usuarioLogado && !isEmpresa() && (
              <div className={styles.avisoTipoUsuario}>
                Apenas empresas podem negociar com ofertas
              </div>
            )}
            
            {isProprioAgricultor() && (
              <div className={styles.avisoPropriaOferta}>
                Esta é sua própria oferta
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal de Confirmação e Acompanhamento */}
      {showConfirmacao && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>Processo de Negociação</h2>
              <button onClick={handleFechar} className={styles.closeButton}>×</button>
            </div>

            <div className={styles.etapasContainer}>
              {/* Etapa 1 - Confirmação Inicial */}
              {etapa === 1 && (
                <div className={styles.etapa}>
                  <div className={styles.etapaIcon}>1</div>
                  <div className={styles.etapaContent}>
                    <h3>Confirmar Interesse</h3>
                    <p>Deseja iniciar uma negociação com {agricultor}?</p>
                    <div className={styles.produtoInfo}>
                      <p><strong>Produto:</strong> {variedade}</p>
                      <p><strong>Quantidade:</strong> {quantidade} kg</p>
                      <p><strong>Preço:</strong> R$ {preco}</p>
                      <p><strong>Data de Colheita:</strong> {new Date(dataColheita).toLocaleDateString('pt-BR')}</p>
                    </div>
                    <div className={styles.modalActions}>
                      <button 
                        onClick={handleConfirmar}
                        className={styles.confirmButton}
                        disabled={loading}
                      >
                        {loading ? "Enviando..." : "Confirmar Interesse"}
                      </button>
                      <button 
                        onClick={handleFechar}
                        className={styles.cancelButton}
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Etapa 2 - Aguardando Confirmação */}
              {etapa === 2 && (
                <div className={styles.etapa}>
                  <div className={`${styles.etapaIcon} ${styles.etapaLoading}`}>2</div>
                  <div className={styles.etapaContent}>
                    <h3>Aguardando Confirmação</h3>
                    <p>Sua solicitação de negociação foi enviada para {agricultor}.</p>
                    <p>Você será notificado quando ele aceitar.</p>
                    <div className={styles.loadingSpinner}></div>
                  </div>
                </div>
              )}

              {/* Etapa 3 - Finalizada */}
              {etapa === 3 && (
                <div className={styles.etapa}>
                  <div className={`${styles.etapaIcon} ${styles.etapaSuccess}`}>3</div>
                  <div className={styles.etapaContent}>
                    <h3>Negociação Finalizada!</h3>
                    <p>Parabéns! Sua negociação com {agricultor} foi concluída com sucesso.</p>
                    <p>Você pode acompanhar o andamento na sua área de negociações.</p>
                    <div className={styles.modalActions}>

                    </div>
                  </div>
                </div>
              )}

              {/* Mensagem de status */}
              {mensagem && (
                <div className={mensagem.includes("sucesso") ? styles.mensagemStatus : styles.mensagemErro}>
                  {mensagem}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}