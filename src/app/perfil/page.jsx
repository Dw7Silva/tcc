"use client";
import styles from "./perfil.module.css";
import { useState, useRef, useEffect } from "react";
import BarraNvg from "@/components/navbar/navbar";
import InputsPerfil from "@/components/inputsperfil/page";
import { useRouter } from 'next/navigation';
import api from "@/services/api";

export default function Perfil() {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(null);
  const [valores, setValores] = useState({
    cpfCnpj: '',
    email: '',
    telefone: '',
    propriedade: '',
    descricao: '',
    cep: '',
    endereco: '',
    cidade: '',
    estado: ''
  });
  
  const [cepError, setCepError] = useState('');
  const [hasCepError, setHasCepError] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [usuario, setUsuario] = useState(null);
  const [mensagem, setMensagem] = useState({ texto: "", tipo: "" });
  const [salvando, setSalvando] = useState(false);
  const imageInputRef = useRef(null);

  // Função para normalizar a URL da imagem
  const normalizarUrlImagem = (urlOuNome) => {
    if (!urlOuNome) return null;
    
    if (urlOuNome.includes('://')) {

      if (urlOuNome.includes('/public/usuarios/')) {
        const nomeArquivo = urlOuNome.split('/').pop();
        return `${api.defaults.baseURL}/uploads/usuarios/${nomeArquivo}`;
      }
      return urlOuNome;
    }
    
    return `${api.defaults.baseURL}/uploads/usuarios/${urlOuNome}`;
  };

  // Função para adicionar timestamp e evitar cache
  const adicionarTimestamp = (url) => {
    return url ? `${url}?t=${Date.now()}` : null;
  };

  useEffect(() => {
    buscarDadosUsuario();
  }, []);

  const buscarDadosUsuario = async () => {
    try {
      let usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
      
      if (!usuarioLogado) {
        const usuarioData = JSON.parse(localStorage.getItem('usuario'));
        if (usuarioData) {
          usuarioLogado = {
            id: usuarioData.id,
            nome: usuarioData.nome,
            tipo: usuarioData.tipo
          };
          localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
        }
      }

      if (!usuarioLogado?.id) {
        router.push('/login');
        return;
      }

      // USANDO SUA API
      const response = await api.get(`/usuarios/${usuarioLogado.id}`);
      
      if (response.data.sucesso && response.data.dados) {
        const dados = response.data.dados;
        setUsuario(dados);
        
        // Formatar CPF/CNPJ
        const documentoFormatado = dados.documento && dados.documento.length === 11 ? 
          dados.documento.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4') : 
          dados.documento ? 
          dados.documento.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5') : '';

        setValores({
          cpfCnpj: documentoFormatado,
          email: dados.email || '',
          telefone: dados.telefone || '',
          propriedade: dados.nomeFantasia || dados.localizacaoPropriedade || dados.nome || '',
          descricao: dados.outrasInformacoes || '',
          cep: dados.cep || '',
          endereco: dados.endereco || '',
          cidade: dados.cidade || '',
          estado: dados.estado || ''
        });

        // Atualizar imagem
        if (dados.imagem) {
          const urlNormalizada = normalizarUrlImagem(dados.imagem);
          setSelectedImage(adicionarTimestamp(urlNormalizada));
        } else {
          setSelectedImage(null);
        }

      } else {
        setMensagem({ texto: response.data.mensagem || "Erro ao carregar dados", tipo: "erro" });
      }
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      setMensagem({ texto: "Erro ao conectar com o servidor", tipo: "erro" });
    } finally {
      setLoading(false);
    }
  };

  const formatCpfCnpj = (value) => {
    const formattedValue = value.replace(/\D/g, '');
    return formattedValue.length <= 11 ? 
      formattedValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4') : 
      formattedValue.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  };

  const buscarEndereco = async (cepValue) => {
    if (!cepValue) { 
      setValores(prev => ({ ...prev, cep: '' }));
      setCepError(''); 
      setHasCepError(false); 
      return; 
    }
    
    const cepLimpo = cepValue.replace(/\D/g, '');
    
    if (cepLimpo.length !== 8) { 
      setCepError('CEP inválido'); 
      setHasCepError(true); 
      return; 
    }
    
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await response.json();
      
      if (data.erro) { 
        setCepError('CEP não encontrado'); 
        setHasCepError(true); 
        return; 
      }
      
      setValores(prev => ({ 
        ...prev, 
        cep: cepLimpo,
        cidade: data.localidade, 
        estado: data.uf 
      }));
      setCepError(''); 
      setHasCepError(false);
    } catch (error) { 
      setCepError('Erro ao buscar CEP'); 
      setHasCepError(true); 
    }
  };

  const handleCepFocus = () => {
    if (hasCepError) { 
      setValores(prev => ({ ...prev, cep: '' }));
      setCepError(''); 
      setHasCepError(false); 
    }
  };

  const handleInputChange = (campo, valor) => {
    if (campo === 'cpfCnpj') {
      valor = formatCpfCnpj(valor);
    }
    setValores(prev => ({ ...prev, [campo]: valor }));
  };

  const editar_foto_perfil = () => {
    if (editMode) {
      imageInputRef.current.click();
    }
  };

  const mudar_foto_perfil = (event) => {
    const file = event.target.files?.[0];
    
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setMensagem({ texto: "A imagem deve ter no máximo 5MB", tipo: "erro" });
      return;
    }
    
    if (!file.type.startsWith('image/')) {
      setMensagem({ texto: "Por favor, selecione uma imagem válida", tipo: "erro" });
      return;
    }
    
    const imageUrl = URL.createObjectURL(file);
    setSelectedImage(imageUrl);
    setMensagem({ texto: "Imagem selecionada. Clique em SALVAR para confirmar.", tipo: "sucesso" });
  };

  const toggleEditMode = () => {
    if (editMode) {
      salvarAlteracoes();
    } else {
      setMensagem({ texto: "", tipo: "" });
    }
    setEditMode(!editMode);
  };

  const salvarAlteracoes = async () => {
    setSalvando(true);
    setMensagem({ texto: "", tipo: "" });

    try {
      const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
      if (!usuarioLogado?.id) {
        setMensagem({ texto: "Usuário não identificado", tipo: "erro" });
        return;
      }

      const formData = new FormData();
      
      formData.append('nome', valores.propriedade || usuario?.nome);
      formData.append('email', valores.email);
      formData.append('telefone', valores.telefone);
      formData.append('endereco', valores.endereco);
      formData.append('outrasInformacoes', valores.descricao);
      formData.append('cep', valores.cep);
      formData.append('cidade', valores.cidade);
      formData.append('estado', valores.estado);

      if (imageInputRef.current?.files[0]) {
        formData.append('imagem', imageInputRef.current.files[0]);
      }

      // USANDO SUA API PARA ATUALIZAR
      const response = await api.put(`/usuarios/${usuarioLogado.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.sucesso) {
        if (response.data.dados?.imagem) {
          const novaUrlImagem = normalizarUrlImagem(response.data.dados.imagem);
          setSelectedImage(adicionarTimestamp(novaUrlImagem));
        }
        
        setMensagem({ texto: "Dados atualizados com sucesso!", tipo: "sucesso" });
        
        const usuarioAtualizado = JSON.parse(localStorage.getItem('usuarioLogado') || '{}');
        usuarioAtualizado.nome = valores.propriedade || usuario?.nome;
        if (response.data.dados?.imagem) {
          usuarioAtualizado.imagem = response.data.dados.imagem;
        }
        localStorage.setItem('usuarioLogado', JSON.stringify(usuarioAtualizado));
        
        setUsuario(prev => prev ? { ...prev, ...response.data.dados } : null);
        
        setTimeout(() => setEditMode(false), 2000);
        
      } else {
        setMensagem({ texto: response.data.mensagem || "Erro ao atualizar dados", tipo: "erro" });
      }
    } catch (error) {
      console.error("Erro ao salvar alterações:", error);
      setMensagem({ texto: "Erro de conexão com o servidor", tipo: "erro" });
    } finally {
      setSalvando(false);
    }
  };

  const cancelarEdicao = () => {
    setEditMode(false);
    setMensagem({ texto: "", tipo: "" });
    buscarDadosUsuario();
  };

  const campos = [
    { name: 'email', label: 'Email', tipo: 'email', placeholder: 'seu@email.com' },
    { name: 'telefone', label: 'Telefone', tipo: 'tel', placeholder: '(00) 00000-0000' },
    { name: 'cpfCnpj', label: 'CPF/CNPJ', tipo: 'cpfCnpj', placeholder: '000.000.000-00', readOnly: true },
    { name: 'propriedade', label: usuario?.tipo === 1 ? 'Nome da Propriedade' : 'Nome Fantasia', tipo: 'text', placeholder: usuario?.tipo === 1 ? 'Sua propriedade' : 'Nome fantasia' },
    { name: 'endereco', label: 'Endereço', tipo: 'text', placeholder: 'Seu endereço completo' },
    { name: 'cep', label: 'CEP', tipo: 'cep', placeholder: '00000-000' },
    { name: 'cidade', label: 'Cidade', tipo: 'text', placeholder: 'Sua cidade', readOnly: true },
    { name: 'estado', label: 'Estado', tipo: 'text', placeholder: 'UF', readOnly: true }
  ];

  if (loading) {
    return (
      <div className={styles.pageContainer}>
        <BarraNvg />
        <div className={styles.container}>
          <div className={styles.loading}>Carregando...</div>
        </div>
      </div>
    );
  }

  if (!usuario) {
    return (
      <div className={styles.pageContainer}>
        <BarraNvg />
        <div className={styles.container}>
          <div className={styles.error}>Erro ao carregar perfil</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <BarraNvg />
      
      <div className={styles.container}>
        <div className={styles.profileCard}>
          <div className={styles.profileHeader}>
            <div className={styles.nomeContainer}>
              <h2>{usuario.nome}</h2>
            
            </div>
            <div className={styles.botoesAcao}>
              {editMode ? (
                <>
                  <button 
                    onClick={cancelarEdicao}
                    className={styles.cancelButton}
                    disabled={salvando}
                  >
                    Cancelar
                  </button>
                  <button 
                    onClick={toggleEditMode}
                    className={styles.saveButton}
                    disabled={salvando}
                  >
                    {salvando ? 'Salvando...' : 'Salvar'}
                  </button>
                </>
              ) : (
                <button 
                  onClick={toggleEditMode}
                  className={styles.editButton}
                >
                  Editar
                </button>
              )}
            </div>
          </div>
          
          <div className={styles.profileContent}>
            {mensagem.texto && (
              <div className={`${styles.mensagem} ${styles[mensagem.tipo]}`}>
                {mensagem.texto}
              </div>
            )}
            
            <div className={styles.profileImageContainer}>
              <div 
                className={`${styles.profileImage} ${editMode ? styles.editable : ''}`}
                onClick={editar_foto_perfil}
              >
                <img
                    src={selectedImage || "/Logo-Transparente.png"}
                    alt="Foto de Perfil"
                    className={styles.perfilImg}
                    key={selectedImage}
                    onError={(e) => {
                    e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjE1MCIgaGVpZ2h0PSIxNTAiIGZpbGw9IiNGM0Y0RjYiLz48L3N2Zz4=";
  }}
/>
                {editMode && (
                  <div className={styles.editOverlay}>
                    <span>Alterar Foto</span>
                  </div>
                )}
              </div>
              <input
                type="file"
                id="imageUpload"
                accept="image/*"
                onChange={mudar_foto_perfil}
                ref={imageInputRef}
                style={{ display: 'none' }}
              />
              {editMode && (
                <p className={styles.imageHint}>Clique na imagem para alterar</p>
              )}
            </div>
            
            <InputsPerfil
              campos={campos}
              editMode={editMode}
              onCepBlur={buscarEndereco}
              onCepFocus={handleCepFocus}
              cepError={cepError}
              hasCepError={hasCepError}
              valores={valores}
              onChange={handleInputChange}
            />
            
            <div className={styles.formGroup}>
              <label htmlFor="descricao">
                {usuario.tipo === 1 ? 'Sobre a Propriedade' : 'Sobre a Empresa'} (Opcional)
              </label>
 
              <textarea
                id="descricao"
                className={styles.description}
                placeholder={usuario.tipo === 1 ? 'Conte um pouco sobre sua propriedade...' : 'Conte um pouco sobre sua empresa...'}
                readOnly={!editMode}
                value={valores.descricao}
                onChange={(e) => handleInputChange('descricao', e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}