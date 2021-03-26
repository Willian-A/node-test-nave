class ProjetoDAO {
    constructor(conn) {
        this._conn = conn;
    }

    // SQL para o retorno de todos os Projeto
    getProjetos = () => {
        return new Promise((resolve, reject) => {
            this._conn.query("SELECT * FROM projetos", (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(JSON.parse(JSON.stringify(result)));
            });
        })
    };

    // SQL para o retorno de apenas um Projeto baseado em seu ID
    getProjetoByID = (id) => {
        return new Promise((resolve, reject) => {
            this._conn.query("SELECT * FROM projetos WHERE id_projeto = ?",
                id, (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(JSON.parse(JSON.stringify(result)));
                });
        })
    };

    // SQL para o retorno de varios Projeto vindos de um Array de IDs
    getProjetosInArray = (ids) => {
        return new Promise((resolve, reject) => {
            this._conn.query("SELECT * FROM projetos WHERE id_projeto IN (?)",
                [ids], (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(JSON.parse(JSON.stringify(result)));
                });
        })
    };

    // SQL para o cadastro de um novo Projeto no banco de dados
    createProjeto = (values) => {
        return new Promise((resolve, reject) => {
            this._conn.query("INSERT INTO projetos SET ?",
                values, (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(result);
                });
        })
    };

    // SQL para a atualização das informaçoes de um Projeto
    updateProjeto = (values, id) => {
        return new Promise((resolve, reject) => {
            this._conn.query("UPDATE projetos SET ? WHERE id_projeto = ?",
                [values, id], (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(result);
                });
        })
    };

    // SQL para deletar um Projeto do banco de dados
    deleteProjeto = (id) => {
        return new Promise((resolve, reject) => {
            this._conn.query("DELETE FROM projetos WHERE id_projeto = ?",
                id, (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(result);
                });
        })
    };

    getProjetoNaverByNaverID = (id) => {
        return new Promise((resolve, reject) => {
            this._conn.query("SELECT id_projeto FROM projetos_navers WHERE id_naver = ?",
                id, (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(JSON.parse(JSON.stringify(result)));
                });
        })
    };

    getProjetoNaverByProjetoID = (id) => {
        return new Promise((resolve, reject) => {
            this._conn.query("SELECT id_naver FROM projetos_navers WHERE id_projeto = ?",
                id, (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(JSON.parse(JSON.stringify(result)));
                });
        })
    };

    createProjetoNaver = (values) => {
        return new Promise((resolve, reject) => {
            this._conn.query("INSERT INTO projetos_navers SET ?",
                values, (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(result);
                });
        })
    };

    deleteProjetoNaverByNaver = (values) => {
        return new Promise((resolve, reject) => {
            this._conn.query("DELETE FROM projetos_navers WHERE id_naver = ?",
                values, (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(result);
                });
        })
    };

    deleteProjetoNaverByProjeto = (values) => {
        return new Promise((resolve, reject) => {
            this._conn.query("DELETE FROM projetos_navers WHERE id_projeto = ?",
                values, (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(result);
                });
        })
    };
}


module.exports = (app) => {
    return ProjetoDAO;
};
