module.exports = {
    Database: function () {
        return {
            get: jest.fn((query, params, callback) => {
                if (params === "fail") {
                    callback("error")
                }
                callback(null, { res: "ok" })
            }),
            run: jest.fn((sql, param1, param2, callback) => {
                if (param1 === "fail") {
                    callback("error")
                }
                callback(null, { data: { message: "Reports added" } })
            })
        }
    }
};