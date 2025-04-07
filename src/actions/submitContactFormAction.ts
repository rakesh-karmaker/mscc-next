"use server";

import type {
  ContactFormActionResponse,
  ContactFormData,
} from "@/types/contactFormTypes";
import contactSchema from "@/lib/validation/contactSchemaValidation";
import getDate from "@/utils/getDate";
import prisma from "@/lib/prisma";

export default async function submitContactForm(
  prevState: ContactFormActionResponse | null,
  formData: FormData
): Promise<ContactFormActionResponse> {
  try {
    // parse the form data
    const rawData: ContactFormData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    };

    // validate the form data
    const validatedData = contactSchema.safeParse(rawData);

    if (!validatedData.success) {
      return {
        success: false,
        message: "Please fix the errors in the form",
        errors: validatedData.error.flatten().fieldErrors,
        inputs: rawData,
      };
    }

    // save the form data to the database
    await prisma.messages.create({
      data: {
        name: validatedData.data.name,
        email: validatedData.data.email,
        subject: validatedData.data.subject,
        message: validatedData.data.message,
        v: 1, // or appropriate default value
        createdAt: new Date(),
        updatedAt: new Date(),
        new: true, // or appropriate default value
      },
    });

    return {
      success: true,
      message: "Form submitted successfully",
    };
  } catch (err) {
    console.log("Error fetching all messages - ", getDate(), "\n---\n", err);
    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
}
