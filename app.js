const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const index = require("./routes/index");
const hello = require("./routes/hello");

const app = express();

const port = 1337;

app.use(cors());

if (process.env.NODE_ENV !== "test") {
    app.use(morgan("combined"));
}

app.use("/", index);
app.use("/hello", hello);


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
                "title":  err.message,
                "detail": err.message
            }
        ]
    });
});

app.listen(port, () => console.log(`Lyssnar på port ${port}`));