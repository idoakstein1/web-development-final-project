import request from 'supertest';
import mongoose from 'mongoose';
import { commentModel } from '../models/comment';
import { Express } from 'express';
import { User, userModel } from '../models';
import { postModel } from '../models';

let app: Express;

let testUser: Omit<User, 'watchLater'> & { _id: string } = {
    username: 'testuser',
    email: 'test@user.com',
    password: 'testpassword',
    tokens: [],
    likes: [],
    _id: '',
};
let userId: string;
let postId: string;
let accessToken: string;

beforeAll(async () => {
    app = await global.initTestServer();

    await commentModel.deleteMany();
    await userModel.deleteMany();
    await postModel.deleteMany();

    testUser = (await request(app).post('/users').send(testUser)).body;
    userId = testUser._id;
    const { accessToken: a } = (
        await request(app)
            .post('/auth/login')
            .send({ ...testUser, password: 'testpassword' })
    ).body;
    accessToken = a;

    postId = (
        await postModel.create({
            user: {
                _id: userId,
                username: testUser.username,
            },
            title: 'Test Post',
            content: 'Test Content',
            externalMovie: { id: '1', name: '1', year: '1', type: '1', poster: '1' },
            photoUrl: 'efsdfsdffdseee',
            rate: 3,
        })
    )._id.toJSON();
});

afterAll(async () => {
    mongoose.connection.close();
    await global.closeTestServer();
});

let commentId = '';

describe('Comments Tests', () => {
    test('Test Create Comment', async () => {
        const {
            statusCode,
            body: { content: expectedContent, postId: expectedpostId, user: expectedUser, _id },
        } = await request(app)
            .post('/comments')
            .send({
                user: {
                    _id: userId,
                    username: testUser.username,
                },
                content: 'Test Comment',
                postId,
            })
            .set({ authorization: 'bearer ' + accessToken });
        expect(statusCode).toBe(200);
        expect(expectedContent).toBe('Test Comment');
        expect(expectedpostId).toBe(postId);
        expect(expectedUser).toEqual({
            _id: userId,
            username: testUser.username,
        });
        commentId = _id;
    });

    test('Should not create comment with missing body params', async () => {
        const { statusCode } = await request(app)
            .post('/comments')
            .send({ content: 'Test Comment' })
            .set({ authorization: 'bearer ' + accessToken });
        expect(statusCode).toBe(400);
    });

    test('Should not create comment with invalid post id', async () => {
        const { statusCode } = await request(app)
            .post('/comments')
            .send({
                user: {
                    _id: userId,
                    username: testUser.username,
                },
                content: 'Test Comment',
                postId: 'invalidID',
            })
            .set({ authorization: 'bearer ' + accessToken });
        expect(statusCode).toBe(400);
    });

    test('Should not create comment with non existing post id', async () => {
        const { statusCode } = await request(app)
            .post('/comments')
            .send({
                user: {
                    _id: userId,
                    username: testUser.username,
                },
                content: 'Test Comment',
                postId: '60c4b7e3b7a1a4f3f8e8f3d7',
            })
            .set({ authorization: 'bearer ' + accessToken });
        expect(statusCode).toBe(404);
    });

    test('Test add another comment to the same post', async () => {
        const {
            statusCode,
            body: { content: expectedContent, postId: expectedpostId, user: expectedUser },
        } = await request(app)
            .post('/comments')
            .send({
                user: {
                    _id: userId,
                    username: testUser.username,
                },
                content: 'Test Comment 2',
                postId,
            })
            .set({ authorization: 'bearer ' + accessToken });
        expect(statusCode).toBe(200);
        expect(expectedContent).toBe('Test Comment 2');
        expect(expectedpostId).toBe(postId);
        expect(expectedUser).toEqual({
            _id: userId,
            username: testUser.username,
        });
    });

    test('Test get comments by post id', async () => {
        const {
            statusCode,
            body: { comments },
        } = await request(app)
            .get('/comments/post/' + postId)
            .set({ authorization: 'bearer ' + accessToken });
        expect(statusCode).toBe(200);
        expect(comments.length).toBe(2);
        expect(comments[0].content).toBe('Test Comment 2');
        expect(comments[0].postId).toBe(postId);
        expect(comments[0].user).toEqual({
            _id: userId,
            username: testUser.username,
        });
        expect(comments[1].content).toBe('Test Comment');
        expect(comments[1].postId).toBe(postId);
        expect(comments[1].user).toEqual({
            _id: userId,
            username: testUser.username,
        });
    });

    test('Should not get comments with invalid post id', async () => {
        const { statusCode } = await request(app)
            .get('/comments/post/invalidID')
            .set({ authorization: 'bearer ' + accessToken });
        expect(statusCode).toBe(400);
    });
});
