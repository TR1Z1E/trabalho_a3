const express = require('express'); // Declaração da biblioteca Express
const router = express.Router();
const orderController = require('../controllers/orderController'); // Importa o controlador de pedidos
// Você precisará de um middleware de autenticação real para proteger estas rotas
const authenticateToken = orderController.authenticateToken; // Reutiliza o middleware do controlador

// Rota para criar um novo pedido (requer autenticação do usuário)
// Recebe: { cartItems: [{ productId, quantity }] } no corpo da requisição
router.post('/', authenticateToken, orderController.createOrder);

// Rota para obter todos os pedidos do usuário logado (requer autenticação)
router.get('/my', authenticateToken, orderController.getOrdersByUser);

// Rota para obter um pedido específico por ID (requer autenticação e que o usuário seja o dono do pedido)
router.get('/:id', authenticateToken, orderController.getOrderById);

module.exports = router;
