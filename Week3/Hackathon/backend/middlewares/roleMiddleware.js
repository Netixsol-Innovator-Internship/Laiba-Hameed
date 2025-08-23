import User from "../models/User.js";

// middlewares/roleMiddleware.js
export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ success: false, message: "Access denied" });
        }
        next();
    };
};

export const authorizeRoleChange = async (req, res, next) => {
    const actingUser = req.user; // user making the request
    const { targetUserId, newRole } = req.body;

    if (!targetUserId || !newRole) {
        return res.status(400).json({ success: false, message: "Target user and new role required" });
    }

    const targetUser = await User.findById(targetUserId);
    if (!targetUser) {
        return res.status(404).json({ success: false, message: "Target user not found" });
    }

    if (actingUser.role === "admin") {
        // Admin cannot modify other admins or superAdmins
        if (["admin", "superAdmin"].includes(targetUser.role)) {
            return res.status(403).json({ success: false, message: "Admins cannot change roles of other admins or superAdmins" });
        }
        // Admin cannot assign superAdmin
        if (newRole === "superAdmin") {
            return res.status(403).json({ success: false, message: "Admins cannot assign superAdmin role" });
        }
    }

    if (actingUser.role !== "admin" && actingUser.role !== "superAdmin") {
        return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    next();
};
