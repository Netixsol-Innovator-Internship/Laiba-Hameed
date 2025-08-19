import { Request, Response, NextFunction } from "express";
import { CreateTaskBody } from "../interfaces/taskInterface";

export const validateTask = (req: Request<{}, {}, CreateTaskBody>, res: Response, next: NextFunction) => {
    const { title, description } = req.body;

    if (!title || typeof title !== "string") {
        return res.status(400).json({ success: false, error: "Title is required and must be a string" });
    }

    if (description && typeof description !== "string") {
        return res.status(400).json({ success: false, error: "Description must be a string" });
    }

    next();
};
