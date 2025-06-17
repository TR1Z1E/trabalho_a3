// src/pages/RegisterPage.jsx
// Página de cadastro de novo usuário com formulário e tratamento de submissão.

import React, { useState } from 'react';

const RegisterPage = ({ setCurrentPage }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(''); // Mensagem para feedback ao usuário
    const [isSuccess, setIsSuccess] = useState(false); // Para mudar a cor da mensagem

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(''); // Limpa mensagens anteriores
        setIsSuccess(false);

        if (password !== confirmPassword) {
            setMessage('As senhas não coincidem!');
            setIsSuccess(false);
            return;
        }

        try {
            // URL da sua API de cadastro. Certifique-se que o backend esteja rodando na porta 3000.
            const response = await fetch('http://localhost:3000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json(); // Pega a resposta JSON da API

            if (response.ok) { // Verifica se a requisição foi bem-sucedida (status 2xx)
                setMessage('Cadastro realizado com sucesso! Você pode fazer login agora.');
                setIsSuccess(true);
                setCurrentPage('login'); // Redireciona para a página de login
            } else {
                setMessage(data.message || 'Erro no cadastro.');
                setIsSuccess(false);
            }
        } catch (error) {
            console.error('Erro ao conectar com a API de cadastro:', error);
            setMessage('Não foi possível conectar ao servidor. Tente novamente mais tarde.');
            setIsSuccess(false);
        }
    };

    return (
        <div className="form-container" style={{ background: 'linear-gradient(to bottom right, #f3e8ff, #fbcfe8)' }}> {/* Cor de fundo diferente para cadastro */}
            <div className="form-card transition-all hover-scale-105">
                <h2 className="form-title">Cadastre-se</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">
                            Nome:
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            placeholder="Seu nome completo"
                            style={{ transition: 'all 0.2s ease-in-out' }}
                        />
                    </div>
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
                    <div className="form-group">
                        <label htmlFor="confirmPassword">
                            Confirmar Senha:
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            placeholder="Confirme sua senha"
                            style={{ transition: 'all 0.2s ease-in-out' }}
                        />
                    </div>
                    <button
                        type="submit"
                        className="form-submit-button"
                        style={{ backgroundColor: '#a855f7' }} /* purple-600 */
                    >
                        Cadastrar
                    </button>
                    {message && (
                        <p className={`message ${isSuccess ? 'success' : 'error'}`}>
                            {message}
                        </p>
                    )}
                </form>
                <p className="register-link-text">
                    Já tem conta?{' '}
                    <button
                        onClick={() => setCurrentPage('login')}
                        style={{ color: '#a855f7' }} /* purple-600 */
                    >
                        Faça Login
                    </button>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
