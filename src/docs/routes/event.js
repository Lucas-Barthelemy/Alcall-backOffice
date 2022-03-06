//MODEL EVENT
/**
 * @swagger
 * components:
 *   schemas:
 *     Event:
 *       type: object
 *       properties:
 *                       _id:
 *                         type: string
 *                         description: The event ID.
 *                         example: 6221474a8d5ec228f4c9346a
 *                       name:
 *                         type: string
 *                         description: The event name.
 *                         example: Le Moulin
 *                       description:
 *                         type: string
 *                         description: The event description.
 *                         example: Event description
 *                       members:
 *                          type: string
 *                          example: ["3t23ROWqfbZSNoV2VkegA7W6Beh1", "3t23ROWqfbZSNoV2VkegA7W6Beh1", "3t23ROWqfbZSNoV2VkegA7W6Beh1"]
 *                       date:
 *                         type: string
 *                         description: The event date.
 *                         example: Event date
 *                       street:
 *                         type: string
 *                         description: The event street.
 *                         example: 10 rue de Jean Macé
 *                       city:
 *                         type: string
 *                         description: The event city.
 *                         example: Lyon
 *                       price:
 *                         type: string
 *                         description: The event price.
 *                         example: 10.15
 *                       owner:
 *                         type: string
 *                         description: The event owner.
 *                         example: 3t23ROWqfbZSNoV2VkegA7W6Beh1
 */


/**
 * @swagger
 * /event/:
 *  get:
 *    summary: Get all event [AUTH]
 *    parameters:
 *    - in: path
 *      name: Bearer
 *      schema:
 *        type: string
 *      required: true
 *    description:
 *    responses:
 *      '200':
 *        description: A successful response
 *        content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: null
 *                 data:
 *                     type: array
 *                     items:
 *                        $ref: '#/components/schemas/Event'
 *
 */

/**
 * @swagger
 * /event/{eventId}:
 *  get:
 *    summary: Get one event with id [AUTH]
 *    parameters:
 *    - in: path
 *      name: Bearer
 *      schema:
 *        type: string
 *      required: true
 *    description:
 *    responses:
 *      '200':
 *        description: A successful response
 *        content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: null
 *                 data:
 *                   $ref: '#/components/schemas/Event'
 *      '404':
 *        description: Event not Found
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


/**
 * @swagger
 * /event/:
 *  post:
 *    summary: Create event [AUTH]
 *    parameters:
 *    - in: path
 *      name: Bearer
 *      schema:
 *        type: string
 *      required: true
 *    description:
 *    responses:
 *      '201':
 *        description: Event is created
 *        content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: null
 *                 data:
 *                   $ref: '#/components/schemas/Event'
 *      '400':
 *        description: JSON malformed
 *        content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: MALFORMED_JSON
 *                 data:
 *                   type: string
 *                   example: null
 *      '400 ':
 *        description: Not valid type
 *        content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: NOT_VALID_TYPE
 *                 data:
 *                   type: string
 *                   example: null
 *      '500':
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


/**
 * @swagger
 * /event{eventId}:
 *  put:
 *    summary: Modify event [AUTH]
 *    parameters:
 *    - in: path
 *      name: Bearer
 *      schema:
 *        type: string
 *      required: true
 *    description:
 *    responses:
 *      '200':
 *        description: Event is updated
 *        content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: null
 *                 data:
 *                   $ref: '#/components/schemas/Event'
 *      '400':
 *        description: JSON malformed
 *        content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: MALFORMED_JSON
 *                 data:
 *                   type: string
 *                   example: null
 *      ' 400':
 *        description: Not valid type
 *        content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: NOT_VALID_TYPE
 *                 data:
 *                   type: string
 *                   example: null
 *      '401':
 *        description: You are not the owner
 *        content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: NOT_OWNER
 *                 data:
 *                   type: string
 *                   example: null
 *      '404':
 *        description: Event not found
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
 *      '500':
 *        description: Unknown error
 *        content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: UNKNOWN_ERROR
 *                 data:
 *                   type: string
 *                   example: null
 *
 */


/**
 * @swagger
 * /event{eventId}:
 *  delete:
 *    summary: Delete event [AUTH]
 *    parameters:
 *    - in: path
 *      name: Bearer
 *      schema:
 *        type: string
 *      required: true
 *    description:
 *    responses:
 *      '200':
 *        description: Event is deleted
 *        content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: null
 *                 data:
 *                   type: string
 *                   example: {}
 *      '401':
 *        description: You are not the owner
 *        content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: NOT_OWNER
 *                 data:
 *                   type: string
 *                   example: null
 *      '404':
 *        description: Event not found
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
 *      '500':
 *        description: Unknown error
 *        content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: UNKNOWN_ERROR
 *                 data:
 *                   type: string
 *                   example: null
 *
 */