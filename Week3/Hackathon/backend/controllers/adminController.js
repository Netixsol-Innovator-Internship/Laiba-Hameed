import User from "../models/User.js";

// Change user role
export const changeUserRole = async (req, res) => {
    try {
        const { targetUserId, newRole } = req.body;
        const actingUser = req.user;

        const targetUser = await User.findById(targetUserId);
        if (!targetUser) return res.status(404).json({ success: false, message: "Target user not found" });

        // Admin cannot modify other admins/superAdmins
        if (actingUser.role === "admin" && ["admin", "superAdmin"].includes(targetUser.role)) {
            return res.status(403).json({ success: false, message: "Admins cannot change roles of other admins/superAdmins" });
        }

        targetUser.role = newRole;
        await targetUser.save();

        res.status(200).json({ success: true, data: targetUser, message: "User role updated successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Block/unblock user
export const blockUnblockUser = async (req, res) => {
    try {
        const { targetUserId, blocked } = req.body;
        const actingUser = req.user;

        const targetUser = await User.findById(targetUserId);
        if (!targetUser) return res.status(404).json({ success: false, message: "User not found" });

        // Admin cannot block/unblock other admins or superAdmins
        if (actingUser.role === "admin" && ["admin", "superAdmin"].includes(targetUser.role)) {
            return res.status(403).json({ success: false, message: "Admins cannot block/unblock admins or superAdmins" });
        }

        targetUser.blocked = blocked;
        await targetUser.save();

        res.status(200).json({
            success: true,
            data: targetUser,
            message: blocked ? "User blocked successfully" : "User unblocked successfully",
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Block/unblock user
export const getAllUsers = async (req, res) => {
    try {
        const products = await User.find();
        const count = await User.countDocuments();
        return res.status(200).json({
            success: true,
            data: products,
            count,
            message: "All users retrived successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
