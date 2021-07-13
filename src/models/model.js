const database = require("../config/db");

exports.getByUserName = (requestBody, callback) => {
    db.query(`SELECT * FROM customer WHERE username="${requestBody.username}"`, (error, result) => {

        if (error) {
            callback(error, null);
            return;
        }
        callback(null, result);
    });
}

exports.getByEmail = (requestBody, callback) => {
    db.query(`SELECT * FROM customer WHERE email="${requestBody.email}"`, (error, result) => {

        if (error) {
            callback(error, null);
            return;
        }
        callback(null, result);
    });
}

exports.userRegister = (requestBody, encryptedPassword, callback) => {
    let query = `INSERT INTO customer(username, firstname, lastname, gender, phone, email, password)
    values("${requestBody.username}", "${requestBody.firstname}", "${requestBody.lastname}", "${requestBody.gender}", "${requestBody.phone}", "${requestBody.email}", "${encryptedPassword}");`        
    database.query(query, (error, result) => {
        
        if (error){
            callback(error, null);
            return;
        }
        callback(null, result);
    });
}
