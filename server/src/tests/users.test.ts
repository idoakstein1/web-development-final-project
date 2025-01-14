import request from 'supertest';
import mongoose from 'mongoose';
import { Express } from 'express';
import { User, userModel } from '../models';
import { hashPassword } from '../helperFunctions';
import { compare } from 'bcrypt';

let app: Express;

let testUser: User & { _id: string } = {
    username: 'testuser',
    email: 'test@user.com',
    password: 'testpassword',
    _id: '',
    tokens: [],
};
let userId: string;

beforeAll(async () => {
    app = await global.initTestServer();
    await userModel.deleteMany();
});

afterAll(async () => {
    mongoose.connection.close();

    await global.closeTestServer();
});

describe('Users Tests', () => {
    test('Test Create user', async () => {
        const {
            statusCode,
            body: { _id, username, email, password },
        } = await request(app).post('/users').send(testUser);
        userId = _id;
        expect(statusCode).toBe(200);
        expect(username).toBe(testUser.username);
        expect(email).toBe(testUser.email);
        const samePassword = await compare(testUser.password, password);
        expect(samePassword).toBe(true);
    });
    test('Test create user with missing body param - username', async () => {
        const { statusCode } = await request(app).post('/users').send({
            email: 'example@gmail.com',
            password: 'testpassword',
        });
        expect(statusCode).toBe(400);
    });
    test('Test create user with missing body param - email', async () => {
        const { statusCode } = await request(app).post('/users').send({
            username: 'tests242q',
            password: 'testpassword',
        });
        expect(statusCode).toBe(400);
    });
    test('Test create user with missing body param - password', async () => {
        const { statusCode } = await request(app).post('/users').send({
            email: 'example@gmail.com',
            username: 'testpassword',
        });
        expect(statusCode).toBe(400);
    });

    test('Test create user with existing username', async () => {
        const { statusCode } = await request(app).post('/users').send({
            username: 'testuser',
            email: 'example@gmail.com',
            password: 'testpassword',
        });
        expect(statusCode).toBe(400);
    });
});
