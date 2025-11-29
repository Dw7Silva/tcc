"use client";
import React, { useState } from "react";
import styles from "./descoferta.module.css";
import BarraNvg from "@/components/navbar/navbar";
import api from "@/services/api";

export default function OfertaDescricao({ oferta }) {
  const [showConfirmacao, setShowConfirmacao] = useState(false);
  const [etapa, setEtapa] = useState(1); // 1=Enviar, 2=Aguardando, 3=Finalizada
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState("");

  if (!oferta) {
    return (
      <>
        <BarraNvg />
        <div className={styles.container}>
          <div className={styles.demandaContainer}>
            <p>Oferta não encontrada</p>
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

  // Função para iniciar negociação
  const iniciarNegociacao = async () => {
    setLoading(true);
    try {
      // Obter o usuário logado do localStorage
      const usuarioLogado = JSON.parse(localStorage.getItem('usuario') || '{}');
      
      if (!usuarioLogado.emp_id) {
        setMensagem("Você precisa estar logado como empresa para iniciar uma negociação");
        return;
      }

      const response = await api.post('/negociacoes/iniciar-oferta', {
        oferta_id: oferta.oferta_id,
        emp_id: usuarioLogado.emp_id
      });

      if (response.data.sucesso) {
        setEtapa(2); // Move para etapa 2 (Aguardando confirmação)
        setMensagem("Negociação enviada! Aguardando confirmação do agricultor.");
        
        // Simular recebimento de confirmação após 3 segundos
        setTimeout(() => {
          setEtapa(3);
          setMensagem("Negociação finalizada com sucesso!");
        }, 3000);
      }
    } catch (error) {
      console.error('Erro ao iniciar negociação:', error);
      setMensagem("Erro ao iniciar negociação. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleIniciarNegociacao = () => {
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
            </div>

            <div className={styles.imageContainer}>
              <img
                src={imagemOferta}
                className={styles.productImage}
                loading="lazy"
                alt={`Oferta de ${variedade}`}
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
                  <span className={styles.infoValue}>{new Date(dataColheita).toLocaleDateString('pt-BR')}</span>
                </div>
                
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Variedade:</span>
                  <span className={styles.infoValue}>{variedade}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Publicado em:</span>
                  <span className={styles.infoValue}>{new Date(data_publicacao).toLocaleDateString('pt-BR')}</span>
                </div>
              </div>
            </div>

            <div className={styles.editorSection}>
              <h2>Observações</h2>
              <div className={styles.editorPlaceholder}>
                <p>{informacoes}</p>
              </div>
            </div>
          </div>

          <div className={styles.actionButtons}>
            <button 
              onClick={handleIniciarNegociacao}
              className={styles.primaryButton}
              disabled={loading}
            >
              {loading ? "Enviando..." : "Iniciar Negociação"}
            </button>
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
                      <button 
                        onClick={handleFechar}
                        className={styles.successButton}
                      >
                        Fechar
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Mensagem de status */}
              {mensagem && (
                <div className={styles.mensagemStatus}>
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