const express = require('express');
const Router = express.Router();
const authenticateJWT = require('../middleware/authMiddleware');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../swaggerConfig');
const bookingController = require("../controllers/bookingController");



/////////////////

/**
 * @swagger
 * /new:
 *   post:
 *     summary: Create a new appointment
 *     description: Book a new appointment for a patient with a specified doctor on a given date.
 *     tags:
 *       - Appointments
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               patientId:
 *                 type: integer
 *                 example: 1
 *               doctorId:
 *                 type: integer
 *                 example: 2
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2024-11-01"
 *     responses:
 *       201:
 *         description: Appointment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 patientId:
 *                   type: integer
 *                   example: 1
 *                 doctorId:
 *                   type: integer
 *                   example: 2
 *                 appointmentDate:
 *                   type: string
 *                   format: date
 *                   example: "2024-11-01"
 *                 status:
 *                   type: string
 *                   enum: [pending, confirmed, canceled]
 *                   example: "pending"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-10-20T14:48:00.000Z"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-10-20T14:48:00.000Z"
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /doctors/appointments:
 *   get:
 *     summary: Get appointments of a doctor
 *     description: Retrieve all appointments associated with a specified doctor.
 *     tags:
 *       - Appointments
 *       - Doctors
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the doctor
 *     responses:
 *       200:
 *         description: List of appointments for the doctor
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
 *                   patientId:
 *                     type: integer
 *                     example: 3
 *                   doctorId:
 *                     type: integer
 *                     example: 2
 *                   appointmentDate:
 *                     type: string
 *                     format: date
 *                     example: "2024-11-01"
 *                   status:
 *                     type: string
 *                     enum: [pending, confirmed, canceled]
 *                     example: "confirmed"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-10-20T14:48:00.000Z"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-10-20T14:48:00.000Z"
 *                   user:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         example: "John Doe"
 *       401:
 *         description: Doctor not found
 *       500:
 *         description: Internal server error
 */


//////////////////////////
Router.post('/new', authenticateJWT, bookingController.newAppointment);
Router.get('/doctor/appointments', authenticateJWT, bookingController.appointmentsOfDoctor);

////////////////
Router.use('/main/auth/api-docs', swaggerUi.serve);
Router.get('/main/auth/api-docs', swaggerUi.setup(swaggerSpec));


module.exports=Router;