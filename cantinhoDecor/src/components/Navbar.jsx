// src/components/Navbar.jsx
// Componente da barra de navegação superior com links e botões de login/logout.

import React from 'react';
import { useAuth } from '../contexts/AuthContext'; // Importa o hook de autenticação
import { useCart } from '../contexts/cartcontext'; // Importa o hook do carrinho

const Navbar = ({ setCurrentPage }) => {
    const { user, logout } = useAuth(); // Obtém o usuário e a função de logout do contexto
    const { getTotalItems } = useCart(); // Obtém o total de itens no carrinho

    return (
        <nav className="navbar">
            <div className="container flex-between">
                <div className="logo hover-scale-105 transition-transform" onClick={() => setCurrentPage('home')}>
                    Cantinho Decor
                </div>
                <div className="navbar-links" style={{ display: 'flex', gap: '1.5rem' }}> {/* space-x-6 */}
                    <button className="transition-all hover-scale-105" onClick={() => setCurrentPage('home')}>Início</button>
                    <button className="transition-all hover-scale-105" onClick={() => setCurrentPage('products')}>Produtos</button>
                    <button className="transition-all hover-scale-105" onClick={() => setCurrentPage('productGenerator')}>✨ Gerar Descrição</button>
                    {/* Botão do Carrinho */}
                    <button className="transition-all hover-scale-105" onClick={() => setCurrentPage('cart')} style={{ position: 'relative' }}>
                        🛒 Carrinho ({getTotalItems()})
                        {getTotalItems() > 0 && (
                            <span style={{
                                position: 'absolute',
                                top: '-5px',
                                right: '-5px',
                                backgroundColor: '#ef4444', // red-500
                                color: 'white',
                                borderRadius: '50%',
                                padding: '2px 6px',
                                fontSize: '0.75rem',
                                fontWeight: 'bold',
                            }}>
                                {getTotalItems()}
                            </span>
                        )}
                    </button>
                    {user ? (
                        // Mostra o nome do usuário e o botão de sair se logado
                        <>
                            <span className="user-greeting">Olá, {user.email.split('@')[0]}</span>
                            <button
                                className="btn-logout transition-all hover-scale-105"
                                onClick={() => {
                                    logout();
                                    setCurrentPage('home'); 
                                }}
                            >
                                Sair
                            </button>
                        </>
                    ) : (
                        // Mostra botões de entrar e cadastrar se não logado
                        <>
                            <button className="btn-login transition-all hover-scale-105" onClick={() => setCurrentPage('login')}>Entrar</button>
                            <button className="btn-register transition-all hover-scale-105" onClick={() => setCurrentPage('register')}>Cadastrar</button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
