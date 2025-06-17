const Order = require('../models/Order'); // Importa o modelo de Pedido
const Product = require('../models/Product'); // Importa o modelo de Produto para verificar estoque
const jwt = require('jsonwebtoken'); // Para decodificar o token JWT e obter o ID do usuário

// Middleware de autenticação real (exemplo de como seria em produção)
// IMPORTANTE: Em um aplicativo real, você usaria um middleware robusto
// para verificar o JWT e popular req.user.
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Espera "Bearer TOKEN"

    if (token == null) {
        return res.status(401).json({ message: 'Token de autenticação não fornecido.' });
    }

    try {
        // Usar a mesma chave secreta definida no server.js e authController.js
        const jwtSecret = process.env.JWT_SECRET;
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded.user; // Anexa o payload do usuário à requisição
        next();
    } catch (err) {
        console.error('Erro de autenticação:', err.message);
        return res.status(403).json({ message: 'Token de autenticação inválido ou expirado.' });
    }
};


// Criar um novo pedido
// Rota: POST /api/orders
// Acesso: Privado (requer autenticação)
exports.createOrder = async (req, res) => {
    // O middleware authenticateToken precisa ser aplicado antes desta função na rota.
    // req.user.id virá do token autenticado.
    const userId = req.user.id;
    const { cartItems } = req.body; // cartItems deve ser um array de { productId, quantity }

    if (!cartItems || cartItems.length === 0) {
        return res.status(400).json({ message: 'O carrinho está vazio. Adicione itens para criar um pedido.' });
    }

    let totalAmount = 0;
    const productsInOrder = [];

    try {
        for (const item of cartItems) {
            const product = await Product.findById(item.productId);

            if (!product) {
                return res.status(404).json({ message: `Produto com ID ${item.productId} não encontrado.` });
            }
            if (product.stock < item.quantity) {
                return res.status(400).json({ message: `Estoque insuficiente para o produto ${product.name}.` });
            }

            // Reduz o estoque (exemplo simples, em produção usaria transações)
            // product.stock -= item.quantity;
            // await product.save();

            productsInOrder.push({
                product: product._id,
                name: product.name,
                quantity: item.quantity,
                price: product.price,
                imageUrl: product.imageUrl // Salva a URL da imagem no pedido
            });
            totalAmount += product.price * item.quantity;
        }

        const newOrder = new Order({
            user: userId,
            products: productsInOrder,
            totalAmount: totalAmount
        });

        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);

    } catch (err) {
        console.error('Erro ao criar pedido:', err.message);
        res.status(500).send('Erro no servidor ao criar pedido.');
    }
};

// Obter todos os pedidos de um usuário específico
// Rota: GET /api/orders/my
// Acesso: Privado (requer autenticação)
exports.getOrdersByUser = async (req, res) => {
    // req.user.id virá do token autenticado.
    const userId = req.user.id;

    try {
        // Popula os detalhes dos produtos referenciados no pedido
        const orders = await Order.find({ user: userId }).populate('products.product');
        res.json(orders);
    } catch (err) {
        console.error('Erro ao buscar pedidos do usuário:', err.message);
        res.status(500).send('Erro no servidor ao buscar pedidos.');
    }
};

// Obter um pedido por ID (para admins ou usuário que fez o pedido)
// Rota: GET /api/orders/:id
// Acesso: Privado (requer autenticação)
exports.getOrderById = async (req, res) => {
    // req.user.id virá do token autenticado.
    const orderId = req.params.id;
    const userId = req.user.id; // ID do usuário do token

    try {
        const order = await Order.findById(orderId).populate('products.product');

        if (!order) {
            return res.status(404).json({ message: 'Pedido não encontrado.' });
        }

        // Garante que apenas o usuário que fez o pedido (ou um admin) possa vê-lo
        if (order.user.toString() !== userId) {
            return res.status(403).json({ message: 'Acesso não autorizado a este pedido.' });
        }

        res.json(order);
    } catch (err) {
        console.error('Erro ao buscar pedido por ID:', err.message);
        res.status(500).send('Erro no servidor ao buscar pedido por ID.');
    }
};