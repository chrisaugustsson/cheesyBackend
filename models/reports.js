const sqlite = require("sqlite3");
const db = new sqlite.Database("./db/texts.sqlite");

exports.get = function (kmom, res) {
    db.get("SELECT * FROM reports WHERE name = ?",
        kmom,
        (err, rows) => {
            if (err) {
                res.stats(500).json({
                    error: err
                })
            }

            res.json({
                rows
            })
        }
    )
};

exports.addReport = function (name, content, res) {
    db.run("INSERT INTO reports (name, content) VALUES (?, ?)",
        name,
        content,
        (err) => {
            if (err) {
                return res.status(500).json({
                    errors: {
                        status: 500,
                        title: "database error",
                        detail: err
                    }
                });
            }

            res.status(201).json({
                data: {
                    message: "Reports added"
                }
            });
        }
    )
};