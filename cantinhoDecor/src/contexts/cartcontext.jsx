// src/contexts/CartContext.jsx
// Este arquivo gerencia o estado do carrinho de compras globalmente na aplicação.

import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
    // Inicializa o carrinho do localStorage ou como um array vazio
    const [cartItems, setCartItems] = useState(() => {
        const localData = localStorage.getItem('cartItems');
        return localData ? JSON.parse(localData) : [];
    });

    // Salva o carrinho no localStorage sempre que ele muda
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.id === product._id);
            if (existingItem) {
                // Se o item já existe, aumenta a quantidade
                return prevItems.map((item) =>
                    item.id === product._id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                // Se o item não existe, adiciona-o com quantidade 1
                return [...prevItems, { ...product, id: product._id, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (productId) => {
        setCartItems((prevItems) =>
            prevItems.filter((item) => item.id !== productId)
        );
    };

    const updateQuantity = (productId, newQuantity) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === productId ? { ...item, quantity: newQuantity } : item
            ).filter(item => item.quantity > 0) // Remove se a quantidade for 0
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const getTotalItems = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                getTotalItems,
                getTotalPrice,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
};
