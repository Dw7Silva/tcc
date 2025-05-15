"use client";
import styles from "./perfil.module.css";
import { useState, useRef } from "react";
import BarraNvg from "@/components/navbar/navbar";

export default function Perfil() {
  // States and refs
  const [selectedImage, setSelectedImage] = useState(null);
  const [cpfCnpj, setCpfCnpj] = useState('');
  const [cep, setCep] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
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
      setCep(''); 
      setCepError(''); 
      limparEndereco(); 
      setHasCepError(false); 
      return; 
    }
    
    const cepLimpo = cepValue.replace(/\D/g, '');
    setCep(cepLimpo);
    
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
      
      setCidade(data.localidade); 
      setEstado(data.uf); 
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
    setCidade(''); 
    setEstado('');
  };

  const handleCepFocus = () => {
    if (hasCepError) { 
      setCep(''); 
      setCepError(''); 
      setHasCepError(false); 
    }
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

  const usario =  [{id_usario: 1,nome: "Lucas",
  }
   ];


  return (
    <>
      <div className={styles.pageContainer}>
        <BarraNvg />
        
        <div className={styles.container}>
          <div className={styles.profileCard}>
            <div className={styles.profileHeader} key={usario[0].id_usario}>
              <h2> {usario[0].nome}</h2>
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
              
              <div className={styles.infoGrid}>
                 <div className={styles.formGroup}>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="seu@email.com"
                    className={styles.infoInput}
                    readOnly={!editMode}
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="telefone">Telefone</label>
                  <input
                    type="tel"
                    id="telefone"
                    placeholder="(00) 00000-0000"
                    className={styles.infoInput}
                    readOnly={!editMode}
                  />
                </div>
                
               
                
                <div className={styles.formGroup}>
                  <label htmlFor="cpfCnpj">CPF/CNPJ</label>
                  <input
                    id="cpfCnpj"
                    name="cpfCnpj"
                    value={cpfCnpj}
                    onChange={(e) => setCpfCnpj(formatCpfCnpj(e.target.value))}
                    className={styles.infoInput}
                    placeholder="000.000.000-00"
                    readOnly
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="propriedade">Nome da Propriedade</label>
                  <input
                    type="text"
                    id="propriedade"
                    placeholder="Sua propriedade"
                    className={styles.infoInput}
                    readOnly={!editMode}
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="cep">CEP</label>
                  <input
                    type="text"
                    id="cep"
                    placeholder="00000-000"
                    className={`${styles.infoInput} ${hasCepError ? styles.inputError : ''}`}
                    value={cep}
                    onChange={(e) => setCep(e.target.value)}
                    onBlur={(e) => buscarEndereco(e.target.value)}
                    onFocus={handleCepFocus}
                    maxLength={9}
                    readOnly={!editMode}
                  />
                  {cepError && <span className={styles.errorMessage}>{cepError}</span>}
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="cidade">Cidade</label>
                  <input
                    type="text"
                    id="cidade"
                    placeholder="Sua cidade"
                    className={styles.infoInput}
                    value={cidade}
                    readOnly
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="estado">Estado</label>
                  <input
                    type="text"
                    id="estado"
                    placeholder="UF"
                    className={styles.infoInput}
                    value={estado}
                    readOnly
                  />
                </div>
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="descricao">Descrição (Opcional)</label>
                <textarea
                  id="descricao"
                  className={styles.description}
                  placeholder="Conte um pouco sobre você ou sua propriedade..."
                  readOnly={!editMode}
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}