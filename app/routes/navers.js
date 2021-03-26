const session = require("../middlewares/session");

module.exports = (application) => {
    // Rota para o retorno de todos os Navers ou filtragem de Navers baseado em nome, cargo ou data de contratação
    application.get('/navers/index/:filter?/:value?', session.isCookieValid, (req, res) => {
        application.app.controllers.navers.getNavers(application, req, res);
    });

    // Rota de vizualização de apenas um Naver baseado em seu ID
    application.get('/navers/show/:id', session.isCookieValid, (req, res) => {
        application.app.controllers.navers.getNaver(application, req, res);
    });

    // Rota para o cadastro de um novo Naver
    application.post('/navers/store', session.isCookieValid, (req, res) => {
        application.app.controllers.navers.createNaver(application, req, res);
    });

    // Rota para a atualização das informaçoes de um Naver
    application.put('/navers/update/:id', session.isCookieValid, (req, res) => {
        application.app.controllers.navers.updateNaver(application, req, res);
    });

    // Rota para a remoçaão de um Naver
    application.delete('/navers/delete/:id', session.isCookieValid, (req, res) => {
        application.app.controllers.navers.deleteNaver(application, req, res);
    });

}
