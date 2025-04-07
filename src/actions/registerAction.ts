"use server"

import prisma from "@/lib/prisma"
import generateSlug from "@/utils/generateSlug"

export async function registerMember(formData: FormData) {
  try {
    // Log all form data to console
    console.log("Received member registration data:")

    // Convert FormData to a regular object for logging
    const formDataObj: { [key: string]: unknown } = {}

    formData.forEach((value, key) => {
      // If the value is a File, log its name and size
      if (value instanceof File) {
        formDataObj[key] = {
          fileName: value.name,
          fileType: value.type,
          fileSize: `${(value.size / 1024).toFixed(2)} KB`,
        }
      } else if (key !== "consent") {
        formDataObj[key] = value
      } 
    })

    // check if the email is already registered
    const email = formData.get("email") as string
    const existingMember = await prisma.members.findUnique({
      where: {
        email,
      },
    })

    if (existingMember) {
      return {
        success: false,
        error: "Email already registered",
      } 
    }

    // generate a slug
    const slug = await generateSlug((formData.get("name") as string).trim(), "members")

    // add member to the database
    const member = await prisma.members.create({
      data: {
        name: (formData.get("name") as string).trim(),
        email: (formData.get("email") as string).trim().toLowerCase(),
        password: formData.get("password") as string,
        contactNumber: formData.get("contactNumber") as string,
        batch: formData.get("batch") as string,
        slug,
        socialLink: formData.get("facebookLink") as string,
        reference: formData.get("reference") as string,
        reason: formData.get("description") as string, // TODO: change the key to description in future for clarity
      }, 
    })
    

    return { success: true }
  } catch (error) {
    console.error("Error processing registration:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    }
  }
}

