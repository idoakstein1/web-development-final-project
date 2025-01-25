/**
 * @swagger
 * /comments:
 *  post:
 *   summary: Create a comment
 *   tags: [Comments]
 *   security:
 *     - bearerAuth: []
 *   requestBody:
 *    required: true
 *    content:
 *       application/json:
 *        schema:
 *            $ref: '#/components/schemas/CommentWithoutId'
 *   responses:
 *     200:
 *       description: Creation succeeded
 *     400:
 *       description: Missing body param or invalid id
 *     500:
 *       description: Internal server error
 *
 */
/**
 * @swagger
 * /comments/post/{postId}:
 *  get:
 *      summary: Get comments by post id
 *      tags: [Comments]
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - in: path
 *            name: postId
 *            schema:
 *                type: string
 *                required: true
 *                description: The id of the post
 *                example: 674069829f3ed9c93edb75b0
 *      responses:
 *         200:
 *            description: The comments of the post
 *         400:
 *            description: Missing param id or invalid id
 *         500:
 *            description: Internal server error
 *
 */
