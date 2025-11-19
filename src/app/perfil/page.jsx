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
    cep: '',
    cidade: '',
    estado: '',
    email: '',
    telefone: '',
    propriedade: '',
    descricao: '',
    endereco: ''
  });
  
  const [cepError, setCepError] = useState('');
  const [hasCepError, setHasCepError] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [usuario, setUsuario] = useState(null);
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
      // Buscar de forma flexível - tenta 'usuarioLogado' primeiro, depois 'usuario'
      let usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
      
      if (!usuarioLogado) {
        // Fallback para a chave 'usuario'
        const usuarioData = JSON.parse(localStorage.getItem('usuario'));
        if (usuarioData) {
          usuarioLogado = {
            id: usuarioData.id,
            nome: usuarioData.nome,
            tipo: usuarioData.tipo
          };
          // Salva também como 'usuarioLogado' para futuras requisições
          localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
        }
      }

      if (!usuarioLogado || !usuarioLogado.id) {
        console.error('Usuário não está logado');
        router.push('/login');
        return;
      }

      console.log('Buscando dados do usuário ID:', usuarioLogado.id);

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
          endereco: dados.endereco || '',
          descricao: dados.outrasInformacoes || '',
          cep: '',
          cidade: '',
          estado: ''
        });

        if (dados.imagem) {
          setSelectedImage(dados.imagem);
        }

        // Extrair CEP do endereço (se existir)
        if (dados.endereco) {
          const cepMatch = dados.endereco.match(/\d{5}-?\d{3}/);
          if (cepMatch) {
            buscarEndereco(cepMatch[0]);
          }
        }

      } else {
        console.error('Erro ao buscar dados:', resultado.mensagem);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
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
      limparEndereco(); 
      setHasCepError(false); 
      return; 
    }
    
    const cepLimpo = cepValue.replace(/\D/g, '');
    setValores(prev => ({ ...prev, cep: cepLimpo }));
    
    if (cepLimpo.length !== 8) { 
      setCepError('CEP inválido'); 
      setHasCepError(true); 
      limparEndereco(); 
      return; 
    }
    
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await response.json();
      
      if (data.erro) { 
        setCepError('CEP não encontrado'); 
        setHasCepError(true); 
        limparEndereco(); 
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
      limparEndereco(); 
      console.error(error); 
    }
  };

  const limparEndereco = () => {
    setValores(prev => ({ ...prev, cidade: '', estado: '' }));
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

  const editar_foto_perfil = () => imageInputRef.current.click();

  const mudar_foto_perfil = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  const toggleEditMode = () => {
    if (editMode) {
      // Se estava editando e clicou em "Salvar"
      salvarAlteracoes();
    }
    setEditMode(!editMode);
  };

  const salvarAlteracoes = async () => {
    try {
      // Buscar ID do usuário de forma flexível
      let usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
      if (!usuarioLogado) {
        const usuarioData = JSON.parse(localStorage.getItem('usuario'));
        if (usuarioData) {
          usuarioLogado = { id: usuarioData.id };
        }
      }

      if (!usuarioLogado) {
        console.error('Usuário não identificado');
        return;
      }

      const dadosAtualizacao = {
        nome: valores.propriedade || usuario?.nome,
        email: valores.email,
        telefone: valores.telefone,
        endereco: valores.endereco,
        outrasInformacoes: valores.descricao
      };

      console.log('Enviando atualização:', dadosAtualizacao);

      const response = await fetch(`http://localhost:3333/usuarios/${usuarioLogado.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosAtualizacao)
      });

      const resultado = await response.json();

      if (resultado.sucesso) {
        console.log('Dados atualizados com sucesso!');
        // Atualizar também no localStorage se necessário
        const usuarioAtualizado = JSON.parse(localStorage.getItem('usuarioLogado') || localStorage.getItem('usuario'));
        if (usuarioAtualizado) {
          usuarioAtualizado.nome = dadosAtualizacao.nome;
          localStorage.setItem('usuarioLogado', JSON.stringify(usuarioAtualizado));
        }
        
        // Recarregar os dados
        await buscarDadosUsuario();
      } else {
        console.error('Erro ao atualizar:', resultado.mensagem);
      }
    } catch (error) {
      console.error('Erro ao salvar alterações:', error);
    }
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
              <button 
                onClick={toggleEditMode}
                className={styles.editButton}
              >
                {editMode ? 'Salvar' : 'Editar'}
              </button>
            </div>
            
            <div className={styles.profileContent}>
              <div className={styles.profileImageContainer}>
                <div 
                  className={styles.profileImage} 
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