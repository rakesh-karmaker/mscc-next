"use server"

import { uploadImage } from "@/lib/imagekit"
import prisma from "@/lib/prisma"
import { createSession } from "@/lib/session"
import generateSlug from "@/utils/generateSlug"
import getDate from "@/utils/getDate"
import bcrypt from "bcryptjs"

export async function registerMember(formData: FormData) {
  try {
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
    const email = (formData.get("email") as string).trim().toLowerCase()
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
    const hashedPassword = await bcrypt.hash((formData.get("password") as string).trim(), 10)

    // upload image to imagekit
    const image = formData.get("userImage") as File
    const { url, imgId } = await uploadImage(image, false)

    // add member to the database
    const member = await prisma.members.create({
      data: {
        name: (formData.get("name") as string).trim(),
        email: (formData.get("email") as string).trim().toLowerCase(),
        password: hashedPassword,
        contactNumber: formData.get("contactNumber") as string,
        batch: formData.get("batch") as string,
        branch: formData.get("branch") as string,
        slug,
        socialLink: formData.get("facebookLink") as string,
        reference: formData.get("reference") as string,
        reason: formData.get("description") as string, // TODO: change the key reason to description for the database
        submissions: [],
        timeline: [],
        image: url,
        imgId: imgId,
        v: 1,
        createdAt: new Date(),
      }, 
    })
    
    // create a session
    await createSession(member.id)

    const responseData = {
      id: member.id,
      slug: member.slug,
      name: member.name,
      email: member.email,
      role: member.role,
      batch: member.batch,
      branch: member.branch,
      position: member.position,
      image: member.image,
      timeline: member.timeline,
      createdAt: member.createdAt,
      socialLink: member.socialLink,
      reason: member.reason,
      contactNumber: member.contactNumber, 
    }

    // log the registration
    console.log("Registration successful -", getDate(), "\n---\n", formDataObj)
    return { success: true, user: responseData }
  } catch (error) {
    console.error("Error precessing registration -", getDate(), "\n---\n", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    }
  }
}

