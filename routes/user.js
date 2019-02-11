var express = require("express");
var router = express.Router();
var user = require("./../models/user");

router.post("/register", async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    let result;

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

    try {
        result = await user.registerUser(email, password);
    } catch (error) {
        return res.status(error.status).json({
            error
        });
    }

    return res.json({
        result
    });
});

router.post("/login", async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    let result;

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

    try {
        result = await user.login(email, password);
    } catch (error) {
        return res.status(error.status).json({
            error
        });
    }

    return res.json({
        result
    });
});

module.exports = router;