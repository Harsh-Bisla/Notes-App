const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

function authenticate(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.send({ msg: "please login", success: false });
    }
    else {
        try {
            const data = jwt.verify(token, SECRET_KEY);
            req.user = data;
            next();
        } catch (error) {
            console.log("error", error);
        }

    }
}

module.exports = authenticate;