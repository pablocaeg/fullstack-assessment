import swaggerJSDoc, { Options } from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import express, { Application } from 'express';

const options: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Phone Management API",
      version: "1.0.0",
    },
  },
  apis: ["src/v1/routes/usersRoutes.ts", "src/v1/routes/organizationRoutes.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app: Application, port: number): void => {
  app.use('/api/v1/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
  app.get('/api/v1/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec)
  })

  console.log(`📚 Swagger docs available at http://localhost:${port}/api/v1/docs`);
};

export default swaggerDocs;

