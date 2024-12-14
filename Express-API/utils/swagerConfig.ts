import { SwaggerOptions } from "swagger-ui-express";

import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions: SwaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'Documentation for the API endpoints',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}`, // Change this to your server's base URL
      },
    ],
  },
  apis: ['./dist/routes/*.js'], // Path to your route files
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);
export default swaggerDocs
