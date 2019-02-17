const request = require('supertest');
const app = require('../../app');
const db = require("../../db/database");

jest.unmock("sqlite3");
jest.unmock("bcrypt");
jest.unmock("jsonwebtoken");