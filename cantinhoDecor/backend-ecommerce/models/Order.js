const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, // Referência ao ID do usuário
        ref: 'User', // Refere-se ao modelo 'User'
        required: true
    },
    products: [ // Array de produtos no pedido
        {
            product: {
                type: mongoose.Schema.Types.ObjectId, // Referência ao ID do produto
                ref: 'Product', // Refere-se ao modelo 'Product'
                required: true
            },
            name: { type: String, required: true }, // Nome do produto no momento da compra
            quantity: {
                type: Number,
                required: true,
                min: 1 // Quantidade mínima de 1
            },
            price: {
                type: Number,
                required: true,
                min: 0 // Preço do produto no momento da compra
            },
            imageUrl: {
                type: String,
                default: 'https://placehold.co/100x100/cccccc/000000?text=Produto' // Imagem do produto no momento da compra
            }
        }
    ],
    totalAmount: {
        type: Number,
        required: true,
        min: 0
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'], // Status possíveis do pedido
        default: 'pending'
    }
});

module.exports = mongoose.model('Order', OrderSchema);
