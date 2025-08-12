import express from 'express';
import {
    createTask,
    deleteTask,
    getAllTasks,
    getTaskById,
    updateTask
} from '../controllers/taskController.js';
import { validateTask } from '../middlewares/validateTask.js';
import { protect } from '../middlewares/authMiddleware.js';

const taskRoutes = express.Router();

taskRoutes.get('/', protect, getAllTasks);
taskRoutes.get('/:id', protect, getTaskById);
taskRoutes.post('/', protect, validateTask, createTask);
taskRoutes.put('/:id', protect, validateTask, updateTask);
taskRoutes.delete('/:id', protect, deleteTask);

export default taskRoutes;
