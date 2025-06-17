require('dotenv').config(); // Carrega variáveis de ambiente do arquivo .env
const express = require('express'); // Declaração da biblioteca Express
const mongoose = require('mongoose'); // Declaração da biblioteca Mongoose para MongoDB
const cors = require('cors'); // Declaração da biblioteca CORS para permitir requisições de outras origens
const authRoutes = require('./routes/auth'); // Importa as rotas de autenticação
const productRoutes = require('./routes/products'); // Importa as rotas de produtos
const orderRoutes = require('./routes/order'); // NOVO: Importa as rotas de pedidos

const app = express();
const PORT = process.env.PORT || 3000; // Define a porta do servidor, padrão 3000

// Conexão com o MongoDB
// A string de conexão é lida da variável de ambiente MONGODB_URI no arquivo .env
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true, // Opção para parser de URL do MongoDB
    useUnifiedTopology: true, // Opção para novo motor de descoberta e monitoramento de servidor
})
.then(() => console.log('Conectado ao MongoDB!')) // Mensagem de sucesso na conexão
.catch(err => console.error('Erro ao conectar ao MongoDB:', err)); // Mensagem de erro na conexão

// Middlewares
app.use(cors()); // Habilita o CORS para todas as requisições, permitindo que o frontend se conecte
app.use(express.json()); // Habilita o Express a interpretar corpos de requisição como JSON

// Rotas da API
app.use('/api/auth', authRoutes); // Atribui as rotas de autenticação ao prefixo /api/auth
app.use('/api/products', productRoutes); // Atribui as rotas de produtos ao prefixo /api/products
app.use('/api/orders', orderRoutes); // NOVO: Atribui as rotas de pedidos ao prefixo /api/orders

// Rota de teste simples para verificar se o servidor está funcionando
app.get('/', (req, res) => {
    res.send('API de E-commerce de Móveis está funcionando!');
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});