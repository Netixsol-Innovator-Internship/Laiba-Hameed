import { Request, Response, NextFunction } from "express";

export const validateId = (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);
    if (isNaN(id) || id <= 0) {
        return res.status(400).json({ success: false, error: "Invalid task id" });
    }
    next();
};
