const sqlite = require("sqlite3");
const db = new sqlite.Database("./db/texts.sqlite");

exports.get = function (kmom) {
    const result = new Promise((resolve, reject) => {
        db.get("SELECT * FROM reports WHERE name = ?",
            kmom,
            (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            }
        )
    })

    return result;
};

exports.addReport = function (name, content) {
    const result = new Promise((resolve, reject) => {
        db.run("INSERT INTO reports (name, content) VALUES (?, ?)",
            name,
            content,
            (err) => {
                if (err) {
                    reject(err);
                }
                resolve({ data: { message: "Reports added" } });
            }
        )
    })

    return result;
};