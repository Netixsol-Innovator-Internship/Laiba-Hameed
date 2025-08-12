import { errors } from "../utils/responses.js";

export const validateTask = (req, res, next) => {
    const { title, completed } = req.body;

    // If both fields are missing on creation, reject
    if (req.method === 'POST') {
        if (!title || typeof title !== 'string') {
            return res.status(400).json({
                success: false,
                message: errors.VALIDATION_ERROR
            });
        }
    }

    // For updates, title is optional but must be a string if provided
    if (req.method === 'PUT' || req.method === 'PATCH') {
        if (title !== undefined && typeof title !== 'string') {
            return res.status(400).json({
                success: false,
                message: errors.VALIDATION_ERROR
            });
        }
    }

    // completed is always optional but must be boolean if provided
    if (completed !== undefined && typeof completed !== 'boolean') {
        return res.status(400).json({
            success: false,
            message: errors.VALIDATION_ERROR
        });
    }

    next();
};
