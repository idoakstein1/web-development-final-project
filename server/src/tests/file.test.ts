import request from 'supertest';
import mongoose from 'mongoose';
import { Express } from 'express';
import path from 'path';
import fs from 'fs';
import { User } from '../models';

var app: Express;

let testUser: Partial<User> = {
    username: 'testuser',
    email: 'test@user.com',
    password: 'testpassword',
};

let userId: string;
let userToken: string;

beforeAll(async () => {
    if (!fs.existsSync('public')) {
        fs.mkdirSync('public');
    }
    app = await global.initTestServer();

    const res = (await request(app).post('/users').send(testUser)).body;
    userId = res._id;
    const { accessToken } = (
        await request(app).post('/auth/login').send({ username: testUser.username, password: 'testpassword' })
    ).body;
    userToken = accessToken;
});

afterAll(async () => {
    mongoose.connection.close();
    await global.closeTestServer();
});

describe('File Tests', () => {
    test('File test', async () => {
        const filePath = path.resolve(__dirname, 'test_file.txt');
        const response = await request(app)
            .post('/file')
            .set({ authorization: 'bearer ' + userToken })
            .attach('file', filePath);
        expect(response.statusCode).toBe(200);
        let url = response.body.url;
        console.log('url: ' + url);
        url = url.replace(/^.*\/\/[^/]+/, '');
        console.log('url: ' + url);

        const response2 = await request(app)
            .get(url)
            .set({ authorization: 'bearer ' + userToken });
        expect(response2.statusCode).toBe(200);
    });
});
