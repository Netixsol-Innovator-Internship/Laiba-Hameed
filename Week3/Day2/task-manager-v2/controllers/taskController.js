import Task from "../models/Task.js";
import { errors, success } from "../utils/responses.js";

export const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user.id });
        res.json({ success: true, data: tasks, message: success.TASKS_RETRIEVED });
    } catch (error) {
        res.status(500).json({ success: false, message: errors.SERVER_ERROR });
    }
};

export const getTaskById = async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, userId: req.user.id });
        if (!task) {
            return res.status(404).json({ success: false, message: errors.TASK_NOT_FOUND });
        }
        res.json({ success: true, data: task, message: success.TASK_RETRIEVED });
    } catch (error) {
        res.status(500).json({ success: false, message: errors.SERVER_ERROR });
    }
};

export const createTask = async (req, res) => {
    try {
        const { title, description, completed } = req.body;

        if (!title || !description || title.trim() === "" || description.trim() === "") {
            return res.status(400).json({ success: false, message: errors.VALIDATION_ERROR });
        }

        const newTask = await Task.create({
            title: title.trim(),
            description: description?.trim() || "",
            completed: completed || false,
            userId: req.user.id
        });

        res.status(201).json({ success: true, data: newTask, message: success.TASK_CREATED });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: errors.SERVER_ERROR });
    }
};

export const updateTask = async (req, res) => {
    try {
        const { title, description, completed } = req.body;
        const task = await Task.findOne({ _id: req.params.id, userId: req.user.id });

        if (!task) {
            return res.status(404).json({ success: false, message: errors.TASK_NOT_FOUND });
        }

        if (title !== undefined) {
            if (typeof title !== 'string' || title.trim() === '') {
                return res.status(400).json({ success: false, message: errors.VALIDATION_ERROR });
            }
            task.title = title.trim();
        }

        if (description !== undefined) {
            if (typeof description !== 'string') {
                return res.status(400).json({ success: false, message: errors.VALIDATION_ERROR });
            }
            task.description = description.trim();
        }

        if (completed !== undefined) task.completed = completed;

        await task.save();
        res.json({ success: true, data: task, message: success.TASK_UPDATED });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: errors.SERVER_ERROR });
    }
};

export const updateTaskStatus = async (req, res) => {
    try {
        const { completed } = req.body;

        if (typeof completed !== "boolean") {
            return res.status(400).json({ success: false, message: errors.VALIDATION_ERROR });
        }

        const task = await Task.findOne({ _id: req.params.id, userId: req.user.id });

        if (!task) {
            return res.status(404).json({ success: false, message: errors.TASK_NOT_FOUND });
        }

        task.completed = completed;
        await task.save();

        res.json({ success: true, data: task, message: success.TASK_UPDATED });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: errors.SERVER_ERROR });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id });

        if (!task) {
            return res.status(404).json({ success: false, message: errors.TASK_NOT_FOUND });
        }

        res.json({ success: true, message: success.TASK_DELETED });
    } catch (error) {
        res.status(500).json({ success: false, message: errors.SERVER_ERROR });
    }
};


