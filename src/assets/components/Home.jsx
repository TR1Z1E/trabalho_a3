import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import '../../styles/home.css';
import Logo from '../imgs/Logo copy.png';
import ImageHome from '../imgs/img-home1.png';
import Servico1 from '../imgs/Servico 1.png';
import Servico2 from '../imgs/Servico 2.png';
import Servico3 from '../imgs/Servico 3.png';

import Facebook from '../imgs/facebook.png';
import Instagram from '../imgs/instagram.png';
import Twitter from '../imgs/twitter.png';
import Youtube from '../imgs/youtube.png';

import BackToTop from '../imgs/Back to top.png';

function Home() {
  const navigate = useNavigate();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalFormVisible, setModalFormVisible] = useState(false);
  const [selectedImovel, setSelectedImovel] = useState(null);
  const [imoveis, setImoveis] = useState([]);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    numero: '',
    email: '',
    mensagem: ''
  });

  useEffect(() => {
    fetch('../../../public/dados.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao carregar o arquivo JSON');
        }
        return response.json();
      })
      .then(data => setImoveis(data))
      .catch(error => console.error('Erro ao carregar os imóveis:', error));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCardClick = (imovel) => {
    setSelectedImovel(imovel);
    setModalVisible(true);
  };

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form enviado:', formData);
    setModalFormVisible(false);
    setFormData({ nome: '', numero: '', email: '', mensagem: '' });
  };

  const handleComprar = () => {
    navigate('/agendar');
  };

  return (
    <>
      <header className="top-bar">
        <div className="logo">
          <img src={Logo} alt="Logo do site" />
        </div>
        <h1 className="h1-topBar">Agência Batatinha</h1>
        <nav>
          <div className="nav-links">
            <Link to="/contato" className="contato">Contato</Link>
            <Link to="/" className="sair">Sair</Link>
          </div>
        </nav>
      </header>

      <main id="topo">
        <div className="img-home">
          <div className="img-home-text">
            <h2 style={{ color: 'rgb(0, 0, 0)' }}>
              Encontre as melhores casas, pontos comerciais e hotéis
            </h2>
          </div>
        </div>
      </main>

      <section className="servicos-section">
        <h2 className="paragrafo">Nossos Serviços</h2>
        <div className="servicos-cards">
          <Link to="/erro"><img src={Servico1} alt="Móveis Residenciais" /></Link>
          <Link to="/erro"><img src={Servico2} alt="Móveis Comerciais" /></Link>
          <Link to="/erro"><img src={Servico3} alt="Hotéis" /></Link>
        </div>
      </section>

      <section className="oportunidades">
        <h2 className="titulo-oportunidades">Melhores oportunidades</h2>
        <div className="cards-oportunidades">
          {imoveis.map((imovel, index) => (
            <div key={index} className="card">
              <img
                src={imovel.image}
                alt="Imagem do imóvel"
                style={{ cursor: 'pointer' }}
                onClick={() => handleCardClick(imovel)}
              />
              <p className="preco">{imovel.price}</p>
              <p className="info">{imovel.size} m²</p>
              <div className="tags">
                <span className="tag">{imovel.bedrooms} quarto</span>
                <span className="tag">{imovel.bathrooms} banheiro</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-left">
            <div className="contato">
              <h4>Contato</h4>
              <p>agênciabatatinha@gmail.com</p>
              <p>(11) 99402-8922</p>
              <div className="redes-sociais">
                <a href="#"><img src={Facebook} alt="Facebook" /></a>
                <a href="#"><img src={Instagram} alt="Instagram" /></a>
                <a href="#"><img src={Twitter} alt="Twitter" /></a>
                <a href="#"><img src={Youtube} alt="YouTube" /></a>
              </div>
            </div>
          </div>
          <div className="creditos">
            <p>Feito por Agência batatinha – Todos os Direitos Reservados</p>
          </div>
          <div className="voltar-topo">
            {showBackToTop && (
              <img
                src={BackToTop}
                alt="Voltar ao topo"
                onClick={scrollToTop}
                style={{ cursor: 'pointer' }}
              />
            )}
          </div>
        </div>
      </footer>

      {modalVisible && selectedImovel && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setModalVisible(false)}>&times;</span>
            <img src={selectedImovel.image} alt="Imagem do imóvel" />
            <div className="modal-footer">
              <div className="modal-tags">
                <span>{selectedImovel.bedrooms} quarto(s)</span>
                <span>{selectedImovel.bathrooms} banheiro(s)</span>
                <span>{selectedImovel.size} m²</span>
              </div>
              <div className="modal-compra">
                <div className="modal-preco">{selectedImovel.price}</div>
                <button className="form-contato-btn" onClick={() => setModalFormVisible(true)}>Contatar</button>
                <button className="btn-comprar" onClick={handleComprar}>Comprar</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {modalFormVisible && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setModalFormVisible(false)}>&times;</span>
            <h2>Entre em Contato</h2>
            <form className="form-contato" onSubmit={handleSubmit}>
              <label htmlFor="nome">Nome:</label>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="numero">Número:</label>
              <input
                type="tel"
                name="numero"
                value={formData.numero}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="email">E-mail:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="mensagem">Mensagem:</label>
              <textarea
                name="mensagem"
                rows="4"
                value={formData.mensagem}
                onChange={handleInputChange}
                required
              />
              <button type="submit">Enviar</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;