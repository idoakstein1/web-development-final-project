/**
 * @swagger
 * /posts:
 *  post:
 *   summary: Create new post
 *   tags: [Posts]
 *   security:
 *     - bearerAuth: []
 *   requestBody:
 *    required: true
 *    content:
 *       application/json:
 *        schema:
 *            $ref: '#/components/schemas/PostWithoutId'
 *   responses:
 *     200:
 *       description: Creation succeeded
 *
 *     400:
 *       description: Missing body param or invalid id
 *     500:
 *       description: Internal server error
 *
 */

/**
 * @swagger
 * /posts/{id}:
 *  get:
 *      summary: Find post by id
 *      tags: [Posts]
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *                type: string
 *                required: true
 *                description: Id of the post to find
 *                example: 673b418c7a4c7c28093f2633
 *      responses:
 *         200:
 *            description: The post
 *            content:
 *                application/json:
 *                  schema:
 *                       $ref: '#/components/schemas/Post'
 *         400:
 *            description: Missing param id
 *         404:
 *            description: Post not found
 *         500:
 *            description: Internal server error
 *
 */

/**
 * @swagger
 * /posts/{id}:
 *  put:
 *      summary: Edit post by id
 *      tags: [Posts]
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *                type: string
 *                required: true
 *                description: Id of the post to edit
 *                example: 673b418c7a4c7c28093f2633
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChangePost'
 *      responses:
 *         200:
 *            description: Updated post
 *         400:
 *            description: Missing body params
 *         403:
 *           description: Forbidden to edit post
 *         500:
 *            description: Internal server error
 *
 */
/**
 * @swagger
 * /posts/{id}:
 *  delete:
 *      summary: Delete post by id
 *      tags: [Posts]
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *                type: string
 *                required: true
 *                description: Id of the post to delete
 *                example: 673b418c7a4c7c28093f2633
 *      responses:
 *         200:
 *            description: The deleted post
 *         400:
 *            description: Missing param id
 *         403:
 *            description: Forbidden to delete post
 *         404:
 *            description: Post not found
 *         500:
 *            description: Internal server error
 *
 */
/**
 * @swagger
 * /posts:
 *  get:
 *      summary: Get all posts
 *      tags: [Posts]
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - in: query
 *            name: page
 *            schema:
 *                type: string
 *                description: Page number for pagination
 *                example: 1
 *          - in: query
 *            name: limit
 *            schema:
 *                type: string
 *                description: Limit for posts
 *                example: 10
 *      responses:
 *         200:
 *            description: Feed of posts
 *         500:
 *            description: Internal server error
 *
 */
/**
 * @swagger
 * /posts/users/{userId}:
 *  get:
 *      summary: Get all posts of user
 *      tags: [Posts]
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - in: path
 *            name: userId
 *            schema:
 *                type: string
 *                description: Id of the user to get posts
 *                example: 673b418c7a4c7c28093f2633
 *      responses:
 *         200:
 *            description: user's posts
 *         500:
 *            description: Internal server error
 *
 */
