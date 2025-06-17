const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // O nome é obrigatório
        trim: true // Remove espaços em branco do início e fim
    },
    email: {
        type: String,
        required: true, // O email é obrigatório
        unique: true, // Garante que cada email seja único
        lowercase: true, // Converte email para minúsculas
        trim: true,
        match: [/.+@.+\..+/, 'Por favor, insira um email válido'] // Regex para validar formato de email
    },
    password: {
        type: String,
        required: true, // A senha é obrigatória
        minlength: 6 // Senha mínima de 6 caracteres
    },
    createdAt: {
        type: Date,
        default: Date.now // Define a data de criação automaticamente
    }
});

module.exports = mongoose.model('User', UserSchema);