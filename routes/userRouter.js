const express = require('express');
const userRouter = express.Router();
const authenticateJWT = require('../middleware/authMiddleware');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../swaggerConfig');
const userController = require("../controllers/userControllelr");

////////////////////////////

/**
 * @swagger
 * /patients:
 *   get:
 *     summary: Retrieve a list of patients
 *     description: Fetch all patient records from the database.
 *     tags:
 *       - Patients
 *     responses:
 *       200:
 *         description: A list of patients
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   userId:
 *                     type: integer
 *                     example: 2
 *                   medicalHistory:
 *                     type: string
 *                     example: "Diabetes, Hypertension"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2023-10-20T14:48:00.000Z"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2023-10-20T14:48:00.000Z"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
/**
 * @swagger
 * /register/patient:
 *   post:
 *     summary: Register a new patient
 *     description: Creates a new user with the role of "patient" and associates a patient record.
 *     tags:
 *       - Patients
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: string
 *                 example: "John Doe"
 *               password:
 *                 type: string
 *                 example: "password123"
 *               email:
 *                 type: string
 *                 example: "johndoe@example.com"
 *               role:
 *                 type: string
 *                 enum: ["patient"]
 *                 example: "patient"
 *     responses:
 *       200:
 *         description: Patient registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 patient:
 *                   $ref: '#/components/schemas/Patient'
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /register/doctor:
 *   post:
 *     summary: Register a new doctor
 *     description: Creates a new user with the role of "doctor" and associates a doctor record.
 *     tags:
 *       - Doctors
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: string
 *                 example: "Dr. Jane Smith"
 *               password:
 *                 type: string
 *                 example: "password123"
 *               email:
 *                 type: string
 *                 example: "dr.jane@example.com"
 *               role:
 *                 type: string
 *                 enum: ["doctor"]
 *                 example: "doctor"
 *               specialization:
 *                 type: string
 *                 enum: ["Dermatology", "Endocrinologist", "Oncologist", "Family Medicine", "Neurology"]
 *                 example: "Neurology"
 *     responses:
 *       200:
 *         description: Doctor registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 doctor:
 *                   $ref: '#/components/schemas/Doctor'
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login a user
 *     description: Authenticates a user and returns a JWT token.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 role:
 *                   type: string
 *                   example: "doctor"
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /logout:
 *   delete:
 *     summary: Logout a user
 *     description: Logs out a user by invalidating the current JWT token.
 *     tags:
 *       - Authentication
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Logged out successfully"
 *       500:
 *         description: Internal server error
 */



////////////////////////

userRouter.get('/patients', userController.patients);
userRouter.post('register/patient', userController.registerPatient);
userRouter.post('/register/doctor', userController.registerDoctor);
userRouter.delete('/logout', userController.logout);
userRouter.post('/login', userController.login);

////////////////////////
userRouter.use('/main/auth/api-docs', swaggerUi.serve);
userRouter.get('/main/auth/api-docs', swaggerUi.setup(swaggerSpec));


module.exports=userRouter;