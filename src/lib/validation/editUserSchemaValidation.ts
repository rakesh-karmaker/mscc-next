import { z } from "zod";

// Zod schema for form validation
export const editUserFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    // .min(8, { message: "Password must be at least 8 characters" })
    // .regex(/[A-Z]/, {
    //   message: "Password must contain at least one uppercase letter",
    // })
    // .regex(/[a-z]/, {
    //   message: "Password must contain at least one lowercase letter",
    // })
    // .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .optional(),
  contactNumber: z
    .string()
    .regex(/^\d{11}$/, { message: "Contact number must be 11 digits" }),
  batch: z.string().min(1, { message: "Batch is required" }),
  branch: z.string().min(1, { message: "Please select a branch" }),
  description: z.string().optional(),
  facebookLink: z.string().optional().or(z.literal("")),
});

// Type for the form data derived from the Zod schema
export type EditMemberFromData = z.infer<typeof editUserFormSchema>;

// Type for the server response
export type editUserResponse = {
  success: boolean;
  error?: string;
};
