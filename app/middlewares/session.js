const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

// Middleware para a confirmação de que a sessão de login existe e é valida
// bcrypt para a criação do hash do token vindo do JWT
exports.isCookieValid = (req, res, next) => {
    if (req.cookies.token) {
        jwt.verify(req.cookies.token, process.env.SECRET, (err, decoded) => {
            if (!err && bcrypt.compareSync("true", decoded.isLogged)) {
                next();
            } else {
                res.status(401).send("Token invalido");
            }
        });
    } else {
        res.status(401).send("Você não está logado");
    }
}