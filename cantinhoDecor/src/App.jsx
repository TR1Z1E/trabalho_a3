// src/App.jsx
// Este é o componente principal da sua aplicação React.
// Ele gerencia o roteamento "manual" entre as páginas e fornece o contexto de autenticação.

import React, { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext'; // Importa o AuthProvider
import { CartProvider } from './contexts/cartcontext'; // Importa o CartProvider
import Navbar from './components/Navbar'; // Importa a barra de navegação
import HomePage from './pages/HomePage'; // Importa as páginas
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductListPage from './pages/ProductListPage';
import ProductDescGeneratorPage from './pages/ProductDescGeneratorPage'; // Importa a nova página LLM
import CartPage from './pages/CartPage'; // Importa a página do carrinho

function App() {
    // Estado para controlar qual página está sendo exibida.
    // Em uma aplicação maior, você usaria uma biblioteca de roteamento como 'react-router-dom'.
    const [currentPage, setCurrentPage] = useState('home');

    // Função que decide qual componente de página renderizar com base no estado 'currentPage'.
    const renderPage = () => {
        switch (currentPage) {
            case 'home':
                return <HomePage setCurrentPage={setCurrentPage} />;
            case 'login':
                return <LoginPage setCurrentPage={setCurrentPage} />;
            case 'register':
                return <RegisterPage setCurrentPage={setCurrentPage} />;
            case 'products':
                return <ProductListPage />;
            case 'productGenerator':
                return <ProductDescGeneratorPage />;
            case 'cart': // Rota para a página do carrinho
                return <CartPage setCurrentPage={setCurrentPage} />;
            default:
                return <HomePage setCurrentPage={setCurrentPage} />;
        }
    };

    return (
        // O AuthProvider e o CartProvider envolvem toda a aplicação para que o estado
        // de autenticação e do carrinho esteja disponível para qualquer componente que precise dele.
        <AuthProvider>
            <CartProvider>
                <div style={{ minHeight: '100vh', backgroundColor: '#f8f8f8', fontFamily: 'Inter, sans-serif', color: '#1f2937' }}>
                    <Navbar setCurrentPage={setCurrentPage} />
                    <main>
                        {renderPage()}
                    </main>
                    <footer className="footer rounded-t-xl shadow-inner">
                        <div className="container">
                            <p>© 2025 Cantinho Decor. Todos os direitos reservados.</p>
                            <p className="small-text">Desenvolvido com paixão para o seu lar.</p>
                        </div>
                    </footer>
                </div>
            </CartProvider>
        </AuthProvider>
    );
}

export default App;
