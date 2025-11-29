"use client";
import React, { useState, useEffect } from "react";
import styles from "./proposta.module.css";
import BarraNvg from "@/components/navbar/navbar";
import { useRouter, useSearchParams } from "next/navigation";
import api from "@/services/api";

export default function Proposta() {
  const [formData, setFormData] = useState({
    prop_preco: "",
    prop_quantidade: "",
    prop_data_envio: new Date().toISOString().split('T')[0],
    prop_status: "pendente"
  });
  const [loading, setLoading] = useState(false);
  const [oferta, setOferta] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const ofertaId = searchParams.get('oferta_id');

  useEffect(() => {
    if (ofertaId) {
      carregarOferta(ofertaId);
    }
  }, [ofertaId]);

  const carregarOferta = async (id) => {
    try {
      const response = await api.get(`/ofertas/${id}`);
      if (response.data.sucesso) {
        setOferta(response.data.dados);
        setFormData(prev => ({
          ...prev,
          prop_quantidade: response.data.dados.oferta_quantidade || ""
        }));
      } else {
        setError("Erro ao carregar dados da oferta");
      }
    } catch (error) {
      console.error("Erro ao carregar oferta:", error);
      setError("Erro ao carregar dados da oferta");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
      
      if (!usuarioLogado?.emp_id) {
        setError("Apenas empresas podem enviar propostas");
        setLoading(false);
        return;
      }

      const propostaData = {
        emp_id: usuarioLogado.emp_id,
        preco: parseFloat(formData.prop_preco),
        quantidade: parseFloat(formData.prop_quantidade),
        data_envio: formData.prop_data_envio,
        status: formData.prop_status
      };

      const response = await api.post('/propostas', propostaData);

      if (response.data.sucesso) {
        setSuccess("Proposta enviada com sucesso!");
        
        setTimeout(() => {
          router.push('/ofertas');
        }, 2000);
      } else {
        setError(response.data.mensagem || "Erro ao enviar proposta");
      }

    } catch (error) {
      console.error("Erro ao enviar proposta:", error);
      setError("Erro ao enviar proposta. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <BarraNvg />

      <div className={styles.container}>
        <div className={styles.caract_off}>
          <h2 className={styles.titulo}>Enviar Proposta</h2>

          {/* Informações da Oferta */}
          {oferta && (
            <div className={styles.ofertaInfo}>
              <h3 className={styles.subtitulo}>Oferta Selecionada</h3>
              <div className={styles.infoGroup}>
                <label>Agricultor</label>
                <p className={styles.infoValue}>{oferta.agri_nome}</p>
              </div>
              <div className={styles.infoGroup}>
                <label>Variedade</label>
                <p className={styles.infoValue}>{oferta.amen_variedade}</p>
              </div>
              <div className={styles.infoGroup}>
                <label>Quantidade Disponível</label>
                <p className={styles.infoValue}>{oferta.oferta_quantidade} kg</p>
              </div>
              <div className={styles.infoGroup}>
                <label>Data de Colheita</label>
                <p className={styles.infoValue}>
                  {new Date(oferta.oferta_data_colheita).toLocaleDateString('pt-BR')}
                </p>
              </div>
            </div>
          )}

          {/* Formulário de Proposta */}
          <form onSubmit={handleSubmit} className={styles.propostaForm}>
            <div className={styles.formGroup}>
              <label htmlFor="prop_preco" className={styles.formLabel}>
                Preço Proposto (R$)
              </label>
              <input
                type="number"
                id="prop_preco"
                name="prop_preco"
                value={formData.prop_preco}
                onChange={handleInputChange}
                className={styles.formInput}
                placeholder="Ex: 150.00"
                step="0.01"
                min="0"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="prop_quantidade" className={styles.formLabel}>
                Quantidade Desejada (kg)
              </label>
              <input
                type="number"
                id="prop_quantidade"
                name="prop_quantidade"
                value={formData.prop_quantidade}
                onChange={handleInputChange}
                className={styles.formInput}
                placeholder="Ex: 1000"
                min="0"
                required
              />
              {oferta && formData.prop_quantidade > oferta.oferta_quantidade && (
                <span className={styles.warning}>
                  Atenção: Quantidade maior que a disponível
                </span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="prop_data_envio" className={styles.formLabel}>
                Data da Proposta
              </label>
              <input
                type="date"
                id="prop_data_envio"
                name="prop_data_envio"
                value={formData.prop_data_envio}
                onChange={handleInputChange}
                className={styles.formInput}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="observacoes" className={styles.formLabel}>
                Observações (Opcional)
              </label>
              <textarea
                id="observacoes"
                name="observacoes"
                className={styles.formTextarea}
                placeholder="Adicione observações sobre sua proposta..."
                rows="4"
              />
            </div>

            {error && (
              <div className={styles.errorMessage}>
                {error}
              </div>
            )}

            {success && (
              <div className={styles.successMessage}>
                {success}
              </div>
            )}

            <div className={styles.actionButtons}>
              <button
                type="button"
                onClick={() => router.back()}
                className={styles.cancelButton}
                disabled={loading}
              >
                Cancelar
              </button>
              
              <button
                type="submit"
                className={styles.submitButton}
                disabled={loading}
              >
                {loading ? "Enviando..." : "Enviar Proposta"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}