import React, { useState } from 'react';

function CadastroForm() {
  const [email, setEmail] = useState('');
  const [cpfCnpj, setCpfCnpj] = useState('');
  const [endereco, setEndereco] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('agricultor'); // Padrão é agricultor

  const handleSubmit = (event) => {
    event.preventDefault();
    // Adicione aqui a lógica para enviar os dados do formulário
    console.log({
      email,
      cpfCnpj,
      endereco,
      telefone,
      senha,
      confirmarSenha,
      tipoUsuario,
    });
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2 style={styles.title}>Cadastro</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={styles.input}
      />

      <div style={styles.cpfCnpjContainer}>
        <input
          type="text"
          placeholder="CPF/CNPJ"
          value={cpfCnpj}
          onChange={(e) => setCpfCnpj(e.target.value)}
          style={styles.cpfCnpjInput}
        />
        <select style={styles.cpfCnpjSelect}>
          <option>CPF</option>
          <option>CNPJ</option>
        </select>
      </div>

      <input
        type="text"
        placeholder="Endereço"
        value={endereco}
        onChange={(e) => setEndereco(e.target.value)}
        style={styles.input}
      />

      <input
        type="tel"
        placeholder="Numero de telefone"
        value={telefone}
        onChange={(e) => setTelefone(e.target.value)}
        style={styles.input}
      />

      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        style={styles.input}
      />

      <input
        type="password"
        placeholder="Confirmar senha"
        value={confirmarSenha}
        onChange={(e) => setConfirmarSenha(e.target.value)}
        style={styles.input}
      />

      <div style={styles.buttonGroup}>
        <button
          type="button"
          onClick={() => setTipoUsuario('agricultor')}
          style={{
            ...styles.tipoUsuarioButton,
            backgroundColor: tipoUsuario === 'agricultor' ? '#A87453' : '#E8E8E8',
            color: tipoUsuario === 'agricultor' ? 'white' : 'black',
          }}
        >
          Agricultor
        </button>
        <button
          type="button"
          onClick={() => setTipoUsuario('empresa')}
          style={{
            ...styles.tipoUsuarioButton,
            backgroundColor: tipoUsuario === 'empresa' ? '#A87453' : '#E8E8E8',
            color: tipoUsuario === 'empresa' ? 'white' : 'black',
          }}
        >
          Empresa
        </button>
      </div>

      <button type="submit" style={styles.submitButton}>Criar Conta</button>
    </form>
  );
}
