var express = require("express");
var router = express.Router();
var reports = require("./../models/reports");
var checktoken = require("./../middlewares/checktoken");

router.post("/", checktoken, async (req, res) => {
    const name = req.body.name;
    const content = req.body.content;
    let result;

    if (!name || !content) {
        res.status(500).json({
            error: "Missing reports name or content"
        });
    }

    // Try to add report to database.
    // Return message if ok, catch error if not.
    try {
        result = await reports.addReport(name, content);
    } catch (error) {
        return res.status(500).json({
            error
        })
    }

    return res.json({
        result
    })
})

router.get("/:kmom", async (req, res) => {
    let result;

    // Try to fetch the report from database
    // Return error with status 500 if error
    try {
        result = await reports.get(req.params.kmom);
    } catch (error) {
        return res.status(500).json({
            error
        })
    }

    return res.json({
        result
    })
});

module.exports = router;