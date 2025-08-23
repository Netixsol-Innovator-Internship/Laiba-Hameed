import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { errors } from "../utils/responses.js";

dotenv.config();

export const protect = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ success: false, message: errors.NO_TOKEN });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.blocked) {
            return res.status(403).json({ success: false, message: "Your account is blocked. Contact admin." });
        }

        req.user = decoded; // includes id, role, blocked
        next();
    } catch (err) {
        res.status(401).json({ success: false, message: errors.INVALID_TOKEN });
    }
};

export const checkBlockedUser = (req, res, next) => {
    if (req.user.blocked) {
        return res.status(403).json({ success: false, message: "Your account is blocked." });
    }
    next();
};
