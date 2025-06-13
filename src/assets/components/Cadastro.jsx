import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/cadastro.css';

function Cadastro() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    email: '',
    senha: ''
  });

  const [mensagem, setMensagem] = useState({ texto: '', tipo: '' });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCadastrar = () => {
    const { nome, telefone, email, senha } = formData;

    setMensagem({ texto: '', tipo: '' });

    if (!nome || !telefone || !email || !senha) {
      setMensagem({ texto: 'Todos os campos são obrigatórios.', tipo: 'erro' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMensagem({ texto: 'Email inválido.', tipo: 'erro' });
      return;
    }

    if (senha.length < 8) {
      setMensagem({ texto: 'A senha deve ter no mínimo 8 caracteres.', tipo: 'erro' });
      return;
    }

    if (!/^[0-9]+$/.test(telefone)) {
      setMensagem({ texto: 'O telefone deve conter apenas números.', tipo: 'erro' });
      return;
    }

    setMensagem({ texto: 'Cadastro realizado com sucesso!', tipo: 'sucesso' });
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  return (
    <div className="cadastro-container">
      <h2 className="title">Cadastro de Usuário</h2>
      <input
        type="text"
        name="nome"
        placeholder="Nome completo"
        value={formData.nome}
        onChange={handleInputChange}
        className="input"
      />
      <input
        type="tel"
        name="telefone"
        placeholder="Telefone (somente números)"
        value={formData.telefone}
        onChange={handleInputChange}
        className="input"
      />
      <input
        type="email"
        name="email"
        placeholder="E-mail"
        value={formData.email}
        onChange={handleInputChange}
        className="input"
      />
      <input
        type="password"
        name="senha"
        placeholder="Senha (mínimo 8 caracteres)"
        value={formData.senha}
        onChange={handleInputChange}
        className="input"
      />
      <p className={`mensagem ${mensagem.tipo}`}>
        {mensagem.texto}
      </p>
      <button onClick={handleCadastrar} className="button">
        Cadastrar
      </button>
      <Link to="/" className="voltar">Voltar para login</Link>
    </div>
  );
}

export default Cadastro;