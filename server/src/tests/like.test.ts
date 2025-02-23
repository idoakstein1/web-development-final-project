import { Express } from 'express';
import mongoose from 'mongoose';
import request from 'supertest';
import { Post, postModel, User, userModel } from '../models';

let app: Express;

let testUser: Partial<User> = {
    username: 'testuser',
    email: 'test@user.com',
    password: 'testpassword',
    profilePicture: 'aaa',
};

let testPost: Omit<Post, 'user' | 'externalMovie'> & { externalMovieId: string } = {
    likes: 0,
    title: 'Test post',
    createdAt: new Date(),
    updatedAt: new Date(),
    rate: 2,
    externalMovieId: 'tt1285016',
    photoUrl: '123',
    content: 'Test content',
    commentsCount: 0,
};

let userId: string;
let userToken: string;
let postId: string;

beforeAll(async () => {
    app = await global.initTestServer();
    await userModel.deleteMany();
    await postModel.deleteMany();
    const res = (await request(app).post('/users').send(testUser)).body;
    userId = res._id;
    const { accessToken } = (
        await request(app).post('/auth/login').send({ username: testUser.username, password: 'testpassword' })
    ).body;
    userToken = accessToken;
    expect(accessToken).toBeDefined();

    const postRes = await request(app)
        .post('/posts')
        .send({ ...testPost, user: { _id: userId, username: testUser.username, profilePicture: 'aaa' } })
        .set({ authorization: 'bearer ' + userToken });

    expect(postRes.statusCode).toBe(200);

    postId = postRes.body._id;
});

afterAll(async () => {
    mongoose.connection.close();

    await global.closeTestServer();
});

describe('Likes Tests', () => {
    test('Test like post missing postId', async () => {
        const { statusCode } = await request(app)
            .post('/likes')
            .set({ authorization: 'bearer ' + userToken });
        expect(statusCode).toBe(404);
    });
    test('Test like post invalid postId', async () => {
        const { statusCode } = await request(app)
            .post('/likes/123')
            .set({ authorization: 'bearer ' + userToken });
        expect(statusCode).toBe(400);
    });
    test('Test like post non existing postId', async () => {
        const { statusCode } = await request(app)
            .post('/likes/678a7386afbdd0b0aac8a572')
            .set({ authorization: 'bearer ' + userToken });
        expect(statusCode).toBe(404);
    });
    test('Test like post', async () => {
        const { statusCode } = await request(app)
            .post(`/likes/${postId}`)
            .set({ authorization: 'bearer ' + userToken });
        expect(statusCode).toBe(200);

        const {
            body: { post },
        } = await request(app)
            .get(`/posts/${postId}`)
            .set({ authorization: 'bearer ' + userToken });
        expect(post.likes).toBe(1);

        const {
            body: { likes: userLikes },
        } = await request(app)
            .get('/likes')
            .set({ authorization: 'bearer ' + userToken });

        expect(userLikes).toEqual([postId]);
    });

    test('Test unlike post missing postId', async () => {
        const { statusCode } = await request(app)
            .delete('/likes')
            .set({ authorization: 'bearer ' + userToken });
        expect(statusCode).toBe(404);
    });

    test('Test unlike post invalid postId', async () => {
        const { statusCode } = await request(app)
            .delete('/likes/123')
            .set({ authorization: 'bearer ' + userToken });
        expect(statusCode).toBe(400);
    });

    test('Test unlike post non existing postId', async () => {
        const { statusCode } = await request(app)
            .delete('/likes/678a7386afbdd0b0aac8a572')
            .set({ authorization: 'bearer ' + userToken });
        expect(statusCode).toBe(404);
    });

    test('Test unlike post', async () => {
        const { statusCode } = await request(app)
            .delete(`/likes/${postId}`)
            .set({ authorization: 'bearer ' + userToken });

        expect(statusCode).toBe(200);

        const {
            body: { post },
        } = await request(app)
            .get(`/posts/${postId}`)
            .set({ authorization: 'bearer ' + userToken });

        expect(post.likes).toBe(0);

        const {
            body: { likes: userLikes },
        } = await request(app)
            .get('/likes')
            .set({ authorization: 'bearer ' + userToken });

        expect(userLikes).toEqual([]);
    });
});
