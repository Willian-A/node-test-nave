class UserDAO {
    constructor(conn) {
        this._conn = conn;
    }

    // SQL para criar um novo Ususario
    createUser = (values) => {
        return new Promise((resolve, reject) => {
            this._conn.query("INSERT INTO users SET ?", values, (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        })
    };

    // SQL para o retorno de um ususario baseado em seu Email
    getUser = (email) => {
        return new Promise((resolve, reject) => {
            this._conn.query("SELECT senha FROM users WHERE email = ?", email, (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        })
    };
}


module.exports = (app) => {
    return UserDAO;
};
