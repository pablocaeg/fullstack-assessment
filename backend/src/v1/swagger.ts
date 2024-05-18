import swaggerJSDoc, { Options } from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import { Application } from 'express';

const options: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Phone Management API",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3000/api/v1",
      },
    ],
    components: {
      schemas: {
        Organization: {
          type: "object",
          required: ["id", "name", "description"],
          properties: {
            id: {
              type: "integer",
              description: "The auto-generated id of the organization",
            },
            name: {
              type: "string",
              description: "The name of the organization",
            },
            description: {
              type: "string",
              description: "The description of the organization",
            },
          },
        },
        User: {
          type: "object",
          required: ["passport", "name", "organizationId", "phone"],
          properties: {
            passport: {
              type: "integer",
              description: "The user's passport number",
            },
            name: {
              type: "string",
              description: "The name of the user",
            },
            surname: {
              type: "string",
              description: "The surname of the user",
            },
            phone: {
              type: "integer",
              description: "The user's phone number",
            },
            organizationId: {
              type: "integer",
              description: "The ID of the organization the user belongs to",
            },
          },
        },
      },
    },
  },
  apis: ["src/v1/routes/*.ts"],
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

