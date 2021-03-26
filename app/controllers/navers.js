module.exports.getNavers = (application, req, res) => {
    const conn = application.config.dbConn();
    const NaverModel = new application.app.models.naverDAO(conn);

    // Verifica se algum filtro foi aplicado
    if (req.params.filter) {
        if (req.params.filter === "name" && req.params.value) {
            NaverModel.getNaverByName(req.params.value).then((result) => res.json(result));
        } else if (req.params.filter === "date") {
            NaverModel.getNaverByAdmission(req.params.value).then((result) => res.json(result));
        } else if (req.params.filter === "role" && req.params.value) {
            NaverModel.getNaverByRole(req.params.value).then((result) => res.json(result));
        } else {
            res.status(400).send("Requisição faltando valores");
        }
    } else {
        NaverModel.getAllNavers().then((result) => res.json(result));
    }

};

module.exports.getNaver = (application, req, res) => {
    const conn = application.config.dbConn();
    const NaverModel = new application.app.models.naverDAO(conn);
    const ProjetosModel = new application.app.models.projetoDAO(conn);

    // Seleciona o Naver pelo ID
    // Seleciona todos os projetos desse naver e retorna as infos do naver e seus projetos
    NaverModel.getNaverByID(req.params.id).then((result) => {
        if (result.length >= 1) {
            ProjetosModel.getProjetoNaverByNaverID(req.params.id).then((projetosNaver) => {
                if (projetosNaver.length >= 1) {
                    let projetosID = [];
                    projetosNaver.forEach((value) => projetosID.push(value.id_projeto));
                    ProjetosModel.getProjetosInArray(projetosID).then((projetosResult) => {
                        result[0].projetos = projetosResult;
                        res.json(result);
                    })
                } else {
                    res.json(result);
                }
            })
        } else {
            res.status(404).send("Este naver não existe");
        }
    });
};

module.exports.createNaver = (application, req, res) => {
    const conn = application.config.dbConn();
    const NaverModel = new application.app.models.naverDAO(conn);
    const ProjetosModel = new application.app.models.projetoDAO(conn);

    // Verifica se esse Naver deve ser cadastrado em algum Projeto.
    // Caso seja, verifica se esse Projeto existe
    // Se existem, cadastra o Naver e seus projetos
    if (req.body.projetos && req.body.projetos.length > 0) {
        ProjetosModel.getProjetosInArray(req.body.projetos).then((projetosResult) => {
            if (req.body.projetos.length === projetosResult.length) {
                NaverModel.createNaver(req.body.naver);
                NaverModel.getLastNaverID().then((result) => {
                    projetosResult.forEach((value) => {
                        ProjetosModel.createProjetoNaver({
                            id_projeto: value.id_projeto,
                            id_naver: result[0]['lastInsertID']
                        });
                    });

                });
                res.sendStatus(200);
            } else {
                res.status(400).send("Um dos projetos não existe");
            }
        }).catch((err) => {
            console.log(err);
            res.status(500).status("Erro interno");
        });
        // Caso esse Naver não esteja em nenhum projeto, apenas cadastra ele
    } else {
        NaverModel.createNaver(req.body.naver);
        res.sendStatus(200);
    }
};

module.exports.updateNaver = (application, req, res) => {
    const conn = application.config.dbConn();
    const NaverModel = new application.app.models.naverDAO(conn);

    // Verifica se o Naver existe
    // Se existir, executa a atualização das informaçoes
    NaverModel.getNaverByID(req.params.id).then((result) => {
        if (result.length >= 1) {
            NaverModel.updateNaver(req.body, req.params.id);
            res.sendStatus(200);
        } else {
            res.status(404).send("Este naver não existe");
        }
    });
};

module.exports.deleteNaver = (application, req, res) => {
    const conn = application.config.dbConn();
    const NaverModel = new application.app.models.naverDAO(conn);
    const ProjetosModel = new application.app.models.projetoDAO(conn);

    // Verifica se o Naver existe
    // Se existir, primeiro deleta todas as relações com os projetos e depois deleta o Naver
    NaverModel.getNaverByID(req.params.id).then((result) => {
        if (result.length >= 1) {
            ProjetosModel.getProjetoNaverByNaverID(req.params.id).then((result) => {
                if (result.length >= 1) {
                    ProjetosModel.deleteProjetoNaverByNaver(req.params.id);
                    NaverModel.deleteNaver(req.params.id);
                } else {
                    NaverModel.deleteNaver(req.params.id);
                }
                res.sendStatus(200);
            });
        } else {
            res.status(404).send("Este naver não existe");
        }
    });
};