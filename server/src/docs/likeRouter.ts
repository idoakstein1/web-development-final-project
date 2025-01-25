/**
 * @swagger
 * /likes/{id}:
 *  post:
 *   summary: Like a post
 *   tags: [Likes]
 *   security:
 *     - bearerAuth: []
 *   parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *              required: true
 *              description: The id of the post
 *              example: 674069829f3ed9c93edb75b0
 *   responses:
 *     200:
 *       description: Like succeeded
 *     400:
 *       description: Missing body param or invalid id
 *     500:
 *       description: Internal server error
 *
 */
/**
 * @swagger
 * /likes/{id}:
 *  delete:
 *   summary: Unlike a post
 *   tags: [Likes]
 *   security:
 *     - bearerAuth: []
 *   parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *              required: true
 *              description: The id of the post
 *              example: 674069829f3ed9c93edb75b0
 *   responses:
 *     200:
 *       description: Unlike succeeded
 *     400:
 *       description: Missing body param or invalid id
 *     500:
 *       description: Internal server error
 *
 */
/**
 * @swagger
 * /likes:
 *  get:
 *   summary: Get user likes
 *   tags: [Likes]
 *   security:
 *     - bearerAuth: []
 *   responses:
 *     200:
 *       description: User likes
 *     500:
 *       description: Internal server error
 *
 */
