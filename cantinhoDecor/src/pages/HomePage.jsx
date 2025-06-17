// src/pages/HomePage.jsx
// Página inicial do e-commerce, com produtos em destaque e a nova seção de Sugestão de Estilo de Ambiente.

import React, { useState } from 'react';
import ProductCard from '../components/ProductCard'; // Importa o componente de cartão de produto

const HomePage = ({ setCurrentPage }) => {
    // Dados de produtos em destaque mockados para a página inicial
    // URLs de imagens atualizadas para simular fotos de móveis mais variadas e descritivas.
    // Em um cenário real, estas URLs viriam do seu backend/API de produtos.
    const featuredProducts = [
        { _id: 'prod001', name: 'Sofá Modular Cinza', price: 2500, imageUrl: '../../public/img/sofamodular.webp' },
        { _id: 'prod002', name: 'Mesa de Jantar Retangular', price: 1800, imageUrl: '../../public/img/mesa_de_jantar_retangular_6_lugares_180x90cm_salgueiro_cabeca_1571874916_d730_600x600.jpg' },
        { _id: 'prod003', name: 'Poltrona de Leitura Azul', price: 950, imageUrl: '../../public/img/poltrona de leitura azul.jpg' },
        { _id: 'prod004', name: 'Estante de Livros Grande', price: 1200, imageUrl: '../../public/img/estante de livros.jpg' },
        { _id: 'prod005', name: 'Cama Box Queen Size', price: 3200, imageUrl: '../../public/img/Conjunto_Cama_Box_Queen_Size_Alford_158x198x66_Bege_Molas_Ensacadas__jpg.webp' },
        { _id: 'prod006', name: 'Guarda-Roupa 6 Portas', price: 2800, imageUrl: '../../public/img/guarda roupa 6 portas.webp' },
        { _id: 'prod007', name: 'Rack para Sala de TV', price: 750, imageUrl: '../../public/img/rack para sala.webp' },
        { _id: 'prod008', name: 'Cômoda Clássica de Madeira', price: 950, imageUrl: '../../public/img/comoda classica.jpeg' },
    ];

    const [stylePrompt, setStylePrompt] = useState('');
    const [styleSuggestion, setStyleSuggestion] = useState('');
    const [loadingStyle, setLoadingStyle] = useState(false);
    const [styleError, setStyleError] = useState('');

    const handleGenerateStyleSuggestion = async () => {
        setLoadingStyle(true);
        setStyleSuggestion('');
        setStyleError('');

        const prompt = `Gere uma breve sugestão de móveis e decoração para um ambiente com o seguinte estilo/vibração: "${stylePrompt}". Foco em móveis para casa.`;

        try {
            const payload = { contents: [{ role: "user", parts: [{ text: prompt }] }] };
            const apiKey = ""; // A API Key será fornecida automaticamente pelo ambiente Canvas.
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (result.candidates && result.candidates.length > 0 &&
                result.candidates[0].content && result.candidates[0].content.parts &&
                result.candidates[0].content.parts.length > 0) {
                setStyleSuggestion(result.candidates[0].content.parts[0].text);
            } else {
                setStyleError('Não foi possível gerar a sugestão. Tente novamente.');
            }
        } catch (error) {
            console.error('Erro ao chamar Gemini API para sugestão de estilo:', error);
            setStyleError('Ocorreu um erro ao conectar com a IA. Tente novamente mais tarde.');
        } finally {
            setLoadingStyle(false);
        }
    };


    return (
        <div className="container page-section">
            <h1 className="homepage-title animate-fade-in">
                Bem-vindo à Cantinho Decor
            </h1>
            <p className="homepage-subtitle">
                Transforme sua casa com nossos móveis de design exclusivo e alta qualidade.
            </p>

            <section className="featured-products-section">
                <h2 className="section-title">
                    Produtos em Destaque
                </h2>
                <div className="products-grid">
                    {featuredProducts.map(product => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
                <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                    <button
                        className="view-all-products-button"
                        onClick={() => setCurrentPage('products')}
                    >
                        Ver Todos os Produtos
                    </button>
                </div>
            </section>

            {/* Nova Seção: Sugestão de Estilo de Ambiente */}
            <section className="llm-section animate-slide-up rounded-2xl shadow-lg">
                <h2 className="section-title">✨ Sugestão de Estilo de Ambiente</h2>
                <p className="llm-intro-text">
                    Descreva o estilo ou a atmosfera que você busca para um ambiente, e nossa IA irá sugerir móveis e ideias de decoração.
                </p>
                <div className="llm-input-group">
                    <textarea
                        className="llm-textarea"
                        value={stylePrompt}
                        onChange={(e) => setStylePrompt(e.target.value)}
                        placeholder="Ex: Sala de estar minimalista com toque aconchegante, Quarto de casal rústico e moderno..."
                        rows="3"
                    ></textarea>
                    <button
                        className="llm-button primary-llm-button"
                        onClick={handleGenerateStyleSuggestion}
                        disabled={loadingStyle}
                    >
                        {loadingStyle ? 'Gerando...' : 'Gerar Sugestão'}
                    </button>
                </div>
                {loadingStyle && <div className="spinner llm-spinner"></div>}
                {styleError && <p className="llm-error-message">{styleError}</p>}
                {styleSuggestion && (
                    <div className="llm-result-box">
                        <h3 className="llm-result-title">Sua Sugestão:</h3>
                        <p>{styleSuggestion}</p>
                    </div>
                )}
            </section>

            <section className="mission-section animate-slide-up rounded-2xl shadow-inner-xl" style={{marginTop: '3rem'}}>
                <h2 className="section-title" style={{ marginBottom: '2rem' }}>
                    Nossa Missão
                </h2>
                <p className="mission-text">
                    Na Cantinho Decor, acreditamos que um lar bem mobiliado contribui para o bem-estar e a felicidade.
                    Oferecemos peças que combinam funcionalidade, estética e durabilidade, garantindo que cada canto da sua casa
                    reflita seu estilo e atenda às suas necessidades.
                </p>
            </section>
        </div>
    );
};

export default HomePage;
