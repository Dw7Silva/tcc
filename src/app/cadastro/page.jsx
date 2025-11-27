"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Cadastro.module.css';
import api from '@/services/api';

function Cadastro() {
  const [etapa, setEtapa] = useState(1);
  const [userType, setUserType] = useState('');
  const [cpfCnpj, setCpfCnpj] = useState('');
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState({ texto: "", tipo: "" });
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    endereco: '',
    telefone: '',
    senha: '',
    confirmarSenha: '',
    razaoSocial: '',
    nomeFantasia: '',
    tipoAtividade: '',
    localizacaoPropriedade: '',
    tiposAmendoim: '',
    certificacoes: ''
  });

  // Função para limpar mensagens
  const limparMensagem = () => {
    setMensagem({ texto: "", tipo: "" });
  };

  // Função para validar CPF
  const validarCPF = (cpf) => {
    cpf = cpf.replace(/\D/g, '');
    
    if (cpf.length !== 11) return false;
    
    if (/^(\d)\1+$/.test(cpf)) return false;
    
    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = 11 - (soma % 11);
    let digitoVerificador1 = resto === 10 || resto === 11 ? 0 : resto;
    
    if (digitoVerificador1 !== parseInt(cpf.charAt(9))) return false;
    
    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = 11 - (soma % 11);
    let digitoVerificador2 = resto === 10 || resto === 11 ? 0 : resto;
    
    return digitoVerificador2 === parseInt(cpf.charAt(10));
  };

  // Função para validar CNPJ
  const validarCNPJ = (cnpj) => {
    cnpj = cnpj.replace(/\D/g, '');
    
    if (cnpj.length !== 14) return false;
    
    if (/^(\d)\1+$/.test(cnpj)) return false;
    
    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    
    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }
    
    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== parseInt(digitos.charAt(0))) return false;
    
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    
    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }
    
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    return resultado === parseInt(digitos.charAt(1));
  };

  // Função para validar email
  const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const formatCpfCnpj = (value) => {
    let formattedValue = value.replace(/\D/g, '');

    if (userType === 'Agricultor') {
      if (formattedValue.length <= 11) {
        formattedValue = formattedValue
          .replace(/(\d{3})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
      }
    } else {
      if (formattedValue.length <= 14) {
        formattedValue = formattedValue
          .replace(/(\d{2})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d)/, '$1/$2')
          .replace(/(\d{4})(\d{1,2})$/, '$1-$2');
      }
    }

    return formattedValue;
  };

  const formatTelefone = (value) => {
    let formattedValue = value.replace(/\D/g, '');
    
    if (formattedValue.length <= 11) {
      formattedValue = formattedValue
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d{1,4})$/, '$1-$2')
        .replace(/(\d{4})(\d{1,4})$/, '$1-$2');
    }
    
    return formattedValue;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (mensagem.texto) {
      limparMensagem();
    }
  };

  const avancarEtapa = () => {
    limparMensagem();
    setEtapa(prev => prev + 1);
  };

  const voltarEtapa = () => {
    limparMensagem();
    setEtapa(prev => prev - 1);
  };

  const handleSubmitEtapa1 = (e) => {
    e.preventDefault();
    if (!userType) {
      setMensagem({ texto: "Selecione um tipo de usuário", tipo: "erro" });
      return;
    }
    avancarEtapa();
  };

  const handleSubmitEtapa2 = (e) => {
    e.preventDefault();
    
    if (!formData.nome || !formData.email || !cpfCnpj) {
      setMensagem({ texto: "Preencha todos os campos obrigatórios", tipo: "erro" });
      return;
    }

    if (formData.nome.length < 3) {
      setMensagem({ texto: "O nome deve ter pelo menos 3 caracteres", tipo: "erro" });
      return;
    }

    if (!validarEmail(formData.email)) {
      setMensagem({ texto: "Digite um email válido", tipo: "erro" });
      return;
    }

    const documentoLimpo = cpfCnpj.replace(/\D/g, '');
    
    if (userType === 'Agricultor') {
      if (documentoLimpo.length !== 11) {
        setMensagem({ texto: "CPF deve ter 11 dígitos", tipo: "erro" });
        return;
      }
      if (!validarCPF(cpfCnpj)) {
        setMensagem({ texto: "Digite um CPF válido", tipo: "erro" });
        return;
      }
    } else {
      if (documentoLimpo.length !== 14) {
        setMensagem({ texto: "CNPJ deve ter 14 dígitos", tipo: "erro" });
        return;
      }
      if (!validarCNPJ(cpfCnpj)) {
        setMensagem({ texto: "Digite um CNPJ válido", tipo: "erro" });
        return;
      }
    }

    avancarEtapa();
  };

  const handleSubmitEtapa3 = (e) => {
    e.preventDefault();
    if (userType === 'Agricultor') {
      if (!formData.localizacaoPropriedade || !formData.tiposAmendoim || !formData.certificacoes) {
        setMensagem({ texto: "Preencha todos os campos obrigatórios", tipo: "erro" });
        return;
      }
      
      if (formData.localizacaoPropriedade.length < 3) {
        setMensagem({ texto: "O nome da propriedade deve ter pelo menos 3 caracteres", tipo: "erro" });
        return;
      }
      
      if (formData.tiposAmendoim.length < 2) {
        setMensagem({ texto: "Informe os tipos de amendoim cultivados", tipo: "erro" });
        return;
      }
    } else {
      if (!formData.razaoSocial || !formData.nomeFantasia || !formData.tipoAtividade) {
        setMensagem({ texto: "Preencha todos os campos obrigatórios", tipo: "erro" });
        return;
      }
      
      if (formData.razaoSocial.length < 3) {
        setMensagem({ texto: "A razão social deve ter pelo menos 3 caracteres", tipo: "erro" });
        return;
      }
      
      if (formData.nomeFantasia.length < 2) {
        setMensagem({ texto: "O nome fantasia deve ter pelo menos 2 caracteres", tipo: "erro" });
        return;
      }
    }
    avancarEtapa();
  };

  const handleSubmitEtapa4 = (e) => {
    e.preventDefault();
    if (!formData.endereco || !formData.telefone) {
      setMensagem({ texto: "Preencha todos os campos obrigatórios", tipo: "erro" });
      return;
    }
    
    if (formData.endereco.length < 10) {
      setMensagem({ texto: "O endereço deve ter pelo menos 10 caracteres", tipo: "erro" });
      return;
    }
    
    const telefoneLimpo = formData.telefone.replace(/\D/g, '');
    if (telefoneLimpo.length < 10 || telefoneLimpo.length > 11) {
      setMensagem({ texto: "Digite um telefone válido com DDD", tipo: "erro" });
      return;
    }
    
    avancarEtapa();
  };

  const handleSubmitFinal = async (e) => {
    e.preventDefault();
    setLoading(true);
    limparMensagem();

    if (formData.senha !== formData.confirmarSenha) {
      setMensagem({ texto: "As senhas não coincidem", tipo: "erro" });
      setLoading(false);
      return;
    }

    if (formData.senha.length < 6) {
      setMensagem({ texto: "A senha deve ter pelo menos 6 caracteres", tipo: "erro" });
      setLoading(false);
      return;
    }

    const senhaForteRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
    if (!senhaForteRegex.test(formData.senha)) {
      setMensagem({ 
        texto: "A senha deve conter pelo menos uma letra maiúscula, uma minúscula e um número", 
        tipo: "erro" 
      });
      setLoading(false);
      return;
    }

    try {
      const usuarioData = {
        usu_tipo_usuario: userType === 'Agricultor' ? '1' : '2',
        usu_nome: formData.nome,
        usu_documento: cpfCnpj.replace(/\D/g, ''),
        usu_email: formData.email,
        usu_senha: formData.senha,
        usu_endereco: formData.endereco,
        usu_telefone: formData.telefone.replace(/\D/g, ''),
        usu_data_cadastro: new Date().toISOString().split('T')[0],
        
        emp_razao_social: formData.razaoSocial || '',
        emp_nome_fantasia: formData.nomeFantasia || '',
        emp_tipo_atividade: formData.tipoAtividade || '',
        agri_localizacao_propriedade: formData.localizacaoPropriedade || '',
        agri_tipos_amendoim_cultivados: formData.tiposAmendoim || '',
        agri_certificacoes: formData.certificacoes || ''
      };

      console.log('Enviando dados:', usuarioData);

      // 🔥 REQUISIÇÃO COM API CONFIGURADA
      const response = await api.post('/usuarios', usuarioData);

      console.log('Resposta do backend:', response.data);

      if (response.data.sucesso) {
        setMensagem({ 
          texto: "Cadastro realizado com sucesso!Redirecionando para login...", 
          tipo: "sucesso" 
        });
        
        setTimeout(() => {
          router.push('/login');
        }, 2000);
        
      } else {
        setMensagem({ 
          texto: response.data.mensagem || "Erro no cadastro. Verifique os dados.", 
          tipo: "erro" 
        });
      }

    } catch (error) {
      console.error('Erro na requisição:', error);
      
      if (error.response) {
        setMensagem({ 
          texto: error.response.data.mensagem || "Erro no servidor. Tente novamente.", 
          tipo: "erro" 
        });
      } else if (error.request) {
        setMensagem({ 
          texto: "Erro ao conectar com o servidor. Verifique sua conexão.", 
          tipo: "erro" 
        });
      } else {
        setMensagem({ 
          texto: "Erro inesperado. Tente novamente.", 
          tipo: "erro" 
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const Logo = "https://i.ibb.co/23YGGMNM/Logo-Transparente.png";

  return (
    <div className={styles.pageContainer}>
      <div className={styles.container}>
        <div className={styles.twoColumnLayout}>
          
          <div className={styles.leftColumn}>
            <div className={styles.logoContainer}>
              <img src={Logo} className={styles.logo} alt="Logo" />
            </div>
            <div className={styles.illustrationContainer}>
              <h2 className={styles.welcomeTitle}>
                {etapa === 1 && 'Comece sua jornada'}
                {etapa === 2 && 'Dados pessoais'}
                {etapa === 3 && (userType === 'Agricultor' ? 'Sua propriedade' : 'Sua empresa')}
                {etapa === 4 && 'Localização'}
                {etapa === 5 && 'Segurança'}
              </h2>
              <p className={styles.welcomeText}>
                {etapa === 1 && "Selecione o tipo de conta que melhor representa você"}
                {etapa === 2 && "Informe seus dados pessoais para criar sua conta"}
                {etapa === 3 && (userType === 'Agricultor' 
                  ? "Conte-nos mais sobre sua propriedade agrícola" 
                  : "Informe os dados da sua empresa")}
                {etapa === 4 && "Onde podemos encontrar você?"}
                {etapa === 5 && "Crie uma senha segura para proteger sua conta"}
              </p>
              <div className={styles.illustration}>
                <div className={styles.iconContainer}>
                  <span className={styles.icon}>
                    {etapa === 1 ? '👋' : 
                     etapa === 2 ? '👤' :
                     etapa === 3 ? (userType === 'Agricultor' ? '🌱' : '🏢') :
                     etapa === 4 ? '📍' : '🔒'}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className={styles.rightColumn}>
            <div className={styles.formCard}>
              {mensagem.texto && (
                <div className={`${styles.mensagem} ${styles[mensagem.tipo]}`}>
                  {mensagem.texto}
                </div>
              )}
              
              {etapa === 1 && (
                <form onSubmit={handleSubmitEtapa1} className={styles.formContainer}>
                  <h2 className={styles.etapaTitulo}>Qual é o seu perfil?</h2>
                  
                  <div className={styles.radioGroup}>
                    <button
                      type="button"
                      className={`${styles.userTypeButton} ${userType === 'Agricultor' ? styles.selected : ''}`}
                      onClick={() => {
                        setUserType('Agricultor');
                        limparMensagem();
                      }}
                    >
                      🌱 Agricultor
                    </button>
                    <button
                      type="button"
                      className={`${styles.userTypeButton} ${userType === 'Empresa' ? styles.selected : ''}`}
                      onClick={() => {
                        setUserType('Empresa');
                        limparMensagem();
                      }}
                    >
                      🏢 Empresa
                    </button>
                  </div>
                  
                  <button 
                    type="submit" 
                    className={styles.submitButton}
                  >
                    Continuar
                  </button>
                </form>
              )}
              
              {etapa === 2 && (
                <form onSubmit={handleSubmitEtapa2} className={styles.formContainer}>
                  <h2 className={styles.etapaTitulo}>Seus dados pessoais</h2>
                  
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      {userType === 'Agricultor' ? 'Nome Completo' : 'Nome do Responsável'} *
                    </label>
                    <input
                      type="text"
                      className={styles.formInput}
                      value={formData.nome}
                      onChange={(e) => handleInputChange('nome', e.target.value)}
                      placeholder={userType === 'Agricultor' ? 'Seu nome completo' : 'Nome do responsável'}
                      required
                      minLength={3}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Email *</label>
                    <input
                      type="email"
                      className={styles.formInput}
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="seu@email.com"
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      {userType === 'Agricultor' ? 'CPF' : 'CNPJ'} *
                    </label>
                    <input
                      type="text"
                      className={styles.formInput}
                      value={cpfCnpj}
                      onChange={(e) => {
                        setCpfCnpj(formatCpfCnpj(e.target.value));
                        if (mensagem.texto) limparMensagem();
                      }}
                      placeholder={userType === 'Agricultor' ? '000.000.000-00' : '00.000.000/0000-00'}
                      maxLength={userType === 'Agricultor' ? 14 : 18}
                      required
                    />
                  </div>

                  <div className={styles.botoesNavegacao}>
                    <button type="button" className={styles.botaoSecundario} onClick={voltarEtapa}>
                      Voltar
                    </button>
                    <button 
                      type="submit"
                      className={styles.submitButton}
                    >
                      Continuar
                    </button>
                  </div>
                </form>
              )}
              
              {etapa === 3 && (
                <form onSubmit={handleSubmitEtapa3} className={styles.formContainer}>
                  <h2 className={styles.etapaTitulo}>
                    {userType === 'Agricultor' ? 'Sobre sua propriedade' : 'Sobre sua empresa'}
                  </h2>

                  {userType === 'Agricultor' ? (
                    <>
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Nome da propriedade *</label>
                        <input
                          type="text"
                          className={styles.formInput}
                          value={formData.localizacaoPropriedade}
                          onChange={(e) => handleInputChange('localizacaoPropriedade', e.target.value)}
                          placeholder="Fazenda São João"
                          required
                          minLength={3}
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Tipos de Amendoim Cultivados *</label>
                        <input
                          type="text"
                          className={styles.formInput}
                          value={formData.tiposAmendoim}
                          onChange={(e) => handleInputChange('tiposAmendoim', e.target.value)}
                          placeholder="Ex: Runner, Virginia, Valência"
                          required
                          minLength={2}
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Certificações *</label>
                        <input
                          type="text"
                          className={styles.formInput}
                          value={formData.certificacoes}
                          onChange={(e) => handleInputChange('certificacoes', e.target.value)}
                          placeholder="Ex: Orgânico, ISO, etc."
                          required
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Razão Social *</label>
                        <input
                          type="text"
                          className={styles.formInput}
                          value={formData.razaoSocial}
                          onChange={(e) => handleInputChange('razaoSocial', e.target.value)}
                          placeholder="Razão social da empresa"
                          required
                          minLength={3}
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Nome Fantasia *</label>
                        <input
                          type="text"
                          className={styles.formInput}
                          value={formData.nomeFantasia}
                          onChange={(e) => handleInputChange('nomeFantasia', e.target.value)}
                          placeholder="Nome fantasia da empresa"
                          required
                          minLength={2}
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Tipo de Atividade *</label>
                        <input
                          type="text"
                          className={styles.formInput}
                          value={formData.tipoAtividade}
                          onChange={(e) => handleInputChange('tipoAtividade', e.target.value)}
                          placeholder="Ex: Indústria alimentícia, Comércio, etc."
                          required
                        />
                      </div>
                    </>
                  )}

                  <div className={styles.botoesNavegacao}>
                    <button type="button" className={styles.botaoSecundario} onClick={voltarEtapa}>
                      Voltar
                    </button>
                    <button 
                      type="submit"
                      className={styles.submitButton}
                    >
                      Continuar
                    </button>
                  </div>
                </form>
              )}
              
              {etapa === 4 && (
                <form onSubmit={handleSubmitEtapa4} className={styles.formContainer}>
                  <h2 className={styles.etapaTitulo}>Contato e localização</h2>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Endereço *</label>
                    <input
                      type="text"
                      className={styles.formInput}
                      value={formData.endereco}
                      onChange={(e) => handleInputChange('endereco', e.target.value)}
                      placeholder="Digite seu endereço completo"
                      required
                      minLength={10}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Telefone *</label>
                    <input
                      type="tel"
                      className={styles.formInput}
                      value={formData.telefone}
                      onChange={(e) => handleInputChange('telefone', formatTelefone(e.target.value))}
                      placeholder="(00) 00000-0000"
                      maxLength={15}
                      required
                    />
                  </div>

                  <div className={styles.botoesNavegacao}>
                    <button type="button" className={styles.botaoSecundario} onClick={voltarEtapa}>
                      Voltar
                    </button>
                    <button 
                      type="submit"
                      className={styles.submitButton}
                    >
                      Continuar
                    </button>
                  </div>
                </form>
              )}
              
              {etapa === 5 && (
                <form onSubmit={handleSubmitFinal} className={styles.formContainer}>
                  <h2 className={styles.etapaTitulo}>Crie sua senha</h2>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Senha *</label>
                    <input
                      type="password"
                      className={styles.formInput}
                      value={formData.senha}
                      onChange={(e) => handleInputChange('senha', e.target.value)}
                      placeholder="Mínimo 6 caracteres"
                      minLength={6}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Confirmar Senha *</label>
                    <input
                      type="password"
                      className={styles.formInput}
                      value={formData.confirmarSenha}
                      onChange={(e) => handleInputChange('confirmarSenha', e.target.value)}
                      placeholder="Digite novamente a senha"
                      minLength={6}
                      required
                    />
                  </div>

                  <div className={styles.botoesNavegacao}>
                    <button type="button" className={styles.botaoSecundario} onClick={voltarEtapa}>
                      Voltar
                    </button>
                    <button 
                      type="submit"
                      className={styles.submitButton}
                      disabled={loading}
                    >
                      {loading ? 'Cadastrando...' : 'Finalizar Cadastro'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cadastro;