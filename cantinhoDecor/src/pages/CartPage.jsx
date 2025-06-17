// src/pages/CartPage.jsx
// Página do Carrinho de Compras e Finalização do Pedido.

import React, { useState } from 'react';
import { useCart } from '../contexts/cartcontext'; // Importa o hook do carrinho
import { useAuth } from '../contexts/AuthContext'; // Importa o hook de autenticação

const CartPage = ({ setCurrentPage }) => {
    const { cartItems, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
    const { user, token } = useAuth(); // Precisa do user.id e do token para criar o pedido
    const [orderMessage, setOrderMessage] = useState('');
    const [orderError, setOrderError] = useState('');
    const [loadingOrder, setLoadingOrder] = useState(false);

    const handleCheckout = async () => {
        setLoadingOrder(true);
        setOrderMessage('');
        setOrderError('');

        if (!user || !token) {
            setOrderError('Você precisa estar logado para finalizar a compra.');
            setLoadingOrder(false);
            return;
        }

        if (cartItems.length === 0) {
            setOrderError('Seu carrinho está vazio!');
            setLoadingOrder(false);
            return;
        }

        const orderProducts = cartItems.map(item => ({
            productId: item.id, // O ID do produto do MongoDB
            quantity: item.quantity,
            name: item.name,
            price: item.price,
            imageUrl: item.imageUrl
        }));

        try {
            const response = await fetch('http://localhost:3000/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Envia o token de autenticação
                },
                body: JSON.stringify({ cartItems: orderProducts }),
            });

            const data = await response.json();

            if (response.ok) {
                setOrderMessage(`Pedido #${data._id} criado com sucesso! Total: R$ ${data.totalAmount.toFixed(2)}`);
                clearCart(); // Limpa o carrinho após a compra
                setTimeout(() => setCurrentPage('home'), 3000); // Redireciona após 3 segundos
            } else {
                setOrderError(data.message || 'Erro ao finalizar o pedido. Tente novamente.');
            }
        } catch (error) {
            console.error('Erro ao chamar API de Pedidos:', error);
            setOrderError('Não foi possível conectar ao servidor para finalizar o pedido. Tente novamente mais tarde.');
        } finally {
            setLoadingOrder(false);
        }
    };

    return (
        <div className="container page-section">
            <h1 className="llm-page-title animate-fade-in" style={{ color: '#059669' }}> {/* green-700 */}
                🛒 Seu Carrinho de Compras
            </h1>

            {cartItems.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2rem', backgroundColor: '#fff', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                    <p style={{ fontSize: '1.25rem', color: '#4b5563', marginBottom: '1rem' }}>Seu carrinho está vazio. Adicione alguns móveis!</p>
                    <button
                        className="llm-button primary-llm-button"
                        onClick={() => setCurrentPage('products')}
                    >
                        Ver Produtos
                    </button>
                </div>
            ) : (
                <div className="cart-layout" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}> {/* Adjusted to flex column on small screens */}
                    <div className="cart-items-list" style={{ flex: '2' }}>
                        {cartItems.map(item => (
                            <div key={item.id} className="cart-item-card shadow-lg rounded-xl" style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', padding: '1rem', backgroundColor: 'white' }}>
                                <img src={item.imageUrl} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '0.5rem', marginRight: '1rem' }} />
                                <div style={{ flexGrow: '1' }}>
                                    <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#1f2937' }}>{item.name}</h3>
                                    <p style={{ color: '#4b5563' }}>R$ {item.price.toFixed(2)}</p>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <input
                                        type="number"
                                        min="1"
                                        value={item.quantity}
                                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                                        style={{ width: '60px', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.25rem', textAlign: 'center' }}
                                    />
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        style={{ backgroundColor: '#ef4444', color: 'white', padding: '0.5rem 0.75rem', borderRadius: '0.25rem', border: 'none', cursor: 'pointer' }}
                                    >
                                        Remover
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="cart-summary-card shadow-lg rounded-xl" style={{ flex: '1', padding: '2rem', backgroundColor: 'white' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1.5rem' }}>Resumo do Pedido</h2>
                        <p style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#2563eb', marginBottom: '1.5rem' }}>Total: R$ {getTotalPrice().toFixed(2)}</p>
                        <button
                            className="llm-button primary-llm-button"
                            onClick={handleCheckout}
                            disabled={loadingOrder}
                            style={{ width: '100%' }}
                        >
                            {loadingOrder ? 'Processando...' : 'Finalizar Compra'}
                        </button>
                        {orderMessage && <p style={{ color: '#16a34a', textAlign: 'center', marginTop: '1rem' }}>{orderMessage}</p>}
                        {orderError && <p style={{ color: '#dc2626', textAlign: 'center', marginTop: '1rem' }}>{orderError}</p>}
                        {!user && <p style={{ color: '#6b7280', textAlign: 'center', marginTop: '1rem', fontSize: '0.9rem' }}>Faça login para finalizar a compra.</p>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;
