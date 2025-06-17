const express = require('express');
const router = express.Router();

// Importa o controlador de pedidos (com o nome correto)
const orderController = require('../controllers/orderControler');

// Importa corretamente o middleware de autenticação
const authenticateToken = require('../middleware/authenticateToken.js');

// Rota para criar um novo pedido (requer autenticação)
router.post('/', authenticateToken, orderController.createOrder);

// Rota para obter todos os pedidos do usuário logado (requer autenticação)
router.get('/my', authenticateToken, orderController.getOrdersByUser);

// Rota para obter um pedido específico por ID (requer autenticação)
router.get('/:id', authenticateToken, orderController.getOrderById);

module.exports = router;