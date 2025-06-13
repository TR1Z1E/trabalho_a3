import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../../styles/contato.css'; 

function Contato() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: '',
    numero: '',
    mensagem: ''
  });

  const [showConfirmacao, setShowConfirmacao] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Armazena no localStorage
    localStorage.setItem('contato_nome', formData.nome);
    localStorage.setItem('contato_numero', formData.numero);
    localStorage.setItem('contato_mensagem', formData.mensagem);

    // Mostra mensagem de confirmação
    setShowConfirmacao(true);
    setFormData({ nome: '', numero: '', mensagem: '' });

    // Redireciona após 3 segundos
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  return (
    <>
      <h1>Fale com a gente</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="nome">Nome:</label>
        <input
          type="text"
          name="nome"
          value={formData.nome}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="numero">Número de telefone:</label>
        <input
          type="tel"
          name="numero"
          value={formData.numero}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="mensagem">Mensagem:</label>
        <textarea
          name="mensagem"
          rows="5"
          value={formData.mensagem}
          onChange={handleInputChange}
          required
        />

        <button type="submit">Enviar</button>
      </form>

      {showConfirmacao && (
        <div id="mensagem-confirmacao">
          Mensagem enviada! Em breve retornaremos.
        </div>
      )}
    </>
  );
}

export default Contato;