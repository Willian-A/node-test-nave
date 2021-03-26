class NaverDAO {
    constructor(conn) {
        this._conn = conn;
    }

    // SQL para o retorno de todos os Navers
    getAllNavers = () => {
        return new Promise((resolve, reject) => {
            this._conn.query("SELECT *, DATE_FORMAT(birthdate,'%d-%m-%Y') as birthdate, DATE_FORMAT(admission_date,'%d-%m-%Y') as admission_date FROM navers",
                (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(JSON.parse(JSON.stringify(result)));
                });
        })
    };

    // SQL para o retorno de apenas um Naver baseado em seu ID
    getNaverByID = (id) => {
        return new Promise((resolve, reject) => {
            this._conn.query(`SELECT *, DATE_FORMAT(birthdate,'%d-%m-%Y') as birthdate, DATE_FORMAT(admission_date,'%d-%m-%Y') as admission_date FROM navers WHERE id_naver = ?`,
                id, (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(JSON.parse(JSON.stringify(result)));
                });
        })
    };

    // SQL para o retorno de varios Navers vindos de um Array de IDs
    getNaversInArray = (ids) => {
        return new Promise((resolve, reject) => {
            this._conn.query(`SELECT *, DATE_FORMAT(birthdate,'%d-%m-%Y') as birthdate, DATE_FORMAT(admission_date,'%d-%m-%Y') as admission_date FROM navers WHERE id_naver IN (?)`,
                [ids], (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(JSON.parse(JSON.stringify(result)));
                });
        })
    };

    // SQL para a filtragem dos Navers pelo Nome
    getNaverByName = (name) => {
        let SQL = "SELECT *, DATE_FORMAT(birthdate,'%d-%m-%Y') as birthdate, DATE_FORMAT(admission_date,'%d-%m-%Y') as admission_date FROM navers WHERE name LIKE ?";
        return new Promise((resolve, reject) => {
            this._conn.query(SQL, name, (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(JSON.parse(JSON.stringify(result)));
            });
        })
    };

    //SQL para a filtragem dos Navers pela data de contratação (admission_date) em ordem decrescente
    getNaverByAdmission = () => {
        let SQL = "SELECT *, DATE_FORMAT(birthdate,'%d-%m-%Y') as birthdate, DATE_FORMAT(admission_date,'%d-%m-%Y') as admission_date FROM navers ORDER BY admission_date DESC";
        return new Promise((resolve, reject) => {
            this._conn.query(SQL, (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(JSON.parse(JSON.stringify(result)));
            });
        })
    };

    // SQL para a filtragem dos Navers pelo cargo (job_role/role)
    getNaverByRole = (role) => {
        let SQL = "SELECT *, DATE_FORMAT(birthdate,'%d-%m-%Y') as birthdate, DATE_FORMAT(admission_date,'%d-%m-%Y') as admission_date FROM navers WHERE job_role LIKE ?";
        return new Promise((resolve, reject) => {
            this._conn.query(SQL, role, (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(JSON.parse(JSON.stringify(result)));
            });
        })
    };

    // SQL para retonar o ID do ultimo Naver registrado naquela conexão
    getLastNaverID = () => {
        return new Promise((resolve, reject) => {
            this._conn.query("SELECT LAST_INSERT_ID() as lastInsertID", (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        })
    };

    // SQL para o cadastro de um novo Naver no banco de dados
    createNaver = (values) => {
        return new Promise((resolve, reject) => {
            this._conn.query("INSERT INTO navers SET ?", values, (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        })
    };

    // SQL para a atualização das informaçoes de um Naver
    updateNaver = (values, id) => {
        return new Promise((resolve, reject) => {
            this._conn.query("UPDATE navers SET ? WHERE id_naver = ?", [values, id], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        })
    };

    // SQL para deletar um Naver do banco de dados
    deleteNaver = (id) => {
        return new Promise((resolve, reject) => {
            this._conn.query("DELETE FROM navers WHERE id_naver = ?", id, (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        })
    };
}


module.exports = (app) => {
    return NaverDAO;
};
