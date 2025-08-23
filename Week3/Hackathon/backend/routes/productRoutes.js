import express from "express";
import {
  createProduct,
  deleteAllProducts,
  deleteProductById,
  getAllProducts,
  getAvailableFilterOptions,
  getCollections,
  getFilteredProductsByOption,
  getProductByID,
  getProductBySlug,
  updateProductById,
} from "../controllers/productController.js";

import { upload } from "../multer/multer.js";
import { validateID, validateProduct } from "../validators/productValidator.js";
import { validate } from "../middlewares/productValidate.js";
import { protect } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";
import { parseJsonFields } from "../middlewares/parseJsonFields.js";

const productRoutes = express.Router();

// Create a new Product (Admin + SuperAdmin only)
productRoutes.post(
  "/",
  protect,
  authorizeRoles("admin", "superAdmin"),
  upload.single("image"),
  parseJsonFields,
  validateProduct,
  validate,
  createProduct
);

// Get all Products
productRoutes.get("/", getAllProducts);

// Get Collections
productRoutes.get("/collections", getCollections);

// Get Filter Options
productRoutes.get("/filters/options", getAvailableFilterOptions);

// Get Products by filtering the attributes
productRoutes.get("/filter/search", getFilteredProductsByOption);

// Get product by ID
productRoutes.get("/:id", validate, getProductByID);

// Get product by slug
productRoutes.get("/slug/:slug", validate, getProductBySlug);

// Delete All Products (SuperAdmin only)
productRoutes.delete("/", protect, authorizeRoles("superAdmin"), deleteAllProducts);

// Delete Product by id (SuperAdmin only)
productRoutes.delete("/:id", protect, authorizeRoles("superAdmin"), validateID, validate, deleteProductById);

// Update product by ID (Admin + SuperAdmin only)
productRoutes.patch(
  "/:id",
  protect,
  authorizeRoles("admin", "superAdmin"), 
  updateProductById
);


export default productRoutes;
