const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'TEST API',
    version: '1.0.0',
    description: 'Doctor appointment Booking API',     
  },
  servers: [
    {
      url: 'http://localhost:3000/main/auth/',
      description: 'User Development server',
    },
    {
      url: 'http://localhost:3000/main/booking/',
      description: 'User Development server',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT', // Optional: if you're using JWT tokens
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const options = {
  swaggerDefinition,
  // paths to files containing OpenAPI definitions
  apis: ['./routes/userRouter.js',
  './routes/router.js',
],
   
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
