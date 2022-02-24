const db = require("../config/db");

exports.getUserByEmail = (requestBody, callback) => {
    db.query(`SELECT * FROM customer WHERE email="${requestBody.email}"`, (error, result) => {

        if (error) {
            callback(error, null);
            return;
        }
        callback(null, result);
    });
}

exports.userRegister = (requestBody, encryptedPassword, callback) => {
    let query = `INSERT INTO customer (firstname, lastname, phone, email, password, city, country)
    values( "${requestBody.firstname}", "${requestBody.lastname}", "${requestBody.phone}", "${requestBody.email}", "${encryptedPassword}", "${requestBody.city}", "${requestBody.country}");`        
    db.query(query, (error, result) => {
        
        if (error){
            callback(error, null);
            return;
        }
        callback(null, result);
    });
}
