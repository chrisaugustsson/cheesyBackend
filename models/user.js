const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const mongo = require("mongodb").MongoClient;
const dsn = process.env.DBWEBB_DSN || "mongodb://localhost:27017/cheeseTrade";

const saltrounds = 10;

exports.registerUser = function (user, password) {
    const result = new Promise((resolve, reject) => {
        bcrypt.hash(password, saltrounds, async function (err, hash) {
            if (err) {
                return reject({
                    status: 500,
                    source: "user/register",
                    title: "bcrypt error",
                    detail: err
                })
            }

            const client = await mongo.connect(dsn);
            const db = await client.db();
            const col = await db.collection("users");

            try {
                await col.insertOne({
                    user: user,
                    password: hash,
                    credits: 0,
                    cheese: []
                });
            } catch (error) {
                return reject({
                    status: 500,
                    source: "user/register",
                    title: "database error",
                    detail: err
                })
            }

            await client.close();

            return resolve({
                success: true
            });

        });
    });

    return result;
}

exports.login = function (user, password, res) {
    const result = new Promise(async (resolve, reject) => {
        const client = await mongo.connect(dsn);
        const db = await client.db();
        const col = await db.collection("users");

        const res = await col.find({ "user": user }, { projection: { _id: 0 } }).toArray();

        await client.close();

        //Rejects if user is not found
        if (res.length === 0) {
            return reject({
                status: 401,
                error: {
                    type: "Database",
                    detail: "User not found"
                }
            })
        }

        const userPass = res[0].password;

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
    })

    return result;
}

exports.getInfo = function (user) {
    const result = new Promise(async (resolve, reject) => {
        const client = await mongo.connect(dsn);
        const db = await client.db();
        const col = await db.collection("users");

        const res = await col.find({ "user": user }, { projection: { _id: 0, password: 0 } }).toArray();

        if (res.length === 0) {
            return reject({
                type: "Database",
                detail: "User not found"
            })
        }

        await client.close();

        return resolve(res[0]);
    });

    return result;
}

exports.deposit = function (amount, user) {
    const result = new Promise(async (resolve, reject) => {
        const client = await mongo.connect(dsn);
        const db = await client.db();
        const col = await db.collection("users");

        try {
            await col.update({ "user": user }, {
                $inc: { credits: amount }
            });
        } catch (error) {
            return reject({
                status: 500,
                source: "user/register",
                title: "database error",
                detail: err
            })
        }

        await client.close();

        return resolve({
            success: true
        })
    });

    return result;
}

exports.buyCheese = function (user, share, cheese, credits) {
    const result = new Promise(async (resolve, reject) => {
        const client = await mongo.connect(dsn);
        const db = await client.db();
        const col = await db.collection("users");

        try {
            await col.update(
                { user: user },
                { $inc: { "credits": -credits } }
            );
            await col.update(
                { user: user, "cheese.name": cheese },
                { $inc: { "cheese.$.share": share } },
                {
                    upsert: false,
                    multi: true
                }
            );
            await col.update(
                { user: user, cheese: { "$not": { "$elemMatch": { "name": cheese } } } },
                { $addToSet: { "cheese": { name: cheese, share: share } } },
                {
                    upsert: false,
                    multi: true
                }
            );
        } catch (error) {
            return reject({
                status: 500,
                source: "user/register",
                title: "database error",
                detail: error
            })
        }

        await client.close();

        return resolve({
            success: true
        })
    });

    return result;
}

exports.sellCheese = function (user, share, cheese, credits) {
    const result = new Promise(async (resolve, reject) => {
        const client = await mongo.connect(dsn);
        const db = await client.db();
        const col = await db.collection("users");

        try {
            await col.update(
                { user: user },
                { $inc: { "credits": credits } }
            );
            await col.update(
                { user: user, "cheese.name": cheese },
                { $inc: { "cheese.$.share": -share } },
                {
                    upsert: false,
                    multi: true
                }
            );
        } catch (error) {
            return reject({
                status: 500,
                source: "user/register",
                title: "database error",
                detail: error
            })
        }

        await client.close();

        return resolve({
            success: true
        })
    });

    return result;
}