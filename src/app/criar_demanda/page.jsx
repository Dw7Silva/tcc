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
  const [empresaId, setEmpresaId] = useState("");

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
  // 🔥 CARREGAR USUÁRIO E DADOS
  // -----------------------------
  useEffect(() => {
    const carregarDadosIniciais = async () => {
      try {
        // Carrega dados do usuário logado
        const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
        if (usuario?.emp_id) {
          setEmpresaId(usuario.emp_id);
          setFormData((prev) => ({
            ...prev,
            emp_id: usuario.emp_id,
          }));
          console.log('✅ Empresa carregada:', usuario.emp_id);
        } else {
          setError("Não foi possível identificar sua empresa. Faça login novamente.");
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
  // 🔥 BUSCAR TIPOS DE AMENDOIM
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
  // 🔥 HANDLER IMAGEM COM DEBUG
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
        imagem: file,
      }));
      
      setError(""); // Limpa erro anterior
      console.log('✅ IMAGEM ADICIONADA AO formData');

    } else {
      console.log('❌ NENHUM ARQUIVO SELECIONADO');
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

    console.log(`📝 Campo alterado: ${name} = ${value}`);
  };

  // -----------------------------
  // 🔥 SUBMIT FORM COMPLETO COM DEBUG
  // -----------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      console.log('\n🚀 ========== INICIANDO ENVIO ==========');
      
      // 🔍 DEBUG DA IMAGEM NO STATE
      console.log('📷 formData.imagem:', formData.imagem);
      console.log('📷 Tipo:', typeof formData.imagem);
      console.log('📷 É File?', formData.imagem instanceof File);
      console.log('📷 É Blob?', formData.imagem instanceof Blob);
      
      if (formData.imagem) {
        console.log('📷 Detalhes do arquivo:', {
          name: formData.imagem.name,
          type: formData.imagem.type,
          size: formData.imagem.size,
          lastModified: formData.imagem.lastModified
        });
      } else {
        console.log('❌ IMAGEM É NULL/UNDEFINED NO STATE');
      }

      // Validações
      if (!empresaId) {
        setError("Erro: empresa não identificada. Faça login novamente.");
        setLoading(false);
        return;
      }

      if (!formData.amen_id || !formData.quantidade || !formData.preco_maximo || !formData.data_entrega) {
        setError("Preencha todos os campos obrigatórios (*).");
        setLoading(false);
        return;
      }

      // 📦 MONTA FORMDATA
      const fd = new FormData();
      
      // Campos normais
      fd.append('emp_id', empresaId);
      fd.append('amen_id', formData.amen_id);
      fd.append('quantidade', formData.quantidade);
      fd.append('preco_maximo', formData.preco_maximo);
      fd.append('data_entrega', formData.data_entrega);
      fd.append('informacoes', formData.informacoes || '');
      fd.append('data_publi', formData.data_publi);
      fd.append('ativa', '1');

      // 📤 IMAGEM - CAMPO CRÍTICO
      if (formData.imagem) {
        console.log('📤 ANEXANDO IMAGEM AO FORMDATA...');
        console.log('   Fieldname: "imagem"');
        console.log('   Arquivo:', formData.imagem.name);
        
        fd.append('imagem', formData.imagem); // ← NOME DO CAMPO: "imagem"
      } else {
        console.log('⚠️  PULANDO IMAGEM - formData.imagem é null');
      }

      // 🔍 DEBUG FINAL DO FORMDATA
      console.log('📦 CONTEÚDO FINAL DO FORMDATA:');
      let temImagem = false;
      for (let [key, value] of fd.entries()) {
        if (value instanceof File) {
          console.log(`  ✅ ${key}: [ARQUIVO] ${value.name} (${value.size} bytes)`);
          temImagem = true;
        } else {
          console.log(`  📝 ${key}: ${value}`);
        }
      }
      
      if (!temImagem) {
        console.log('❌ ATENÇÃO: FORMDATA NÃO CONTÉM NENHUM ARQUIVO!');
      }

      console.log('🌐 ENVIANDO PARA /Demandas...');
      
      // 🚀 ENVIA PARA BACKEND
      const response = await api.post("/Demandas", fd);
      
      console.log('✅ RESPOSTA DO SERVIDOR:', response.data);
      
      if (response.data.sucesso) {
        setShowSuccess(true);
        console.log('🎉 DEMANDA CRIADA COM SUCESSO!');
        setTimeout(() => router.push("/Demandas"), 2000);
      } else {
        setError(response.data.mensagem || "Erro ao criar demanda.");
      }

    } catch (err) {
      console.error('💥 ERRO COMPLETO:', err);
      console.error('💥 Status:', err.response?.status);
      console.error('💥 Dados resposta:', err.response?.data);
      console.error('💥 Mensagem:', err.message);
      
      if (err.response?.status === 500) {
        setError("Erro interno do servidor. Verifique os logs do backend.");
      } else {
        setError(err.response?.data?.mensagem || "Erro ao conectar com o servidor.");
      }
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // 🔥 RENDER
  // -----------------------------
  return (
    <>
      <BarraNvg />

      {showSuccess && (
        <div className={styles.successOverlay}>
          <div className={styles.successMessage}>
            <FaCheckCircle className={styles.successIcon} />
            <p>Demanda criada com sucesso!</p>
            <p>Redirecionando...</p>
          </div>
        </div>
      )}

      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.textcriar}>
            <h2>Criar Demanda</h2>
            {empresaId && <p className={styles.empresaInfo}>Empresa ID: {empresaId}</p>}
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
                <img 
                  src={selectedImage} 
                  alt="Imagem selecionada" 
                  className={styles.imagePreview}
                />
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
                <label>Quantidade em Kg *</label>
                <input
                  type="number"
                  name="quantidade"
                  value={formData.quantidade}
                  onChange={handleInputChange}
                  min="1"
                  step="0.1"
                  required
                  className={styles.formInput}
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
                  className={styles.formInput}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Prazo máximo *</label>
                <input
                  type="date"
                  name="data_entrega"
                  value={formData.data_entrega}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                  required
                  className={styles.formInput}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Informações adicionais</label>
                <textarea
                  name="informacoes"
                  value={formData.informacoes}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Detalhes sobre a demanda, qualidade desejada, etc."
                  className={styles.formTextarea}
                />
              </div>
            </div>

            <button 
              type="submit" 
              className={styles.criarOferta} 
              disabled={loading}
            >
              {loading ? "Criando Demanda..." : "Criar Demanda"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}