const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;
const user = require("../models/model");

exports.home = (request, response) => {   
    response.send ("hello world");
}

exports.login = async (request, response) => {  
    const username = request.body.username;
    const password = request.body.password;
    if (!username || !password ){
        await response.send ("Veuillez rentrer tous les champs")
    }
    else {
        user.getByUserName(request.body, async (error, result) => {
            if (error) {
                response.send(error.message);
            }
            else if (result.length === 0) {
                await response.status(401).json({ error: 'Utilisateur non trouvé' });
            }
            else {
                const hash = result[0].password;
                bcrypt.compare(password, hash, async (error, correct) => {
                    if (error) {
                        response.send(error.message);
                    }
                    else if (!correct) {
                        await response.status(401).json({ error: 'Mot de passe incorrect' });
                    }
                    else {
                        const user = {
                            id_customer: result[0].id_customer,
                            user_name: result[0].user_name,
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
                                    user_name: result[0].user_name,
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
                                            user_name: user.user_name,
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

exports.signup = (request, response) => {
    user.getByUserName(request.body, (error, result) => {
        const {first_name} = request.body;
        if (error) {
        response.send(error.message);
        } else if (result.length > 0) {
            response.status(409).json({message: "Un utilisateur avec le même identifiant existe déjà" })                     
            } else {
                if (typeof first_name !== "string") {
                response.status(400).json({message: "Le champ user_name doit être une chaîne de caractères"})            
                } else if ( !first_name ) {
                    response.status(400).json({message: "Le champ user_name n'est pas n'est pas renseigné"})
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
