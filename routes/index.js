var express = require('express');
var router = express.Router();

var me = require("./../models/me");

router.get('/', function (req, res) {
    const data = me.getMe();

    res.json(data);
});

module.exports = router;