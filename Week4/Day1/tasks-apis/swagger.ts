import swaggerJsdoc, { Options } from "swagger-jsdoc";

const options: Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Task API",
            version: "1.0.0",
            description: "Task API with Express + TypeScript",
        },
        servers: [{ url: "http://localhost:5000" }],
    },
    apis: ["./routes/*.ts"],
};

export default swaggerJsdoc(options);
