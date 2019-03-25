var express = require("express");
var router = express.Router();
var user = require("./../models/user");
var checktoken = require("./../middlewares/checktoken");

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

router.post("/info", checktoken, async (req, res, next) => {
    const email = req.body.user;

    let result;

    try {
        result = await user.getInfo(email);
    } catch (error) {
        return res.status(error.status).json({
            error
        });
    }

    return res.json({
        result
    });
});

router.post("/deposit", checktoken, async (req, res, next) => {
    const email = req.body.user;
    const amount = req.body.amount;

    let result;

    try {
        result = await user.deposit(amount, email);
    } catch (error) {
        return res.status(error.status).json({
            error
        });
    }

    return res.json({
        result
    });
});

router.post("/buyCheese", checktoken, async (req, res, next) => {
    console.log("route köper ost")
    const email = req.body.user;
    const share = req.body.share;
    const cheese = req.body.cheese;
    const credits = req.body.credits;


    let result;

    try {
        result = await user.buyCheese(email, share, cheese, credits);
    } catch (error) {
        console.log(error)
        return res.status(error.status).json({
            error
        });
    }

    return res.json({
        result
    });
});

router.post("/sellCheese", checktoken, async (req, res, next) => {
    const email = req.body.user;
    const share = req.body.share;
    const cheese = req.body.cheese;
    const credits = req.body.credits;


    let result;

    try {
        result = await user.sellCheese(email, share, cheese, credits);
    } catch (error) {
        console.log(error)
        return res.status(error.status).json({
            error
        });
    }

    return res.json({
        result
    });
});

module.exports = router;