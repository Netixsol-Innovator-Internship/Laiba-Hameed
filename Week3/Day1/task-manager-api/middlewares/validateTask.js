import { errors } from "../utils/responses.js";

export const validateTask = (req, res, next) => {
    const { title, completed } = req.body;

    if (title === undefined || typeof title !== 'string') {
        return res.status(400)
            .json({ success: false, message: errors.VALIDATION_ERROR });
    }

    if (completed !== undefined && typeof completed !== 'boolean') {
        return res
            .status(400)
            .json({ success: false, message: errors.VALIDATION_ERROR });
    }
    next();
}