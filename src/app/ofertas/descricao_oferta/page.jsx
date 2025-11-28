"use client";
import React, { useState } from "react";
import styles from "./descoferta.module.css";
import BarraNvg from "@/components/navbar/navbar";
import api from "@/services/api";

export default function OfertaDescricao({ oferta }) {
  const [showConfirmacao, setShowConfirmacao] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState({ texto: "", tipo: "" });

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

  console.log(oferta);

  const agricultor = oferta.agri_nome;
  const variedade = oferta.amen_variedade;
  const quantidade = oferta.oferta_quantidade;
  const preco = oferta.oferta_preco;
  const informacoes = oferta.oferta_outras_informacoes;
  const dataColheita = oferta.oferta_data_colheita;
  const data_publicacao = oferta.oferta_data_publicacao; 
  const imagemOferta = oferta.oferta_img;

  const confirmarProposta = async () => {
    setLoading(true);
    setMensagem({ texto: "", tipo: "" });

    try {
      // Buscar usuário logado (empresa)
      const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
      
      if (!usuarioLogado?.emp_id) {
        setMensagem({ 
          texto: "Apenas empresas podem enviar propostas", 
          tipo: "erro" 
        });
        setLoading(false);
        return;
      }

      const propostaData = {
        emp_id: usuarioLogado.emp_id,
        preco: parseFloat(preco), // Usa o preço da oferta
        quantidade: parseFloat(quantidade), // Usa a quantidade da oferta
        data_envio: new Date().toISOString().split('T')[0],
        status: "pendente"
      };

      console.log("Enviando proposta:", propostaData);

      const response = await api.post('/propostas', propostaData);

      if (response.data.sucesso) {
        setMensagem({ 
          texto: "Proposta enviada com sucesso!", 
          tipo: "sucesso" 
        });
        setShowConfirmacao(false);
        
        // Opcional: Redirecionar após sucesso
        setTimeout(() => {
          window.location.href = '/ofertas';
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
                  <span className={styles.infoValue}>
                    {new Date(dataColheita).toLocaleDateString('pt-BR')}
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
              enviar proposta
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
                <span className={styles.infoLabel}>Agricultor:</span>
                <span className={styles.infoValue}>{agricultor}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Variedade:</span>
                <span className={styles.infoValue}>{variedade}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Preço:</span>
                <span className={styles.infoValue}>R$ {preco}</span>
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