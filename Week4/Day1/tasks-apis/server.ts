import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import router from "./routes/taskRoutes";
import swagger from "./swagger";
import { errorHandler } from "./middleware/errorHandler";

const app = express();
app.use(cors());
app.use(express.json());

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swagger));

// Routes
app.use("/api/tasks", router);

// Global error handler
app.use(errorHandler);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});
