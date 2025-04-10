"use server"

import prisma from "@/lib/prisma";
import { createSession } from "@/lib/session";
import loginMemberSchema from "@/lib/validation/loginSchemaValidation";
import { LoginFormData, LoginFormResponse } from "@/types/loginFormTypes";
import getDate from "@/utils/getDate";
import bcrypt from "bcryptjs";

export default async function loginMember(
  prevState: LoginFormResponse | null,
  formData: FormData
): Promise<LoginFormResponse | null> {
  try {
    // parse the formdata
    const rawData: LoginFormData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    }

    // validate the form data
    const validatedData = loginMemberSchema.safeParse(rawData);

    if (!validatedData.success) {
        return {
          success: false,
          message: "Please fix the errors in the form",
          errors: validatedData.error.flatten().fieldErrors,
          inputs: rawData,
        };
      }

    // search the member in the database
    const member = await prisma.members.findFirst({
      where: {
        email: rawData.email,
      },
    })



    if (!member) {
      return {
        success: false,
        message: "Invalid email or password",
      };
    }

    const isPasswordValid = await bcrypt.compare(rawData.password, member.password)
    if (!isPasswordValid) {
      return {
        success: false,
        message: "Invalid email or password",
      }; 
    }

    // assign a session to the member
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

    return {
      success: true,
      message: "Logged in successfully", 
      user: responseData,
    }
  } catch (err) {
    console.log("Error fetching all messages - ", getDate(), "\n---\n", err);
    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
}
