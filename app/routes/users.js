module.exports = (application) => {
    // Rota de cadastro de usuarios
    application.post('/users/signup', (req, res) => {
        application.app.controllers.users.signup(application, req, res);
    });

    // Rota de login de usuarios
    application.post('/users/login', (req, res) => {
        application.app.controllers.users.login(application, req, res);
    });

}