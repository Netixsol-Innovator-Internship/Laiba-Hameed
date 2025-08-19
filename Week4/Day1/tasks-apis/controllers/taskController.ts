import { Request, Response } from "express";
import { CreateTaskBody, Task, UpdateStatusBody, UpdateTaskBody } from "../interfaces/taskInterface";

let tasks: Task[] = [];
let taskId = 1;

// Get all tasks
export const getTasks = (req: Request, res: Response) => {
    res.json({ success: true, data: tasks });
};

// Create a task
export const createTask = (req: Request<{}, {}, CreateTaskBody>, res: Response) => {
    const { title, description } = req.body;

    const newTask: Task = { id: taskId++, title, description, completed: false };
    tasks.push(newTask);

    res.status(201).json({ success: true, data: newTask });
}

// Update a task
export const updateTask = (req: Request<{ id: string }, {}, UpdateTaskBody>, res: Response) => {
    const id = Number(req.params.id);
    const task = tasks.find(t => t.id === id);

    if (!task) return res.status(404).json({ success: false, error: "Task not found" });

    const { title, description, completed } = req.body;

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (completed !== undefined) task.completed = completed;

    res.json({ success: true, data: task });
};

// Update only task status
export const updateTaskStatus = (req: Request<{ id: string }, {}, UpdateStatusBody>, res: Response) => {
    const id = Number(req.params.id);

    const task = tasks.find(t => t.id === id);
    if (!task) return res.status(404).json({ success: false, error: "Task not found" });

    if (typeof req.body.completed !== "boolean") {
        return res.status(400).json({ success: false, error: "Completed must be a boolean" });
    }

    task.completed = req.body.completed;
    res.json({ success: true, data: task });
};

// Delete a task
export const deleteTask = (req: Request<{ id: string }>, res: Response) => {
    const id = Number(req.params.id);

    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) return res.status(404).json({ success: false, error: "Task not found" });

    tasks.splice(index, 1);
    res.json({ success: true, data: "task Deleted" });
};
