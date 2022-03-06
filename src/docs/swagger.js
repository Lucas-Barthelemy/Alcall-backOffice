const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'ALCALL API Documentation',
        version: '1.0.0',
        description:
            'This is a documentation for the project Alcall',
        license: {
            name: 'Licensed Under MIT',
            url: 'https://spdx.org/licenses/MIT.html',
        },
        contact: {
            name: 'JSONPlaceholder',
            url: 'https://jsonplaceholder.typicode.com',
        },
    },
    servers: [
        {
            url: 'https://alcall.pierregourgouillon.com/api/',
            description: 'Development server',
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: ["./src/docs/routes/*.js"]
}

module.exports = options