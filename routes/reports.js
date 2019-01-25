var express = require("express");
var router = express.Router();
var reports = require("./../models/reports");

router.get("/:kmom", (req, res) => {
    const data = {
        kmom: reports.get(req.params.kmom)
    }


    res.json(data);
});

module.exports = router;