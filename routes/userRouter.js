const express = require('express');
const userRouter = express.Router();
const authenticateJWT = require('../middleware/authMiddleware');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../swaggerConfig');
const userController = require("../controllers/userControllelr");

////////////////////////////

/**
 * @swagger
 * /test:
 *   get:
 *     summary: test
 *     description: test
 *     responses:
 *       200:
 *         description: test message.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       message:
 *                         type: string
 *                         description: test.
*/

////////////////////////

userRouter.get('/test', userController.test);


////////////////////////
userRouter.use('/main/auth/api-docs', swaggerUi.serve);
userRouter.get('/main/auth/api-docs', swaggerUi.setup(swaggerSpec));


module.exports=userRouter;