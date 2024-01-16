import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Technical Test Global - Agustin Pereyra',
      version: '1.0.0',
      description: 'Descripción de tu API',
    },
  },
  apis: ['./src/controllers/*.ts'],
};

const specs = swaggerJsdoc(options);

export default specs;
