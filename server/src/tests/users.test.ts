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
let accessToken: string;

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

    test('Test find user by username', async () => {
        const { body } = await request(app).post('/auth/login').send({
            username: testUser.username,
            password: testUser.password,
        });

        accessToken = body.accessToken;

        const {
            statusCode,
            body: { username, email },
        } = await request(app)
            .get(`/users/${testUser.username}`)
            .set({ authorization: 'bearer ' + accessToken });
        expect(statusCode).toBe(200);
        expect(username).toBe(testUser.username);
        expect(email).toBe(testUser.email);
    });
    test('Test find user by username - not found', async () => {
        const { statusCode } = await request(app)
            .get('/users/notfound')
            .set({ authorization: 'bearer ' + accessToken });
        expect(statusCode).toBe(404);
    });

    test('Test update user', async () => {
        const { statusCode, body } = await request(app)
            .patch(`/users/${testUser.username}`)
            .send({ username: 'newusername' })
            .set({ authorization: 'bearer ' + accessToken });
        expect(statusCode).toBe(200);
        expect(body.username).toBe('newusername');
        testUser.username = 'newusername';
    });

    test('Test update user with missing body param - username and email', async () => {
        const { statusCode } = await request(app)
            .patch(`/users/${testUser.username}`)
            .set({ authorization: 'bearer ' + accessToken });
        expect(statusCode).toBe(400);
    });

    //create another user and test update with existing username

    test('Test update user with existing username', async () => {
        const { body } = await request(app).post('/users').send({
            username: 'guy',
            password: '123',
            email: 'test',
        });

        const { statusCode } = await request(app)
            .patch(`/users/${testUser.username}`)
            .send({ username: 'guy' })
            .set({ authorization: 'bearer ' + accessToken });
        expect(statusCode).toBe(400);
    });

    test('Test update other user data', async () => {
        const { statusCode, body } = await request(app)
            .patch(`/users/ddddd`)
            .send({ username: 'fdsfsdf' })
            .set({ authorization: 'bearer ' + accessToken });

        expect(statusCode).toBe(401);
    });
});
