"use client";
import styles from "./perfil.module.css";
import { useState, useRef } from "react";
import BarraNvg from "@/components/navbar/navbar";
import InputsPerfil from "@/components/inputsperfil/page";

export default function Perfil() {
  // States and refs
  const [selectedImage, setSelectedImage] = useState(null);
  const [valores, setValores] = useState({
    cpfCnpj: '',
    cep: '',
    cidade: '',
    estado: '',
    email: '',
    telefone: '',
    propriedade: '',
    descricao: ''
  });
  
  const [cepError, setCepError] = useState('');
  const [hasCepError, setHasCepError] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const imageInputRef = useRef(null);

  // Default profile image
  const fotoPerfil = "https://i.ibb.co/23YGGMNM/Logo-Transparente.png";

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
    setEditMode(!editMode);
  };

  // Definição dos campos - FÁCIL DE MANTER!
  const campos = [
    { name: 'email', label: 'Email', tipo: 'email', placeholder: 'seu@email.com' },
    { name: 'telefone', label: 'Telefone', tipo: 'tel', placeholder: '(00) 00000-0000' },
    { name: 'cpfCnpj', label: 'CPF/CNPJ', tipo: 'cpfCnpj', placeholder: '000.000.000-00', readOnly: true },
    { name: 'propriedade', label: 'Nome da Propriedade', tipo: 'text', placeholder: 'Sua propriedade' },
    { name: 'cep', label: 'CEP', tipo: 'cep', placeholder: '00000-000' },
    { name: 'cidade', label: 'Cidade', tipo: 'text', placeholder: 'Sua cidade', readOnly: true },
    { name: 'estado', label: 'Estado', tipo: 'text', placeholder: 'UF', readOnly: true }
  ];

  const usuario = [{ id_usuario: 1, nome: "Lucas" }];

  return (
    <>
      <div className={styles.pageContainer}>
        <BarraNvg />
        
        <div className={styles.container}>
          <div className={styles.profileCard}>
            <div className={styles.profileHeader} key={usuario[0].id_usuario}>
              <h2>{usuario[0].nome}</h2>
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
                    src={selectedImage || fotoPerfil}
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
              
              {/* USO DO COMPONENTE NOVO - MUITO MAIS LIMPO! */}
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
                <label htmlFor="descricao">Descrição (Opcional)</label>
                <textarea
                  id="descricao"
                  className={styles.description}
                  placeholder="Conte um pouco sobre você ou sua propriedade..."
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