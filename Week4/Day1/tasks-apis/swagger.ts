import swaggerJsdoc, { Options } from "swagger-jsdoc";
import path from "path";

const options: Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Task API",
            version: "1.0.0",
            description: "Task API with Express + TypeScript",
        },
        // servers: [{ url: "https://laiba-hameed-week4-day1-backend.vercel.app" }],
    },
    apis: [
        path.join(__dirname, "./routes/*.ts"), // for dev
        path.join(__dirname, "./routes/*.js"), // for production build
    ],
};

export default swaggerJsdoc(options);
