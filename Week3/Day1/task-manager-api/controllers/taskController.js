import { errors, success } from "../utils/responses.js";

let tasks = [
    {
        id: 1,
        title: "Learn Express",
        completed: false
    }
];

let currentId = 2;

export const getAllTasks = (req, res) => {
    res.json({ success: true, data: tasks, message: success.TASKS_RETRIEVED })
}

export const getTaskById = (req, res) => {
    const task = tasks.find(task => task.id === parseInt(req.params.id))
    if (!task) {
        return res.status(404).json({ success: false, message: errors.TASK_NOT_FOUND })
    }
    res.json({ success: true, data: task, message: success.TASK_RETRIEVED })
}

export const createTask = (req, res) => {
    const { title, completed } = req.body;
    const newTask = { id: currentId++, title, completed: completed || false };
    tasks.push(newTask)
    res.status(201).json({ success: true, data: newTask, message: success.TASK_CREATED })
}

export const updateTask = (req, res) => {
    const { title, completed } = req.body;
    const task = tasks.find(task => task.id === parseInt(req.params.id));

    if (!task) {
        return res.status(404).json({ success: false, message: errors.TASK_NOT_FOUND });
    }

    if (title !== undefined) task.title = title;
    if (completed !== undefined) task.completed = completed;

    res.json({ success: true, data: task, message: success.TASK_UPDATED });
}

export const deleteTask = (req, res) => {
    const index = tasks.findIndex(task => task.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).json({ success: false, message: errors.TASK_NOT_FOUND })
    }
    tasks.splice(index, 1);
    res.json({ success: true, message: success.TASK_DELETED })
}

