const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Url Shortener',
      version: '1.0.0',
      description: 'Short your URL',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./src/routes/*.js'], // Point to where your routes are defined
};

const swaggerSpec = swaggerJSDoc(options);

function swaggerDocs(app, port) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(`Docs available at http://localhost:${port}/api-docs`);
}

module.exports = swaggerDocs;
