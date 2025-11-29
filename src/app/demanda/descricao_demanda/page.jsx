"use client";
import React, { useState } from "react";
import styles from './descdemanda.module.css';
import BarraNvg from "@/components/navbar/navbar";
import api from "@/services/api";

export default function DemandaDescricao({ demanda }) {
  const [showConfirmacao, setShowConfirmacao] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState({ texto: "", tipo: "" });

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

  console.log(demanda); 
  
  const empresa = demanda.emp_nome_fantasia;
  const variedade = demanda.amen_variedade;
  const quantidade = demanda.demanda_quantidade;
  const precoMaximo = demanda.demanda_preco_maximo;
  const informacoes = demanda.demanda_outras_informacoes;
  const dataEntrega = demanda.demanda_data_entrega;
  const data_publicacao = demanda.demanda_data_publicacao; 
  const imagemDemanda = demanda.demanda_imagem;

  const confirmarProposta = async () => {
    setLoading(true);
    setMensagem({ texto: "", tipo: "" });

    try {
      // Buscar usuário logado (agricultor)
      const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
      
      if (!usuarioLogado?.agri_id) {
        setMensagem({ 
          texto: "Apenas agricultores podem enviar propostas para demandas", 
          tipo: "erro" 
        });
        setLoading(false);
        return;
      }

      const propostaData = {
        agri_id: usuarioLogado.agri_id,
        demanda_id: demanda.demanda_id,
        preco: parseFloat(precoMaximo), // Usa o preço máximo da demanda
        quantidade: parseFloat(quantidade), // Usa a quantidade da demanda
        data_envio: new Date().toISOString().split('T')[0],
        status: "pendente"
      };

      console.log("Enviando proposta para demanda:", propostaData);

      const response = await api.post('/propostas', propostaData);

      if (response.data.sucesso) {
        setMensagem({ 
          texto: "Proposta enviada com sucesso!", 
          tipo: "sucesso" 
        });
        setShowConfirmacao(false);
        
        // Opcional: Redirecionar após sucesso
        setTimeout(() => {
          window.location.href = '/demandas';
        }, 2000);
      } else {
        setMensagem({ 
          texto: response.data.mensagem || "Erro ao enviar proposta", 
          tipo: "erro" 
        });
      }

    } catch (error) {
      console.error("Erro ao enviar proposta:", error);
      setMensagem({ 
        texto: "Erro ao enviar proposta. Tente novamente.", 
        tipo: "erro" 
      });
    } finally {
      setLoading(false);
    }
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
                src={imagemDemanda}
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
                  <span className={styles.infoValue}>R$ {precoMaximo}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Quantidade:</span>
                  <span className={styles.infoValue}>{quantidade} kg</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Data de entrega:</span>
                  <span className={styles.infoValue}>
                    {new Date(dataEntrega).toLocaleDateString('pt-BR')}
                  </span>
                </div>
                
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Variedade:</span>
                  <span className={styles.infoValue}>{variedade}</span>
                </div>
                <div className={styles.infoRow}>
                  <span>
                    Publicado em: {new Date(data_publicacao).toLocaleDateString('pt-BR')}
                  </span>
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
              onClick={() => setShowConfirmacao(true)}
              className={styles.secondaryButton}
            >
              Enviar proposta
            </button>
          </div>
        </div>
      </div>

      {/* MODAL DE CONFIRMAÇÃO */}
      {showConfirmacao && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Confirmar Proposta</h3>
            
            <div className={styles.propostaInfo}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Empresa:</span>
                <span className={styles.infoValue}>{empresa}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Variedade:</span>
                <span className={styles.infoValue}>{variedade}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Preço máximo:</span>
                <span className={styles.infoValue}>R$ {precoMaximo}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Quantidade:</span>
                <span className={styles.infoValue}>{quantidade} kg</span>
              </div>
            </div>

            {mensagem.texto && (
              <div className={`${styles.mensagem} ${styles[mensagem.tipo]}`}>
                {mensagem.texto}
              </div>
            )}

            <div className={styles.modalActions}>
              <button 
                onClick={() => setShowConfirmacao(false)}
                className={styles.cancelButton}
                disabled={loading}
              >
                Cancelar
              </button>
              
              <button 
                onClick={confirmarProposta}
                className={styles.confirmButton}
                disabled={loading}
              >
                {loading ? "Enviando..." : "Confirmar Proposta"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}