const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;
const user = require("../models/userModel");

exports.home = (request, response) => {   
    response.send ("hello world");
}

exports.signup = (request, response) => {
    user.getUserByEmail(request.body, (error, result) => {
        const {firstname, lastname, phone, email, password, city, country} = request.body;
        if (error) {
        response.send(error.message);
        } else if (result.length > 0) {
            response.status(409).json({message: "A user with the same ID already exists" })                     
            } else {
                // if (typeof first_name !== "string" || typeof last_name !== "string" || phone !== "number" || email !== "email" || password !== "password" ) {
                // response.status(400).json({message: "The firstname field must be a string"}) }            
                 if ( !firstname || !lastname || !phone || !email || !password || !city || !country ) {
                    response.status(400).json({message: "A mandatory field is not filled in"})
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

exports.login = (request, response) => { 
    const email = request.body.email;
    const password = request.body.password;
    if (!email || !password ){
        response.send ("Please enter all fields")
    }
    else {
        user.getUserByEmail(request.body, (error, result) => {
            if (error) {
                response.send(error.message);
            }
            else if (result.length === 0) {
                response.status(404).json({ error: 'User not found' });
            }
            else {
                const hash = result[0].password;
                bcrypt.compare(password, hash, (error, correct) => {
                    if (error) {
                        response.send(error.message);
                    }
                    else if (!correct) {
                        response.status(400).json({ error: 'Wrong password' });
                    }
                    else {
                        const user = {
                            id_customer: result[0].id_customer,
                            firstname: result[0].firstname,
                            lastname: result[0].lastname,
                            phone: result[0].phone,
                            email: result[0].email,
                            city: result[0].city,
                            country: result[0].country,
                        }
                        jwt.sign(user, secret, {expiresIn: "24h"}, (error, token) => {
                            if (error) {
                                response.send(error.message);
                            }
                            else {
                                request.user = {
                                    id_customer: result[0].id_customer,
                                    firstname: result[0].firstname,
                                    lastname: result[0].lastname,
                                    phone: result[0].phone,
                                    email: result[0].email,
                                    city: result[0].city,
                                    country: result[0].country,
                                };
                                console.log(token)
                                response.status(200).json(
                                    { token: token, 
                                        user: {
                                            id_customer: user.id_customer,
                                            firstname : user.firstname,
                                            lastname : user.lastname,
                                            phone: user.phone,
                                            email: user.email,
                                            city : user.city,
                                            country : user.country,
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

