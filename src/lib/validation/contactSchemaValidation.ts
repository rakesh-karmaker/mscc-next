import { z } from "zod";

const contactSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(2, "Name must be at least 2 characters"),
  email: z.string({ required_error: "Email is required" }).email({
    message: "Invalid email address",
  }),
  subject: z
    .string({ required_error: "Subject is required" })
    .min(2, "Subject must be at least 2 characters"),
  message: z
    .string({ required_error: "Message is required" })
    .min(2, "Message must be at least 2 characters"),
});

export default contactSchema;
