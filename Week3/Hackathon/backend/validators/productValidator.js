import { body, param } from "express-validator";

export const validateProduct = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 5 })
    .withMessage("Product name at least of 5 characters")
    .isLength({ max: 30 })
    .withMessage("Product name must be less than 30 characters"),
  body("description")
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 10 })
    .withMessage("Product description at least of 10 characters")
    .isLength({ max: 200 })
    .withMessage("Product description must be less than 200 characters"),
  body("variants").isArray({ min: 1 }).withMessage("At least one variant is required"),
  body("variants.*.weight").notEmpty().withMessage("Variant weight is required"),
  body("variants.*.price").isFloat({ min: 0 }).withMessage("Variant price must be non-negative"),
  body("attributes").notEmpty().withMessage("Attributes are required"),
  body().custom((value, { req }) => {
    if (!req.file) {
      throw new Error("Image is required")
    }
    return true
  }),
  body("stock").optional().isInt({ min: 0 }).withMessage("Stock value must be a positive integer"),
];

export const validateID = [
  param("id").isMongoId().withMessage("Invalid product ID format"),
];
