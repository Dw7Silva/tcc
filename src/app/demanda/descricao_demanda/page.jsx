// src/components/DemandaDescricao.jsx
"use client";
import React, { useState } from "react";
import styles from './descdemanda.module.css';
import BarraNvg from "@/components/navbar/navbar";
import api from "@/services/api";

export default function DemandaDescricao({ demanda }) {
  const [showConfirmacao, setShowConfirmacao] = useState(false);
  const [etapa, setEtapa] = useState(1); // 1=Enviar, 2=Aguardando, 3=Finalizada
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState("");

  if (!demanda) {
    return (
      <>
        <BarraNvg />
        <div className={styles.container}>
          <div className={styles.demandaContainer}>
            <h2>Demanda não encontrada</h2>
          </div>
        </div>
      </>
    );
  }
  
  const empresa = demanda.emp_nome_fantasia;
  const variedade = demanda.amen_variedade;
  const quantidade = demanda.demanda_quantidade;
  const preco = demanda.demanda_preco_maximo;
  const informacoes = demanda.demanda_outras_informacoes;
  const dataEntrega = demanda.demanda_data_entrega;
  const data_publicacao = demanda.demanda_data_publicacao; 
  const imagemdemanda = demanda.demanda_imagem;

  // Função para verificar se a demanda é da própria empresa logada
  const isPropriaEmpresa = () => {
    const usuarioLogado = JSON.parse(localStorage.getItem('usuario') || '{}');
    return usuarioLogado.emp_id === demanda.emp_id;
  };

  const usuarioLogadoJSON = localStorage.getItem("usuarioLogado");

        if (usuarioLogadoJSON) {
             const usuarioLogado = JSON.parse(usuarioLogadoJSON);
 
             console.log(usuarioLogado);
             console.log("ID:", usuarioLogado.id);
             console.log("Tipo:", usuarioLogado.tipo);
             console.log("Nome:", usuarioLogado.nome);
          } else {
          console.log("Nenhum usuário logado");
          }
      

  const iniciarNegociacao = async () => {
  setLoading(true);
  
  try {
    // 1. Recuperar usuário do localStorage com tratamento de erros
    const usuarioJSON = localStorage.getItem('usuarioLogado');
    
    if (!usuarioJSON) {
      setMensagem("Faça login para iniciar uma negociação");
      setLoading(false);
      return;
    }

    let usuarioLogado;
    try {
      usuarioLogado = JSON.parse(usuarioJSON);
    } catch (parseError) {
      console.error('Erro ao processar dados do usuário:', parseError);
      setMensagem("Erro na sessão. Faça login novamente");
      setLoading(false);
      return;
    }

    console.log('Usuário logado:', usuarioLogado);
    
    if (!usuarioLogado || usuarioLogado.tipo !== 2) {
      setMensagem("Você precisa estar logado como agricultor para iniciar uma negociação");
      setLoading(false);
      return;
    }

    // 3. Verificar se tem agri_id
    if (!usuarioLogado.agri_id) {
      setMensagem("Agricultor não identificado. Faça login novamente");
      setLoading(false);
      return;
    }

    // 4. Verificar se demanda existe
    if (!demanda || !demanda.demanda_id) {
      setMensagem("Demanda não encontrada");
      setLoading(false);
      return;
    }

    // 5. Iniciar negociação na API
    const response = await api.post('/negociacoes/iniciar-demanda', {
      demanda_id: demanda.demanda_id,
      agri_id: usuarioLogado.agri_id
    });

    // 6. Processar resposta da API
    if (response.data.sucesso) {
      setEtapa(2); // Move para etapa 2 (Aguardando confirmação)
      setMensagem("Negociação enviada! Aguardando confirmação da empresa.");
      
      // Aguardar 3 segundos e finalizar
      setTimeout(() => {
        setEtapa(3);
        setMensagem("Negociação finalizada com sucesso!");
      }, 3000);
    } else {
      // Caso a API retorne sucesso: false
      setMensagem(response.data.mensagem || "Não foi possível iniciar a negociação");
    }

  } catch (error) {
    console.error('Erro ao iniciar negociação:', error);
    
    // Tratamento específico para diferentes tipos de erro
    if (error.response) {
      // Erro da API (4xx, 5xx)
      if (error.response.status === 401) {
        setMensagem("Sessão expirada. Faça login novamente");
        // Opcional: limpar localStorage e redirecionar para login
        localStorage.removeItem('usuarioLogado');
      } else if (error.response.status === 400) {
        setMensagem(error.response.data.mensagem || "Dados inválidos para iniciar negociação");
      } else {
        setMensagem("Erro no servidor. Tente novamente mais tarde.");
      }
    } else if (error.request) {
      // Erro de rede (não houve resposta)
      setMensagem("Erro de conexão. Verifique sua internet.");
    } else {
      // Erro na configuração da requisição
      setMensagem("Erro ao configurar a solicitação.");
    }
  } finally {
    setLoading(false);
  }
};

  const handleIniciarNegociacao = () => {
    // Verificar se é a própria empresa antes de abrir o modal
    if (isPropriaEmpresa()) {
      setMensagem("Você não pode negociar com sua própria demanda");
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
              <p className={styles.productTitle}>{empresa}</p>
            </div>

            <div className={styles.imageContainer}>
              <img
                src={imagemdemanda}
                className={styles.productImage}
                loading="lazy"
                alt={`Demanda de ${variedade}`}
              />
            </div>
          </div>

          <div className={styles.demandaContent}>
            <div className={styles.infoBox}>
              <h2>Detalhes da Demanda</h2>

              <div className={styles.infoGrid}>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Preço máximo:</span>
                  <span className={styles.infoValue}>R$ {preco}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Quantidade:</span>
                  <span className={styles.infoValue}>{quantidade} kg</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Data de entrega:</span>
                  <span className={styles.infoValue}>{new Date(dataEntrega).toLocaleDateString('pt-BR')}</span>
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
              disabled={loading || isPropriaEmpresa()}
            >
              {loading ? "Enviando..." : "Iniciar Negociação"}
            </button>
            {isPropriaEmpresa() && (
              <div className={styles.avisoPropriaEmpresa}>
                Esta é sua própria demanda
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
                    <p>Deseja iniciar uma negociação com {empresa}?</p>
                    <div className={styles.produtoInfo}>
                      <p><strong>Produto:</strong> {variedade}</p>
                      <p><strong>Quantidade:</strong> {quantidade} kg</p>
                      <p><strong>Preço Máximo:</strong> R$ {preco}</p>
                      <p><strong>Data de Entrega:</strong> {new Date(dataEntrega).toLocaleDateString('pt-BR')}</p>
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
                    <p>Sua solicitação de negociação foi enviada para {empresa}.</p>
                    <p>Você será notificado quando eles aceitarem.</p>
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
                    <p>Parabéns! Sua negociação com {empresa} foi concluída com sucesso.</p>
                    <p>Você pode acompanhar o andamento na sua área de negociações.</p>
                    <div className={styles.modalActions}>
                  
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