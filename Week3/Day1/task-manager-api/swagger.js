import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'Task Manager API',
    description: 'In-memory CRUD API for tasks',
  },
  host: 'localhost:3000',
  schemes: ['http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./server.js']; 

swaggerAutogen(outputFile, endpointsFiles, doc);
