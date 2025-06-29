const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']; // pega o header Authorization
    const token = authHeader && authHeader.split(' ')[1]; // pega o token depois de "Bearer"

    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido!' });
    }
  
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido!' });
        }
        req.user = user;
        next();
    });
}

module.exports = authenticateToken;