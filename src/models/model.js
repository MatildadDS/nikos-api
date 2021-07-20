const database = require("../config/db");


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
    let query = `INSERT INTO customer (firstname, lastname, gender, phone, email, password)
    values( "${requestBody.firstname}", "${requestBody.lastname}", "${requestBody.gender}", "${requestBody.phone}", "${requestBody.email}", "${encryptedPassword}");`        
    database.query(query, (error, result) => {
        
        if (error){
            callback(error, null);
            return;
        }
        callback(null, result);
    });
}
