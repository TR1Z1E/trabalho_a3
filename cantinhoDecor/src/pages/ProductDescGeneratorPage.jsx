// src/pages/ProductDescGeneratorPage.jsx
// Nova página para gerar descrições de produtos usando a API Gemini LLM.

import React, { useState } from 'react';

const ProductDescGeneratorPage = () => {
    const [productInput, setProductInput] = useState('');
    const [generatedDescription, setGeneratedDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [copyMessage, setCopyMessage] = useState('');

    const handleGenerateDescription = async () => {
        setLoading(true);
        setGeneratedDescription('');
        setError('');
        setCopyMessage('');

        const prompt = `Gere uma descrição de produto de e-commerce envolvente e detalhada para o seguinte item: "${productInput}". Inclua detalhes sobre material, estilo, uso, e benefícios.`;

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
                setGeneratedDescription(result.candidates[0].content.parts[0].text);
            } else {
                setError('Não foi possível gerar a descrição. Tente novamente.');
            }
        } catch (apiError) {
            console.error('Erro ao chamar Gemini API para descrição do produto:', apiError);
            setError('Ocorreu um erro ao conectar com a IA. Verifique sua conexão ou tente novamente mais tarde.');
        } finally {
            setLoading(false);
        }
    };

    const handleCopyToClipboard = () => {
        if (generatedDescription) {
            // Usa document.execCommand('copy') como fallback se navigator.clipboard.writeText falhar
            // em ambientes de iframe restritos.
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(generatedDescription)
                    .then(() => {
                        setCopyMessage('Copiado para a área de transferência!');
                        setTimeout(() => setCopyMessage(''), 2000); // Limpa a mensagem após 2 segundos
                    })
                    .catch(() => {
                        console.warn('Falha ao usar navigator.clipboard.writeText, tentando execCommand.');
                        try {
                            const textarea = document.createElement('textarea');
                            textarea.value = generatedDescription;
                            textarea.style.position = 'fixed'; // Impede rolagem
                            document.body.appendChild(textarea);
                            textarea.select();
                            document.execCommand('copy');
                            document.body.removeChild(textarea);
                            setCopyMessage('Copiado para a área de transferência!');
                            setTimeout(() => setCopyMessage(''), 2000);
                        } catch (err) {
                            setCopyMessage('Erro ao copiar. Tente selecionar e copiar manualmente.');
                            console.error('Falha ao copiar com execCommand:', err);
                        }
                    });
            } else {
                // Fallback mais antigo para browsers sem navigator.clipboard
                try {
                    const textarea = document.createElement('textarea');
                    textarea.value = generatedDescription;
                    textarea.style.position = 'fixed';
                    document.body.appendChild(textarea);
                    textarea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textarea);
                    setCopyMessage('Copiado para a área de transferência!');
                    setTimeout(() => setCopyMessage(''), 2000);
                } catch (err) {
                    setCopyMessage('Erro ao copiar. Tente selecionar e copiar manualmente.');
                    console.error('Falha ao copiar com execCommand:', err);
                }
            }
        }
    };

    return (
        <div className="container page-section">
            <h1 className="llm-page-title animate-fade-in">
                ✨ Gerador de Descrição de Produto
            </h1>
            <p className="llm-intro-text">
                Insira algumas características básicas do seu móvel e deixe nossa IA criar uma descrição de e-commerce completa e atraente.
            </p>

            <div className="llm-input-group" style={{ marginBottom: '2rem' }}>
                <textarea
                    className="llm-textarea"
                    value={productInput}
                    onChange={(e) => setProductInput(e.target.value)}
                    placeholder="Ex: Sofá de 3 lugares, cor cinza, veludo, design moderno, confortável, para sala de estar pequena."
                    rows="6"
                ></textarea>
                <button
                    className="llm-button primary-llm-button"
                    onClick={handleGenerateDescription}
                    disabled={loading}
                >
                    {loading ? 'Gerando...' : 'Gerar Descrição'}
                </button>
            </div>

            {loading && <div className="spinner llm-spinner"></div>}
            {error && <p className="llm-error-message">{error}</p>}

            {generatedDescription && (
                <div className="llm-result-box shadow-lg rounded-xl animate-fade-in">
                    <h3 className="llm-result-title">Descrição Gerada:</h3>
                    <textarea
                        className="llm-textarea result-textarea"
                        value={generatedDescription}
                        readOnly
                        rows="10"
                    ></textarea>
                    <button
                        className="llm-button secondary-llm-button"
                        onClick={handleCopyToClipboard}
                    >
                        Copiar Descrição
                    </button>
                    {copyMessage && <p className="llm-copy-message">{copyMessage}</p>}
                </div>
            )}
        </div>
    );
};

export default ProductDescGeneratorPage;
