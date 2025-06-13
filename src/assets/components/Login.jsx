import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import '../../styles/login.css';

import Logo from '../imgs/logo.png';
import LoginImage from '../imgs/loginImage.png';

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState({ texto: '', tipo: '' });

  const usuariosAutorizados = [
    { email: "beatriz@gmail.com", senha: "25042004" },
    { email: "example@gmail.com", senha: "batatinha123" },
  ];

  const handleEntrar = (e) => {
    e.preventDefault();
    setMensagem({ texto: '', tipo: '' });

    if (!email || !senha) {
      setMensagem({ texto: "Todos os campos são obrigatórios", tipo: "erro" });
      return;
    }

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email)) {
      setMensagem({ texto: "Email ou senha inválidos", tipo: "erro" });
      return;
    }

    if (senha.length < 8) {
      setMensagem({ texto: "Sua senha deve ter no mínimo 8 caracteres", tipo: "erro" });
      return;
    }

    const autorizado = usuariosAutorizados.some(
      (usuario) => usuario.email === email && usuario.senha === senha
    );

    if (!autorizado) {
      setMensagem({ texto: "Email ou senha incorretos", tipo: "erro" });
      return;
    }

    setMensagem({ texto: "Dados OK", tipo: "sucesso" });
    setTimeout(() => {
      navigate('/home');
    }, 1500);
  };

  const styles = {
    mensagem: {
      textAlign: 'center',
      fontWeight: 'bold',
      marginTop: '15px'
    },
    erro: {
      color: 'red'
    },
    sucesso: {
      color: 'green'
    }
  };

  return (
    <>
      <header className="top-bar">
        <div className="logo">
          <img src={Logo} alt="Logo do site" />
        </div>
        <h1 className="h1-topBar">Agência Batatinha</h1>
      </header>

      <div className="inv"></div>

      <div className="container">
        <div className="login-box">
          <h2 className="textLogin">Entre com seu email e senha</h2>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value.trim())}
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value.trim())}
          />

          <p style={{
            ...styles.mensagem,
            ...(mensagem.tipo === 'erro' ? styles.erro : styles.sucesso)
          }}>
            {mensagem.texto}
          </p>

          <button onClick={handleEntrar}>Entrar</button>

          <p className="text-bottom-login">
            Não possui uma conta?{' '}
            <Link to="/cadastro" className="criar">Criar</Link>
          </p>
        </div>

        <div className="line"></div>

        <div className="image-box">
          <h2 className="welcome-text">Bem-vindo à Agência Batatinha</h2>
          <img src={LoginImage} alt="Casa de luxo" />
        </div>
      </div>
    </>
  );
}

export default Login;
