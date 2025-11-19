"use client";
import styles from "./perfil.module.css";
import { useState, useRef, useEffect } from "react";
import BarraNvg from "@/components/navbar/navbar";
import InputsPerfil from "@/components/inputsperfil/page";
import { useRouter } from 'next/navigation';

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
    endereco: '', // Endereço completo da propriedade
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

  // Default profile image
  const fotoPerfil = "https://i.ibb.co/23YGGMNM/Logo-Transparente.png";

  // Buscar dados do usuário ao carregar a página
  useEffect(() => {
    console.log('Dados do localStorage:', {
      usuarioLogado: localStorage.getItem('usuarioLogado'),
      usuario: localStorage.getItem('usuario')
    });
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

      if (!usuarioLogado || !usuarioLogado.id) {
        console.error('Usuário não está logado');
        router.push('/login');
        return;
      }

      console.log('Buscando dados do usuário ID:', usuarioLogado.id);

      // ⚠️ URL SEM /api/ - como você disse que funciona
      const response = await fetch(`http://localhost:3333/usuarios/${usuarioLogado.id}`);
      const resultado = await response.json();

      console.log('Resposta do backend:', resultado);

      if (resultado.sucesso && resultado.dados) {
        const dados = resultado.dados;
        setUsuario(dados);
        
        // Formatar CPF/CNPJ
        const documentoFormatado = dados.documento && dados.documento.length === 11 ? 
          dados.documento.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4') : 
          dados.documento ? 
          dados.documento.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5') : '';

        // Preencher os valores dos campos
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

        if (dados.imagem) {
          setSelectedImage(dados.imagem);
        }

      } else {
        console.error('Erro ao buscar dados:', resultado.mensagem);
        setMensagem({ texto: "Erro ao carregar dados do perfil", tipo: "erro" });
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      setMensagem({ texto: "Erro ao conectar com o servidor", tipo: "erro" });
    } finally {
      setLoading(false);
    }
  };

  // Format CPF/CNPJ
  const formatCpfCnpj = (value) => {
    const formattedValue = value.replace(/\D/g, '');
    return formattedValue.length <= 11 ? 
      formattedValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4') : 
      formattedValue.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  };

  // Fetch address by CEP
  const buscarEndereco = async (cepValue) => {
    if (!cepValue) { 
      setValores(prev => ({ ...prev, cep: '' }));
      setCepError(''); 
      setHasCepError(false); 
      return; 
    }
    
    const cepLimpo = cepValue.replace(/\D/g, '');
    setValores(prev => ({ ...prev, cep: cepLimpo }));
    
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
        cidade: data.localidade, 
        estado: data.uf 
      }));
      setCepError(''); 
      setHasCepError(false);
    } catch (error) { 
      setCepError('Erro ao buscar CEP'); 
      setHasCepError(true); 
      console.error(error); 
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
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      
      // Verificar tamanho do arquivo (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setMensagem({ texto: "A imagem deve ter no máximo 5MB", tipo: "erro" });
        return;
      }
      
      // Verificar tipo do arquivo
      if (!file.type.startsWith('image/')) {
        setMensagem({ texto: "Por favor, selecione uma imagem válida", tipo: "erro" });
        return;
      }
      
      setSelectedImage(URL.createObjectURL(file));
      setMensagem({ texto: "Imagem selecionada. Clique em SALVAR para confirmar.", tipo: "sucesso" });
    }
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
    let usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    if (!usuarioLogado) {
      const usuarioData = JSON.parse(localStorage.getItem('usuario'));
      if (usuarioData) {
        usuarioLogado = { id: usuarioData.id };
      }
    }

    if (!usuarioLogado) {
      setMensagem({ texto: "Usuário não identificado", tipo: "erro" });
      setSalvando(false);
      return;
    }

    // Usar FormData para suportar imagem
    const formData = new FormData();
    
    // Adicionar campos de texto
    formData.append('nome', valores.propriedade || usuario?.nome);
    formData.append('email', valores.email);
    formData.append('telefone', valores.telefone);
    formData.append('endereco', valores.endereco);
    formData.append('outrasInformacoes', valores.descricao);
    formData.append('cep', valores.cep);
    formData.append('cidade', valores.cidade);
    formData.append('estado', valores.estado);

    // Adicionar a imagem se foi selecionada
    if (imageInputRef.current?.files[0]) {
      formData.append('imagem', imageInputRef.current.files[0]);
      console.log('📸 Imagem anexada para upload');
    }

    console.log('📤 Enviando atualização com imagem...');

    // ⚠️ TESTE 1: Primeiro tente POST (mais comum para upload)
    console.log('🔄 Tentando POST...');
    let response = await fetch(`http://localhost:3333/usuarios/${usuarioLogado.id}`, {
      method: 'POST',
      body: formData
    });

    console.log('📨 Status POST:', response.status);

    // Verificar se a resposta é JSON
    const contentType = response.headers.get('content-type');
    const responseText = await response.text();
    
    // Se POST não funcionar, tentar PUT
    if (!contentType || !contentType.includes('application/json')) {
      console.log('🔄 POST falhou, tentando PUT...');
      response = await fetch(`http://localhost:3333/usuarios/${usuarioLogado.id}`, {
        method: 'PUT',
        body: formData
      });
      console.log('📨 Status PUT:', response.status);
    }

    // Se ainda não funcionar, tentar PATCH
    const newContentType = response.headers.get('content-type');
    const newResponseText = await response.text();
    
    if (!newContentType || !newContentType.includes('application/json')) {
      console.log('🔄 PUT falhou, tentando PATCH...');
      response = await fetch(`http://localhost:3333/usuarios/${usuarioLogado.id}`, {
        method: 'PATCH',
        body: formData
      });
      console.log('📨 Status PATCH:', response.status);
    }

    // Verificar a resposta final
    const finalContentType = response.headers.get('content-type');
    const finalResponseText = await response.text();

    console.log('📨 Resposta bruta:', finalResponseText.substring(0, 500));

    // Se ainda não for JSON, mostrar erro específico
    if (!finalContentType || !finalContentType.includes('application/json')) {
      console.error('❌ Todas as rotas retornaram HTML em vez de JSON');
      console.error('Resposta completa:', finalResponseText);
      
      setMensagem({ 
        texto: "Erro: Rota de upload não configurada no servidor. Contate o administrador.", 
        tipo: "erro" 
      });
      setSalvando(false);
      return;
    }

    // Se chegou aqui, é JSON válido
    const resultado = JSON.parse(finalResponseText);

    if (resultado.sucesso) {
      console.log('✅ Dados e imagem atualizados com sucesso!');
      setMensagem({ texto: "Dados atualizados com sucesso!", tipo: "sucesso" });
      
      // Atualizar também no localStorage se necessário
      const usuarioAtualizado = JSON.parse(localStorage.getItem('usuarioLogado') || localStorage.getItem('usuario'));
      if (usuarioAtualizado) {
        usuarioAtualizado.nome = valores.propriedade || usuario?.nome;
        if (resultado.dados.imagem) {
          usuarioAtualizado.imagem = resultado.dados.imagem;
        }
        localStorage.setItem('usuarioLogado', JSON.stringify(usuarioAtualizado));
      }
      
      // Recarregar os dados para mostrar a nova imagem
      await buscarDadosUsuario();
      
      // Sair do modo edição após 2 segundos
      setTimeout(() => {
        setEditMode(false);
      }, 2000);
      
    } else {
      console.error('Erro ao atualizar:', resultado.mensagem);
      setMensagem({ texto: resultado.mensagem || "Erro ao atualizar dados", tipo: "erro" });
    }
  } catch (error) {
    console.error('Erro ao salvar alterações:', error);
    setMensagem({ texto: "Erro de conexão com o servidor", tipo: "erro" });
  } finally {
    setSalvando(false);
  }
};
const cancelarEdicao = () => {
  setEditMode(false);
  setMensagem({ texto: "", tipo: "" });
  // Recarregar dados originais
  buscarDadosUsuario();
};

  // Definição dos campos
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
    <>
      <div className={styles.pageContainer}>
        <BarraNvg />
        
        <div className={styles.container}>
          <div className={styles.profileCard}>
            <div className={styles.profileHeader}>
              <h2>{usuario.nome}</h2>
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
                    src={selectedImage || usuario.imagem || fotoPerfil}
                    alt="Foto de Perfil"
                    className={styles.perfilImg}
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
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}