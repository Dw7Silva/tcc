"use client";

import React, { useState, useEffect } from 'react';
import styles from './criar_oferta.module.css';
import { FaImage, FaCheckCircle } from 'react-icons/fa';
import BarraNvg from '@/components/navbar/navbar';
import { useRouter } from 'next/navigation';
import api from '@/services/api';
import Link from 'next/link'; 

export default function CriarOferta() {
  const router = useRouter();

  // Estados
  const [selectedImage, setSelectedImage] = useState(null);
  const [isImageInputLarge, setIsImageInputLarge] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [tiposAmendoim, setTiposAmendoim] = useState([]);
  const [agricultorId, setAgricultorId] = useState("");

  // Form Data
  const [formData, setFormData] = useState({
    agri_id: "",
    amen_id: "",
    oferta_quantidade: "",
    oferta_preco: "",
    oferta_data_colheita: "",
    oferta_outras_informacoes: "",
    oferta_data_publicacao: new Date().toISOString().split("T")[0],
    oferta_ativa: 1,
    oferta_img: null,
  });

  // -----------------------------

  // -----------------------------
  useEffect(() => {
    const carregarDadosIniciais = async () => {
      try {
        // Carrega dados do usuário logado
        const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
        if (usuario?.agri_id) {
          setAgricultorId(usuario.agri_id);
          setFormData((prev) => ({
            ...prev,
            agri_id: usuario.agri_id,
          }));
          console.log('✅ Agricultor carregado:', usuario.agri_id);
        } else {
          setError("Não foi possível identificar o agricultor. Faça login novamente.");
        }

        // Carrega tipos de amendoim
        await buscarTiposAmendoim();

      } catch (e) {
        console.error("Erro ao carregar dados iniciais:", e);
        setError("Erro ao carregar dados iniciais.");
      }
    };

    carregarDadosIniciais();
  }, []);

  // -----------------------------

  // -----------------------------
  const buscarTiposAmendoim = async () => {
    try {
      console.log('📋 Buscando tipos de amendoim...');
      const response = await api.get("/Amendoins");

      if (response.data.sucesso) {
        setTiposAmendoim(response.data.dados || []);
        console.log('✅ Tipos de amendoim carregados:', response.data.dados.length);
      } else {
        console.error('❌ Erro na resposta:', response.data);
        setError("Erro ao carregar tipos de amendoim.");
      }
    } catch (error) {
      console.error("❌ Erro ao carregar amendoins:", error);
      setError("Erro ao carregar tipos de amendoim. Verifique a conexão.");
    }
  };

  // -----------------------------

  // -----------------------------
  const handleImageChange = (e) => {
    console.log('🖼️ HANDLE IMAGE CHANGE CHAMADO');
    const file = e.target.files?.[0];
    console.log('📁 Arquivo selecionado:', file);

    if (file) {
      // Valida se é imagem
      if (!file.type.startsWith('image/')) {
        setError("Por favor, selecione apenas arquivos de imagem.");
        return;
      }

      // Valida tamanho (15MB)
      if (file.size > 15 * 1024 * 1024) {
        setError("A imagem deve ter no máximo 15MB.");
        return;
      }

      console.log('✅ ARQUIVO VÁLIDO:', {
        name: file.name,
        type: file.type,
        size: file.size,
        isFile: file instanceof File
      });

      setSelectedImage(URL.createObjectURL(file));
      setIsImageInputLarge(false);

      setFormData((prev) => ({
        ...prev,
        oferta_img: file,
      }));
      
      setError(""); // Limpa erro anterior
      console.log('✅ IMAGEM ADICIONADA AO formData');

    } else {
      console.log('❌ NENHUM ARQUIVO SELECIONADO');
    }
  };

  // -----------------------------

  // -----------------------------
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    console.log(`📝 Campo alterado: ${name} = ${value}`);
  };

  // -----------------------------

  // -----------------------------
  const formatarPreco = (valor) => {
    // Remove tudo que não é número
    const apenasNumeros = valor.replace(/\D/g, '');
    
    // Converte para número com 2 casas decimais
    if (apenasNumeros) {
      const numero = parseFloat(apenasNumeros) / 100;
      return numero.toFixed(2);
    }
    
    return '';
  };

  const handlePrecoChange = (e) => {
    const valorFormatado = formatarPreco(e.target.value);
    
    setFormData((prev) => ({
      ...prev,
      oferta_preco: valorFormatado,
    }));
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      console.log('🔍 VERIFICANDO DADOS NO FRONTEND...');
      
      // Debug dos dados
      console.log('📋 formData:', formData);
      console.log('📷 Imagem:', formData.oferta_img);

      // Validações
      if (!agricultorId) {
        setError("Erro: agricultor não identificado. Faça login novamente.");
        setLoading(false);
        return;
      }

      if (!formData.amen_id || !formData.oferta_quantidade || !formData.oferta_preco || !formData.oferta_data_colheita) {
        setError("Preencha todos os campos obrigatórios.");
        setLoading(false);
        return;
      }

      // Monta FormData
      const fd = new FormData();
      
      // Campos normais
      fd.append('agri_id', agricultorId);
      fd.append('amen_id', formData.amen_id);
      fd.append('oferta_quantidade', formData.oferta_quantidade);
      fd.append('oferta_preco', formData.oferta_preco);
      fd.append('oferta_data_colheita', formData.oferta_data_colheita);
      fd.append('oferta_outras_informacoes', formData.oferta_outras_informacoes || '');
      fd.append('oferta_data_publicacao', formData.oferta_data_publicacao);
      fd.append('oferta_ativa', '1');

      // Imagem
      if (formData.oferta_img) {
        console.log('📤 ANEXANDO IMAGEM - Fieldname: "oferta_img"');
        fd.append('oferta_img', formData.oferta_img);
      }

      // Debug final do FormData
      console.log('📦 CONTEÚDO DO FORMDATA:');
      for (let [key, value] of fd.entries()) {
        if (value instanceof File) {
          console.log(`  ✅ ${key}: [ARQUIVO] ${value.name}`);
        } else {
          console.log(`  📝 ${key}: ${value}`);
        }
      }

      console.log('🌐 ENVIANDO PARA /Ofertas...');
      const response = await api.post("/minhas_ofertas", fd);
      
      console.log('✅ RESPOSTA:', response.data);
      
      if (response.data.sucesso) {
        setShowSuccess(true);
        setTimeout(() => router.push("/ofertas"), 2000);
      } else {
        setError(response.data.mensagem || "Erro ao criar oferta.");
      }

    } catch (err) {
      console.error('💥 Erro:', err);
      console.error('💥 Resposta de erro:', err.response?.data);
      
      if (err.response?.status === 500) {
        setError("Erro interno do servidor. Verifique os logs do backend.");
      } else {
        setError(err.response?.data?.mensagem || "Erro ao conectar com o servidor.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <BarraNvg />

      {showSuccess && (
        <div className={styles.successOverlay}>
          <div className={styles.successMessage}>
            <FaCheckCircle className={styles.successIcon} />
            <p>Oferta criada com sucesso!</p>
            <p>Redirecionando...</p>
          </div>
        </div>
      )}

      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.textcriar}>
            <h2>Criar Oferta</h2>
            {agricultorId && <p className={styles.agricultorInfo}></p>}
          </div>

          {error && (
            <div className={`${styles.feedback} ${styles.erro}`}>
              {error}
            </div>
          )}

          <form className={styles.formContent} onSubmit={handleSubmit}>
            {/* IMAGEM */}
            <div className={`${styles.imageInput} ${isImageInputLarge ? styles.imageInputLarge : ""}`}>
              <label htmlFor="imageUpload">
                <FaImage size={isImageInputLarge ? 100 : 30} />
              </label>
              <p>Clique para adicionar a imagem</p>
              <small>Formatos: JPG, PNG, GIF (Máx: 15MB)</small>

              <input
                type="file"
                id="imageUpload"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />

              {selectedImage && (
                <div className={styles.imagePreviewContainer}>
                  <img 
                    src={selectedImage} 
                    alt="Imagem selecionada" 
                    className={styles.imagePreview}
                  />
                </div>
              )}
            </div>

            {/* CAMPOS */}
            <div className={styles.formFields}>
              <div className={styles.formGroup}>
                <label htmlFor="amen_id">Tipo de amendoim *</label>
                <select 
                  id="amen_id" 
                  name="amen_id" 
                  value={formData.amen_id} 
                  onChange={handleInputChange} 
                  required
                  className={styles.formSelect}
                >
                  <option value="">Selecione o tipo de amendoim</option>
                  {tiposAmendoim.length > 0 ? (
                    tiposAmendoim.map((am) => (
                      <option key={am.amen_id} value={am.amen_id}>
                        {am.amen_variedade} 
                        {am.amen_tamanho && ` - ${am.amen_tamanho}`}
                        {am.amen_descricao && ` (${am.amen_descricao})`}
                      </option>
                    ))
                  ) : (
                    <option value="" disabled>Carregando tipos...</option>
                  )}
                </select>
                {tiposAmendoim.length === 0 && (
                  <small className={styles.carregando}>Carregando tipos de amendoim...</small>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="oferta_quantidade">Quantidade (Kg) *</label>
                <input
                  type="number"
                  id="oferta_quantidade"
                  name="oferta_quantidade"
                  value={formData.oferta_quantidade}
                  onChange={handleInputChange}
                  min="1"
                  step="0.1"
                  required
                  className={styles.formInput}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="oferta_preco">Preço (R$) *</label>
                <input
                  type="number"
                  id="oferta_preco"
                  name="oferta_preco"
                  value={formData.oferta_preco}
                  onChange={handlePrecoChange}
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  required
                  className={styles.formInput}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="oferta_data_colheita">Data de Colheita *</label>
                <input
                  type="date"
                  id="oferta_data_colheita"
                  name="oferta_data_colheita"
                  value={formData.oferta_data_colheita}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                  required
                  className={styles.formInput}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="oferta_outras_informacoes">Informações adicionais</label>
                <textarea
                  id="oferta_outras_informacoes"
                  name="oferta_outras_informacoes"
                  value={formData.oferta_outras_informacoes}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Detalhes sobre a oferta, qualidade, etc."
                  className={styles.formTextarea}
                />
              </div>
                
            </div>

            <button 
              type="submit" 
              className={styles.criarOferta} 
              disabled={loading}
            >
              {loading ? "Criando Oferta..." : "Criar Oferta"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}