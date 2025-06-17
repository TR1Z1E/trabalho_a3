const User = require('../models/user'); // Importa o modelo de Usuário
const bcrypt = require('bcryptjs'); // Biblioteca para criptografar senhas
const jwt = require('jsonwebtoken'); // Biblioteca para gerar e verificar tokens JWT

// Chave secreta para JWT. É lida da variável de ambiente JWT_SECRET.
// IMPORTANTE: Em produção, use uma chave muito complexa e guarde-a com segurança.
const jwtSecret = process.env.JWT_SECRET; // Defina em .env

// Função para registrar um novo usuário
// Rota: POST /api/auth/register
exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // 1. Verifica se o usuário já existe com o email fornecido
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'Usuário com este email já existe.' });
        }

        // 2. Cria uma nova instância de usuário
        user = new User({
            name,
            email,
            password,
        });

        // 3. Criptografa a senha antes de salvar
        const salt = await bcrypt.genSalt(10); // Gera um "salt" (valor aleatório) para a criptografia
        user.password = await bcrypt.hash(password, salt); // Criptografa a senha

        await user.save(); // Salva o novo usuário no banco de dados

        // 5. Responde com mensagem de sucesso
        res.status(201).json({ message: 'Usuário registrado com sucesso!' });

    } catch (err) {
        console.error('Erro no registro:', err.message);
        res.status(500).send('Erro no servidor ao registrar usuário.');
    }
};

// Função para fazer login de um usuário
// Rota: POST /api/auth/login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // 1. Verifica se o usuário existe pelo email
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Credenciais inválidas.' });
        }

        // 2. Compara a senha fornecida com a senha criptografada no banco
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Credenciais inválidas.' });
        }

        // 3. Cria um payload para o token JWT com o ID e email do usuário
        const payload = {
            user: {
                id: user.id,
                email: user.email,
            },
        };

        // 4. Assina o token JWT com a chave secreta e define um tempo de expiração
        jwt.sign(
            payload,
            jwtSecret,
            { expiresIn: '1h' }, // Token expira em 1 hora (pode ajustar)
            (err, token) => {
                if (err) throw err; // Lança erro se houver problema ao assinar o token
                // 5. Responde com o token JWT, ID do usuário, email e nome
                res.json({ token, userId: user.id, email: user.email, name: user.name });
            }
        );

    } catch (err) {
        console.error('Erro no login:', err.message);
        res.status(500).send('Erro no servidor ao fazer login.');
    }
};