const session = require("../middlewares/session");

module.exports = (application) => {
    // Rota para a vizulização de todos os Projetos
    application.get('/projetos', session.isCookieValid, (req, res) => {
        application.app.controllers.projetos.getProjetos(application, req, res);
    });

    // Rota de vizualização de apenas um Projeto baseado em seu ID
    application.get('/projetos/show/:id', session.isCookieValid, (req, res) => {
        application.app.controllers.projetos.getProjeto(application, req, res);
    });

    // Rota para o cadastro de um novo Projeto
    application.post('/projetos/store', session.isCookieValid, (req, res) => {
        application.app.controllers.projetos.createProjeto(application, req, res);
    });

    // Rota para a atualização das informaçoes de um Projeto
    application.put('/projetos/update/:id', session.isCookieValid, (req, res) => {
        application.app.controllers.projetos.updateProjeto(application, req, res);
    });

    // Rota para a remoçaão de um Projeto
    application.delete('/projetos/delete/:id', session.isCookieValid, (req, res) => {
        application.app.controllers.projetos.deleteProjeto(application, req, res);
    });
}