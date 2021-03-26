const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

module.exports.signup = (application, req, res) => {
    const conn = application.config.dbConn();
    const UserModel = new application.app.models.userDAO(conn);
    let passwordHash = bcrypt.hashSync(req.body.senha, 10);

    // Seleciona o Usuario pelo Email
    // Caso o usuario não exista, realiza o cadastro 
    // Caso já exista, retorna um erro
    UserModel.getUser(req.body.email).then((result) => {
        if (result.length >= 1) {
            res.status(403).send("Este email já está cadastrado");
        } else {
            UserModel.createUser({ email: req.body.email, senha: passwordHash });
            res.sendStatus(200);
        }
    })

}

module.exports.login = (application, req, res) => {
    const conn = application.config.dbConn();
    const UserModel = new application.app.models.userDAO(conn);

    // Seleciona o Usuario pelo Email
    // Caso o usuario exista, gera um token de login
    // Caso não exista, retorna um erro
    UserModel.getUser(req.body.email).then((result) => {
        if (result.length === 1) {
            let isPassValid = bcrypt.compareSync(req.body.senha, result[0].senha);
            if (!isPassValid) return res.sendStatus(401);
            let token = jwt.sign({
                isLogged: bcrypt.hashSync("true", 10)
            }, process.env.SECRET, { expiresIn: '1h' });
            res.cookie('token', token, { maxAge: 3600000, httpOnly: true });
            res.sendStatus(200);
        } else {
            res.status(404).send("Este usuario não existe");
        }
    })
}