import express from "express";
import {
  createProduct,
  deleteAllProducts,
  deleteProductById,
  getAllProducts,
  getAvailableFilterOptions,
  getFilteredProductsByOption,
  getProductByID,
  getProductBySlug,
  updateProductById,
} from "../controllers/productController.js";
import { body, param } from "express-validator";
import { validationResult } from "express-validator";
const productRoutes = express.Router();

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.errors[0].msg,
    });
  }

  next();
};

// Create a new Product
productRoutes.post(
  "/",
  [
    body("name")
      .notEmpty()
      .withMessage("Name is required")
      .isLength({ min: 5 })
      .withMessage("Product name at least of 5 characters")
      .isLength({ max: 30 })
      .withMessage("Product name must be less than 30 characters"),
    body("slug")
      .notEmpty()
      .withMessage("Slug is required")
      .isLength({ min: 5 })
      .withMessage("Slug name at least of 5 characters")
      .isLength({ max: 30 })
      .withMessage("Slug name must be less than 30 characters"),
    body("description")
      .notEmpty()
      .withMessage("Description is required")
      .isLength({ min: 10 })
      .withMessage("Product description at least of 10 characters")
      .isLength({ max: 200 })
      .withMessage("Product description must be less than 200 characters"),
    body("attributes").notEmpty().withMessage("Attributes are required"),
    body("images").notEmpty().withMessage("Image is required"),
    body("stock")
      .optional()
      .isInt({ min: 0 })
      .withMessage("Stock value must be a positive integer"),
  ],
  validate,
  createProduct
);

// Get all Products
productRoutes.get("/", getAllProducts);

// Get Filter Options
productRoutes.get("/filters/options", getAvailableFilterOptions);

// Get Products by filtering the attributes
productRoutes.get("/filter/search", getFilteredProductsByOption);

// Get product by ID
productRoutes.get(
  "/:id",
  [param("id").isMongoId().withMessage("Invalid product ID format")],
  validate,
  getProductByID
);

// Get product by slug
productRoutes.get(
  "/slug/:slug",
  [param("slug").notEmpty().withMessage("Slug is required")],
  validate,
  getProductBySlug
);

// Delete All Products

productRoutes.delete("/", deleteAllProducts);

// Delete Product by id
productRoutes.delete(
  "/:id",
  [param("id").isMongoId().withMessage("Invalid product ID format")],
  validate,
  deleteProductById
);

// Update by id

productRoutes.put(
  "/",
  [
    body("name")
      .notEmpty()
      .withMessage("Name is required")
      .isLength({ min: 5 })
      .withMessage("Product name at least of 5 characters")
      .isLength({ max: 30 })
      .withMessage("Product name must be less than 30 characters"),
    body("slug")
      .notEmpty()
      .withMessage("Slug is required")
      .isLength({ min: 5 })
      .withMessage("Slug name at least of 5 characters")
      .isLength({ max: 30 })
      .withMessage("Slug name must be less than 30 characters"),
    body("description")
      .notEmpty()
      .withMessage("Description is required")
      .isLength({ min: 10 })
      .withMessage("Product description at least of 10 characters")
      .isLength({ max: 200 })
      .withMessage("Product description must be less than 200 characters"),
    body("attributes").notEmpty().withMessage("Attributes are required"),
    body("images").notEmpty().withMessage("Image is required"),
    body("stock")
      .optional()
      .isInt({ min: 0 })
      .withMessage("Stock value must be a positive integer"),
  ],
  validate,
  updateProductById
);

export default productRoutes;
