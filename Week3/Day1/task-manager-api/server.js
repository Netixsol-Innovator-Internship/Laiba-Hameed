import express from 'express';
import router from './routes/taskRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';
import swaggerUi from 'swagger-ui-express'
import swaggerFile from './swagger-output.json' with { type: 'json' };

const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use('/api/tasks', router)

app.use(errorHandler)

app.listen(3000, ()=> console.log(`Server running on port 3000`));