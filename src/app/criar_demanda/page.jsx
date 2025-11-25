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

  // Dados do formulário
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

  // -----------------------------------------------------------------------------------------
  // 🔥 Carrega usuário + tipos de amendoim ao abrir a página
  // -----------------------------------------------------------------------------------------
  useEffect(() => {
    carregarUsuario();
    buscarTiposAmendoim();
  }, []);

  // -----------------------------------------------------------------------------------------
  // 🔥 Carregar empresa do usuário logado
  // -----------------------------------------------------------------------------------------
  const carregarUsuario = () => {
    try {
      const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

      console.log("Usuário logado:", usuario);

      if (usuario?.emp_id) {
        setFormData((prev) => ({ ...prev, emp_id: usuario.emp_id }));
      } else {
        setError("Não foi possível identificar sua empresa. Faça login novamente.");
      }
    } catch {
      setError("Erro ao carregar dados do usuário.");
    }
  };

  // -----------------------------------------------------------------------------------------
  // 🔥 Buscar tipos de amendoim no back-end
  // -----------------------------------------------------------------------------------------
  const buscarTiposAmendoim = async () => {
    try {
      const response = await api.get("/Amendoins");

      console.log("Tipos de amendoim carregados:", response.data);

      if (response.data.sucesso) {
        setTiposAmendoim(response.data.dados);
      }
    } catch (error) {
      console.error("Erro ao buscar tipos de amendoim:", error);
    }
  };

  // -----------------------------------------------------------------------------------------
  // 🔥 Quando usuário seleciona imagem
  // -----------------------------------------------------------------------------------------
  const handleImageChange = ({ target: { files } }) => {
    if (files && files[0]) {
      setSelectedImage(URL.createObjectURL(files[0]));
      setIsImageInputLarge(false);
      setError("");
      setFormData((prev) => ({
        ...prev,
        imagem: files[0],
      }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // -----------------------------------------------------------------------------------------
  // 🔥 ENVIAR FORMULÁRIO PARA O BACKEND
  // -----------------------------------------------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Validação básica
      if (!formData.emp_id) {
        setError("Erro: empresa do usuário não identificada.");
        setLoading(false);
        return;
      }

      if (!formData.amen_id || !formData.quantidade || !formData.preco_maximo || !formData.data_entrega) {
        setError("Preencha todos os campos obrigatórios!");
        setLoading(false);
        return;
      }

      // Criar FormData para envio
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null) {
          formDataToSend.append(key, formData[key]);
        }
      });

      const response = await api.post("/Demandas", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const resultado = response.data;

      if (resultado.sucesso) {
        setShowSuccess(true);

        setTimeout(() => {
          router.push("/demandas");
        }, 2000);
      } else {
        setError(resultado.mensagem || "Erro ao criar demanda");
      }
    } catch (error) {
      console.error("Erro ao criar demanda:", error);
      setError("Erro ao conectar com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------------------------------------------------------------------
  // 🔥 HTML
  // -----------------------------------------------------------------------------------------
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
            <div className={`${styles.imageInput} ${isImageInputLarge ? styles.imageInputLarge : ""}`}>
              <label htmlFor="imageUpload">
                <FaImage size={isImageInputLarge ? 100 : 30} />
              </label>
              <p>clique para adicionar a imagem</p>

              <input
                type="file"
                id="imageUpload"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />

              {selectedImage && <img src={selectedImage} alt="Imagem selecionada" />}
            </div>

            <div className={styles.formFields}>
              <div className={styles.formGroup}>
                <label htmlFor="amen_id">Tipo de amendoim *</label>
                <select id="amen_id" name="amen_id" value={formData.amen_id} onChange={handleInputChange} required>
                  <option value="">Selecione o tipo de amendoim</option>

                  {tiposAmendoim.map((amendoim) => (
                    <option key={amendoim.amen_id} value={amendoim.amen_id}>
                      {amendoim.amen_variedade} {amendoim.amen_tamanho && `- ${amendoim.amen_tamanho}`}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="quantidade">Quantidade em Kilos</label>
                <input
                  type="number"
                  id="quantidade"
                  name="quantidade"
                  value={formData.quantidade}
                  onChange={handleInputChange}
                  placeholder="Ex: 100"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="preco_maximo">Preço máximo por kilos(R$) *</label>
                <input
                  type="number"
                  id="preco_maximo"
                  name="preco_maximo"
                  value={formData.preco_maximo}
                  onChange={handleInputChange}
                  placeholder="Ex: 200.00"
                  step="0.01"
                  min="0"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="data_entrega">Para o prazo de até</label>
                <input
                  type="date"
                  id="data_entrega"
                  name="data_entrega"
                  value={formData.data_entrega}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="informacoes">Informações adicionais</label>
                <textarea
                  id="informacoes"
                  name="informacoes"
                  value={formData.informacoes}
                  onChange={handleInputChange}
                  placeholder="Detalhes sobre a demanda, condições especiais, etc."
                  rows="3"
                />
              </div>
            </div>

            <button type="submit" className={styles.criarOferta} disabled={loading}>
              {loading ? "Criando Demanda..." : "Criar Demanda"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
