"use client";
import React, { useState } from 'react';
import styles from './Cadastro.module.css';

function Cadastro() {
  const [cpfCnpj, setCpfCnpj] = useState('');
  const [userType, setUserType] = useState('Agricultor');
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState({ texto: "", tipo: "" });

  const formatCpfCnpj = (value) => {
    let formattedValue = value.replace(/\D/g, '');

    if (formattedValue.length <= 11) {
      formattedValue = formattedValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } else {
      formattedValue = formattedValue.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    }

    return formattedValue;
  };

  const validar_formulario = async (event) => {
    event.preventDefault();
    setLoading(true);

    const email = event.target.email.value;
    const endereco = event.target.endereco.value;
    const telefone = event.target.telefone.value;
    const senha = event.target.senha.value;
    const confirmarSenha = event.target.confirmarSenha.value;

    // Limpa mensagens anteriores
    setMensagem({ texto: "", tipo: "" });

    // Validações
    let hasErrors = false;

    if (!email) {
      setMensagem({ texto: "Email é obrigatório", tipo: "erro" });
      hasErrors = true;
    }

    if (!cpfCnpj) {
      setMensagem({ texto: "CPF/CNPJ é obrigatório", tipo: "erro" });
      hasErrors = true;
    }

    if (!endereco) {
      setMensagem({ texto: "Endereço é obrigatório", tipo: "erro" });
      hasErrors = true;
    }

    if (!telefone) {
      setMensagem({ texto: "Telefone é obrigatório", tipo: "erro" });
      hasErrors = true;
    }

    if (!senha) {
      setMensagem({ texto: "Senha é obrigatória", tipo: "erro" });
      hasErrors = true;
    }

    if (!confirmarSenha) {
      setMensagem({ texto: "Confirmação de senha é obrigatória", tipo: "erro" });
      hasErrors = true;
    }

    if (senha !== confirmarSenha) {
      setMensagem({ texto: "As senhas não coincidem", tipo: "erro" });
      hasErrors = true;
    }

    if (!/^\d+$/.test(telefone)) {
      setMensagem({ texto: "Apenas números são permitidos no telefone", tipo: "erro" });
      hasErrors = true;
    }

    if (senha.length < 6) {
      setMensagem({ texto: "A senha deve ter pelo menos 6 caracteres", tipo: "erro" });
      hasErrors = true;
    }

    if (hasErrors) {
      setLoading(false);
      return;
    }

    // Simulação de cadastro
    setTimeout(() => {
      console.log('Formulário enviado com sucesso!');
      console.log('Tipo de Usuário:', userType);
      setMensagem({ texto: "Cadastro realizado com sucesso!", tipo: "sucesso" });
      setLoading(false);
    }, 1500);
  };

  const Logo = "https://i.ibb.co/23YGGMNM/Logo-Transparente.png";

  return (
    <div className={styles.pageContainer}>
      <div className={styles.container}>
        <div className={styles.twoColumnLayout}>
          
          {/* Coluna Esquerda - Ilustração */}
          <div className={styles.leftColumn}>
            <div className={styles.logoContainer}>
              <img src={Logo} className={styles.logo} alt="Logo" />
            </div>
            <div className={styles.illustrationContainer}>
              <h2 className={styles.welcomeTitle}>Crie sua Conta</h2>
              <p className={styles.welcomeText}>
                Junte-se à nossa comunidade agrícola. Cadastre-se para acessar recursos exclusivos 
                e conectar-se com outros profissionais do setor.
              </p>
              <div className={styles.illustration}>
                <div className={styles.iconContainer}>
                  <span className={styles.icon}>🌱</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Coluna Direita - Formulário */}
          <div className={styles.rightColumn}>
            <div className={styles.formCard}>
              {mensagem.texto && (
                <div className={`${styles.mensagem} ${styles[mensagem.tipo]}`}>
                  {mensagem.texto}
                </div>
              )}
              
              <form onSubmit={validar_formulario} className={styles.formContainer}>
                <div className={styles.formGroup}>
                  <label htmlFor="userType" className={styles.formLabel}>Tipo de Usuário</label>
                  <div className={styles.radioGroup}>
                    <button
                      type="button"
                      className={`${styles.userTypeButton} ${userType === 'Agricultor' ? styles.selected : ''}`}
                      onClick={() => setUserType('Agricultor')}
                    >
                      Agricultor
                    </button>
                    <button
                      type="button"
                      className={`${styles.userTypeButton} ${userType === 'Empresa' ? styles.selected : ''}`}
                      onClick={() => setUserType('Empresa')}
                    >
                      Empresa
                    </button>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.formLabel}>Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="seu@email.com"
                    className={styles.formInput}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="cpfCnpj" className={styles.formLabel}>CPF/CNPJ</label>
                  <input
                    type="text"
                    id="cpfCnpj"
                    name="cpfCnpj"
                    placeholder={userType === 'Agricultor' ? '000.000.000-00' : '00.000.000/0000-00'}
                    className={styles.formInput}
                    value={cpfCnpj}
                    onChange={(e) => setCpfCnpj(formatCpfCnpj(e.target.value))}
                    maxLength={userType === 'Agricultor' ? 14 : 18}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="endereco" className={styles.formLabel}>Endereço</label>
                  <input
                    type="text"
                    id="endereco"
                    name="endereco"
                    placeholder="Digite seu endereço completo"
                    className={styles.formInput}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="telefone" className={styles.formLabel}>Telefone</label>
                  <input
                    type="tel"
                    id="telefone"
                    name="telefone"
                    placeholder="(00) 00000-0000"
                    className={styles.formInput}
                    pattern="[0-9]*"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="senha" className={styles.formLabel}>Senha</label>
                  <input
                    type="password"
                    id="senha"
                    name="senha"
                    placeholder="Mínimo 6 caracteres"
                    className={styles.formInput}
                    minLength={6}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="confirmarSenha" className={styles.formLabel}>Confirmar Senha</label>
                  <input
                    type="password"
                    id="confirmarSenha"
                    name="confirmarSenha"
                    placeholder="Digite novamente a senha"
                    className={styles.formInput}
                    minLength={6}
                    required
                  />
                </div>

                <button 
                  type="submit" 
                  className={styles.submitButton}
                  disabled={loading}
                >
                  {loading ? 'Cadastrando...' : 'Criar Conta'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cadastro;