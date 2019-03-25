const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require('body-parser');

const user = require("./routes/user");

const app = express();
const http = require('http').Server(app);
let realtime = require("./realtime/socketio");

app.use(cors());

if (process.env.NODE_ENV !== "test") {
    app.use(morgan("combined"));
}

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use("/user", user);

app.use((req, res, next) => {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    res.status(err.status || 500).json({
        "errors": [
            {
                "status": err.status,
                "title": err.message,
                "detail": err.message
            }
        ]
    });
});

realtime(http);


module.exports = http;