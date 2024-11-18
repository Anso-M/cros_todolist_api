import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// Define as opções de configuração do Swagger
const swaggerOptions: swaggerJSDoc.Options = {
    definition: {
        openapi: "3.0.0",  // A versão do OpenAPI
        info: {
            title: "To-do API",  // Título da API
            version: "1.0.0",   // Versão da API
            description: "User and Task Management API. To use any User or Task route, you must first register and then log in.", // Descrição da API
        },
        components: {
            securitySchemes: {
              BearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                },
            },
        },
    },
    // Caminhos onde os arquivos .ts estão localizados, onde as rotas são definidas
    apis: ["./src/routes/*.ts", "./src/controllers/*.ts", "./src/entities/*.ts", 
        "./src/docs/*.ts", "./src/docs/models/*.ts", "./src/services/*.ts"], 
};

// Criação da documentação Swagger a partir das opções
const swaggerSpec = swaggerJSDoc(swaggerOptions);

export { swaggerSpec, swaggerUi };