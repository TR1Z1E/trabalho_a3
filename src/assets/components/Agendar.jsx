import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/agendar.css';

function Agendar() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    dataVisita: '',
    horaVisita: ''
  });

  const datasIndisponiveis = [
    '2025-06-01',
    '2025-06-05',
    '2025-06-10'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'dataVisita' && datasIndisponiveis.includes(value)) {
      alert('Data indisponível. Por favor, escolha outra data.');
      return;
    }
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Agendamento enviado! Entraremos em contato.');
    setFormData({
      nome: '',
      telefone: '',
      dataVisita: '',
      horaVisita: ''
    });
    navigate('/home');
  };

  return (
    <div className="agendar-container">
      <h1 className="title">Agendar Visita</h1>
      <form onSubmit={handleSubmit} className="form">
        <label className="label">Nome completo:</label>
        <input
          type="text"
          name="nome"
          value={formData.nome}
          onChange={handleInputChange}
          required
          className="input"
        />
        <label className="label">Telefone:</label>
        <input
          type="tel"
          name="telefone"
          value={formData.telefone}
          onChange={handleInputChange}
          required
          className="input"
        />
        <label className="label">Escolha a data da visita:</label>
        <input
          type="date"
          name="dataVisita"
          value={formData.dataVisita}
          onChange={handleInputChange}
          required
          className="input"
        />
        <label className="label">Escolha o horário:</label>
        <select
          name="horaVisita"
          value={formData.horaVisita}
          onChange={handleInputChange}
          required
          className="input"
        >
          <option value="">Selecione um horário</option>
          <option value="09:00">09:00</option>
          <option value="10:00">10:00</option>
          <option value="11:00">11:00</option>
          <option value="14:00">14:00</option>
          <option value="15:00">15:00</option>
          <option value="16:00">16:00</option>
        </select>
        <button type="submit" className="button">
          Agendar
        </button>
      </form>
    </div>
  );
}

export default Agendar;