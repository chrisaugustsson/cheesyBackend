const user = require("../../models/user");


test("Register user with Happy path", () => {
    return expect(user.registerUser("user", "password")).resolves.toEqual({
        data: {
            message: "User successfully registered."
        }
    })
});

test("Register user with Bcrypt error", () => {
    return expect(user.registerUser(undefined, undefined)).rejects.toEqual({
        "detail": "This is error",
        "source": "user/register",
        "status": 500,
        "title": "bcrypt error"
    })
});

test("Register user with database error", () => {
    return expect(user.registerUser("fail", "password")).rejects.toEqual({
        "status": 500,
        "source": "user/register",
        "title": "database error",
        "detail": "error"
    })
});

test("Login, happy path", () => {
    return expect(user.login("user", "password")).resolves.toEqual({
        data: {
            status: "success",
            user: "user",
            token: "token"
        }
    })
});

test("Login, wrong password", () => {
    return expect(user.login("user", "passwor")).rejects.toEqual({
        status: 401,
        error: {
            type: "Wrong password",
            detail: "Password is incorrect."
        }
    })
});

test("Login, database error", () => {
    return expect(user.login("fail", "passwor")).rejects.toEqual({
        status: 500,
        error: {
            type: "Database",
            detail: "error"
        }
    })
});

test("Login, no user found", () => {
    return expect(user.login("noUser", "passwor")).rejects.toEqual({
        status: 401,
        error: {
            type: "Database",
            detail: "User not found"
        }
    })
});

test("Login, Bcrypt error", () => {
    return expect(user.login("user", undefined)).rejects.toEqual({
        status: 500,
        error: {
            type: "bcrypt error",
            detail: "This is error"
        }
    })
});