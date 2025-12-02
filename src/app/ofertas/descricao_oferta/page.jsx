// src/components/OfertaDescricao.jsx
"use client";
import React, { useState, useEffect } from "react";
import styles from "./descoferta.module.css";
import BarraNvg from "@/components/navbar/navbar";
import api from "@/services/api";
import { useRouter } from 'next/navigation';

export default function OfertaDescricao({ oferta }) {
  const [showConfirmacao, setShowConfirmacao] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [etapa, setEtapa] = useState(1);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const carregarUsuario = () => {
      try {
        const usuarioJSON = localStorage.getItem('usuarioLogado');
        if (usuarioJSON) {
          const usuario = JSON.parse(usuarioJSON);
          setUsuarioLogado(usuario);
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

  // Verificar se a oferta é do próprio agricultor logado
  const isProprioAgricultor = () => {
    if (!usuarioLogado) return false;
    return usuarioLogado.tipo === 2 && usuarioLogado.agri_id === oferta.agri_id;
  };

  // Verificar se o usuário é empresa (tipo 3)
  const isEmpresa = () => {
    return usuarioLogado && usuarioLogado.tipo === 3;
  };

  // Função para iniciar negociação (para empresas)
  const iniciarNegociacao = async () => {
    setLoading(true);
    
    try {
      if (!usuarioLogado) {
        setMensagem("Faça login para iniciar uma negociação");
        setLoading(false);
        return;
      }

      if (!isEmpresa()) {
        setMensagem("Apenas empresas podem iniciar negociações com ofertas");
        setLoading(false);
        return;
      }

      if (!usuarioLogado.emp_id) {
        setMensagem("Empresa não identificada. Faça login novamente");
        setLoading(false);
        return;
      }

      if (!oferta || !oferta.oferta_id) {
        setMensagem("Oferta não encontrada");
        setLoading(false);
        return;
      }

      // Chamada CORRETA para sua API de negociações
      const response = await api.post('/negociacoes/iniciar-oferta', {
        oferta_id: oferta.oferta_id,
        emp_id: usuarioLogado.emp_id
      });

      if (response.data.sucesso) {
        setEtapa(2);
        setMensagem("Negociação enviada! Aguardando confirmação do agricultor.");
        
        setTimeout(() => {
          setEtapa(3);
          setMensagem("Negociação finalizada com sucesso!");
        }, 3000);
      } else {
        setMensagem(response.data.mensagem || "Não foi possível iniciar a negociação");
      }

    } catch (error) {
      console.error('Erro ao iniciar negociação:', error);
      
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

  // ✅ FUNÇÃO CORRIGIDA para editar oferta
  const handleEditarOferta = () => {
    if (!oferta || !oferta.oferta_id) return;
    // Redirecionar para página de edição da oferta
    router.push(`/oferta/${oferta.oferta_id}/editar`);
  };

  // ✅ FUNÇÃO CORRIGIDA para excluir oferta
// Função para excluir oferta (para agricultor dono)
const handleExcluirOferta = async () => {
  setDeleting(true);
  console.log("🗑️ Tentando excluir oferta ID:", oferta.oferta_id);
  
  try {
    // Adiciona timeout para não travar
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 segundos
    
    const response = await api.delete(`/ofertas/${oferta.oferta_id}`, {
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    console.log("✅ Resposta do servidor:", response.data);
    
    if (response.data.sucesso) {
      setMensagem("✅ Oferta excluída com sucesso!");
      
      // Redirecionar após 2 segundos
      setTimeout(() => {
        router.push('/minhas_ofertas'); // Use a rota correta aqui
      }, 2000);
    } else {
      setMensagem(`❌ ${response.data.mensagem || "Erro ao excluir oferta"}`);
    }
  } catch (error) {
    console.error('❌ Erro completo:', error);
    
    // Log detalhado
    if (error.response) {
      console.error('📊 Dados do erro:', error.response.data);
      console.error('🔢 Status:', error.response.status);
      console.error('📋 Headers:', error.response.headers);
      
      if (error.response.status === 404) {
        setMensagem("❌ Oferta não encontrada no servidor");
      } else if (error.response.status === 500) {
        setMensagem("❌ Erro interno no servidor. Verifique o terminal do backend.");
      } else {
        setMensagem(`❌ Erro ${error.response.status}: ${error.response.data?.mensagem || "Erro desconhecido"}`);
      }
    } else if (error.request) {
      console.error('🌐 Erro de rede - Request:', error.request);
      setMensagem("❌ Sem resposta do servidor. Verifique se o backend está rodando.");
    } else if (error.name === 'AbortError') {
      setMensagem("❌ A requisição demorou muito. Tente novamente.");
    } else {
      console.error('⚙️ Erro de configuração:', error.message);
      setMensagem(`❌ Erro: ${error.message}`);
    }
  } finally {
    setDeleting(false);
    setShowDeleteModal(false);
  }
};

  const handleIniciarNegociacao = () => {
    if (!usuarioLogado) {
      setMensagem("Faça login para iniciar uma negociação");
      return;
    }

    if (isProprioAgricultor()) {
      setMensagem("Você não pode negociar com sua própria oferta");
      return;
    }

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

  // ✅ CORREÇÃO: Adicionando o badge "Minha Oferta"
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
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Status:</span>
                  <span className={styles.infoValue}>
                    {oferta.oferta_ativa ? "Ativa" : "Inativa"}
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

          {/* Botões condicionais - ✅ CORRIGIDO */}
          <div className={styles.actionButtons}>
            {isProprioAgricultor() ? (
              // Botões para o dono da oferta (agricultor)
              <div className={styles.acoesProprietario}>
              
                <button 
                  onClick={() => setShowDeleteModal(true)}
                  className={styles.excluirButton}
                  disabled={deleting}
                >
                  {deleting ? "🗑️ Excluindo..." : " Excluir Oferta"}
                </button>
              </div>
            ) : (
              // Botão para empresas negociarem
              <>
                <button 
                  onClick={handleIniciarNegociacao}
                  className={styles.primaryButton}
                  disabled={loading || !isEmpresa()}
                >
                  {loading ? "⏳ Enviando..." : "🤝 Iniciar Negociação"}
                </button>
                
                {!usuarioLogado && (
                  <div className={styles.avisoLogin}>
                    🔒 Faça login como empresa para negociar
                  </div>
                )}
                
                {usuarioLogado && !isEmpresa() && (
                  <div className={styles.avisoTipoUsuario}>
                    🏢 Apenas empresas podem negociar com ofertas
                  </div>
                )}
              </>
            )}
            
           
          </div>
        </div>
      </div>

      {/* Modal de Negociação - permanece igual */}
      {showConfirmacao && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>Processo de Negociação</h2>
              <button onClick={handleFechar} className={styles.closeButton}>×</button>
            </div>

            <div className={styles.etapasContainer}>
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

              {mensagem && (
                <div className={mensagem.includes("sucesso") ? styles.mensagemSucesso : styles.mensagemErro}>
                  {mensagem}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmação de Exclusão */}
      {showDeleteModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>Confirmar Exclusão</h2>
              <button 
                onClick={() => setShowDeleteModal(false)}
                className={styles.closeButton}
                disabled={deleting}
              >
                ×
              </button>
            </div>
            
            <div className={styles.modalBody}>
              <p>Tem certeza que deseja excluir esta oferta?</p>
              <div className={styles.ofertaInfo}>
                <p><strong>Produto:</strong> {variedade}</p>
                <p><strong>Quantidade:</strong> {quantidade} kg</p>
                <p><strong>Preço:</strong> R$ {preco}</p>
              </div>
              <p className={styles.warningText}>
                ⚠️ Esta ação não pode ser desfeita.
              </p>
            </div>
            
            <div className={styles.modalActions}>
              <button 
                onClick={handleExcluirOferta}
                className={styles.confirmButton}
                disabled={deleting}
              >
                {deleting ? "Excluindo..." : "Sim, Excluir"}
              </button>
              <button 
                onClick={() => setShowDeleteModal(false)}
                className={styles.cancelButton}
                disabled={deleting}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}