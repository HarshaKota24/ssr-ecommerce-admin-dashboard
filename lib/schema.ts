import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters"),

  price: z
    .number()
    .positive("Price must be greater than 0"),

  stock: z
    .number()
    .int()
    .min(0, "Stock cannot be negative"),

  rating: z
    .number()
    .min(0)
    .max(5, "Rating must be between 0 and 5"),

  image: z
    .string()
    .url("Invalid image URL"),
});
