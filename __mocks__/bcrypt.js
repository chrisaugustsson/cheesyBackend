module.exports = {
    hash: function (password, salt, callback) {
        if (password === undefined) {
            return callback("This is error")
        }
        return callback(null, password + salt)
    },

    compare: function (password, userPass, callback) {
        if (password === undefined) {
            return callback("This is error")
        }

        if (password === userPass) {
            callback(null, true);
        }

        callback(null, false);
    }
}