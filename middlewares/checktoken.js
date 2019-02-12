module.exports = function (req, res, next) {
    const jwt = require("jsonwebtoken");

    const token = req.headers['x-access-token'];
    const secret = process.env.JWT_SECRET || "secret";

    jwt.verify(token, secret, function (err, decoded) {
        if (err) {
            return res.status(401).json({
                error: "Token not recognized",
                details: err
            });
        }
        // Valid token send on the request
        next();
    });
}