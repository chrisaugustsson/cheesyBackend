var sqlite3 = require('sqlite3');

module.exports = (function () {
    if (process.env.NODE_ENV === 'test') {
        console.log("Running in test");
        return new sqlite3.Database('./db/test.sqlite');
    }
    return new sqlite3.Database('./db/texts.sqlite');
}());