const bcrypt = require("bcrypt");
const sqlite = require("sqlite3");
const jwt = require("jsonwebtoken");

const db = new sqlite.Database("./db/texts.sqlite");

const saltrounds = 10;

exports.registerUser = function (user, password, res) {
    bcrypt.hash(password, saltrounds, function (err, hash) {
        if (err) {
            return res.status(500).json({
                errors: {
                    status: 500,
                    source: "user/register",
                    title: "bcrypt error",
                    detail: err
                }
            });
        }

        db.run("INSERT INTO users (email, password) VALUES (?, ?)",
            user,
            hash,
            (err) => {
                if (err) {
                    return res.status(500).json({
                        errors: {
                            status: 500,
                            source: "user/register",
                            title: "database error",
                            detail: err
                        }
                    });
                }

                res.status(201).json({
                    data: {
                        message: "User successfully registered."
                    }
                });
            }
        )
    });
}

exports.login = function (user, password, res) {
    db.get("SELECT password FROM users WHERE email = ?",
        user,
        (err, rows) => {
            if (err) {
                return res.status(500).json({
                    errors: err
                })
            }

            if (rows === undefined) {
                return res.status(401).json({
                    error: "User not found"
                })
            }

            const userPass = rows.password;

            console.log("Pass", userPass);

            bcrypt.compare(password, userPass, (err, result) => {
                if (err) {
                    return res.status(500).json({
                        type: "bcrypt error",
                        error: err
                    })
                }

                const payload = { email: user };
                const secret = process.env.JWT_SECRET || "secret";

                const token = jwt.sign(payload, secret, { expiresIn: '1h'});

                if (result) {
                    return res.json({
                        data: {
                            status: "success",
                            user: user,
                            token: token
                        }
                    })
                } else {
                    return res.status(401).json({
                        errors: {
                            status: 401,
                            source: "/login",
                            title: "Wrong password",
                            detail: "Password is incorrect."
                        }
                    })
                }
            })
        }
    )
}