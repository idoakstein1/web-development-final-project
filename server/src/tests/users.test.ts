import request from 'supertest';
import mongoose, { set } from 'mongoose';
import { Express } from 'express';
import { User, userModel } from '../models';
import { compare } from 'bcrypt';

let app: Express;

let testUser: Omit<User, 'watchLater'> & { _id: string } = {
    username: 'testuser',
    email: 'test@user.com',
    password: 'testpassword',
    _id: '',
    tokens: [],
    likes: [],
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

    test('Test add watch later', async () => {
        const { statusCode } = await request(app)
            .post(`/watch-later/tt0460649`)
            .set({ authorization: 'bearer ' + accessToken });
        expect(statusCode).toBe(200);

        const { body } = await request(app)
            .get('/watch-later')
            .set({ authorization: 'bearer ' + accessToken });

        expect(
            body.watchLater.map((e: any) => ({
                id: e.id,
                name: e.name,
                year: e.year,
                type: e.type,
                poster: e.poster,
            }))[0]
        ).toEqual({
            id: 'tt0460649',
            name: 'How I Met Your Mother',
            year: '2005–2014',
            type: 'series',
            poster: 'https://m.media-amazon.com/images/M/MV5BNjg1MDQ5MjQ2N15BMl5BanBnXkFtZTYwNjI5NjA3._V1_SX300.jpg',
        });
    });

    test('Test add watch later - already exists', async () => {
        const { statusCode } = await request(app)
            .post(`/watch-later/tt0460649`)
            .set({ authorization: 'bearer ' + accessToken });
        expect(statusCode).toBe(400);
    });

    test('Test add watch later - ovveride', async () => {
        const { statusCode } = await request(app)
            .put('/watch-later')
            .send({ watchLater: ['tt1232829', 'tt0151804'] })
            .set({ authorization: 'bearer ' + accessToken });
        expect(statusCode).toBe(200);

        const { body } = await request(app)
            .get('/watch-later')
            .set({ authorization: 'bearer ' + accessToken });

        expect(
            body.watchLater.map((e: any) => ({
                id: e.id,
                name: e.name,
                year: e.year,
                type: e.type,
                poster: e.poster,
            }))[0]
        ).toEqual({
            id: 'tt1232829',
            name: '21 Jump Street',
            year: '2012',
            type: 'movie',
            poster: 'https://m.media-amazon.com/images/M/MV5BMTg2NjJiODctM2IyMS00MmQ5LWI1YmQtNTBjMTI4M2U2YzA5XkEyXkFqcGc@._V1_SX300.jpg',
        });
        expect(
            body.watchLater.map((e: any) => ({
                id: e.id,
                name: e.name,
                year: e.year,
                type: e.type,
                poster: e.poster,
            }))[1]
        ).toEqual({
            id: 'tt0151804',
            name: 'Office Space',
            year: '1999',
            type: 'movie',
            poster: 'https://m.media-amazon.com/images/M/MV5BOTA5MzQ3MzI1NV5BMl5BanBnXkFtZTgwNTcxNTYxMTE@._V1_SX300.jpg',
        });
    });

    test('Test add watch later - missing body param', async () => {
        const { statusCode } = await request(app)
            .put('/watch-later')
            .set({ authorization: 'bearer ' + accessToken });
        expect(statusCode).toBe(400);
    });
});
