const request = require('supertest');
const app = require('../../app');
const db = require("../../db/database");

jest.unmock("sqlite3");
jest.unmock("bcrypt");
jest.unmock("jsonwebtoken");

let token;

beforeAll(async (done) => {
    let register = await request(app).post('/user/register').send({ email: "report@test.se", password: "password" });
    done();
})

describe('Test the path to add report', () => {
    test('It should response the GET method', async (done) => {
        let res = await request(app).post('/user/login').send({ email: "report@test.se", password: "password" });
        request(app).post('/reports')
            .set('x-access-token', res.body.result.data.token)
            .send({ name: "test01", content: "This is content" })
            .then((response) => {
                expect(response.statusCode).toBe(200);
                request(app).get('/reports/test01').then((response) => {
                    expect(response.body.result.content).toEqual("This is content");
                    expect(response.statusCode).toBe(200);
                    done();
                });
            });
    });
});

describe('Test the path to add report with wrong Token', () => {
    test('It should response the GET method', async (done) => {
        request(app).post('/reports')
            .set('x-access-token', "nope")
            .send({ name: "test01", content: "This is content" })
            .then((response) => {
                expect(response.statusCode).toBe(401);
                done();
            });
    });
});

afterAll((done) => {
    db.run("DELETE FROM reports;", () => {
        done();
    });
});