// src/lib/validations/CarSchema.js
import { z } from "zod";
import {
    MAKES, MODELS, ENGINE_SIZES, PAINT_OPTIONS, YES_NO, MODIFICATION_OPTIONS
} from "@/constants/constants";

export const CarSchema = z.object({
    vin: z.string().min(3, "VIN is required"),

    year: z.preprocess(
        (v) => (typeof v === "string" ? Number(v) : v),
        z.number({ invalid_type_error: "Year must be a number" })
            .min(1995, "Year must be after 1995")
            .max(2025, "Year cannot be after 2025")
    ),

    make: z.enum(MAKES, { errorMap: () => ({ message: "Select make" }) }),
    model: z.enum(MODELS, { errorMap: () => ({ message: "Select model" }) }),

    odometer: z.preprocess(
        (v) => {
            if (v === "" || v == null) return undefined;
            const n = typeof v === "string" ? Number(v.replace(/,/g, "")) : Number(v);
            return Number.isFinite(n) ? n : undefined;
        },
        z.number({
            required_error: "Odometer is required",
            invalid_type_error: "Odometer must be a number",
        })
            .int("Odometer must be an integer")
            .gt(0, "Odometer must be positive")
    ),

    engineSize: z.enum(ENGINE_SIZES),
    paint: z.enum(PAINT_OPTIONS),
    hasGccSpecs: z.enum(YES_NO),

    description: z.string().optional(),
    accidentHistory: z.enum(YES_NO),
    fullServiceHistory: z.enum(YES_NO),

    hasModified: z.enum(MODIFICATION_OPTIONS),

    photos: z
        .array(z.any(), { invalid_type_error: "Please add at least 1 photo" })
        .min(6, "Upload at least 6 photos")
        .max(10, "Too many photos"),
});
