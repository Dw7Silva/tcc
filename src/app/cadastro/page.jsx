"use client";
import React, { useState } from 'react';
import styles from './Cadastro.module.css';

function Cadastro() {
  const [cpfCnpj, setCpfCnpj] = useState('');

  const formatCpfCnpj = (value) => {
    let formattedValue = value.replace(/\D/g, '');

    if (formattedValue.length <= 11) {
      formattedValue = formattedValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } else {
      formattedValue = formattedValue.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    }

    return formattedValue;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const endereco = event.target.endereco.value;
    const telefone = event.target.telefone.value;
    const senha = event.target.senha.value;
    const confirmarSenha = event.target.confirmarSenha.value;

    // Remover classes de erro e ocultar mensagens de erro
    const inputs = event.target.querySelectorAll('input, select');
    inputs.forEach((input) => {
      input.classList.remove(styles['error-input']);
      input.nextSibling.textContent = '';
    });

    let hasErrors = false;

    if (!email) {
      event.target.email.classList.add(styles['error-input']);
      event.target.email.nextSibling.textContent = 'Campo obrigatório';
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

    if (senha !== confirmarSenha) {
      event.target.senha.classList.add(styles['error-input']);
      event.target.confirmarSenha.classList.add(styles['error-input']);
      event.target.senha.nextSibling.textContent = 'As senhas não coincidem';
      hasErrors = true;
    }

    if (!/^\d+$/.test(telefone)) {
      event.target.telefone.classList.add(styles['error-input']);
      event.target.telefone.nextSibling.textContent = 'Apenas números são permitidos';
      hasErrors = true;
    }

    if (hasErrors) {
      return;
    }

    console.log('Formulário enviado com sucesso!');
  };

  return (
    <div className={styles.cadastroContainer}>
      <form className={styles.cadastroForm} onSubmit={handleSubmit}>
        <h2>Cadastro</h2>
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
            onChange={(e) => setCpfCnpj(formatCpfCnpj(e.target.value))}
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
        <div className={styles.formButtons}>
          <button type="button">Agricultor</button>
          <button type="button">Empresa</button>
        </div>
        <button type="submit" className={styles.criarContaButton}>Criar Conta</button>
      </form>
    </div>
  );
}

export default Cadastro;