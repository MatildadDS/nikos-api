const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

const isAuth = (request, response, next) => {
    const token = request.cookies.authcookie;
    if (!token) {
        response.status(403).json({message: "Access denied"}) 
    }
    else {
        jwt.verify(token, secret, (error, user) => {
            if (error) {
                response.send(error.message);
            }
            else {
                const {firstname, lastname, email, id_customer, exp} = user;
                if (Date.now()/1000 >= exp) {
                    next()
                }
                request.user = {firstname, lastname, email, id_customer};
                next();
            }
        })
    }
}

module.exports = isAuth;
