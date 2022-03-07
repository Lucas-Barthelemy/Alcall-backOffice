//MODEL USER
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *                       _id:
 *                         type: string
 *                         description: Id on the database.
 *                         example: 6220d13b0227d83670298ccd
 *                       firebaseId:
 *                         type: string
 *                         description: Id on Firebase
 *                         example: 3t23ROWqfbZSNoV2VkegA7W6Beh1
 *                       email:
 *                         type: string
 *                         description: Email user.
 *                         example: example@gmail.com
 *                       firstName:
 *                         type: string
 *                         description: firstname user.
 *                         example: Example firstname
 *                       lastName:
 *                         type: string
 *                         description: lastname user.
 *                         example: Example lastname
 */

//MODEL NEW USER
/**
 * @swagger
 * components:
 *   schemas:
 *     NewUser:
 *       type: object
 *       properties:
 *                       email:
 *                         type: string
 *                         description: Email user.
 *                         example: example@gmail.com
 *                       firstName:
 *                         type: string
 *                         description: firstname user.
 *                         example: Example firstname
 *                       lastName:
 *                         type: string
 *                         description: lastname user.
 *                         example: Example lastname
 */

//CREATE USER

//CREATE EVENT
/**
 * @swagger
 * /auth/register:
 *  post:
 *    summary: Create User [AUTH]
 *    tags:
 *     - Authentication
 *    requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewUser'
 *    parameters:
 *    - in: path
 *      name: Bearer
 *      schema:
 *        type: string
 *      required: true
 *    description:
 *    responses:
 *      '201':
 *        description: User is created
 *        content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: null
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *      '400':
 *        description: Internal error
 *        content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: INTERNAL_ERROR
 *                 data:
 *                   type: string
 *                   example: null
 *
 */

//GET CURRENT USER
/**
 * @swagger
 * /auth/me:
 *  get:
 *    summary: get current user [AUTH]
 *    tags:
 *     - Authentication
 *    parameters:
 *    - in: path
 *      name: Bearer
 *      schema:
 *        type: string
 *      required: true
 *    description:
 *    responses:
 *      '200':
 *        description: Get current user
 *        content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: null
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *      '404':
 *        description: User not found
 *        content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: NOT_FOUND
 *                 data:
 *                   type: string
 *                   example: null
 *
 */
