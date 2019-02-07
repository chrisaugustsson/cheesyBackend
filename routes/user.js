var express = require("express");
var router = express.Router();
var user = require("./../models/user");

router.post("/register", (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.status(401).json({
            errors: {
                status: 401,
                source: "/user/register",
                title: "Email or password missing",
                detail: "Email or password missing in request"
            }
        });
    }

    user.registerUser(email, password, res);
});

router.post("/login", (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.status(401).json({
            errors: {
                status: 401,
                source: "/user/register",
                title: "Email or password missing",
                detail: "Email or password missing in request"
            }
        });
    }

    user.login(email, password, res);
});

module.exports = router;