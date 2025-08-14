import { errors } from "../utils/responses.js";

export const validateTask = (req, res, next) => {
    const { title, description, completed } = req.body;

    if (req.method === 'POST') {
        if (!title || typeof title !== 'string') {
            return res.status(400).json({ success: false, message: errors.VALIDATION_ERROR });
        }
        if (description !== undefined && typeof description !== 'string') {
            return res.status(400).json({ success: false, message: errors.VALIDATION_ERROR });
        }
    }

    if (req.method === 'PUT') {
        if (title !== undefined && typeof title !== 'string') {
            return res.status(400).json({ success: false, message: errors.VALIDATION_ERROR });
        }
        if (description !== undefined && typeof description !== 'string') {
            return res.status(400).json({ success: false, message: errors.VALIDATION_ERROR });
        }
    }

    if (req.method === 'PATCH') {
        const allowedFields = ['completed'];
        const keys = Object.keys(req.body);

        const invalidField = keys.find(key => !allowedFields.includes(key));
        if (invalidField) {
            return res.status(400).json({
                success: false,
                message: `Only 'completed' field can be updated with PATCH`
            });
        }

        if (completed !== undefined && typeof completed !== 'boolean') {
            return res.status(400).json({ success: false, message: errors.VALIDATION_ERROR });
        }
    }

    if (completed !== undefined && typeof completed !== 'boolean') {
        return res.status(400).json({ success: false, message: errors.VALIDATION_ERROR });
    }

    next();
};

