"use client";

import React, { useState, useEffect } from "react";
import styles from "./criar_demanda.module.css";
import { FaImage, FaCheckCircle } from "react-icons/fa";
import BarraNvg from "@/components/navbar/navbar";
import { useRouter } from "next/navigation";
import api from "@/services/api";

export default function CriarDemanda() {
  const router = useRouter();

  const [selectedImage, setSelectedImage] = useState(null);
  const [isImageInputLarge, setIsImageInputLarge] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [tiposAmendoim, setTiposAmendoim] = useState([]);

  // -----------------------------
  // 🔥 FORM DATA
  // -----------------------------
  const [formData, setFormData] = useState({
    emp_id: "",
    amen_id: "",
    quantidade: "",
    preco_maximo: "",
    data_entrega: "",
    informacoes: "",
    data_publi: new Date().toISOString().split("T")[0],
    ativa: 1,
    imagem: null,
  });

  // -----------------------------
  // 🔥 CARREGAR USUÁRIO
  // -----------------------------
  useEffect(() => {
    try {
      const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

      if (usuario?.emp_id) {
        setFormData((prev) => ({
          ...prev,
          emp_id: usuario.emp_id,
        }));
      } else {
        setError("Não foi possível identificar sua empresa. Faça login novamente.");
      }
    } catch (e) {
      setError("Erro ao carregar usuário.");
    }

    buscarTiposAmendoim();
  }, []);

  // -----------------------------
  // 🔥 BUSCAR TIPOS DE AMENDOIM
  // -----------------------------
  const buscarTiposAmendoim = async () => {
    try {
      const response = await api.get("/Amendoins");

      if (response.data.sucesso) {
        setTiposAmendoim(response.data.dados);
      }
    } catch (error) {
      console.error("Erro ao carregar amendoins:", error);
    }
  };

  // -----------------------------
  // 🔥 HANDLER IMAGEM
  // -----------------------------
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setIsImageInputLarge(false);

      setFormData((prev) => ({
        ...prev,
        imagem: file,
      }));
    }
  };

  // -----------------------------
  // 🔥 INPUT CHANGE
  // -----------------------------
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // -----------------------------
  // 🔥 SUBMIT FORM CORRIGIDO
  // -----------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // validações
      if (!formData.emp_id) {
        setError("Erro: empresa não identificada. Faça login.");
        setLoading(false);
        return;
      }
      if (!formData.amen_id || !formData.quantidade || !formData.preco_maximo || !formData.data_entrega) {
        setError("Preencha todos os campos obrigatórios.");
        setLoading(false);
        return;
      }

      // monta FormData CORRETAMENTE
      const fd = new FormData();

      // Adiciona campos individuais de forma explícita
      fd.append('emp_id', formData.emp_id);
      fd.append('amen_id', formData.amen_id);
      fd.append('quantidade', formData.quantidade);
      fd.append('preco_maximo', formData.preco_maximo);
      fd.append('data_entrega', formData.data_entrega);
      fd.append('informacoes', formData.informacoes || '');
      fd.append('data_publi', formData.data_publi);
      fd.append('ativa', formData.ativa);

      // Adiciona arquivo se existir
      if (formData.imagem) {
        fd.append('imagem', formData.imagem);
      }

      // DEBUG: Verifique o que está sendo enviado
      console.log('📤 Enviando FormData:');
      for (let [key, value] of fd.entries()) {
        console.log(`${key}:`, value);
      }

      // 🔥 CORREÇÃO: Envia SEM headers (o axios vai configurar automaticamente)
      const response = await api.post("/Demandas", fd);
      // ⚠️ REMOVIDO: headers: { "Content-Type": "multipart/form-data" }

      if (response.data.sucesso) {
        setShowSuccess(true);
        setTimeout(() => router.push("/Demandas"), 1500);
      } else {
        setError(response.data.mensagem || "Erro ao criar demanda.");
      }
    } catch (err) {
      console.error("❌ Erro ao criar demanda:", err);
      
      // Mensagem de erro mais específica
      if (err.response?.data?.mensagem) {
        setError(err.response.data.mensagem);
      } else if (err.code === 'ECONNABORTED') {
        setError("Tempo de conexão esgotado. Tente novamente.");
      } else if (err.message?.includes('Network Error')) {
        setError("Erro de conexão. Verifique se o servidor está rodando.");
      } else {
        setError("Erro interno ao criar demanda.");
      }
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // 🔥 HTML
  // -----------------------------
  return (
    <>
      <BarraNvg />

      {showSuccess && (
        <div className={styles.successOverlay}>
          <div className={styles.successMessage}>
            <FaCheckCircle className={styles.successIcon} />
            <p>Demanda criada com sucesso!</p>
          </div>
        </div>
      )}

      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.textcriar}>
            <h2>Criar Demanda</h2>
          </div>

          {error && <div className={`${styles.feedback} ${styles.erro}`}>{error}</div>}

          <form className={styles.formContent} onSubmit={handleSubmit}>
            {/* IMAGEM */}
            <div className={`${styles.imageInput} ${isImageInputLarge ? styles.imageInputLarge : ""}`}>
              <label htmlFor="imageUpload">
                <FaImage size={isImageInputLarge ? 100 : 30} />
              </label>
              <p>Clique para adicionar a imagem</p>

              <input
                type="file"
                id="imageUpload"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />

              {selectedImage && <img src={selectedImage} alt="Imagem selecionada" />}
            </div>

            {/* CAMPOS */}
            <div className={styles.formFields}>
              <div className={styles.formGroup}>
                <label htmlFor="amen_id">Tipo de amendoim *</label>
                <select id="amen_id" name="amen_id" value={formData.amen_id} onChange={handleInputChange} required>
                  <option value="">Selecione o tipo</option>

                  {tiposAmendoim.map((am) => (
                    <option key={am.amen_id} value={am.amen_id}>
                      {am.amen_variedade} {am.amen_tamanho && `- ${am.amen_tamanho}`}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>Quantidade em Kg *</label>
                <input
                  type="number"
                  name="quantidade"
                  value={formData.quantidade}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Preço máximo por Kg (R$) *</label>
                <input
                  type="number"
                  name="preco_maximo"
                  value={formData.preco_maximo}
                  onChange={handleInputChange}
                  step="0.01"
                  min="0"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Prazo máximo *</label>
                <input
                  type="date"
                  name="data_entrega"
                  value={formData.data_entrega}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Informações adicionais</label>
                <textarea
                  name="informacoes"
                  value={formData.informacoes}
                  onChange={handleInputChange}
                  rows="3"
                />
              </div>
            </div>

            <button type="submit" className={styles.criarOferta} disabled={loading}>
              {loading ? "Criando..." : "Criar Demanda"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}