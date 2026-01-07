import { z } from "zod";

const MAX_NAME = 150;
const MAX_DESCRIPTION = 5000;

const IMAGE_EXT_REGEX = /\.(jpe?g|png|webp|gif|svg|avif|bmp)(\?.*)?$/i;
const DATA_IMAGE_REGEX = /^data:image\/(png|jpeg|jpg|webp|gif|svg\+xml|bmp|avif);base64,/i;

export const productSchema = z
  .object({
    name: z
      .string()
      .min(3, "Name must be at least 3 characters")
      .max(MAX_NAME, `Name cannot exceed ${MAX_NAME} characters`)
      .transform((s) => s.trim()),

    description: z
      .string()
      .max(MAX_DESCRIPTION, `Description cannot exceed ${MAX_DESCRIPTION} characters`)
      .transform((s) => s.trim()),

    // Accept numeric input as strings from forms/JSON by coercing
    price: z.coerce
      .number()
      .positive("Price must be greater than 0")
      .max(1_000_000_000, "Price is unreasonably large"),

    stock: z.coerce
      .number()
      .int("Stock must be an integer")
      .min(0, "Stock cannot be negative")
      .max(1_000_000, "Stock is unreasonably large"),

    rating: z
      .coerce
      .number()
      .min(0, "Rating must be between 0 and 5")
      .max(5, "Rating must be between 0 and 5")
      .optional()
      .default(0),

    // Image may be optional; accept valid image URLs or data-image URIs only
    image: z
      .string()
      .optional()
      .refine((val) => {
        if (!val) return true;
        // Allow data:image/*;base64, and http(s) URLs ending with image extensions
        if (DATA_IMAGE_REGEX.test(val)) return true;
        try {
          const u = new URL(val);
          return IMAGE_EXT_REGEX.test(u.pathname);
        } catch (e) {
          return false;
        }
      }, { message: "Image must be a valid image URL or data URI (jpg/png/webp/gif/svg/avif)" }),
  })
  .strict();

// For create endpoints use the strict schema above. For updates we allow partials
export const productUpdateSchema = productSchema
  .partial()
  .strip()
  .superRefine((obj, ctx) => {
    if (!obj || Object.keys(obj).length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "At least one field must be provided for update",
      });
    }
  });

// Helper to convert Zod errors into a friendly map: { field: message }
export function formatZodErrors(err: unknown) {
  if (!(err instanceof z.ZodError)) return { _error: String(err) };
  const out: Record<string, string> = {};
  for (const issue of err.issues) {
    const path = issue.path.length ? String(issue.path.join(".")) : "_error";
    // Prefer to keep the first message for a field
    if (!out[path]) out[path] = issue.message;
  }
  return out;
}

// Generic validator: parse and return typed data or throw ZodError
export function validateSchema<T extends z.ZodTypeAny>(
  schema: T,
  input: unknown
): z.infer<T> {
  return schema.parse(input);
}

export type ProductCreateInput = z.infer<typeof productSchema>;
export type ProductUpdateInput = z.infer<typeof productUpdateSchema>;
