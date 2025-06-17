const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // O nome do produto é obrigatório
        trim: true
    },
    description: {
        type: String,
        required: true, // A descrição é obrigatória
        trim: true
    },
    price: {
        type: Number,
        required: true, // O preço é obrigatório
        min: 0 // Preço não pode ser negativo
    },
    imageUrl: {
        type: String,
        default: 'https://placehold.co/400x300/cccccc/000000?text=Imagem+Padrao' // Imagem padrão se nenhuma for fornecida
    },
    category: {
        type: String,
        trim: true,
        default: 'Geral' // Categoria padrão
    },
    stock: {
        type: Number,
        required: true, // Estoque é obrigatório
        min: 0,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now // Define a data de criação automaticamente
    }
});

module.exports = mongoose.model('Product', ProductSchema);