import request from 'supertest';
import mongoose from 'mongoose';
import { Express } from 'express';
import { postModel, userModel, User } from '../models';
import { title } from 'process';

let app: Express;

let testUser: Partial<User> = {
    username: 'testuser',
    email: 'test@user.com',
    password: 'testpassword',
    profilePicture: 'aaa',
};

let userId: string;
let userToken: string;

let userId2: string;
let userToken2: string;

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
});

afterAll(async () => {
    mongoose.connection.close();
    await global.closeTestServer();
});

let postId = '';
describe('Posts Tests', () => {
    test('Posts test get all', async () => {
        const {
            statusCode,
            body: { posts },
        } = await request(app)
            .get('/posts')
            .set({ authorization: 'bearer ' + userToken });
        expect(statusCode).toBe(200);
        expect(posts.length).toBe(0);
    });
    test('Posts test get all non existin sender', async () => {
        const { statusCode } = await request(app)
            .get(`/posts/${userId}1`)
            .set({ authorization: 'bearer ' + userToken });
        expect(statusCode).toBe(400);
    });
    test('Posts test get all invalid sender id', async () => {
        const { statusCode } = await request(app)
            .get('/posts/123')
            .set({ authorization: 'bearer ' + userToken });
        expect(statusCode).toBe(400);
    });

    test('Test Create Post', async () => {
        const {
            statusCode,
            body: { title, content, _id },
        } = await request(app)
            .post('/posts')
            .set({ authorization: 'bearer ' + userToken })
            .send({
                title: 'Test Post',
                content: 'Test Content',
                user: {
                    _id: userId,
                    username: testUser.username,
                    profilePicture: 'aaa',
                },
                externalMovieId: 'tt1285016',
                photoUrl: 'https://www.google.com',
                rate: 3,
            });
        expect(statusCode).toBe(200);
        expect(title).toBe('Test Post');
        expect(content).toBe('Test Content');
        postId = _id;
    });
    test('Test Create Post with invalid sender', async () => {
        const { statusCode } = await request(app)
            .post('/posts')
            .set({ authorization: 'bearer ' + userToken })
            .send({
                title: 'Test Post',
                content: 'Test Content',
                user: {
                    _id: userId + '1',
                    username: testUser.username,
                    profilePicture: 'aaa',
                },
                externalMovieId: 'tt1285016',
                photoUrl: 'https://www.google.com',
                rate: 3,
            });
        expect(statusCode).toBe(400);
    });
    test('Test Create Post with invalid user id', async () => {
        const { statusCode } = await request(app)
            .post('/posts')
            .set({ authorization: 'bearer ' + userToken })
            .send({
                title: 'Test Post',
                content: 'Test Content',
                user: {
                    _id: '1',
                    username: testUser.username,
                    profilePicture: 'aaa',
                },
                externalMovieId: 'tt1285016',
                photoUrl: 'https://www.google.com',
                rate: 3,
            });
        expect(statusCode).toBe(400);
    });
    test('Test Create Post with missing photoUrl', async () => {
        const { statusCode } = await request(app)
            .post('/posts')
            .set({ authorization: 'bearer ' + userToken })
            .send({
                title: 'Test Post',
                content: 'Test Content',
                user: {
                    _id: userId,
                    username: testUser.username,
                    profilePicture: 'aaa',
                },
                externalMovieId: 'tt1285016',
                rate: 3,
            });
        expect(statusCode).toBe(400);
    });
    test('Test Create Post with missing externalMovieId', async () => {
        const { statusCode } = await request(app)
            .post('/posts')
            .set({ authorization: 'bearer ' + userToken })
            .send({
                title: 'Test Post',
                content: 'Test Content',
                user: {
                    _id: userId,
                    username: testUser.username,
                    profilePicture: 'aaa',
                },
                photoUrl: 'fsdfsdf',
                rate: 3,
            });
        expect(statusCode).toBe(400);
    });
    test('Test Create Post with missing title', async () => {
        const { statusCode } = await request(app)
            .post('/posts')
            .set({ authorization: 'bearer ' + userToken })
            .send({
                content: 'Test Content',
                user: {
                    _id: userId,
                    username: testUser.username,
                    profilePicture: 'aaa',
                },
                photoUrl: 'fsdfsdf',
                externalMovieId: 'tt1285016',
                rate: 3,
            });
        expect(statusCode).toBe(400);
    });
    test('Test Create Post with missing rate', async () => {
        const { statusCode } = await request(app)
            .post('/posts')
            .set({ authorization: 'bearer ' + userToken })
            .send({
                content: 'Test Content',
                user: {
                    _id: userId,
                    username: testUser.username,
                    profilePicture: 'aaa',
                },
                photoUrl: 'fsdfsdf',
                externalMovieId: 'tt1285016',
                title: 'Test Title',
            });
        expect(statusCode).toBe(400);
    });
    test('Test update post content', async () => {
        const {
            statusCode,
            body: { modifiedCount },
        } = await request(app)
            .put(`/posts/${postId}`)
            .set({ authorization: 'bearer ' + userToken })
            .send({
                content: 'Test Content Updated',
            });
        expect(statusCode).toBe(200);
        expect(modifiedCount).toBe(1);
    });
    test('Test update post content with non exsiting post', async () => {
        const { statusCode } = await request(app)
            .put(`/posts/678a7386afbdd0b0aac8a572`)
            .set({ authorization: 'bearer ' + userToken })
            .send({
                content: 'Test Content Updated',
            });
        expect(statusCode).toBe(403);
    });
    test('Test update post content with invalid post id', async () => {
        const { statusCode } = await request(app)
            .put(`/posts/${123}`)
            .set({ authorization: 'bearer ' + userToken })
            .send({
                content: 'Test Content Updated',
            });
        expect(statusCode).toBe(400);
    });
    test('Test update post content with no update content', async () => {
        const { statusCode } = await request(app)
            .put(`/posts/${123}`)
            .set({ authorization: 'bearer ' + userToken })
            .send({});
        expect(statusCode).toBe(400);
    });

    test('Test get post by id', async () => {
        const {
            statusCode,
            body: {
                post: { title, content },
            },
        } = await request(app)
            .get(`/posts/${postId}`)
            .set({ authorization: 'bearer ' + userToken });
        expect(statusCode).toBe(200);
        expect(title).toBe('Test Post');
        expect(content).toBe('Test Content Updated');
    });
    test('Test get post with invalid id', async () => {
        const { statusCode } = await request(app)
            .get(`/posts/${123}`)
            .set({ authorization: 'bearer ' + userToken });
        expect(statusCode).toBe(400);
    });
    test('Test get post with non existing id', async () => {
        const { statusCode } = await request(app)
            .get(`/posts/677d616167ce3c54892ae6ad`)
            .set({ authorization: 'bearer ' + userToken });
        expect(statusCode).toBe(404);
    });

    test('Test Create Post 2', async () => {
        const { statusCode } = await request(app)
            .post('/posts')
            .set({ authorization: 'bearer ' + userToken })
            .send({
                title: 'Test Post2',
                content: 'Test Content1',
                user: {
                    _id: userId,
                    username: testUser.username,
                    profilePicture: 'aaa',
                },
                externalMovieId: 'tt1285016',
                photoUrl: 'https://www.google.com',
                rate: 3,
            });
        expect(statusCode).toBe(200);
    });

    test('Posts test get all 2 - my posts', async () => {
        const {
            statusCode,
            body: { posts },
        } = await request(app)
            .get('/posts')
            .set({ authorization: 'bearer ' + userToken });
        expect(statusCode).toBe(200);
        expect(posts.length).toBe(0);
    });

    test('Posts test get 2 - other posts', async () => {
        await request(app)
            .post('/users')
            .send({ username: 'testuser2', email: 'fsdf@fdsf', password: '123', profilePicture: 'aaa' });
        const res = await request(app).post('/auth/login').send({ username: 'testuser2', password: '123' });

        userId2 = res.body.user._id;
        userToken2 = res.body.accessToken;

        await request(app)
            .post('/posts')
            .set({ authorization: 'bearer ' + userToken2 })
            .send({
                title: 'Test Post',
                content: 'Test Content1',
                user: {
                    _id: userId2,
                    username: 'testuser2',
                    profilePicture: 'aaa',
                },
                externalMovieId: 'tt1285016',
                photoUrl: 'https://www.google.com',
                rate: 3,
            });

        await request(app)
            .post('/posts')
            .set({ authorization: 'bearer ' + userToken2 })
            .send({
                title: 'Test Post2',
                content: 'Test Content2',
                user: {
                    _id: userId2,
                    username: 'testuser2',
                    profilePicture: 'aaa',
                },
                externalMovieId: 'tt1285016',
                photoUrl: 'https://www.google.com',
                rate: 3,
            });

        const {
            statusCode,
            body: { posts },
        } = await request(app)
            .get('/posts')
            .set({ authorization: 'bearer ' + userToken });

        expect(statusCode).toBe(200);
        expect(posts.length).toBe(2);
    });

    test('Posts test get 2 with paging', async () => {
        await request(app)
            .post('/posts')
            .set({ authorization: 'bearer ' + userToken2 })
            .send({
                title: 'Test Post3',
                content: 'Test Content3',
                user: {
                    _id: userId2,
                    username: 'testuser2',
                    profilePicture: 'aaa',
                },
                externalMovieId: 'tt1285016',
                photoUrl: 'https://www.google.com',
                rate: 3,
            });

        await request(app)
            .post('/posts')
            .set({ authorization: 'bearer ' + userToken2 })
            .send({
                title: 'Test Post4',
                content: 'Test Content4',
                user: {
                    _id: userId2,
                    username: 'testuser2',
                    profilePicture: 'aaa',
                },
                externalMovieId: 'tt1285016',
                photoUrl: 'https://www.google.com',
                rate: 3,
            });

        const {
            statusCode,
            body: { posts },
        } = await request(app)
            .get('/posts')
            .query({ limit: 2, page: 2 })
            .set({ authorization: 'bearer ' + userToken });

        const titles = posts.map((p: any) => p.title);

        expect(titles).toEqual(['Test Post2', 'Test Post']);
        expect(statusCode).toBe(200);
        expect(posts.length).toBe(2);
    });

    test('Posts get by user id', async () => {
        const {
            statusCode,
            body: { posts },
        } = await request(app)
            .get(`/posts/users/${userId}`)
            .set({ authorization: 'bearer ' + userToken });
        expect(statusCode).toBe(200);
        expect(posts.length).toBe(2);
    });
    test('Posts get by user id invalid userId', async () => {
        const { statusCode } = await request(app)
            .get(`/posts/users/123`)
            .set({ authorization: 'bearer ' + userToken });
        expect(statusCode).toBe(400);
    });
    test('Posts get by user id non existing user', async () => {
        const { statusCode } = await request(app)
            .get(`/posts/users/677d616167ce3c54892ae6ad`)
            .set({ authorization: 'bearer ' + userToken });
        expect(statusCode).toBe(404);
    });

    test('Test delete post failed - invalid postId', async () => {
        const { statusCode } = await request(app)
            .delete(`/posts/677d616167ce3c54892ae6ad`)
            .set({ authorization: 'bearer ' + userToken });

        expect(statusCode).toBe(404);
    });

    test('Test delete post failed - non existing post', async () => {
        const { statusCode } = await request(app)
            .delete(`/posts/${123}`)
            .set({ authorization: 'bearer ' + userToken });

        expect(statusCode).toBe(400);
    });

    test('Test delete post', async () => {
        const { statusCode } = await request(app)
            .delete(`/posts/${postId}`)
            .set({ authorization: 'bearer ' + userToken });

        expect(statusCode).toBe(200);
    });
});
