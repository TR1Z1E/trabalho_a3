const Product = require('../models/Product'); // Importa o modelo de Produto

// Middleware de autenticação simplificado (para demonstrar onde seria usado).
// Em um ambiente de produção, este middleware decodificaria e validaria o token JWT.
// Por simplicidade, neste exemplo, as rotas de criação/atualização/exclusão de produtos
// NÃO ESTÃO PROTEGIDAS por este middleware, mas o local de uso é indicado.
const authMiddleware = (req, res, next) => {
    // Exemplo de como um token seria extraído (geralmente do cabeçalho Authorization)
    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({ message: 'Nenhum token, autorização negada.' });
    }

    try {
        // EM PRODUÇÃO: Você usaria jwt.verify(token, process.env.JWT_SECRET) aqui
        // const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // req.user = decoded.user; // Anexa o payload do usuário à requisição
        next(); // Continua para a próxima função middleware/rota
    } catch (err) {
        // Erro de token inválido ou expirado
        console.error('Erro de autenticação (token inválido):', err.message);
        res.status(401).json({ message: 'Token inválido.' });
    }
};

// Obter todos os produtos
// Rota: GET /api/products
// Acesso: Público
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({}); // Encontra todos os produtos na coleção
        res.json(products); // Retorna a lista de produtos como JSON
    } catch (err) {
        console.error('Erro ao buscar produtos:', err.message);
        res.status(500).send('Erro no servidor ao buscar produtos.');
    }
};

// Obter um produto por ID
// Rota: GET /api/products/:id
// Acesso: Público
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id); // Busca um produto pelo ID fornecido na URL
        if (!product) {
            return res.status(404).json({ message: 'Produto não encontrado.' });
        }
        res.json(product); // Retorna o produto encontrado como JSON
    } catch (err) {
        console.error('Erro ao buscar produto por ID:', err.message);
        res.status(500).send('Erro no servidor ao buscar produto por ID.');
    }
};

// Criar um novo produto
// Rota: POST /api/products
// Acesso: Privado (idealmente para admins) - Atualmente não protegido por middleware de autenticação
exports.createProduct = async (req, res) => {
    // Você pode adicionar `authMiddleware` aqui para proteger esta rota, ex:
    // authMiddleware(req, res, () => { ... lógica ... });
    const { name, description, price, imageUrl, category, stock } = req.body;

    try {
        const newProduct = new Product({ // Cria uma nova instância de Produto
            name,
            description,
            price,
            imageUrl,
            category,
            stock
        });

        const product = await newProduct.save(); // Salva o novo produto no banco de dados
        res.status(201).json(product); // Retorna o produto criado com status 201 (Created)
    } catch (err) {
        console.error('Erro ao criar produto:', err.message);
        res.status(500).send('Erro no servidor ao criar produto.');
    }
};

// Atualizar um produto existente
// Rota: PUT /api/products/:id
// Acesso: Privado (idealmente para admins) - Atualmente não protegido
exports.updateProduct = async (req, res) => {
    // Você pode adicionar `authMiddleware` aqui para proteger esta rota
    const { name, description, price, imageUrl, category, stock } = req.body;

    // Constrói um objeto com os campos a serem atualizados, apenas se estiverem presentes na requisição
    const productFields = {};
    if (name) productFields.name = name;
    if (description) productFields.description = description;
    if (price) productFields.price = price;
    if (imageUrl) productFields.imageUrl = imageUrl;
    if (category) productFields.category = category;
    if (stock) productFields.stock = stock;

    try {
        let product = await Product.findById(req.params.id); // Encontra o produto pelo ID

        if (!product) {
            return res.status(404).json({ message: 'Produto não encontrado.' });
        }

        // Atualiza o produto no banco de dados e retorna o documento atualizado
        product = await Product.findByIdAndUpdate(
            req.params.id,
            { $set: productFields }, // Define os campos a serem atualizados
            { new: true } // Garante que o documento retornado é o atualizado
        );

        res.json(product); // Retorna o produto atualizado
    } catch (err) {
        console.error('Erro ao atualizar produto:', err.message);
        res.status(500).send('Erro no servidor ao atualizar produto.');
    }
};

// Deletar um produto
// Rota: DELETE /api/products/:id
// Acesso: Privado (idealmente para admins) - Atualmente não protegido
exports.deleteProduct = async (req, res) => {
    // Você pode adicionar `authMiddleware` aqui para proteger esta rota
    try {
        const product = await Product.findById(req.params.id); // Encontra o produto pelo ID

        if (!product) {
            return res.status(404).json({ message: 'Produto não encontrado.' });
        }

        await Product.findByIdAndDelete(req.params.id); // Deleta o produto do banco de dados

        res.json({ message: 'Produto removido com sucesso.' }); // Retorna mensagem de sucesso
    } catch (err) {
        console.error('Erro ao deletar produto:', err.message);
        res.status(500).send('Erro no servidor ao deletar produto.');
    }
};