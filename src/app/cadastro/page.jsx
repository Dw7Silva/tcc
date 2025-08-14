"use client"; // Indica que este componente é um componente de cliente
import React, { useState } from 'react';
import styles from './Cadastro.module.css'; // Importa o CSS do módulo
import Footer from '@/components/footer/footer';

function Cadastro() {
  // Estados para armazenar os dados do formulário
  const [cpfCnpj, setCpfCnpj] = useState('');
  const [userType, setUserType] = useState('Agricultor'); // Estado para armazenar o tipo de usuário

  // Função para formatar CPF/CNPJ
  const formatCpfCnpj = (value) => {
    let formattedValue = value.replace(/\D/g, ''); // Remove caracteres não numéricos

    // Formata CPF
    if (formattedValue.length <= 11) {
      formattedValue = formattedValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } else { // Formata CNPJ
      formattedValue = formattedValue.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    }

    return formattedValue; // Retorna o valor formatado
  };

  // Função chamada ao enviar o formulário
  const validar_formulario = (event) => {
    event.preventDefault(); // Prevê o comportamento padrão do envio do formulário

    // Obtém os valores dos campos do formulário
    const email = event.target.email.value;
    const endereco = event.target.endereco.value;
    const telefone = event.target.telefone.value;
    const senha = event.target.senha.value;
    const confirmarSenha = event.target.confirmarSenha.value;

    // Remove classes de erro e oculta mensagens de erro
    const inputs = event.target.querySelectorAll('input, select');
    inputs.forEach((input) => {
      input.classList.remove(styles['error-input']);
      input.nextSibling.textContent = ''; // Limpa mensagens de erro
    });

    let hasErrors = false; // Flag para verificar se há erros

    // Valida os campos do formulário
    if (!email) {
      event.target.email.classList.add(styles['error-input']); // Adiciona classe de erro
      event.target.email.nextSibling.textContent = 'Campo obrigatório'; // Mensagem de erro
      hasErrors = true;
    }

    if (!cpfCnpj) {
      event.target.cpfCnpj.classList.add(styles['error-input']);
      event.target.cpfCnpj.nextSibling.textContent = 'Campo obrigatório';
      hasErrors = true;
    }

    if (!endereco) {
      event.target.endereco.classList.add(styles['error-input']);
      event.target.endereco.nextSibling.textContent = 'Campo obrigatório';
      hasErrors = true;
    }

    if (!telefone) {
      event.target.telefone.classList.add(styles['error-input']);
      event.target.telefone.nextSibling.textContent = 'Campo obrigatório';
      hasErrors = true;
    }

    if (!senha) {
      event.target.senha.classList.add(styles['error-input']);
      event.target.senha.nextSibling.textContent = 'Campo obrigatório';
      hasErrors = true;
    }

    if (!confirmarSenha) {
      event.target.confirmarSenha.classList.add(styles['error-input']);
      event.target.confirmarSenha.nextSibling.textContent = 'Campo obrigatório';
      hasErrors = true;
    }

    // Verifica se as senhas coincidem
    if (senha !== confirmarSenha) {
      event.target.senha.classList.add(styles['error-input']);
      event.target.confirmarSenha.classList.add(styles['error-input']);
      event.target.senha.nextSibling.textContent = 'As senhas não coincidem';
      hasErrors = true;
    }

    // Verifica se o telefone contém apenas números
    if (!/^\d+$/.test(telefone)) {
      event.target.telefone.classList.add(styles['error-input']);
      event.target.telefone.nextSibling.textContent = 'Apenas números são permitidos';
      hasErrors = true;
    }

    // Se houver erros, foca no primeiro campo com erro
    if (hasErrors) {
      const firstErrorInput = event.target.querySelector('.error-input');
      if (firstErrorInput) {
        firstErrorInput.focus();
      }
      return; // Sai da função se houver erros
    }

    // Se tudo estiver correto, exibe os dados no console
    console.log('Formulário enviado com sucesso!');
    console.log('Tipo de Usuário:', userType); // Exibe o tipo de usuário selecionado
  };

  return (
    <div className={styles.cadastroContainer}>
      <form className={styles.cadastroForm} onSubmit={validar_formulario}>
        <h2>Cadastro</h2>

        <div className={styles.formGroup}>
          <label>Tipo de Usuário</label>
          <div className={styles.radioGroup}>
            {/* Botão para selecionar Agricultor */}
            <button
              type="button"
              className={`${styles.userTypeButton} ${userType === 'Agricultor' ? styles.selected : ''}`}
              onClick={() => setUserType('Agricultor')}
            >
              Agricultor
            </button>
            {/* Botão para selecionar Empresa */}
            <button
              type="button"
              className={`${styles.userTypeButton} ${userType === 'Empresa' ? styles.selected : ''}`}
              onClick={() => setUserType('Empresa')}
            >
              Empresa
            </button>
          </div>
        </div>

        {/* Campos do formulário */}
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" />
          <p className={styles['error-message']}></p>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="cpfCnpj">CPF/CNPJ</label>
          <input
            maxLength={15}
            type="text"
            id="cpfCnpj"
            name="cpfCnpj"
            value={cpfCnpj}
            onChange={(e) => setCpfCnpj(formatCpfCnpj(e.target.value))} // Formata CPF/CNPJ ao digitar
          />
          <p className={styles['error-message']}></p>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="endereco">Endereço</label>
          <input type="text" id="endereco" name="endereco" />
          <p className={styles['error-message']}></p>
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="telefone">Número de Telefone</label>
          <input type="number" id="telefone" name="telefone" pattern="[0-9]*" />
          <p className={styles['error-message']}></p>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="senha">Senha</label>
          <input type="password" id="senha" name="senha" />
          <p className={styles['error-message']}></p>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="confirmarSenha">Confirmar Senha</label>
          <input type="password" id="confirmarSenha" name="confirmarSenha" />
          <p className={styles['error-message']}></p>
        </div>

        {/* Botão para enviar o formulário */}
        <div className={styles.formButtons}>
          <button type="submit" className={styles.criarContaButton}>Criar Conta</button>
        </div>
      </form>
      
    </div>
  );
}

export default Cadastro; 