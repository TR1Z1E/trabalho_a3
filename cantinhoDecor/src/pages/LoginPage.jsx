// src/pages/LoginPage.jsx
// Página de login do usuário com formulário e tratamento de submissão.

import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext'; // Importa o hook de autenticação

const LoginPage = ({ setCurrentPage }) => {
    const { login } = useAuth(); // Obtém a função de login do contexto
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(''); // Mensagem para feedback ao usuário
    const [isSuccess, setIsSuccess] = useState(false); // Para mudar a cor da mensagem

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(''); // Limpa mensagens anteriores
        setIsSuccess(false);

        try {
            // URL da sua API de login. Certifique-se que o backend esteja rodando na porta 3000.
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json(); // Pega a resposta JSON da API

            if (response.ok) { // Verifica se a requisição foi bem-sucedida (status 2xx)
                login(data.token, { id: data.userId, email: data.email, name: data.name }); // Atualiza o contexto de autenticação
                setMessage('Login bem-sucedido!');
                setIsSuccess(true);
                setCurrentPage('home'); // Redireciona para a página inicial
            } else {
                setMessage(data.message || 'Erro no login. Verifique suas credenciais.');
                setIsSuccess(false);
            }
        } catch (error) {
            console.error('Erro ao conectar com a API de login:', error);
            setMessage('Não foi possível conectar ao servidor. Tente novamente mais tarde.');
            setIsSuccess(false);
        }
    };

    return (
        <div className="form-container">
            <div className="form-card transition-all hover-scale-105">
                <h2 className="form-title">Entrar</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="seuemail@exemplo.com"
                            style={{ transition: 'all 0.2s ease-in-out' }}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">
                            Senha:
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Sua senha secreta"
                            style={{ transition: 'all 0.2s ease-in-out' }}
                        />
                    </div>
                    <button
                        type="submit"
                        className="form-submit-button"
                    >
                        Fazer Login
                    </button>
                    {message && (
                        <p className={`message ${isSuccess ? 'success' : 'error'}`}>
                            {message}
                        </p>
                    )}
                </form>
                <p className="login-link-text">
                    Ainda não tem conta?{' '}
                    <button
                        onClick={() => setCurrentPage('register')}
                    >
                        Cadastre-se aqui
                    </button>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
