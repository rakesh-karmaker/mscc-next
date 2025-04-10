import { z } from "zod";

const loginMemberSchema = z.object({
  email: z.string({ required_error: "Email is required" }).email({
    message: "Invalid email address",
  }),
  password: z
   .string({ required_error: "Password is required" })
   .min(2, "Password must be at least 2 characters"),
});

export default loginMemberSchema;
