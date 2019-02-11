const bcrypt = require("bcrypt");
const sqlite = require("sqlite3");
const jwt = require("jsonwebtoken");

const db = new sqlite.Database("./db/texts.sqlite");

const saltrounds = 10;

exports.registerUser = function (user, password, res) {
    const result = new Promise((resolve, reject) => {
        bcrypt.hash(password, saltrounds, function (err, hash) {
            if (err) {
                return reject({
                    status: 500,
                    source: "user/register",
                    title: "bcrypt error",
                    detail: err
                })
            }

            db.run("INSERT INTO users (email, password) VALUES (?, ?)",
                user,
                hash,
                (err) => {
                    if (err) {
                        return reject({
                            status: 500,
                            source: "user/register",
                            title: "database error",
                            detail: err
                        })
                    }
                    return resolve({
                        data: {
                            message: "User successfully registered."
                        }
                    })
                }
            )
        });
    });

    return result;
}

exports.login = function (user, password, res) {
    const result = new Promise((resolve, reject) => {
        db.get("SELECT password FROM users WHERE email = ?",
            user,
            (err, rows) => {

                //rejects if error with DB
                if (err) {
                    return reject({
                        status: 500,
                        error: {
                            type: "Database",
                            detail: err
                        }
                    })
                }

                //Rejects if user is not found
                if (rows === undefined) {
                    return reject({
                        status: 401,
                        error: {
                            type: "Database",
                            detail: "User not found"
                        }
                    })
                }

                const userPass = rows.password;

                // Compare password and hash
                // Reject if bcrypt error
                bcrypt.compare(password, userPass, (err, result) => {
                    if (err) {
                        return reject({
                            status: 500,
                            error: {
                                type: "bcrypt error",
                                detail: err
                            }
                        })
                    }

                    const payload = { email: user };
                    const secret = process.env.JWT_SECRET || "secret";

                    const token = jwt.sign(payload, secret, { expiresIn: '1h' });

                    if (result) {
                        return resolve({
                            data: {
                                status: "success",
                                user: user,
                                token: token
                            }
                        })
                    } else {
                        return reject({
                            status: 401,
                            error: {
                                type: "Wrong password",
                                detail: "Password is incorrect."
                            }
                        })
                    }
                })
            }
        )
    })

    return result;
}