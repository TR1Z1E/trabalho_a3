const express = require('express'); // Declaração da biblioteca Express
const router = express.Router();
const productController = require('../controllers/productController');
// Se você quiser proteger as rotas de criação/atualização/exclusão de produtos,
// descomente e importe um middleware de autenticação, ex:
// const authMiddleware = require('../middleware/auth'); // Você precisaria criar este arquivo

// Rotas públicas (não precisam de autenticação para acesso)
router.get('/', productController.getAllProducts); // Rota para obter todos os produtos
router.get('/:id', productController.getProductById); // Rota para obter um produto por ID

// Rotas para gerenciar produtos (idealmente protegidas por autenticação para admins)
// Para proteger essas rotas, você as definiria assim:
// router.post('/', authMiddleware, productController.createProduct);
// No exemplo atual, elas estão desprotegidas para facilitar o teste inicial.
router.post('/', productController.createProduct); // Rota para criar um novo produto
router.put('/:id', productController.updateProduct); // Rota para atualizar um produto
router.delete('/:id', productController.deleteProduct); // Rota para deletar um produto

module.exports = router;