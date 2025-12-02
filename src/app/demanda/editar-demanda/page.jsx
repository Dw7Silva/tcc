// app/editar_demanda/[id]/page.jsx
"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from 'next/navigation';
import styles from "./editardemanda.module.css";
import BarraNvg from "@/components/navbar/navbar";
import api from "@/services/api";

export default function EditarDemandaPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [demanda, setDemanda] = useState(null);
  const [formData, setFormData] = useState({
    quantidade: '',
    preco_maximo: '',
    data_entrega: '',
    informacoes: '',
    ativa: '1'
  });

  useEffect(() => {
    carregarUsuarioEDemanda();
  }, [params.id]);

  const carregarUsuarioEDemanda = async () => {
    try {
      // Carregar usuário
      const usuarioJSON = localStorage.getItem('usuarioLogado');
      if (usuarioJSON) {
        const usuario = JSON.parse(usuarioJSON);
        setUsuarioLogado(usuario);
      }

      // Carregar demanda
      setLoading(true);
      const response = await api.get(`/demandas`);
      
      if (response.data.sucesso) {
        const demandaEncontrada = response.data.dados.find(
          d => d.demanda_id === parseInt(params.id)
        );
        
        if (demandaEncontrada) {
          setDemanda(demandaEncontrada);
          setFormData({
            quantidade: demandaEncontrada.demanda_quantidade,
            preco_maximo: demandaEncontrada.demanda_preco_maximo,
            data_entrega: new Date(demandaEncontrada.demanda_data_entrega).toISOString().split('T')[0],
            informacoes: demandaEncontrada.demanda_outras_informacoes || '',
            ativa: demandaEncontrada.demanda_ativa ? '1' : '0'
          });
        } else {
          setMensagem("Demanda não encontrada");
        }
      }
    } catch (error) {
      console.error("Erro ao carregar:", error);
      setMensagem("Erro ao carregar dados da demanda");
    } finally {
      setLoading(false);
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
    setSaving(true);
    setMensagem("");

    try {
      // Verificar se o usuário é o dono da demanda
      if (!usuarioLogado || usuarioLogado.emp_id !== demanda.emp_id) {
        setMensagem("Você não tem permissão para editar esta demanda");
        setSaving(false);
        return;
      }

      // Preparar dados para envio
      const dadosAtualizacao = {
        quantidade: formData.quantidade,
        preco_maximo: formData.preco_maximo,
        data_entrega: formData.data_entrega,
        informacoes: formData.informacoes,
        ativa: formData.ativa
      };

      console.log("Enviando dados para atualização:", dadosAtualizacao);
      
      const response = await api.put(`/demandas/${params.id}`, dadosAtualizacao);
      
      console.log("Resposta da API:", response.data);
      
      if (response.data.sucesso) {
        setMensagem("Demanda atualizada com sucesso!");
        // Redirecionar após 2 segundos
        setTimeout(() => {
          router.push(`/demanda/${params.id}`);
        }, 2000);
      } else {
        setMensagem(response.data.mensagem || "Erro ao atualizar demanda");
      }
    } catch (error) {
      console.error("Erro ao atualizar:", error);
      if (error.response) {
        console.error("Detalhes do erro:", error.response.data);
        setMensagem(`Erro: ${error.response.data.mensagem || "Tente novamente."}`);
      } else {
        setMensagem("Erro de conexão. Verifique sua internet.");
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <>
        <BarraNvg />
        <div className={styles.container}>
          <div className={styles.content}>
            <h2>Carregando...</h2>
          </div>
        </div>
      </>
    );
  }

  if (!demanda) {
    return (
      <>
        <BarraNvg />
        <div className={styles.container}>
          <div className={styles.content}>
            <h2>Demanda não encontrada</h2>
            <button onClick={() => router.push('/minhas-demandas')} className={styles.backButton}>
              Voltar para minhas demandas
            </button>
          </div>
        </div>
      </>
    );
  }

  // Verificar se o usuário é o dono
  if (usuarioLogado?.emp_id !== demanda.emp_id) {
    return (
      <>
        <BarraNvg />
        <div className={styles.container}>
          <div className={styles.content}>
            <h2>Acesso Negado</h2>
            <p>Você não tem permissão para editar esta demanda.</p>
            <button onClick={() => router.push(`/demanda/${params.id}`)} className={styles.backButton}>
              Voltar para visualização
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <BarraNvg />
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.header}>
            <h2>Editar Demanda</h2>
            <button 
              onClick={() => router.push(`/demanda/${params.id}`)}
              className={styles.backButton}
            >
              ← Voltar
            </button>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label>Empresa</label>
              <input 
                type="text" 
                value={demanda.emp_nome_fantasia}
                disabled
                className={styles.disabledInput}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Produto</label>
              <input 
                type="text" 
                value={demanda.amen_variedade}
                disabled
                className={styles.disabledInput}
              />
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Quantidade (kg) *</label>
                <input
                  type="number"
                  name="quantidade"
                  value={formData.quantidade}
                  onChange={handleInputChange}
                  required
                  min="0"
                  step="0.01"
                />
              </div>

              <div className={styles.formGroup}>
                <label>Preço Máximo (R$) *</label>
                <input
                  type="number"
                  name="preco_maximo"
                  value={formData.preco_maximo}
                  onChange={handleInputChange}
                  required
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>Data de Entrega *</label>
              <input
                type="date"
                name="data_entrega"
                value={formData.data_entrega}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Status</label>
              <div className={styles.radioGroup}>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="ativa"
                    value="1"
                    checked={formData.ativa === '1'}
                    onChange={handleInputChange}
                    className={styles.radioInput}
                  />
                  <span>Ativa</span>
                </label>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="ativa"
                    value="0"
                    checked={formData.ativa === '0'}
                    onChange={handleInputChange}
                    className={styles.radioInput}
                  />
                  <span>Inativa</span>
                </label>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>Observações</label>
              <textarea
                name="informacoes"
                value={formData.informacoes}
                onChange={handleInputChange}
                rows="4"
                placeholder="Informações adicionais sobre a demanda..."
                className={styles.textarea}
              />
            </div>

            {mensagem && (
              <div className={mensagem.includes("sucesso") ? styles.successMessage : styles.errorMessage}>
                {mensagem}
              </div>
            )}

            <div className={styles.formActions}>
              <button 
                type="submit" 
                className={styles.saveButton}
                disabled={saving}
              >
                {saving ? "Salvando..." : "Salvar Alterações"}
              </button>
              <button 
                type="button" 
                onClick={() => router.push(`/demanda/${params.id}`)}
                className={styles.cancelButton}
                disabled={saving}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}