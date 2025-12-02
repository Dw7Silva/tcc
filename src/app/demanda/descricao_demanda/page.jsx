// src/components/DemandaDescricao.jsx
"use client";
import React, { useState, useEffect } from "react";
import styles from './descdemanda.module.css';
import BarraNvg from "@/components/navbar/navbar";
import api from "@/services/api";
import { useRouter } from 'next/navigation';

export default function DemandaDescricao({ demanda }) {
  const [showConfirmacao, setShowConfirmacao] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [etapa, setEtapa] = useState(1); // 1=Enviar, 2=Aguardando, 3=Finalizada
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const router = useRouter();

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
  const isPropriaDemanda = () => {
    if (!usuarioLogado) return false;
    return usuarioLogado.tipo === 3 && usuarioLogado.emp_id === demanda.emp_id;
  };

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

  const handleEditarDemanda = () => {
  // A rota agora é: /demanda/[id]/editar
  router.push(`/demanda/${demanda.demanda_id}/editar`);
};
  const handleExcluirDemanda = async () => {
    setDeleting(true);
    try {
      const response = await api.delete(`/demandas/${demanda.demanda_id}`);
      
      if (response.data.sucesso) {
        setMensagem("Demanda excluída com sucesso!");
        // Redirecionar para a lista de demandas após 2 segundos
        setTimeout(() => {
          router.push('/minhas_demandas');
        }, 2000);
      } else {
        setMensagem(response.data.mensagem || "Erro ao excluir demanda");
      }
    } catch (error) {
      console.error('Erro ao excluir demanda:', error);
      setMensagem("Erro ao excluir demanda. Tente novamente.");
    } finally {
      setDeleting(false);
      setShowDeleteModal(false);
    }
  };

  const handleIniciarNegociacao = () => {
    // Verificar se é a própria empresa antes de abrir o modal
    if (isPropriaDemanda()) {
      setMensagem("Você não pode negociar com sua própria demanda");
      return;
    }
    
    // Verificar se está logado como agricultor
    if (!usuarioLogado || usuarioLogado.tipo !== 2) {
      setMensagem("Apenas agricultores podem negociar com demandas");
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
                onError={(e) => {
                  e.target.src = "/imagens/default-produto.jpg";
                }}
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
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Status:</span>
                  <span className={styles.infoValue}>
                    {demanda.demanda_ativa ? "Ativa" : "Inativa"}
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

          {/* Botões condicionais */}
          <div className={styles.actionButtons}>
            {isPropriaDemanda() ? (
              // Botões para o dono da demanda
              <div className={styles.acoesProprietario}>
                
                <button 
                  onClick={() => setShowDeleteModal(true)}
                  className={styles.excluirButton}
                  disabled={deleting}
                >
                  {deleting ? "Excluindo..." : "Excluir Demanda"}
                </button>
              </div>
            ) : (
              // Botão para outros usuários (agricultores)
              <>
                <button 
                  onClick={handleIniciarNegociacao}
                  className={styles.primaryButton}
                  disabled={loading || !usuarioLogado || usuarioLogado.tipo !== 2}
                >
                  {loading ? "Enviando..." : "Iniciar Negociação"}
                </button>
                
                {!usuarioLogado && (
                  <div className={styles.avisoLogin}>
                    Faça login como agricultor para negociar
                  </div>
                )}
                
                {usuarioLogado && usuarioLogado.tipo !== 2 && (
                  <div className={styles.avisoTipoUsuario}>
                    Apenas agricultores podem negociar com demandas
                  </div>
                )}
              </>
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
              <p>Tem certeza que deseja excluir esta demanda?</p>
              <div className={styles.demandaInfo}>
                <p><strong>Produto:</strong> {variedade}</p>
                <p><strong>Quantidade:</strong> {quantidade} kg</p>
                <p><strong>Preço Máximo:</strong> R$ {preco}</p>
              </div>
              <p className={styles.warningText}>
                Esta ação não pode ser desfeita.
              </p>
            </div>
            
            <div className={styles.modalActions}>
              <button 
                onClick={handleExcluirDemanda}
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