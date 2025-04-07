"use client"

import { z } from "zod";

const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
] as const;

type FileListLike = {
  length: number;
  0?: {
    size: number;
    type: string;
  };
};

type FileFromForm = File[]

// const MemberRegSchema = z.object({
//   name: z
//     .string({ required_error: "Provide your name" })
//     .min(2, "Name must be at least 2 characters")
//     .max(255),
//   password: z
//     .string({ required_error: "Provide your password" })
//     .min(8, "Password must be at least 8 characters"),
//   email: z.string().superRefine((val, ctx) => {
//     const trimmedVal = val.trim();
//     if (!z.string().email().safeParse(trimmedVal).success) {
//       ctx.addIssue({
//         code: z.ZodIssueCode.custom,
//         message: "Invalid email address",
//       });
//     }
//   }),
//   contactNumber: z
//     .string({ required_error: "Provide your contact number" })
//     .min(10, "Contact number must be at least 10 characters"),
//   batch: z
//     .string({ required_error: "Select your ssc batch" })
//     .min(4, "Batch must be at least 4 characters")
//     .nullable()
//     // .refine((value) => value !== null && value.trim() !== "", {
//     //   message: "Batch is required",
//     // })
//     .optional()
//     .refine(
//       (value) =>
//         !value || Array.from(value).every((char) => !/[A-Za-z]/.test(char)),
//       {
//         message: "Batch must contain only numbers",
//       }
//     ),
//   branch: z
//     .string({ required_error: "Select your branch" })
//     .nullable()
//     .refine((value) => value !== null && value.trim() !== "", {
//       message: "Branch is required",
//     })
//     .optional(),
//   image: z
//     .any(),
//   reason: z
//     .string({ required_error: "Give a description of yourself" })
//     .nullable()
//     .refine((value) => value !== null && value.trim() !== "", {
//       message: "Description is required",
//     }),
//   socialLink: z
//     .string({ required_error: "Enter your facebook link" })
//     .nullable()
//     .refine((value) => value !== null && value.trim() !== "", {
//       message: "Social link is required",
//     }),
//   reference: z
//     .string({ required_error: "Enter your reference" })
//     .nullable()
//     .refine((value) => value !== null && value.trim() !== "", {
//       message: "Reference is required",
//     }),
//   consent: z.string({required_error: "Consent is required"}).nullable().refine((value) => value === "true" || value === "on", {
//     message: "Consent is required",
//   }),
// });

const MemberLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const MemberProfileEditSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(255),
  email: z.string().email("Invalid email address"),
  password: z.string().refine((value) => value === "" || value.length >= 6, {
    message: "Password must be at least 6 characters",
  }),
  image: z
    .custom<FileListLike>((files) => {
      return !files || files.length === 0 || (files[0]?.size ?? 0) <= MAX_FILE_SIZE
    }, {
      message: `Max image size is ${MAX_FILE_SIZE / 1024}KB.`
    })
    .refine(
      (files) =>
        !files ||
        files.length === 0 ||
        (files[0]?.type &&
          ACCEPTED_IMAGE_TYPES.includes(
            files[0]?.type as (typeof ACCEPTED_IMAGE_TYPES)[number]
          )),
      {
        message: "Please upload a valid image file (JPG, JPEG, PNG or WebP).",
      }
    ),
  branch: z.string({ required_error: "Select your branch" }),
  reason: z.string({
    required_error: "Give a description of why you want to join the club",
  }),
  socialLink: z.string({ required_error: "Enter your facebook link" }),
  contactNumber: z
    .string({ required_error: "Provide your contact number" })
    .min(10, "Contact number must be at least 10 characters"),
  batch: z
    .string({ required_error: "Select your ssc batch" })
    .min(4, "Batch must be at least 4 characters")
    .nullable()
    .refine((value) => value !== null && value.trim() !== "", {
      message: "Batch is required",
    })
    .optional()
    .refine(
      (value) =>
        !value || Array.from(value).every((char) => !/[A-Za-z]/.test(char)),
      {
        message: "Batch must contain only numbers",
      }
    ),
});

const MemberRegSchema = z.object({
  name: z
    .string({ required_error: "Provide your name" })
    .min(2, "Name must be at least 2 characters")
    .max(255),
  password: z
    .string({ required_error: "Provide your password"})
    .min(8, "Password must be at least 8 characters"),
  email: z.string().superRefine((val, ctx) => {
    const trimmedVal = val.trim();
    if (!z.string().email().safeParse(trimmedVal).success) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Invalid email address",
      });
    }
  }),
  contactNumber: z
    .string({ required_error: "Provide your contact number"})
    .min(10, "Contact number must be at least 10 characters"),
  batch: z
    .string({ required_error: "Select your ssc batch"})
    .min(4, "Batch must be at least 4 characters")
    .nullable()
    .refine((value) => value !== null && value.trim() !== "", {
      message: "Batch is required",
    })
    .refine(
      (value) => value ? Array.from(value).every((char) => !/[A-Za-z]/.test(char)) : false,
      {
        message: "Batch must contain only numbers",
      }
    ),
  branch: z
    .string({ required_error: "Select your branch" })
    .nullable()
    .refine((value) => value !== null && value.trim() !== "", {
      message: "Branch is required",
    }),
  image: z
  .custom<FileFromForm>((fileList) => Array.isArray(fileList), {
    message: "Please upload a valid file",
  })
  .refine((files) => files.length > 0, {
    message: "Image is required",
  })
  .refine((files) => files[0].size <= MAX_FILE_SIZE, {
    message: `Max image size is ${MAX_FILE_SIZE / 1024 / 1024}MB.`,
  })
  .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files[0].type as typeof ACCEPTED_IMAGE_TYPES[number]), {
    message: "Only JPG, JPEG, PNG, and WebP formats are supported.",
  }),
  reason: z
    .string({ required_error: "Give a description of yourself" })
    .nullable()
    .refine((value) => value !== null && value.trim() !== "", {
      message: "Description is required",
    }),
  socialLink: z
    .string({ required_error: "Enter your facebook link" })
    .nullable()
    .refine((value) => value !== null && value.trim() !== "", {
      message: "Social link is required",
    }),
  reference: z
    .string({ required_error: "Enter your reference" })
    .nullable()
    .refine((value) => value !== null && value.trim() !== "", {
      message: "Reference is required",
    }),
  consent: z.boolean().refine((value) => value === true, {
    message: "Consent is required",
  }),
});


const TimelineSchema = z.object({
  tag: z
    .string()
    .nullable()
    .refine((value) => value !== null && value.trim() !== "", {
      message: "Tag is required",
    }),
  date: z
    .date()
    .nullable()
    .refine((value) => value !== null, {
      message: "Date is required",
    }),
  title: z
    .string()
    .min(2, "Title must be at least 2 characters")
    .refine((value) => value !== null && value.trim() !== "", {
      message: "Title is required",
    }),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .refine((value) => value !== null && value.trim() !== "", {
      message: "Description is required",
    }),
  link: z
    .string()
    .min(2, "Link must be at least 2 characters")
    .refine((value) => value !== null && value.trim() !== "", {
      message: "Link is required",
    }),
});

export {
  MemberRegSchema,
  MemberLoginSchema,
  MemberProfileEditSchema,
  TimelineSchema,
};



