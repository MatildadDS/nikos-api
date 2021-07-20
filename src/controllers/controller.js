const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;
const user = require("../models/model");

exports.home = (request, response) => {   
    response.send ("hello world");
}

exports.signup = (request, response) => {
    user.getUserByEmail(request.body, (error, result) => {
        const {first_name} = request.body;
        if (error) {
        response.send(error.message);
        } else if (result.length > 0) {
            response.status(409).json({message: "A user with the same ID already exists" })                     
            } else {
                if (typeof first_name !== "string") {
                response.status(400).json({message: "The firstname field must be a string"})            
                } else if ( !first_name ) {
                    response.status(400).json({message: "The firstname field is not filled in"})
                } else {
                const saltRounds = 10;
                bcrypt.hash(request.body.password, saltRounds, (error, encryptedPassword) => {
                    if (error) {
                    response.send(error.message);
                    } 
                    user.userRegister(request.body, encryptedPassword, (error, result) => {
                        if (error) {
                        response.send(error.message);
                        } else {
                        response.status(201).json({message: "Success"})
                        }
                    });
                });
            }
        }
    })
}

exports.login = async (request, response) => {  
    const email = request.body.email;
    const password = request.body.password;
    if (!email || !password ){
        await response.send ("Please enter all fields")
    }
    else {
        user.getUserByEmail(request.body, async (error, result) => {
            if (error) {
                response.send(error.message);
            }
            else if (result.length === 0) {
                await response.status(401).json({ error: 'User not found' });
            }
            else {
                const hash = result[0].password;
                bcrypt.compare(password, hash, async (error, correct) => {
                    if (error) {
                        response.send(error.message);
                    }
                    else if (!correct) {
                        await response.status(401).json({ error: 'Wrong password' });
                    }
                    else {
                        const user = {
                            id_customer: result[0].id_customer,
                            first_name: result[0].first_name,
                            last_name: result[0].last_name,
                            gender: result[0].gender,
                            phone: result[0].phone,
                            email: result[0].email,
                        }
                        jwt.sign(user, secret, {expiresIn: "24h"}, (error, token) => {
                            if (error) {
                                response.send(error.message);
                            }
                            else {
                                request.user = {
                                    id_customer: result[0].id_customer,
                                    first_name: result[0].first_name,
                                    last_name: result[0].last_name,
                                    gender: result[0].gender,
                                    phone: result[0].phone,
                                    email: result[0].email,
                                };
                                console.log(token)
                                response.status(200).json(
                                    { token: token, 
                                        user: {
                                            id_customer: user.id_customer,
                                            first_name : user.first_name,
                                            last_name : user.last_name,
                                            gender: user.gender,
                                            phone: user.phone,
                                            email: user.email,
                                        } 
                                    }
                                );    
                            }
                        });
                    }
                });
            }
        });
    }
} 

