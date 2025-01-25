/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *         - profilePicture
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the user
 *         username:
 *           type: string
 *           description: The user's username
 *         email:
 *           type: string
 *           description: The user's email
 *         password:
 *           type: string
 *           description: The user password
 *         profilePicture:
 *           type: date
 *           description: The user's birth date
 *       example:
 *         _id: 67796f764899e36c4973095c
 *         username: 'bob'
 *         email: 'bob@gmail.com'
 *         password: '123456'
 *         profilePicture: 'http://example.com/picture.jpg'
 *     UserData:
 *       type: object
 *       required:
 *         - username
 *         - _id
 *         - profilePicture
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the user
 *         username:
 *           type: string
 *           description: The user's username
 *         profilePicture:
 *           type: date
 *           description: The user's birth date
 *       example:
 *         _id: 67796f764899e36c4973095c
 *         username: 'bob'
 *         profilePicture: 'http://example.com/picture.jpg'
 *     LogInObject:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: The user's username
 *         password:
 *           type: string
 *           description: The user password
 *       example:
 *         username: 'bob'
 *         password: '123456'
 *     UserWithoutId:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *         - birthDate
 *       properties:
 *         username:
 *           type: string
 *           description: The user's username
 *         email:
 *           type: string
 *           description: The user's email
 *         password:
 *           type: string
 *           description: The user password
 *         birthDate:
 *           type: date
 *           description: The user's birth date
 *       example:
 *         username: 'bob'
 *         email: 'bob@gmail.com'
 *         password: '123456'
 *         birthDate: '1990-01-01'
 *     ChangeUserDetails:
 *       type: object
 *       required:
 *         - username
 *         - profilePicture
 *       properties:
 *         username:
 *           type: string
 *           description: The user's username
 *         profilePicture:
 *           type: string
 *           description: The user's profile picture
 *       example:
 *         username: 'bob'
 *         profilePicture: 'http://example.com/picture.jpg'
 *     Tokens:
 *       type: object
 *       required:
 *         - accessToken
 *         - refreshToken
 *       properties:
 *         accessToken:
 *           type: string
 *           description: The JWT access token
 *         refreshToken:
 *           type: string
 *           description: The JWT refresh token
 *       example:
 *         accessToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *         refreshToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *     RefreshToken:
 *       type: object
 *       required:
 *         - refreshToken
 *       properties:
 *         refreshToken:
 *           type: string
 *           description: The JWT refresh token
 *       example:
 *         refreshToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *     Post:
 *       type: object
 *       required:
 *         - _id
 *         - title
 *         - content
 *         - externalMovieId
 *         - photoUrl
 *         - rate
 *         - user
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the post
 *         title:
 *           type: string
 *           description: The title of the post
 *         externalMovieId:
 *           type: string
 *           description: The externalMovieId of the post
 *         photoUrl:
 *           type: string
 *           description: The photoUrl of the post
 *         rate:
 *           type: number
 *           description: The rate of the post
 *         user:
 *           type: #ref: '#/components/schemas/UserData'
 *           description: The user that sent the post
 *       example:
 *         _id: 673b418c7a4c7c28093f2633
 *         title: my post
 *         content: my content
 *         externalMovieId: tt0898266
 *         photoUrl: my photoUrl
 *         rate: 3
 *         user: { _id: 67796f764899e36c4973095c, username: 'bob', profilePicture: 'http://example.com/picture.jpg' }
 *     PostWithoutId:
 *       type: object
 *       required:
 *         - title
 *         - content
 *         - externalMovieId
 *         - photoUrl
 *         - rate
 *         - user
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the post
 *         content:
 *           type: string
 *           description: The content of the post
 *         externalMovieId:
 *           type: string
 *           description: The externalMovieId of the post
 *         photoUrl:
 *           type: string
 *           description: The photoUrl of the post
 *         rate:
 *           type: number
 *           description: The rate of the post
 *         user:
 *           type: #ref: '#/components/schemas/UserData'
 *           description: The user that sent the post
 *       example:
 *         title: my post
 *         content: my content
 *         externalMovieId: my externalMovieId
 *         photoUrl: my photoUrl
 *         rate: 3
 *         user: { _id: 67796f764899e36c4973095c, username: 'bob', profilePicture: 'http://example.com/picture.jpg' }
 *     ChangePost:
 *       type: object
 *       required:
 *         - title
 *         - content
 *         - photoUrl
 *         - rate
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the post
 *         content:
 *           type: string
 *           description: The content of the post
 *         photoUrl:
 *           type: string
 *           description: The photoUrl of the post
 *         rate:
 *           type: number
 *           description: The rate of the post
 *       example:
 *         title: my post
 *         content: my content
 *         photoUrl: my photoUrl
 *         rate: 3
 *     CommentWithoutId:
 *       type: object
 *       required:
 *         - postId
 *         - user
 *       properties:
 *         postId:
 *           type: string
 *           description: The post of the comment
 *         content:
 *           type: string
 *           description: The content of the comment
 *         user:
 *           type: #ref: '#/components/schemas/UserData'
 *           description: The user that sent the post
 *
 *       example:
 *         postId: 673b418c7a4c7c28093f2633
 *         content: my content
 *         user: { _id: 67796f764899e36c4973095c, username: 'bob', profilePicture: 'http://example.com/picture.jpg' }
 *     Id:
 *       type: object
 *       required:
 *         - id
 *       properties:
 *         id:
 *           type: string
 *           description: The id
 *       example:
 *         id: 674069829f3ed9c93edb75b0
 */
