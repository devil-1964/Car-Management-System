const swaggerJsdoc = require('swagger-jsdoc');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.3',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'API to manage cars and users',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local server',
      },
      {
        url: 'https://car-management-system-rwam.onrender.com',
        description: 'Online Web server',
      }
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          required: ['username', 'email', 'password'],
          properties: {
            _id: {
              type: 'string',
              description: 'User ID'
            },
            username: {
              type: 'string',
              description: 'Username'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email'
            },
            password: {
              type: 'string',
              description: 'Password'
            }
          },
          example: {
            _id: 'user1',
            username: 'john_doe',
            email: 'john.doe@example.com',
            password: 'password123'
          }
        },
        Car: {
          type: 'object',
          required: ['title', 'tags', 'description', 'user_id'],
          properties: {
            _id: {
              type: 'string',
              description: 'Car ID'
            },
            user_id: {
              type: 'string',
              description: 'User ID that owns the car'
            },
            title: {
              type: 'string',
              description: 'Car title'
            },
            tags: {
              type: 'array',
              items: {
                type: 'string'
              },
              description: 'Tags related to the car'
            },
            description: {
              type: 'string',
              description: 'Car description'
            },
            img: {
              type: 'array',
              items: {
                type: 'string'
              },
              description: 'List of image URLs'
            }
          },
          example: {
            _id: 'car1',
            user_id: 'user1',
            title: 'Ford Mustang Shelby',
            tags: ['electric', 'luxury','Muscle'],
            description: 'A premium electric car by Ford.',
            img: ['https://example.com/image1.jpg','https://example.com/image2.jpg']
          }
        }
      }
    }
  },
  apis: ['./routes/userRoutes.js', './routes/carRoutes.js', './controllers/userController.js', './controllers/carsController.js']
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

module.exports = swaggerDocs;
