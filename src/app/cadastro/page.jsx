"use client";

import React, { useState } from "react";
import styles from "d:/Temp/derick/tcc/src/app/cadastro/cadastro.nodule.css";

export default function Cadastro() {
  const [tipoUsuario, setTipoUsuario] = useState("agricultor");
  const [formData, setFormData] = useState({
    email: "",
    cpfCnpj: "",
    endereco: "",
    telefone: "",
    senha: "",
    confirmarSenha: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica para enviar os dados do formulário para o backend
    console.log("Dados do formulário:", formData);
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1>Cadastro</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <select
            name="cpfCnpj"
            value={formData.cpfCnpj}
            onChange={handleInputChange}
            required
          >
            <option value="">CPF / CNPJ</option>
            <option value="cpf">CPF</option>
            <option value="cnpj">CNPJ</option>
          </select>
          <input
            type="text"
            name="endereco"
            placeholder="Endereço"
            value={formData.endereco}
            onChange={handleInputChange}
            required
          />
          <input
            type="tel"
            name="telefone"
            placeholder="Número de telefone"
            value={formData.telefone}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            name="senha"
            placeholder="Senha"
            value={formData.senha}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            name="confirmarSenha"
            placeholder="Confirmar senha"
            value={formData.confirmarSenha}
            onChange={handleInputChange}
            required
          />
          <div className={styles.tipoUsuario}>
            <button
              type="button"
              className={tipoUsuario === "agricultor" ? styles.active : ""}
              onClick={() => setTipoUsuario("agricultor")}
            >
              Agricultor
            </button>
            <button
              type="button"
              className={tipoUsuario === "empresa" ? styles.active : ""}
              onClick={() => setTipoUsuario("empresa")}
            >
              Empresa
            </button>
          </div>
          <button type="submit" className={styles.criarConta}>
            Criar Conta
          </button>
        </form>
      </div>
    </div>
  );
}