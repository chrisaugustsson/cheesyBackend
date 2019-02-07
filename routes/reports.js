var express = require("express");
var router = express.Router();
var reports = require("./../models/reports");
var checktoken = require("./../middlewares/checktoken");

router.post("/", checktoken, (req, res) => {
    const name = req.body.name;
    const content = req.body.content;

    if (!name || !content) {
        res.status(500).json({
            error: "Missing reports name or content"
        });
    }

    reports.addReport(name, content, res);
})

router.get("/:kmom", (req, res) => {
    reports.get(req.params.kmom, res);
});

module.exports = router;