module.exports.getProjetos = (application, req, res) => {
    const conn = application.config.dbConn();
    const ProjetoModel = new application.app.models.projetoDAO(conn);

    // Retorna todos os Projetos
    ProjetoModel.getProjetos().then((result) => res.json(result));
};

module.exports.getProjeto = (application, req, res) => {
    const conn = application.config.dbConn();
    const ProjetoModel = new application.app.models.projetoDAO(conn);
    const NaverModel = new application.app.models.naverDAO(conn);

    // Seleciona o Projeto pelo ID
    // Pega todos os Navers relacionados a esse projeto pelo ID do projeto
    // Retorna o Projeto e seus Navers 
    ProjetoModel.getProjetoByID(req.params.id).then((projetosResult) => {
        if (projetosResult.length >= 1) {
            ProjetoModel.getProjetoNaverByProjetoID(req.params.id).then((naversInProjetos) => {
                if (naversInProjetos.length >= 1) {
                    let naversID = [];
                    naversInProjetos.forEach((value) => naversID.push(value.id_naver));
                    NaverModel.getNaversInArray(naversID).then((result) => {
                        projetosResult[0].navers = result;
                        res.json(projetosResult);
                    });
                } else {
                    res.json(projetosResult);
                }
            });
        } else {
            res.status(404).send("Este projeto não existe");
        }
    });
};

module.exports.createProjeto = (application, req, res) => {
    const conn = application.config.dbConn();
    const ProjetoModel = new application.app.models.projetoDAO(conn);

    // Cria um novo projeto
    ProjetoModel.createProjeto(req.body).then(() => res.sendStatus(200));
};

module.exports.updateProjeto = (application, req, res) => {
    const conn = application.config.dbConn();
    const ProjetoModel = new application.app.models.projetoDAO(conn);

    // Seleciona o Projeto pelo ID
    // Caso o Projeto exista, atualiza as informaçoes do Projeto
    // Se não existir, retorna um erro
    ProjetoModel.getProjetoByID(req.params.id).then((result) => {
        if (result.length >= 1) {
            ProjetoModel.updateProjeto(req.body, req.params.id).then(() => res.sendStatus(200));
        } else {
            res.status(404).send("Este projeto não existe");
        }
    });
};

module.exports.deleteProjeto = (application, req, res) => {
    const conn = application.config.dbConn();
    const ProjetoModel = new application.app.models.projetoDAO(conn);

    // Seleciona o Projeto pelo ID
    // Caso o Projeto exista, deleta o Projeto
    // Se não existir, retorna um erro
    ProjetoModel.getProjetoByID(req.params.id).then((result) => {
        if (result.length >= 1) {
            ProjetoModel.deleteProjetoNaverByProjeto(req.params.id);
            ProjetoModel.deleteProjeto(req.params.id).then(() => res.sendStatus(200));
        } else {
            res.status(404).send("Este projeto não existe");
        }
    });

};