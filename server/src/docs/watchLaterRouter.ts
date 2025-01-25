/**
 * @swagger
 * /watch-later/{postId}:
 *  post:
 *   summary: Add a post to watch later
 *   tags: [WatchLater]
 *   security:
 *     - bearerAuth: []
 *   parameters:
 *        - in: path
 *          name: postId
 *          schema:
 *              type: string
 *              required: true
 *              description: The id of the post
 *              example: 674069829f3ed9c93edb75b0
 *   responses:
 *     200:
 *       description: Post added to watch later
 *     400:
 *       description: Missing param postId
 *     500:
 *       description: Internal server error
 *
 */
/**
 * @swagger
 * /watch-later:
 *  get:
 *   summary: Get user's watch later list
 *   tags: [WatchLater]
 *   security:
 *     - bearerAuth: []
 *   responses:
 *     200:
 *       description: The watch later list
 *     500:
 *       description: Internal server error
 *
 */
/**
 * @swagger
 * /watch-later:
 *  put:
 *   summary: Overwrite user's watch later list
 *   tags: [WatchLater]
 *   security:
 *     - bearerAuth: []
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             watchLater:
 *               type: array
 *               items:
 *                 type: string
 *           description: The id of the post
 *           example:
 *             watchLater: ["tt0898266"]
 *   responses:
 *     200:
 *       description: The watch later list
 *     500:
 *       description: Internal server error
 */
