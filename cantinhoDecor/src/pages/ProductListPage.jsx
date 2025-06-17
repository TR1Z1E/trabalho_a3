// src/pages/ProductListPage.jsx
// Página que exibe a lista de todos os produtos, buscando-os da API.

import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard'; // Importa o componente de cartão de produto

const ProductListPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // URL da sua API de produtos. Certifique-se que o backend esteja rodando na porta 3000.
                const response = await fetch('http://localhost:3000/api/products');
                if (!response.ok) {
                    throw new Error(`Erro HTTP! status: ${response.status}`);
                }
                const data = await response.json(); // Pega a resposta JSON da API
                setProducts(data); // Define os produtos no estado
            } catch (err) {
                console.error("Erro ao buscar produtos:", err);
                setError('Não foi possível carregar os produtos. Tente novamente mais tarde.');
            } finally {
                setLoading(false); // Finaliza o estado de carregamento
            }
        };

        fetchProducts(); // Chama a função para buscar produtos ao montar o componente
    }, []); // O array vazio garante que o efeito rode apenas uma vez

    if (loading) {
        return (
            <div className="product-loading">
                Carregando produtos...
                <div className="spinner"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="product-loading" style={{ color: '#dc2626' }}> {/* red-600 */}
                Erro: {error}
            </div>
        );
    }

    return (
        <div className="container page-section">
            <h1 className="product-list-page-title animate-fade-in">
                Nossos Produtos
            </h1>
            <div className="products-grid">
                {products.length > 0 ? (
                    products.map(product => (
                        <ProductCard key={product._id} product={product} /> // Renderiza um ProductCard para cada produto
                    ))
                ) : (
                    <p style={{ textAlign: 'center', color: '#6b7280', fontSize: '1.25rem', gridColumn: '1 / -1' }}>Nenhum produto encontrado.</p>
                )}
            </div>
        </div>
    );
};

export default ProductListPage;
