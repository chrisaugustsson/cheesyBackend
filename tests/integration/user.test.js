const request = require('supertest');
const app = require('../../app');
const db = require("../../db/database");

jest.unmock("sqlite3");
jest.unmock("bcrypt");
jest.unmock("jsonwebtoken");

beforeAll((done) => {
    db.run("DELETE FROM users;", (err) => {
        done();
    });
})

describe('Test login path without users', () => {
    test('It should response the GET method', (done) => {
        request(app).post('/user/login').send({ email: "test@test.se", password: "password" }).then((response) => {
            expect(response.body.error.error.type).toEqual("Database");
            expect(response.statusCode).toBe(401);
            done();
        });
    });
});

describe('Test login path with missing password', () => {
    test('Should return 401', (done) => {
        request(app).post('/user/login').send({ email: "test@test.se" }).then((response) => {
            expect(response.body.errors.title).toEqual("Email or password missing");
            expect(response.statusCode).toBe(401);
            done();
        });
    });
});

describe('Register a new user', () => {
    test('Should go through without problems and should fail a second time', (done) => {
        request(app).post('/user/register').send({ email: "test@test.se", password: "password" }).then((response) => {
            expect(response.statusCode).toBe(200);
            request(app).post('/user/register').send({ email: "test@test.se", password: "password" }).then((response) => {
                expect(response.body.error.title).toEqual("database error");
                expect(response.statusCode).toBe(500);
                done();
            });
        });
    });
});


describe('Test login path with success', () => {
    test('It should response the GET method', (done) => {
        request(app).post('/user/register').send({ email: "test@test.se", password: "password" }).then((response) => {
            expect(response.statusCode).toBe(200);
            request(app).post('/user/login').send({ email: "test@test.se", password: "password" }).then((response) => {
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    });
});

describe('Test login path with wrong password', () => {
    test('It should response the GET method', (done) => {
        request(app).post('/user/register').send({ email: "test@test.se", password: "password" }).then((response) => {
            expect(response.statusCode).toBe(200);
            request(app).post('/user/login').send({ email: "test@test.se", password: "passworda" }).then((response) => {
                expect(response.statusCode).toBe(401);
                done();
            });
        });
    });
});


afterEach((done) => {
    db.serialize(() => {
        db.run("DELETE FROM users;", (err) => {
            db.run("DELETE FROM reports;", (err) => {
                done();
            });
        });
    });
});