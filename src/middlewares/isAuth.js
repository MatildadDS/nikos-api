const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

const isAuth = (request, response, next) => {
    const token = request.cookies.authcookie;
    if (!token) {
        next() 
    }
    else {
        jwt.verify(token, secret, (error, user) => {
            if (error) {
                response.send(error.message);
            }
            else {
                const {username, firstname, lastname, email, id_customer, exp} = user;
                if (Date.now()/1000 >= exp) {
                    next()
                }
                request.user = {username, firstname, lastname, email, id_customer};
                next();
            }
        })
    }
}

module.exports = isAuth;