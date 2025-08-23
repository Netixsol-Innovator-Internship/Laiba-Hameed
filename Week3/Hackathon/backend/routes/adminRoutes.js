import express from "express";
import { blockUnblockUser, changeUserRole, getAllUsers } from "../controllers/adminController.js";
import { authorizeRoleChange, authorizeRoles } from "../middlewares/roleMiddleware.js";
import { protect } from "../middlewares/authMiddleware.js";



const adminRoutes = express.Router();

// Change role (Admin + SuperAdmin)
adminRoutes.patch(
    "/change-role",
    protect,
    authorizeRoles("admin", "superAdmin"),
    authorizeRoleChange,
    changeUserRole
);

// Block/unblock user (Admin + SuperAdmin)
adminRoutes.patch(
    "/block-user",
    protect,
    authorizeRoles("admin", "superAdmin"),
    blockUnblockUser
);

// get all users (Admin + SuperAdmin)
adminRoutes.get(
    "/all-users",
    protect,
    authorizeRoles("admin", "superAdmin"),
    getAllUsers
);

export default adminRoutes;
