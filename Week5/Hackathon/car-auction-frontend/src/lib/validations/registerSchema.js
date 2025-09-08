import { z } from "zod"

export const registerSchema = z.object({
  fullName: z.string().min(2, "Full Name is required"),
  email: z.string().email("Enter a valid email"),

  idNo: z.string().min(6, "ID number should be at least 6 characters"),
  idType: z.enum(["passport", "cnic", "driver_license"], {
    errorMap: () => ({ message: "Please select a valid ID type" }),
  }),

  mobileNo: z.string().regex(
    /^[0-9]{6,14}$/,
    "Enter a valid phone number"
  ),
  country: z.string().nonempty("Country code is required"),

  username: z.string().min(4, "Username must be at least 4 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Confirm your password"),

  captcha: z.boolean().refine(val => val === true, "Please verify you are not a robot"),
  terms: z.boolean().refine(val => val === true, "You must accept Terms & Conditions"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})

