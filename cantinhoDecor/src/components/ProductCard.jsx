// src/components/ProductCard.jsx
// Componente para exibir um único cartão de produto.

import React from 'react';
import { useCart } from '../contexts/cartcontext'; // Importa o hook do carrinho

const ProductCard = ({ product }) => {
    const { addToCart } = useCart(); // Obtém a função addToCart do contexto

    return (
        <div className="product-card hover-shadow-xl hover-scale-105 transition-all">
            {/* O atributo src da imagem pode ser uma URL de um serviço de hospedagem de imagens, ou um placeholder como este. */}
            {/* Certifique-se de que a URL seja válida e acessível. */}
            <img
                src={product.imageUrl}
                alt={product.name}
                style={{ transition: 'transform 0.3s ease-in-out' }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                // Fallback para imagem caso a URL falhe - mostra uma imagem genérica
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x300/cccccc/000000?text=Imagem+Nao+Disponivel'; }}
            />
            <div className="product-card-content">
                <h3 className="product-card-title">{product.name}</h3>
                <p className="product-card-price">R$ {product.price ? product.price.toFixed(2) : 'N/A'}</p>
                {/* Botão Adicionar ao Carrinho */}
                <button
                    className="product-card-button"
                    onClick={() => addToCart(product)}
                >
                    Adicionar ao Carrinho
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
