import express from 'express';
import { createTask, deleteTask, getAllTasks, getTaskById, updateTask } from '../controllers/taskController.js';
import { validateTask } from '../middlewares/validateTask.js';

const router = express.Router();

router.get('/', getAllTasks);
router.get('/:id', getTaskById);
router.post('/', validateTask, createTask);
router.put('/:id', validateTask, updateTask);
router.delete('/:id', deleteTask);

export default router;