/**
 * @swagger
 * /content/search:
 *  get:
 *   summary: Search items from imdb
 *   tags: [Content]
 *   security:
 *     - bearerAuth: []
 *   parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           description: The type of the item (series, movie)
 *           example: series
 *       - in: query
 *         name: year
 *         schema:
 *           type: string
 *           description: The year of the item
 *           example: 2021
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *           required: true
 *           description: The name of the item
 *           example: The big bang theory
 *   responses:
 *     200:
 *       description: The items
 *     400:
 *       description: title is missing
 *     404:
 *      description: No results found or search was too broad
 *     500:
 *       description: Internal server error
 *
 */
