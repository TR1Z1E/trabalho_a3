import React from 'react';
import '../../styles/erro.css';

import Logo from '../imgs/logo.png';
import EmConstrucao from '../imgs/em-construcao.png';
import Facebook from '../imgs/facebook.png';
import Instagram from '../imgs/instagram.png';
import Youtube from '../imgs/youtube.png';
import Twitter from '../imgs/twitter.png';

function Erro() {
  const handleVoltar = () => {
    window.history.back();
  };

  return (
    <>
      <header>
        <img src={Logo} alt="Logo" />
        <h1 className="h1-header">Agência batatinha</h1>
      </header>

      <main>
        <div className="left">
          <h2>
            <span>Oops...</span><br />
            <strong>Página<br />em construção</strong>
          </h2>
          <p>Estamos trabalhando, em breve retorne aqui.</p>
          <button onClick={handleVoltar} className="voltar">
            Voltar
          </button>

          <div className="social">
            <a href="https://www.facebook.com/compass.uol/?locale=pt_BR" target="_blank" rel="noopener noreferrer">
              <img src={Facebook} alt="Facebook" />
            </a>
            <a href="https://www.instagram.com/compass.uol/" target="_blank" rel="noopener noreferrer">
              <img src={Instagram} alt="Instagram" />
            </a>
            <a href="https://www.youtube.com/c/Compassuol" target="_blank" rel="noopener noreferrer">
              <img src={Youtube} alt="YouTube" />
            </a>
            <a href="https://x.com/compassuol" target="_blank" rel="noopener noreferrer">
              <img src={Twitter} alt="Twitter" />
            </a>
          </div>
        </div>

        <div className="right">
          <img src={EmConstrucao} alt="Ilustração de construção" />
        </div>
      </main>

      <footer>
        <p>&copy; 2023 Agência batatinha. Todos os direitos reservados.</p>
      </footer>
    </>
  );
}

export default Erro;